# Pull the base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install dependencies from requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code into the Docker image
COPY src/ .
COPY config/ .

# The command to keep the container running
CMD ["tail", "-f", "/dev/null"]
