FROM mhart/alpine-node:12

VOLUME ["/var/www"]
WORKDIR var/www

RUN npm install
RUN npm install -g webpack webpack-cli webpack-dev-server gulp gulp-cli
RUN npm rebuild node-sass

CMD gulp watch

#webpack-dev-server --config config/node/webpack.config.dev.ts
