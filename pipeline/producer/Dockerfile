# Pull the base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install dependencies from requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code into the Docker image
COPY ./common/ .
COPY ./producer.py .

# The command to keep the container running
# CMD ["tail", "-f", "/dev/null"]

# CMD ["python3", "producer.py", "kafka_config.ini"]

# Sleep for 10 seconds to wait for the Kafka broker to start
CMD ["sh", "-c", "sleep 30 && python3 producer.py kafka_config.ini"]