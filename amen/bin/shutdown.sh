#! /bin/bash
# AmenSupermarketServer shutdown script
# Make sure prerequisite environment variables are set

amensupermarket_pid(){
echo `ps aux | grep AmenSupermarketServer.jar | grep -v grep | awk '{ print $2 }'`
}

pid=$(amensupermarket_pid)
if [ -n "$pid" ]; then
echo "stopping AmenSupermarketServer:$pid"
kill -9 $pid
sleep 5
else
echo "AmenSupermarketServer is not running"
fi