#!/bin/bash

# Clean Build
build(){
mvn -Pprod clean package -DskipTests
yarn build
}

# Deploy to test

totest(){
scp target/AmenSupermarketServer.jar root@host.gahano.at:/var/www/vhosts/amen-supermarket.at/dev.amen-supermarket.at/.
rsync -azr target/www/* root@host.gahano.at:/var/www/vhosts/amen-supermarket.at/dev.amen-supermarket.at/.
}

# Deploy to prod

toprod(){
scp target/AmenSupermarketServer.jar root@host.gahano.at:/opt/webservices/amen/.
rsync -azr target/www/* root@host.gahano.at:/var/www/vhosts/amen-supermarket.at/httpdocs/.
}


case "$1" in
 build)
	build
   ;;
 totest)
	totest
   ;;
 toprod)
	toprod
   ;;
 buildtest)
	build
	totest
	;;
 buildprod)
	build
	toprod
	;;
 buildall)
	build
	totest
	toprod
	;;
 *)
   echo "Usage: deploy {biuld|buildall|buildtest|buildprod|totest|toprod}" >&2
   exit 3
   ;;
esac
