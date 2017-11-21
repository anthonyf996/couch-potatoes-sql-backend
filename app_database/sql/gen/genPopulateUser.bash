#!/bin/bash

outfile="../populate/populateUser.sql"
homeDir="../../.."
genRandSQL="$homeDir/cpp/genRandSQL"
numRows=1000
randStart=1
tableName="User"
randDataDir="$homeDir/random_data"
userIDs="$randDataDir/user_id_hash.csv"
birthDates="$randDataDir/birth_date.csv"
genders="$randDataDir/gender.csv"
cities="$randDataDir/city.csv"
states="$randDataDir/state.csv"
countries="$randDataDir/country.csv"
latitudes="$randDataDir/latitude.csv"
longitudes="$randDataDir/longitude.csv"
locked="$homeDir/txt/locked.txt"
suspended="$homeDir/txt/suspended.txt"


$genRandSQL $numRows $randStart $tableName $userIDs $birthDates $genders $cities $states $countries $latitudes $longitudes $locked $suspended > $outfile
