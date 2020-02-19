FROM solr:7.7

USER root

RUN apt-get update && \
  apt-get install -y --fix-missing make \
        supervisor \
        curl \
        vim \
        procps \
        apt-utils \
        zip \
        sudo

RUN set -ex
RUN mkdir -p /opt/solr/server/solr/mycores/milken/data
RUN chmod -R 777 /opt/solr/server/solr/mycores/milken
RUN mkdir -p /opt/solr/server/solr/configsets/_default/conf

COPY ./7.x/* /opt/solr/server/solr/configsets/_default/conf/
COPY bin/init_solr /docker-entrypoint-initdb.d/
COPY bin/actions.mk /usr/local/bin/actions.mk
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN echo "export PATH=/usr/local/openjdk-11:$PATH" >> /opt/solr/.bashrc
RUN echo "export PATH=/usr/local/openjdk-11:$PATH" >> /root/.bashrc

EXPOSE 8983
WORKDIR /opt/solr

CMD [ "/usr/bin/supervisord" ]
