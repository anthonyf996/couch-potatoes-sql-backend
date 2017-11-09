#!/bin/bash

if [ $# != 1 ]
then
	echo "Usage: ( Database )"
else
	insertTables="./insertTables.sql"

	sqlite3 $1 < $insertTables
fi
