# --- Stage 1: Build ---
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

# Устанавливаем все зависимости (включая dev)
RUN npm install

# Копируем код
COPY . .

# Собираем TypeScript → dist/
RUN npm run build


# --- Stage 2: Run ---
FROM node:18

WORKDIR /app

COPY package*.json ./

# Устанавливаем только прод зависимости
RUN npm install --omit=dev

# Копируем собранный проект
COPY --from=build /app/dist ./dist

EXPOSE 10000
CMD ["node", "dist/server.js"]
