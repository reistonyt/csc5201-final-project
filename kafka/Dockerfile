FROM apache/kafka:3.7.0

# Remove the default server.properties file
RUN rm -f /etc/kafka/docker/server.properties

# Copy the custom server.properties file
COPY server.properties /etc/kafka/docker/server.properties

EXPOSE 9092
