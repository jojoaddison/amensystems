#!/bin/bash

# Clean Build
build(){
mvn -Pprod clean package -DskipTests

}

# Deploy to test
totest(){
scp target/AmenSupermarketServer.jar jack@dev.gahano.at:/home/jack/amen/.
scp -r target/www/* jack@dev.gahano.at:/home/jack/webroot/amen/dev/.
}

# Deploy to prod

toprod(){
scp target/AmenSupermarketServer.jar root@host.gahano.at:/opt/webservices/amen/.
scp -r target/www/* root@host.gahano.at:/var/www/vhosts/amen-supermarket.at/httpdocs
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
