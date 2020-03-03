#do-default 

fo-fix-dir-ownership /project

cd /project/client && time su -c "cd /project/client && npm install --loglevel verbose" fo
cd /project/server && time su -c "cd /project/server && npm install --loglevel verbose" fo
