FROM httpd:alpine3.14

COPY ./docker/web/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./docker/web/vhosts.conf /usr/local/apache2/conf/extra/httpd-vhosts.conf

CMD /usr/local/apache2/bin/apachectl -D FOREGROUND