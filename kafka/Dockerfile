# Use the official Apache Kafka base image
FROM apache/kafka:3.7.0

# Expose Kafka ports
EXPOSE 9092
EXPOSE 9093

# Copy server.properties file to the Kafka config directory
COPY server.properties /opt/kafka/config/kraft/server.properties

# Copy your custom initialization script (already made executable)
COPY init-kafka.sh /usr/local/bin/init-kafka.sh

# Set the entry point to run your script
ENTRYPOINT ["/usr/local/bin/init-kafka.sh"]
