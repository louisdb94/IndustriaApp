### STAGE 1: Build ###
FROM node:8-alpine as builder

ARG NODE_ENV
ARG APP_URL
ENV NODE_ENV $NODE_ENV
ENV APP_URL $APP_URL

RUN mkdir /app

# Install all the dependencies
RUN apk add --update bash \
	certbot \
    openssl openssl-dev ca-certificates \
    tar \
    git \
    && apk add --no-cache gettext \
	openssl openssl-dev ca-certificates \
	&& rm -rf /var/cache/apk/*

# RUN apk --update add curl ca-certificates tar && \
#     curl -Ls https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.26-r0/glibc-2.26-r0.apk > /tmp/glibc-2.26-r0.apk && \
#     apk add --allow-untrusted /tmp/glibc-2.26-r0.apk \
# 		&& rm -rf /var/cache/apk/* && rm /tmp/glibc*

WORKDIR /app
# ADD package.json  /app/
COPY package.json package.json

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

RUN npm install --silent

COPY . .

# ADD dist/public /app
# ADD dist/server /app


COPY entrypoint.sh /opt/entrypoint.sh

RUN chmod -R 700 /opt/*

# forward request and error logs to docker log collector
# RUN ln -sf /dev/stdout /var/log/nginx/access.log
# RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Configure nginx
# RUN apk add --no-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing  vips-tools vips-dev fftw-dev glib-dev --update-cache
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*
RUN apk update
RUN apk add nginx

# RUN mkdir -p /run/nginx

# used for webroot reauth
RUN mkdir -p /etc/letsencrypt/webrootauth


# RUN adduser -g 'Nginx www user' -h /home/www/ wwwcbz
ADD nginx /templates
ADD uploads /app/dist/server/uploads
ADD saml2 /app/dist/server/saml2

EXPOSE 80

VOLUME ["/app/dist/server/uploads"]
VOLUME ["/etc/letsencrypt"]
#create angular build and move to dist folder
RUN npm run prod

ENTRYPOINT ["/opt/entrypoint.sh"]

# CMD ["node", "/app/dist/server/app.js"]
