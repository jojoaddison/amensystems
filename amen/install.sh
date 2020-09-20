#!/bin/bash 
# AmenSupermarketServer install script

# Export AMENSUPERMARKET_HOME
AMENSUPERMARKET_HOME=`pwd`
export AMENSUPERMARKET_HOME
systemctl set-environment AMENSUPERMARKET_HOME=$AMENSUPERMARKET_HOME
echo "AMENSUPERMARKET_HOME: "; systemctl show-environment | grep AMENSUPERMARKET_HOME

# Setup log directory
LOG_DIR="/var/log/amensupermarket"

if [ ! -d $LOG_DIR ]; then
	mkdir -p $LOG_DIR
fi

# Setup logs link
logs="$AMENSUPERMARKET_HOME/logs"
if [ ! -d  $logs ]; then
	ln -s $LOG_DIR logs
fi

# Setup service script
if [ -L '/etc/init.d/amensupermarketserver' ]; then
	rm -f /etc/init.d/amensupermarketserver
	update-rc.d -f amensupermarketserver remove 
fi

ln -s $AMENSUPERMARKET_HOME/bin/amensupermarketserver.sh /etc/init.d/amensupermarketserver
chmod +x /etc/init.d/amensupermarketserver

update-rc.d amensupermarketserver defaults

sleep 1

service amensupermarketserver stop
service amensupermarketserver start
service amensupermarketserver status
