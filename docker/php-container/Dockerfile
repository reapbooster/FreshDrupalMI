FROM php:7.3-fpm

RUN apt-get update -y --fix-missing && apt-get install -y \
      gnupg2

ARG ENV
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV LANG en_US.utf8

ENV CODELINT_COMMAND="~/.composer/vendor/bin/phpcs --colors --standard=Drupal --extensions='php,module,inc,install,test,profile,theme,js,css,info,txt,md' -v "
ENV CODELINT="\n\nalias drupalcs=\"${CODELINT_COMMAND}\"\n"
ENV CODELINT_FIX_COMMAND="phpcbf --standard=Drupal --extensions='php,module,inc,install,test,profile,theme,css,info,txt,md' -v "
ENV CODELINT_FIX="\nalias drupalcbf=\"${CODELINT_FIX_COMMAND}\"\n"

ENV DEBIAN_FRONTEND=noninteractive

ARG PHP_VERSION=7.3

WORKDIR /tmp

RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN update-ca-certificates --verbose --fresh
RUN mkdir -p /usr/share/man/man1

RUN apt-get update -y --fix-missing && apt-get install -y \
      supervisor \
      curl \
      vim \
      procps \
      apt-utils \
      libfreetype6-dev \
      libjpeg62-turbo-dev \
      libpng-dev \
      imagemagick \
      procps \
      awscli \
      syncthing \
      supervisor \
      apt-utils \
      nfs-common \
      icu-devtools \
      libicu-dev \
      libxml2-dev \
      libcairo2 \
      libsodium-dev \
      libjpeg-dev \
      libgd-dev \
      libpng-dev \
      libcairo2-dev \
      git \
      libpcre3-dev \
      wget \
      default-mysql-client \
      zip \
      libzip-dev \
      redis-tools \
      xvfb \
      libgconf-2-4 \
      libxi6 \
      unzip \
      google-chrome-stable \
      gvfs \
      pcscd

RUN apt-get update -y --fix-missing && apt-get -yf install   default-jre-headless default-jdk-headless default-jre default-jdk

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
  && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Libraries for Imagemagick
RUN apt-get update && apt-get install -y libmagick++-dev libmagickcore-dev libmagickwand-6-headers libmagickwand-dev --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
RUN unzip chromedriver_linux64.zip
RUN mv chromedriver /usr/bin/chromedriver
RUN chown root:root /usr/bin/chromedriver
RUN chmod +x /usr/bin/chromedriver
RUN wget https://selenium-release.storage.googleapis.com/3.9/selenium-server-standalone-3.9.1.jar
RUN mv selenium-server-standalone-3.9.1.jar /opt/selenium-server-standalone.jar
RUN curl -fLSs https://circle.ci/cli | bash

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm
RUN npm install -g yarn
RUN npm install -g gulp-cli
RUN npm install -g typescript
RUN npm install -g eslint


# Amazon RDS public certificate chain
ADD https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem  /etc/ssl/certs/rds-combined-ca-bundle.pem
RUN chmod 755 /etc/ssl/certs/rds-combined-ca-bundle.pem

RUN printf "\n\nexport COMPOSER_ALLOW_SUPERUSER=1\n" >> $HOME/.bash_profile
RUN curl --silent --show-error https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN export PATH="/var/www/vendor/bin:./bin:$(composer config -g home)/vendor/bin:$PATH"
ENV PATH /var/www/vendor/bin:$PATH:/root/.composer/vendor/bin


# PHP ${PHP_VERSION}
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install -j$(nproc) iconv
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) soap
RUN docker-php-ext-install -j$(nproc) xml
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) pdo
RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN docker-php-ext-install -j$(nproc) opcache
RUN pear update-channels
#RUN pear upgrade pear/archive_tar

# Uploadprogress.
RUN mkdir -p /usr/src/php/ext/uploadprogress; \
    up_url="https://github.com/wodby/pecl-php-uploadprogress/archive/latest.tar.gz"; \
    wget -qO- "${up_url}" | tar xz --strip-components=1 -C /usr/src/php/ext/uploadprogress; \
    docker-php-ext-install uploadprogress;

RUN pecl install imagick \
    && docker-php-ext-enable imagick
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd
# as of 2019-AUG-06 drupal redis module didn't work with redis 5
RUN pecl install redis-4.3.0 \
    && docker-php-ext-enable redis

RUN composer global require drupal/coder
RUN composer global require friendsofphp/php-cs-fixer
RUN composer global require squizlabs/php_codesniffer

RUN echo ${CODELINT} >> /root/.bashrc
RUN echo ${CODELINT_FIX} >> /root/.bashrc

RUN ln -s ~/.composer/vendor/drupal/coder/coder_sniffer/Drupal ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards/Drupal
RUN ln -s ~/.composer/vendor/drupal/coder/coder_sniffer/DrupalPractice ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards/DrupalPractice

COPY php/overrides.ini /usr/local/etc/php-fpm.d
COPY php/php.ini /usr/local/etc/php
COPY php/overrides.ini /usr/local/etc/php/conf.d

RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
  && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8


RUN echo "env[LC_ALL] = \$LC_ALL" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[ENV] = \$ENV" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_DRIVER] = \$DB_DRIVER" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_HOST] = \$DB_HOST" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_NAME] = \$DB_NAME" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_USER] = \$DB_USER" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_PASSWORD] = \$DB_PASSWORD" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DB_PORT] = \$DB_PORT" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DRUPAL_HASH_SALT] = \$DRUPAL_HASH_SALT" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[CACHE_HOST] = \$CACHE_HOST" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[CACHE_PORT] = \$CACHE_PORT" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DRUSH_OPTIONS_URI] = \$DRUSH_OPTIONS_URI" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[PREPROCESS_CSS] = \$PREPROCESS_CSS" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[PREPROCESS_JS] = \$PREPROCESS_JS" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[PHP_IDE_CONFIG] = \$PHP_IDE_CONFIG" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "env[DRUPAL_SYSTEM_LOGGING_ERROR_LEVEL] = \$DRUPAL_SYSTEM_LOGGING_ERROR_LEVEL" >> /usr/local/etc/php-fpm.d/www.conf
RUN echo "session.save_handler = redis" >> /usr/local/etc/php/conf.d/docker-php-ext-redis.ini
RUN echo "session.save_path = tcp://\$REDIS_HOST:\$REDIS_PORT" >> /usr/local/etc/php/conf.d/docker-php-ext-redis.ini


RUN echo "export LC_ALL=en_US.UTF-8" >> ~/.bashrc
RUN echo "export LANG=en_US.UTF-8" >> ~/.bashrc
RUN echo "export LANGUAGE=en_US.UTF-8" >> ~/.bashrc

COPY init /opt/init
RUN chmod +x /opt/init
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

## these are used if the container is NOT going to share a filesystem with the host e.g. remote stack deploy
#RUN composer install
#RUN mkdir -p /tmp/www/web/sites/default/files
#RUN mkdir -p /tmp/www/web/sites/default/private
#RUN mkdir -p /tmp/www/web/sites/default/temp
#RUN chmod 755 /tmp/www/web/sites/default
#RUN chmod 755 /tmp/www/web/sites/default/files
#RUN chmod 755 /tmp/www/web/sites/default/temp
#RUN chmod 755 /tmp/www/web/sites/default/private
#RUN chown -R www-data:www-data /tmp/www/html/sites/default
#RUN touch /tmp/www/web/sites/default/files/.htaccess
#RUN touch /tmp/www/web/sites/default/private/.htaccess
#RUN touch /tmp/www/web/sites/default/temp/.htaccess
#RUN chown www-data:www-data /tmp/www/web/sites/default/files/.htaccess
#RUN chown www-data:www-data /tmp/www/web/sites/default/private/.htaccess
#RUN chown www-data:www-data /tmp/www/web/sites/default/temp/.htaccess
#RUN chown www-data:www-data /tmp/www/vendor
#RUN touch /tmp/www/.env

STOPSIGNAL SIGQUIT

WORKDIR /var/www

EXPOSE 9000
ENTRYPOINT [ "/docker-entrypoint.sh"]
CMD [ "/usr/bin/supervisord" ]
