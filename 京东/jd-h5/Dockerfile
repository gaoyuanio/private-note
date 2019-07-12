FROM nginx:alpine

EXPOSE 80
EXPOSE 22

COPY ./config/setenv.sh /root
RUN chmod +x /root/setenv.sh

RUN mkdir -p /app/www

COPY ./ /app/www/

RUN rm -rf /etc/nginx/conf.d/default.conf

CMD ["/root/setenv.sh"]
