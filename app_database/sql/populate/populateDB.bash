#!/bin/bash

if [ $# != 1 ]
then
	echo "Usage: ( Database )"
else
	populateUser="./populateUser.sql"
	populateInterest="./populateInterest.sql"
	populateInterestSubcategory="./populateInterestSubcategory.sql"
	populateUserInterestSubcategory="./populateUserInterestSubcategory.sql"
	populatePartnerPreferenceGender="./populatePartnerPreferenceGender.sql"
	populateDate="./populateDate.sql"
	populateBefriend="./populateBefriend.sql"
	populateLike="./populateLike.sql"
	populateDislike="./populateDislike.sql"
	populateBlock="./populateBlock.sql"
	populateReport="./populateReport.sql"

	sqlite3 $1 < $populateUser
	sqlite3 $1 < $populateInterest
	sqlite3 $1 < $populateInterestSubcategory
	sqlite3 $1 < $populateUserInterestSubcategory
	sqlite3 $1 < $populatePartnerPreferenceGender
	sqlite3 $1 < $populateDate
	sqlite3 $1 < $populateBefriend
	sqlite3 $1 < $populateLike
	sqlite3 $1 < $populateDislike
	sqlite3 $1 < $populateBlock
	sqlite3 $1 < $populateReport
fi
