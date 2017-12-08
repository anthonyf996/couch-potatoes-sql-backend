'use strict';

var homeDir = '../';

const sqliteEnv = require( homeDir + 'app_modules/sqlite_env' );
const firebaseEnv = require( homeDir + 'app_modules/firebase_env' );
const appEnv = require( homeDir + 'app_modules/app_env' );
const readFileToArray = require( homeDir + 'app_modules/readFileToArray' );

sqliteEnv.dbPath = 
homeDir + 'app_database/app.db';
firebaseEnv.cred = 
homeDir + '../credentials/couch-potatoes-47758-firebase-adminsdk-t7w2b-a91c122945.json';
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

var randDataDir = '../random_data/';

var academia = readFileToArray( randDataDir + 'user_interest_subcategory/Academia_1000.txt' );
var food = readFileToArray( randDataDir + 'user_interest_subcategory/Food_1000.txt' );
var game = readFileToArray( randDataDir + 'user_interest_subcategory/Game_1000.txt' );
var literature = readFileToArray( randDataDir + 'user_interest_subcategory/Literature_1000.txt' );
var movie = readFileToArray( randDataDir + 'user_interest_subcategory/Movie_1000.txt' );
var music = readFileToArray( randDataDir + 'user_interest_subcategory/Music_1000.txt' );
var recreation = readFileToArray( randDataDir + 'user_interest_subcategory/Recreation_1000.txt' );
var sport = readFileToArray( randDataDir + 'user_interest_subcategory/Sport_1000.txt' );
var tv = readFileToArray( randDataDir + 'user_interest_subcategory/TV_1000.txt' );

var preference_1 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_1_1000.txt' );
var preference_2 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_2_1000.txt' );
var preference_3 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_3_1000.txt' );
var preference_4 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_4_1000.txt' );
var preference_5 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_5_1000.txt' );
var preference_6 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_6_1000.txt' );
var preference_7 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_7_1000.txt' );
var preference_8 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_8_1000.txt' );
var preference_9 = readFileToArray( randDataDir + 'user_interest_subcategory/pref_9_1000.txt' );

var user_id_1 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_1_1000.txt' );
var user_id_2 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_2_1000.txt' );
var user_id_3 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_3_1000.txt' );
var user_id_4 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_4_1000.txt' );
var user_id_5 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_5_1000.txt' );
var user_id_6 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_6_1000.txt' );
var user_id_7 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_7_1000.txt' );
var user_id_8 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_8_1000.txt' );
var user_id_9 = readFileToArray( randDataDir + 'user_interest_subcategory/user_id_9_1000.txt' );

appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_1,
				'Academia', academia, preference_1 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_2,
				'Food', food, preference_2 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_3,
				'Game', game, preference_3 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_4,
				'Literature', literature, preference_4 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_5,
				'Movie', movie, preference_5 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_6,
				'Music', music, preference_6 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_7,
				'Recreation', recreation, preference_7 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_8,
				'Sport', sport, preference_8 );
appEnv.populateUserInterest( firebaseEnv.db, "User_Interest/", 1000, user_id_9,
				'TV', tv, preference_9 );
