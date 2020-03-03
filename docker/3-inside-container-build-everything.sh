fix_domain() {
  [[ -f /configs/DOMAIN ]] && {
    d=$(cat /configs/DOMAIN)
    echo "setting domain: $d for file $1"
    python -c 'import re; print re.sub("http://localhost:3002", "https://api.'${d}'", open("'"$1"'").read())' > "$1.tempfix"
    rm "$1"
    mv "$1.tempfix" "$1"
  }
}

fix_domain /project/client/src/App.js

time su -c "cd /project/client && npm run build" fo 

mv /var/www/html /var/www/html-oldnode
ln -s /project/client/build /var/www/html
#fo-fix-dir-ownership /var/www/html
#cp /configs/config.js.template /project/src/config.js

fo-fix-dir-ownership /etc/nginx/conf.d/
#fo-fix-dir-ownership /project/src/


do-default 

touch /should-not-chown-finally