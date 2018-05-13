#!/bin/sh

# Validate environment variables

MISSING=""

[ -z "${APP_URL}" ] && MISSING="${MISSING} APP_URL"
[ -z "${APP_EMAIL}" ] && MISSING="${MISSING} APP_EMAIL"

if [ "${MISSING}" != "" ]; then
  echo "Missing required environment variables:" >&2
  echo " ${MISSING}" >&2
  exit 1 
fi

# Generate strong DH parameters for nginx, if they don't already exist.
if [ ! -f /etc/ssl/dhparams.pem ]; then
  if [ -f /cache/dhparams.pem ]; then
    cp /cache/dhparams.pem /etc/ssl/dhparams.pem
  else
    openssl dhparam -out /etc/ssl/dhparams.pem 2048
    # Cache to a volume for next time?
    if [ -d /cache ]; then
      cp /etc/ssl/dhparams.pem /cache/dhparams.pem
    fi
  fi
fi

#create temp file storage
mkdir -p /var/cache/nginx
chown nginx:nginx /var/cache/nginx

mkdir -p /run/nginx

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
 #overwrite variables in nginx config
envsubst '\$APP_URL' < "$src" > "$dest"

#prepare the letsencrypt command arguments
letscmd="-d $APP_URL "

# # Check if the SAN list has changed
if [ ! -f /etc/letsencrypt/san_list ]; then
 cat <<EOF >/etc/letsencrypt/san_list
 "${APP_URL}"
EOF
  fresh=true
else 
  old_san=$(cat /etc/letsencrypt/san_list)
  if [ "${APP_URL}" != "${old_san}" ]; then
    fresh=true
  else 
    fresh=false
  fi
fi

# Initial certificate request, but skip if cached
if [ $fresh = true ]; then
  echo "The SAN list has changed, removing the old certificate and ask for a new one."
  rm -rf /etc/letsencrypt/{live,archive,keys,renewal}
 
    echo "certbot certonly --preferred-challenges http "${letscmd}" \
  --standalone --text \
  --email "${APP_EMAIL}" --agree-tos --expand " > /etc/nginx/lets
  
  echo "Running initial certificate request... "

  chmod +x /etc/nginx/lets

  /bin/bash /etc/nginx/lets
fi

#update the stored SAN list
echo "${APP_URL}" > /etc/letsencrypt/san_list

#Create the renewal directory (containing well-known challenges)
mkdir -p /etc/letsencrypt/webrootauth/

# Template a cronjob to renew certificate with the webroot authenticator
echo "Creating a cron job to keep the certificate updated"
  cat <<EOF >/etc/periodic/weekly/renew
#!/bin/sh
# First renew certificate, then reload nginx config
certbot renew --webroot --webroot-path /app/dist/public/ --post-hook "/usr/sbin/nginx -s reload"
EOF

chmod +x /etc/periodic/weekly/renew


echo "before start server"

# Kick off cron to reissue certificates as required
# Background the process and log to stderr
/usr/sbin/crond -f -d 8 &

cd "/app"
node dist/server/app.js  > stdout.txt 2> stderr.txt &


echo "Ready"

# Launch nginx in the foreground
/usr/sbin/nginx -g "daemon off;"




