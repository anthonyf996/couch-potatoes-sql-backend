'use strict';

const sqliteEnv = require( './app_modules/sqlite_env' );
const firebaseEnv = require( './app_modules/firebase_env' );
const appEnv = require( './app_modules/app_env' );
const readFileToArray = require( './app_modules/readFileToArray' );

sqliteEnv.dbPath = 
'./app_database/app.db';
firebaseEnv.cred = 
'../../credentials/couch-potatoes-47758-firebase-adminsdk-t7w2b-a91c122945.json';
firebaseEnv.url = 
'https://couch-potatoes-47758.firebaseio.com';

const prepopulateDB = true;
const verbose = true;

// Connect to SQL database
sqliteEnv.connect();

( verbose && sqliteEnv.db ) ?
  console.log( 'Connected to database "' + sqliteEnv.dbPath + '".' ) :
  console.log( 'Could not connect to database "' + sqliteEnv.dbPath + '".' );

// Connect to Firebase database
firebaseEnv.connect();

( verbose && firebaseEnv.db ) ?
  console.log( 'Connected to Firebase database.' ) :
  console.log( 'Could not connect to Firebase database.' );

var randDataDir = './random_data/';

var user_id = readFileToArray( randDataDir + '/user_id_hash.csv' );
var min_age = readFileToArray( randDataDir + 'partner_preference/min_age.csv' );
var max_age = readFileToArray( randDataDir + 'partner_preference/max_age.csv' );
var gender = readFileToArray( randDataDir + 'partner_preference/gender.csv' );

appEnv.populatePartnerPreference( firebaseEnv.db, 'Partner_Preference/', 1000,
					user_id, min_age, max_age, gender );
