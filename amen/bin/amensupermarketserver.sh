#! /bin/bash
### BEGIN INIT INFO
# Provides: amensupermarketserver 
# Required-Start: $remote_fs $syslog 
# Required-Stop: $remote_fs $syslog 
# Default-Start: 2 3 4 5 
# Default-Stop: 0 1 6 
# Short-Description: AmenSupermarketServer 
# Description: This file starts and stops AmenSupermarket server
# 
### END INIT INFO

# Author: John Kojo Ampia - Addison 
# Email:  jojo@jojoaddison.net

# The script assumes the installation of a compatible java version
# The AmenSupermarketServer.jar is compiled with java 1.8.0.65
# The AmenSupermarketServer.jar requires java 1.8.0.65 or better

# Make sure prerequisite environment variables are set
# AMENSUPERMARKET_HOME is the complete home location path of the AmenSupermarketServer jar file.

echo "AMENSUPERMARKET_HOME: ";systemctl show-environment | grep AMENSUPERMARKET_HOME

if [ -z $AMENSUPERMARKET_HOME ]; then
  #If AMENSUPERMARKET_HOME not set then guess a few locations before giving
  # up and demanding user set it.
  if [ -r AmenSupermarketServer.jar ]; then
     echo "AMENSUPERMARKET_HOME environment variable not found, using current "
     echo "directory.  If not set then running this script from other "
     echo "directories will not work in the future."
     export AMENSUPERMARKET_HOME=`pwd`
  else 
    if [ -r ../AmenSupermarketServer.jar ]; then
      echo "AMENSUPERMARKET_HOME environment variable not found, using current "
      echo "location.  If not set then running this script from other "
      echo "directories will not work in the future."
      export AMENSUPERMARKET_HOME=`pwd`/..
    fi
  fi 

  if [ -z "$AMENSUPERMARKET_HOME" ]; then
    echo "The AMENSUPERMARKET_HOME environment variable is not defined"
    echo "This environment variable is needed to run this program"
    echo "Please set it to the directory where amensupermarketserver was installed"
    echo "Using default amensupermarket home set in amensupermarketserver script!"
    export AMENSUPERMARKET_HOME="/opt/amensupermarket"
	systemctl set-environment AMENSUPERMARKET_HOME=$AMENSUPERMARKET_HOME
	echo "AMENSUPERMARKET_HOME: ";systemctl show-environment | grep AMENSUPERMARKET_HOME
  fi
fi

AMENSUPERMARKET_LOG_FILE=$AMENSUPERMARKET_HOME/logs/amensupermarket.log
export AMENSUPERMARKET_LOG_FILE

TODAY=$(date +"%Y%m%d")

amensupermarket_pid(){
echo `ps aux | grep AmenSupermarketServer.jar | grep -v grep | awk '{ print $2 }'`
}

status(){
pid=$(amensupermarket_pid)
if [ -n "$pid" ];then
echo "AmenSupermarketServer:$pid is running"
else
echo "AmenSupermarketServer is not running"
fi
}


start(){
sh $AMENSUPERMARKET_HOME/bin/startup.sh 2>&1 > $AMENSUPERMARKET_LOG_FILE &
}

amensupermarket_debug(){
exec $AMENSUPERMARKET_HOME/bin/debug.sh 2>&1 > $AMENSUPERMARKET_LOG_FILE &
}

stop(){
pid=$(amensupermarket_pid)
if [ -n "$pid" ];then
exec $AMENSUPERMARKET_HOME/bin/shutdown.sh 2>&1 > /dev/null
else
status
fi
}


case "$1" in
 start)
	start
	status

   ;;
 stop)
	stop
	status

   ;;
 restart)
	stop
	start
	status
   ;;
 status)
	status
	;;
 debug)
	amensupermarket_debug
	status
	;;
 *)
   echo "Usage: amensupermarketserver {start|stop|restart|status|debug}" >&2
   exit 3
   ;;
esac
