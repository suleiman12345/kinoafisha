FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-audit --no-fund
ENV WATCHPACK_POLLING=true

COPY . .

EXPOSE 5173

ENV HOST=0.0.0.0
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=100

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--strictPort"]
