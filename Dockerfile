FROM php:8.0-apache

WORKDIR /var/www/html
COPY backend/ /var/www/html/
COPY public/ /var/www/html/


# Instalar extensiones necesarias para MySQL
RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 80
CMD ["apache2-foreground"]
