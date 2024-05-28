FROM node:16

# copy progect files
RUN mkdir -p /var/www/html
COPY / /var/www/html

COPY /docker/start-container.sh /etc/start-container.sh
RUN chmod +x /etc/start-container.sh

WORKDIR /var/www/html

ENTRYPOINT ["/etc/start-container.sh"]
