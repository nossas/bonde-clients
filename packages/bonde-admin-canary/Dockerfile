FROM nginx:1.10.2
MAINTAINER Kyle Mathews "mathews.kyle@gmail.com"

RUN rm /etc/nginx/nginx.conf /etc/nginx/mime.types
COPY docker-nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker-nginx/basic.conf /etc/nginx/basic.conf
COPY docker-nginx/mime.types /etc/nginx/mime.types
RUN mkdir /etc/nginx/ssl
COPY docker-nginx/default /etc/nginx/sites-enabled/default
COPY docker-nginx/directive-only /etc/nginx/directive-only
COPY docker-nginx/location /etc/nginx/location

# expose both the HTTP (80) and HTTPS (443) ports
EXPOSE 80

CMD ["nginx"]

