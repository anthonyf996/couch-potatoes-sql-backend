#!/bin/bash

if [ $# != 1 ]
then
	echo "Usage: ( Database )"
else
	createTables="./createTables.sql"

	sqlite3 $1 < $createTables
fi
