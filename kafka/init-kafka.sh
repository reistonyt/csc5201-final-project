#!/bin/bash
# Kafka initialization script for KRaft mode

# Step 1: Set up directories and paths
KAFKA_BIN="/opt/kafka/bin"
KAFKA_CONFIG="/opt/kafka/config/kraft"
LOG_DIR="/tmp/kafka-logs"

# Ensure the log directory exists
mkdir -p $LOG_DIR

# Step 2: Generate a UUID for the Kafka cluster
cd $KAFKA_BIN
UUID=$($KAFKA_BIN/kafka-storage.sh random-uuid)
echo "Generated UUID: $UUID"

# Step 3: Create kraft.properties configuration file
cd $KAFKA_CONFIG
cat > kraft.properties <<EOF
# Define Node ID and Roles
node.id=1
process.roles=broker,controller

# Define Listeners for Broker and Controller
listeners=PLAINTEXT://:9092,CONTROLLER://:9093
controller.listener.names=CONTROLLER
inter.broker.listener.name=PLAINTEXT
controller.quorum.voters=1@localhost:9093
advertised.listeners=PLAINTEXT://kafka:9092

# Define log directories
log.dirs=$LOG_DIR

# KRaft settings
quorum.voters=1@localhost:9093
EOF

# Verify the kraft.properties file contents
echo "kraft.properties configuration:"
cat kraft.properties

# Step 4: Format the Kafka storage with the UUID
$KAFKA_BIN/kafka-storage.sh format -t $UUID -c $KAFKA_CONFIG/kraft.properties

# Output result of formatting command
echo "Kafka storage formatted with UUID: $UUID"

# Step 5: Start Kafka server
echo "Starting Kafka..."
$KAFKA_BIN/kafka-server-start.sh $KAFKA_CONFIG/kraft.properties
