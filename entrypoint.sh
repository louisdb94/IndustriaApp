#!/bin/sh

#create temp file storage
mkdir -p /var/cache/nginx
chown nginx:nginx /var/cache/nginx

mkdir -p /var/tmp/nginx
chown nginx:nginx /var/tmp/nginx

#create vhost directory
mkdir -p /etc/nginx/vhosts/

# Process the nginx.conf with raw values
dest="/etc/nginx/nginx.conf"
cat /templates/nginx.conf > "$dest"

# Process template
dest="/etc/nginx/vhosts/industria.conf"
src="/templates/vhost.sample.conf"

cat "$src" > "$dest"

# Launch nginx in the foreground
/usr/sbin/nginx -g "daemon off;"



cd "/app"
npm run prod

echo "Ready"
