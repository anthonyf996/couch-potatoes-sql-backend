#!/bin/bash

outfile="../populate/populateReport.sql"
homeDir="../../.."
genRandSQL="$homeDir/cpp/genRandSQL"
numRows=400
randStart=0
tableName="Report"
randDataDir="$homeDir/random_data"
userIDs="$randDataDir/user_id_hash.csv"
timestamps="$homeDir/txt/timestamp.txt"
reasons="$homeDir/txt/reason.txt"

$genRandSQL $numRows $randStart $tableName $userIDs $userIDs $timestamps $reasons > $outfile
