# Standard imports
import argparse
import configparser
import json
import os
import random
import string
from functools import wraps
from itertools import cycle
from time import sleep
import datetime

# Third-party imports
import psycopg2
from confluent_kafka import Producer
from dotenv import load_dotenv
from newsapi import NewsApiClient
from psycopg2 import sql

# Local imports
from common import query, query_handler

"""
curl https://newsapi.org/v2/everything -G \
    -d domains=investing.com \
    -d language=en \
    -d from=2024-04-10 \
    -d sortBy=publishedAt \
    -d apiKey=x

"""

class FetchRss:
    def __init__(self, config_path):
        self.__parse_config(config_path)
        self.__init_producer()
        self.__init_newsapi()

    def __parse_config(self, config_path):
        config_parser = configparser.ConfigParser()
        config_parser.read(config_path)
        self.config = dict(config_parser['kafka'])
        self.config.update(config_parser['producer'])

    def __init_producer(self):
        self.producer = Producer(self.config)

    def __init_newsapi(self):
        apikeys = os.getenv('NEWSAPI_KEYS').split(',')        
        self.clients = [NewsApiClient(api_key=key) for key in apikeys]

    def delivery_report(self, err, msg):
        if err is not None:
            print(f'Message delivery failed: {err}')
        else:
            print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

    def get_sources(self):
        # TODO: Get news sources from db
        pass

    def fetch_articles(self, source):
        # Round robin through the clients to avoid rate limiting
        client = next(self.clients)
        
        # Get get date from 3 days ago
        date = datetime.datetime.now() - datetime.timedelta(days=3)
        date = date.strftime('%Y-%m-%d')
        
        # Get articles from the source
        articles = client.get_everything(
            sources=source,
            language='en',
            from_param=date,
            sort_by='publishedAt'
        )
        return articles

    def produce(self):
        while True:
            sources = self.get_sources()
            if not sources:
                print("No sources available")
                sleep(3600)
                continue
            
            for source in sources:
                # Get articles from the source
                articles = self.fetch_articles(source)
                if not articles:
                    print(f"No articles available for source: {source}")
                    continue
                if articles.get('status', '') != 'ok':
                    print(f"Error fetching articles for source: {source}")
                    continue
                
                # Produce the articles to Kafka
                for article in articles['articles']:
                    topic = "articles"
                    value = json.dumps(article)
                    self.producer.produce(topic, value=value, callback=self.delivery_report)
                    self.producer.poll(0)
                    print(f"Produced message to topic: {topic}, value: {value}")
            sleep(3600)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch news from database and produce to Kafka')
    parser.add_argument('config', help='Path to the configuration file')
    args = parser.parse_args()
    
    load_dotenv()
    
    fetcher = FetchRss(args.config)
    fetcher.produce()
