#!/bin/bash
mvn -Pprod clean package -DskipTests
scp target/AmenSupermarketServer.jar jack@dev.gahano.at:/home/jack/amen/.
scp -r target/www/* jack@dev.gahano.at:/home/jack/webroot/amen/dev/.

# Deploy to prod
toprod="";

if [ ! -z "$1" ]; then
toprod=$1
fi

if [ "$toprod" == "-p" ]; then
scp -r target/www/* root@host.gahano.at:/var/www/vhosts/amen-supermarket.at/httpdocs
fi
