import argparse
import configparser
from dotenv import load_dotenv
from confluent_kafka import Consumer

from common import query

from psycopg2 import IntegrityError
from datetime import datetime

import json

from time import sleep

class CheckRssUpdate:
    def __init__(self, config_path):
        self.__parse_config(config_path)
        self.__init_consumer()
        
    def __parse_config(self, config_path):
        config_parser = configparser.ConfigParser()
        config_parser.read(config_path)
        self.config = dict(config_parser['kafka'])
        self.config.update(config_parser['consumer'])

    def __init_consumer(self):
        self.consumer = Consumer(self.config)

    def store_article(self, article):     
        # Check if article is a json object
        if not isinstance(article, dict):
            print("Invalid article")
            return
        
        source = article.get('source', {}).get('name', "Source not available")
        published_at = article.get('publishedAt', "Date not available")
        title = article.get('title', "Title not available")
        url = article.get('url', "URL not available")
        
        # Verify date format
        try:
            datetime.strptime(published_at, '%Y-%m-%dT%H:%M:%SZ')
        except ValueError:
            date = None
        
        # Insert the article into the database
        try:
            query("INSERT INTO articles (source, published_at, title, url) VALUES (%s, %s, %s, %s)", (source, published_at, title, url))
            print(f"consumer.py - store_article - Article stored: {title}")
        except IntegrityError:
            print(f"consumer.py - store_article - Article already exists: {title}")
        except Exception as e:
            print(f"consumer.py - store_article - Error: {e}")
    
    def convert_to_json(self, message):
        try:
            return json.loads(message.value().decode('utf-8'))
        except json.JSONDecodeError:
            print("Invalid JSON")
            return None

    def consume(self):
        self.consumer.subscribe(['articles'])
        while True:
            message = self.consumer.poll(1.0)
            if message is None:
                print("consumer.py - consume - No message")
                continue
            if message.error():
                print(f"consumer.py - consume - Consumer error: {message.error()}")
                continue
    
            # Check if message is a json object, then store it
            if article := self.convert_to_json(message):
                self.store_article(article)

            sleep(5)
        # self.consumer.close()
        
    def produce(self):
        pass

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch news from database and consume from Kafka')
    parser.add_argument('config', help='Path to the configuration file')
    args = parser.parse_args()
    
    load_dotenv()

    checker = CheckRssUpdate(args.config)
    checker.consume()
