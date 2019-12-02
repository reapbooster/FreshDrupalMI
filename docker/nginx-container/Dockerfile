FROM nginx:mainline-perl
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y --fix-missing && apt-get install -y \
      syncthing \
      supervisor \
      curl \
      vim \
      procps \
      apt-utils \
      zip

WORKDIR /tmp

COPY ./nginx /etc/nginx
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

WORKDIR /

EXPOSE 80

STOPSIGNAL SIGTERM

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "/usr/bin/supervisord" ]
