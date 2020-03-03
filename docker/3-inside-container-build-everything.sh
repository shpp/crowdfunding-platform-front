time su -c "cd /project/site && npm run build" fo

mv /var/www/html /var/www/html-oldnode
ln -s /project/site/build /var/www/html

fo-fix-dir-ownership /etc/nginx/conf.d/

do-default

touch /should-not-chown-finally
