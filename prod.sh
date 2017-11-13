#!/bin/bash

#yarn build

cd target/www

#This is the FTP servers host or IP address.
HOST=amen-supermarket.at  
#This is the FTP user that has access to the server.
USER=amen
#This is the password for the FTP user.
PASS=Iflj05&9          

# Call 1. Uses the ftp command with the -inv switches. 
#-i turns off interactive prompting. 
#-n Restrains FTP from attempting the auto-login feature. 
#-v enables verbose and progress. 

ftp -inv $HOST <<EOF
quote user $USER 
quote PASS $PASS
lcd httpdocs
mput *  
quit
exit;
EOF