FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server ./server
COPY game ./game
ENV PORT=10000
EXPOSE 10000
CMD ["node", "server/server.js"]
