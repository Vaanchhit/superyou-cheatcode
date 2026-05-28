FROM node:20-alpine
WORKDIR /app
COPY package.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.js .
COPY frontend ./frontend
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
