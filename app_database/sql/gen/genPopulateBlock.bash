#!/bin/bash

outfile="../populate/populateBlock.sql"
homeDir="../../.."
genRandSQL="$homeDir/cpp/genRandSQL"
numRows=400
randStart=0
tableName="Block"
randDataDir="$homeDir/random_data"
userIDs="$randDataDir/user_id_hash.csv"
timestamps="$homeDir/txt/timestamp.txt"

$genRandSQL $numRows $randStart $tableName $userIDs $userIDs $timestamps > $outfile
