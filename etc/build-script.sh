#!/bin/bash

if [ ! -f ../.env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

BUILD_ARGS=""

while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [[ -z "$line" || "$line" =~ ^# ]]; then
        continue
    fi

    # Extract key and value from each line
    KEY=$(echo "$line" | cut -d '=' -f 1)
    VALUE=$(echo "$line" | cut -d '=' -f 2-)

    # Escape single quotes in values
    VALUE=${VALUE//\'/\'\\\'\'}

    # Append the build argument
    BUILD_ARGS+=" --build-arg $KEY='$VALUE'"
done <../.env

DOCKER_COMMAND="sudo docker build -t usmle-bros $BUILD_ARGS ../"

echo "Executing the Docker build command..."
echo "$DOCKER_COMMAND"
eval "$DOCKER_COMMAND"

if [ $? -eq 0 ]; then
    echo "Docker build completed successfully!"
else
    echo "Error: Docker build failed!"
    exit 1
fi
