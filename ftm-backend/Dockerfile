#################
## DOCKER FILE ##
#################
# GET LATEST PHP
FROM php:latest
# SPECIFY `/app` AS WORKING DIRECTORY WITHIN DOCKER
WORKDIR /app
# INSTALL `Composer`
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# COPY LOCAL PROJECT FILES/DIRECTORIES INTO `/app` WITHIN DOCKER
COPY . /app
# MOVE LOCAL COPY OF `php.ini` INTO `/usr/local/etc/php`
RUN mv ./php.ini /usr/local/etc/php/php.ini
# ALIAS COMPOSER; USE IT TO DUMP AUTO-LOAD FILES AND THEN START BUILT-IN PHP SERVER
CMD alias composer="/usr/local/bin/composer"; composer dump-autoload; php -S 0.0.0.0:8000
# EXPOSE PORT 8000
EXPOSE 8000
