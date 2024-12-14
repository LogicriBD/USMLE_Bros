#!/bin/bash

source ./prod.conf

if [[ -z "$PROJECT_ID" || -z "$IMAGE_NAME" || -z "$REGION" || -z "$PORT" ]]; then
    echo "Error: Missing necessary configuration in uat.conf"
    echo "Required: PROJECT_ID, IMAGE_NAME, REGION, PORT"
    exit 1
fi

GCR_IMAGE="gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG"

echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME --build-arg ENV_FILE=$ENV_FILE --build-arg APP_PORT=$PORT ../ || {
    echo "Failed to build Docker image"
    exit 1
}

echo "🏷️ Tagging Docker image for GCR..."
docker tag $IMAGE_NAME $GCR_IMAGE

echo "🔑 Authenticating with Google Cloud..."
gcloud auth configure-docker || {
    echo "GCloud authentication failed"
    exit 1
}

echo "🏗️ Pushing Docker image to GCR..."
docker push $GCR_IMAGE || {
    echo "Failed to push Docker image"
    exit 1
}

echo "🚀 Deploying to Google Cloud Run..."
gcloud run deploy $IMAGE_NAME \
    --image=$GCR_IMAGE \
    --platform=managed \
    --region=$REGION \
    --port=$PORT \
    --allow-unauthenticated || {
    echo "Cloud Run deployment failed"
    exit 1
}

echo "✅ $TAG Deployment completed successfully!"
