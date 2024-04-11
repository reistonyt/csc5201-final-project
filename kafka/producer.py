from confluent_kafka import Producer
from time import sleep
import string
import random

# Kafka configuration
config = {
    'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka server address
}

# Create Producer instance
producer = Producer(config)

# Callback function to check if message was delivered
def delivery_report(err, msg):
    if err is not None:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

# Produce a message constantly
while True:
    # Generate a random string
    s = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
    producer.produce('test_topic', key='key', value=s, callback=delivery_report)
    print("Produced message: " + s)
    producer.poll(0)
    sleep(1)

# Wait for any outstanding messages to be delivered and delivery report callbacks to be triggered
producer.flush()


# News rss
