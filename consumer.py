from confluent_kafka import Consumer, KafkaException

# Kafka configuration
config = {
    'bootstrap.servers': 'localhost:9092',  # Replace with your Kafka server address
    'group.id': 'mygroup',
    'auto.offset.reset': 'earliest',
}

# Create Consumer instance
consumer = Consumer(config)

# Subscribe to topic
consumer.subscribe(['test_topic'])

try:
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaException._PARTITION_EOF:
                # End of partition event
                continue
            else:
                print(msg.error())
                break
        print(f'Received message: {msg.value().decode("utf-8")}')
except KeyboardInterrupt:
    pass
finally:
    # Close down consumer to commit final offsets.
    consumer.close()
