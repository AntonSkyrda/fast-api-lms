FROM node:18 AS build

WORKDIR /app

# Копіюємо тільки package.json і lock для кешування
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm ci

# Видаляємо старі бінарники esbuild (якщо є)
RUN rm -rf node_modules/esbuild/bin/* && npm rebuild esbuild

# Копіюємо решту файлів (включно з tsconfig.json, vite.config.ts і src)
COPY . .

# Будуємо проєкт
RUN npm run build

# Сервер
FROM nginx:latest AS serve

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]