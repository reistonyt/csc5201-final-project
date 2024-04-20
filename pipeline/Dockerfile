# Pull the base image
FROM python:3.10-slim

# Install wget and download Google Chrome, then clean up in one layer
# RUN apt-get update && apt-get install -y wget \
#     && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome-stable_current_amd64.deb \
#     && apt-get install -y /tmp/google-chrome-stable_current_amd64.deb --no-install-recommends \
#     # && apt-get purge --auto-remove -y wget \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /tmp/google-chrome-stable_current_amd64.deb

# Set the working directory
WORKDIR /app

# Install dependencies from requirements.txt
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code into the Docker image
COPY src/ ./src
COPY config/ ./config

# The command to keep the container running
CMD ["tail", "-f", "/dev/null"]
