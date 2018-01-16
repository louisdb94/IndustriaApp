### STAGE 1: Build ###
FROM node:8-alpine as builder

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app

WORKDIR /app
ADD package.json  /app/

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install

ADD . /app

COPY entrypoint.sh /opt/entrypoint.sh

RUN chmod -R 700 /opt/*

# Configure nginx
# RUN apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing  vips-tools vips-dev fftw-dev glib-dev --update-cache
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*
RUN apk update
RUN apk add nginx

RUN mkdir -p /run/nginx

# RUN adduser -g 'Nginx www user' -h /home/www/ wwwcbz
ADD nginx /templates

EXPOSE 80
ENTRYPOINT ["/opt/entrypoint.sh"]


