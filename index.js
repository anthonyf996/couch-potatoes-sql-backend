'use strict';

const sqliteEnv = require( './app_modules/sqlite_env' );
const firebaseEnv = require( './app_modules/firebase_env' );
const appEnv = require( './app_modules/app_env' );

// Location of SQL database
const dbPath = './app_database/app.db';

// Firebase project credentials
const cred = '../../credentials/couch-potatoes-47758-firebase-adminsdk-t7w2b-a91c122945.json';

// Firebase project URL
const url = 'https://couch-potatoes-47758.firebaseio.com';

// Connect to SQL database
sqliteEnv.connect( dbPath );

// Log connection status to console
( sqliteEnv.db ) ?
  console.log( 'Connected to database "' + sqliteEnv.dbPath + '".' ) :
  console.log( 'Could not connect to database "' + sqliteEnv.dbPath + '".' );

// Connect to Firebase database
firebaseEnv.connect( cred, url );

// Log connection status to console
( firebaseEnv.db ) ?
  console.log( 'Connected to Firebase database.' ) :
  console.log( 'Could not connect to Firebase database.' );

// Synchronize both databases 
// This is done by adding listeners that listen for changes
// to the Firebase database. Upon firing, the listeners will make the
// corresponding changes to the SQL database
appEnv.syncDB( firebaseEnv.db, sqliteEnv );
