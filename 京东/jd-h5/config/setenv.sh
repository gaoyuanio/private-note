#! /bin/sh -e
echo "setting environment config"
echo "$ARTEMIS_URL"
echo "$SERVER_NAME"

cat >> /etc/nginx/conf.d/jd.conf <<EOF
server {
    listen      80;
    server_name   $SERVER_NAME;
    index index.html index.htm index.nginx-debian.html;

    location / {
           try_files \$uri /index.html;
           root /app/www/;
    }

    location /oauth/ {
           proxy_pass $ARTEMIS_URL/oauth/;
    }


    location /jd/api/ {
           proxy_pass $ARTEMIS_URL/jd/api/;
    }

    location /jd/apijd/jd/ {
           proxy_pass $ARTEMIS_URL/jd/api/;
    }
}
EOF

echo "starting JD NGINX Server"

nginx -g 'daemon off;'



