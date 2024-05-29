# Etapa de construcción
FROM node:20 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Compila la aplicación de React
RUN npm run build

# Etapa de producción
FROM nginx:latest

# Copia los archivos generados en la etapa de construcción al directorio de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando para iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]