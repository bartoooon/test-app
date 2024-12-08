FROM node:22.0.0 AS angular
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# ho tolto --prod perchè non andava
RUN npm run build
FROM nginx:alpine
COPY --from=angular /app/dist/browser /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
