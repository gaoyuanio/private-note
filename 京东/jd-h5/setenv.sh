#! /bin/sh -e
echo "setting environment config"
echo "$ARTEMIS_WS_URL"
echo "$ARTEMIS_URL"
echo "$BRMS_URL"
cat >> /app/www/scripts/app.constants.js <<EOF
angular.module('HLYAdminWebApp').constant('ServiceBaseURL', '$ARTEMIS_URL').constant('SocketBaseURL', '$ARTEMIS_WS_URL');
EOF
cat >> /etc/nginx/conf.d/hly-admin.conf <<EOF
server {
    listen      80;
    server_name   jdstage.huilianyi.com;
    location / {
        try_files \$uri /index.html;
        root /app/www/;
    }
    location /oauth/ {
        proxy_pass http://apistage.huilianyi.com/oauth/;
        proxy_set_header Host \$host;
    }
    location /api/ {
        proxy_pass http://apistage.huilianyi.com/api/;
        proxy_set_header Host \$host;
        client_max_body_size 10m;
    }

    location /oauth/token {
               proxy_pass http://apistage.huilianyi.com/oauth/token;
     }

    location /api/ {
           proxy_pass http://apistage.huilianyi.com/jd/api/;
    }

    location /jd {
           proxy_pass              https://router.jd.com/api:443;
           proxy_set_header        X-Real-IP $remote_addr;
           proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
           #proxy_set_header       Via "nginx";
           proxy_set_header        X-Forwarded-Proto https;
    }

   location /jdapi/ {
           proxy_pass https://router.jd.com/api/;

   }

   location /apijd/jd/ {
           proxy_pass http://apistage.huilianyi.com/jd/api/;
   }
}
EOF
echo "starting web server"
nginx -g 'daemon off;'
