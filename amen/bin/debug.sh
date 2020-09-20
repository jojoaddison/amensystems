#!/bin/bash
# AmenSupermarketServer debug launch script
# The script assumes the installation of a compatible java version
# The AmenSupermarketServer.jar is compiled with java 1.8.0.65
# The AmenSupermarketServer.jar requires java 1.8.0.65 or better

# Make sure prerequisite environment variables are set

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
    exit 1
  fi

fi
cd $AMENSUPERMARKET_HOME
java\
 -Xdebug -Xrunjdwp:transport=dt_socket,address=8998,server=y,suspend=n\
 -jar AmenSupermarketServer.jar
