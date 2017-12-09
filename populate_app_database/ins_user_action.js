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

var date_user1_id = readFileToArray( randDataDir + 'user_action/date/user1_id.csv' );
var date_user2_id = readFileToArray( randDataDir + 'user_action/date/user2_id.csv' );
var befriend_user1_id = readFileToArray( randDataDir + 'user_action/befriend/user1_id.csv' );
var befriend_user2_id = readFileToArray( randDataDir + 'user_action/befriend/user2_id.csv' );
var like_user1_id = readFileToArray( randDataDir + 'user_action/like/user1_id.csv' );
var like_user2_id = readFileToArray( randDataDir + 'user_action/like/user2_id.csv' );
var dislike_user1_id = readFileToArray( randDataDir + 'user_action/dislike/user1_id.csv' );
var dislike_user2_id = readFileToArray( randDataDir + 'user_action/dislike/user2_id.csv' );
var block_user1_id = readFileToArray( randDataDir + 'user_action/block/user1_id.csv' );
var block_user2_id = readFileToArray( randDataDir + 'user_action/block/user2_id.csv' );
var report_user1_id = readFileToArray( randDataDir + 'user_action/report/user1_id.csv' );
var report_user2_id = readFileToArray( randDataDir + 'user_action/report/user2_id.csv' );

//appEnv.populatePartnerPreference( firebaseEnv.db, 'Partner_Preference/', 1000,
//					user_id, min_age, max_age, gender );
appEnv.populateUserAction( firebaseEnv.db, 'Date/', 400, date_user1_id, date_user2_id,
				'0000-00-00 00:00:00' );
appEnv.populateUserAction( firebaseEnv.db, 'Befriend/', 400, befriend_user1_id, befriend_user2_id,
				'0000-00-00 00:00:00' );
appEnv.populateUserAction( firebaseEnv.db, 'Like/', 400, like_user1_id, like_user2_id,
				'0000-00-00 00:00:00' );
appEnv.populateUserAction( firebaseEnv.db, 'Dislike/', 400, dislike_user1_id, dislike_user2_id,
				'0000-00-00 00:00:00' );
appEnv.populateUserAction( firebaseEnv.db, 'Block/', 400, block_user1_id, block_user2_id,
				'0000-00-00 00:00:00' );
appEnv.populateUserAction( firebaseEnv.db, 'Report/', 400, report_user1_id, report_user2_id,
				'0000-00-00 00:00:00', 'Test reason' );
