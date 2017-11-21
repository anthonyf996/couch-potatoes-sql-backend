#!/bin/bash

tablesDir="../tables/"
genDir="../gen"
outfile="insertTables.sql"

cd $tablesDir && cat *.sql > $genDir/$outfile && cd $genDir/
