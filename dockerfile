# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia los archivos de tu proyecto al directorio de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para el servidor web
EXPOSE 80