# Pull the base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code
COPY src/ ./src
COPY config/ ./config

# Run nothing tail
CMD ["tail", "-f", "/dev/null"]
