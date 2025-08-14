ARG IMAGE=node:24

FROM $IMAGE AS development

ENV TZ="Europe/Warsaw"

RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm


RUN mkdir -p /usr/src/app/.pnpm-store && \
    chown -R node:node /usr/src/app && \
    chown -R node:node /usr/src/app/.pnpm-store

USER node

RUN pnpm config set store-dir /usr/src/app/.pnpm-store --global

WORKDIR /usr/src/app

COPY --chown=node:node ./backend/pnpm-lock.yaml ./
COPY --chown=node:node ./backend/package*.json ./

RUN pnpm install

COPY --chown=node:node ./backend .

FROM $IMAGE AS builder

ENV NODE_ENV=production

ENV CI=true

RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --chown=node:node ./backend/package*.json ./
COPY --chown=node:node ./backend/pnpm-lock.yaml ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./backend ./

RUN pnpm run build:all

RUN pnpm prune --prod

USER node

FROM $IMAGE AS production

ENV NODE_ENV=production

ENV TZ="Europe/Warsaw"

RUN apt-get update && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY --chown=node:node ./backend/package*.json ./ 
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist