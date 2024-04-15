import argparse
import configparser
import json
import os
import random
import string
from functools import wraps
from time import sleep

import psycopg2
from confluent_kafka import Producer
from dotenv import load_dotenv
from psycopg2 import sql

from common import query, query_handler

class FetchRss:
    def __init__(self, config_path):
        self.__parse_config(config_path)
        self.__init_producer()
        
    def __parse_config(self, config_path):
        config_parser = configparser.ConfigParser()
        config_parser.read(config_path)
        self.config = dict(config_parser['kafka'])
        self.config.update(config_parser['producer'])

    def __init_producer(self):
        self.producer = Producer(self.config)

    def delivery_report(self, err, msg):
        if err is not None:
            print(f'Message delivery failed: {err}')
        else:
            print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

    def fetch(self):
        while True:
            links = query("SELECT * FROM rss_links")
            if links:
                for link in links:
                    topic = "news"
                    value = json.dumps(link)
                    self.producer.produce(topic, value=value, callback=self.delivery_report)
                    self.producer.poll(0)
                    print(f"Produced message to topic: {topic}, value: {value}")
            else:
                print("No news available")
            sleep(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch news from database and produce to Kafka')
    parser.add_argument('config', help='Path to the configuration file')
    args = parser.parse_args()
    
    load_dotenv()
    
    fetcher = FetchRss(args.config)
    fetcher.fetch()
