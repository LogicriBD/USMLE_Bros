#syntax=docker/dockerfile:1.4
FROM node:20-alpine AS base

# Define build arguments for environment variables
ARG NODE_ENV
ARG NEXT_PUBLIC_ENVIRONMENT
ARG API_URL

# Firebase Admin SDK
ARG FIREBASE_SERVICE_ACCOUNT
ARG FIREBASE_PRIVATE_KEY

# Firebase Client SDK
ARG FIREBASE_API_KEY
ARG FIREBASE_AUTH_DOMAIN
ARG FIREBASE_PROJECT_ID
ARG FIREBASE_STORAGE_BUCKET
ARG FIREBASE_MESSAGING_SENDER_ID
ARG FIREBASE_APP_ID
ARG FIREBASE_MEASUREMENT_ID

# Cloudinary
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET
ARG CLOUDINARY_URL
ARG CLOUDINARY_CLOUD_NAME

# Google Adsense
ARG GOOGLE_ADSENSE_CLIENT
ARG DATA_AD_SLOT_DISPLAY_AD

# Email Configurations
ARG SMTP_HOST
ARG SMTP_PORT
ARG SMTP_TLS
ARG SMTP_USERNAME
ARG SMTP_PASSWORD
ARG EMAIL_FROM

ARG APP_PORT

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --link package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps --link /app/node_modules ./node_modules
COPY --link  . .

# Compile environment variables into .env file
RUN echo "NODE_ENV=$NODE_ENV" > .env \
    && echo "NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT" >> .env \
    && echo "API_URL=$API_URL" >> .env \
    && echo "FIREBASE_SERVICE_ACCOUNT=$FIREBASE_SERVICE_ACCOUNT" >> .env \
    && echo "FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY" >> .env \
    && echo "FIREBASE_API_KEY=$FIREBASE_API_KEY" >> .env \
    && echo "FIREBASE_AUTH_DOMAIN=$FIREBASE_AUTH_DOMAIN" >> .env \
    && echo "FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID" >> .env \
    && echo "FIREBASE_STORAGE_BUCKET=$FIREBASE_STORAGE_BUCKET" >> .env \
    && echo "FIREBASE_MESSAGING_SENDER_ID=$FIREBASE_MESSAGING_SENDER_ID" >> .env \
    && echo "FIREBASE_APP_ID=$FIREBASE_APP_ID" >> .env \
    && echo "FIREBASE_MEASUREMENT_ID=$FIREBASE_MEASUREMENT_ID" >> .env \
    && echo "CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY" >> .env \
    && echo "CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET" >> .env \
    && echo "CLOUDINARY_URL=$CLOUDINARY_URL" >> .env \
    && echo "CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME" >> .env \
    && echo "GOOGLE_ADSENSE_CLIENT=$GOOGLE_ADSENSE_CLIENT" >> .env \
    && echo "DATA_AD_SLOT_DISPLAY_AD=$DATA_AD_SLOT_DISPLAY_AD" >> .env \
    && echo "SMTP_HOST=$SMTP_HOST" >> .env \
    && echo "SMTP_PORT=$SMTP_PORT" >> .env \
    && echo "SMTP_TLS=$SMTP_TLS" >> .env \
    && echo "SMTP_USERNAME=$SMTP_USERNAME" >> .env \
    && echo "SMTP_PASSWORD=$SMTP_PASSWORD" >> .env \
    && echo "EMAIL_FROM=$EMAIL_FROM" >> .env

# If using npm comment out above and use below instead
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN \
    addgroup --system --gid 1001 nodejs; \
    adduser --system --uid 1001 nextjs

COPY --from=builder --link /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --link --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --link --chown=1001:1001 /app/.next/static ./.next/static

USER nextjs

EXPOSE $APP_PORT

ENV PORT $APP_PORT
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
