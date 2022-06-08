FROM php:8.0.13-fpm-alpine3.14

# Installer XDebug
COPY ./docker/php/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN apk add bash git $PHPIZE_DEPS
RUN pecl install xdebug
RUN docker-php-ext-enable xdebug

# Modules pour utiliser MySQL
RUN docker-php-ext-install mysqli pdo_mysql

# Installer composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# Installer la CLI Symfony
RUN curl -sS https://get.symfony.com/cli/installer | bash
RUN  mv /root/.symfony/bin/symfony /usr/local/bin/symfony
