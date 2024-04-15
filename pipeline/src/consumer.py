import argparse
import configparser
from dotenv import load_dotenv
from confluent_kafka import Consumer


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
        
    def checkForUpdate(self):
        self.consumer.subscribe(['news'])
        while True:
            message = self.consumer.poll(1.0)
            if message is None:
                print("No message received")
                continue
            if message.error():
                print(f"Consumer error: {message.error()}")
                continue
            print(f"Consumed message: {message.value().decode('utf-8')}")
            
        self.consumer.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Fetch news from database and consume from Kafka')
    parser.add_argument('config', help='Path to the configuration file')
    args = parser.parse_args()
    
    load_dotenv()
    
    