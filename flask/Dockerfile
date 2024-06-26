# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install wget and download Google Chrome, then clean up in one layer
RUN apt-get update && apt-get install -y wget \
    && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -O /tmp/google-chrome-stable_current_amd64.deb \
    && apt-get install -y /tmp/google-chrome-stable_current_amd64.deb --no-install-recommends \
    # && apt-get purge --auto-remove -y wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/google-chrome-stable_current_amd64.deb

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY src/ .

# Copy the requirements.txt file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Execute a python config script
RUN python3 fetch.py

# Run app.py when the container launches
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]

# Run app.py when the container launches with 4 workers and 4 threads
# CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--threads", "4", "app:app"]

# Run nothing
# CMD ["tail", "-f", "/dev/null"]
