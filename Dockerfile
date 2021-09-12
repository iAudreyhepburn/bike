FROM nginx:alpine

WORKDIR /app

# Copy needed files
COPY ./docker/nginx.config /etc/nginx/conf.d/default.conf
COPY ./dist .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
