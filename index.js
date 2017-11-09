'use strict'

const sqliteEnv = require( './app_modules/sqlite_env' );
const firebaseEnv = require( './app_modules/firebase_env' );
const appEnv = require( './app_modules/app_env' );

//const initAppDB = require( './init_app_db' );

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

// Synchronize both databases
appEnv.syncDB( firebaseEnv.db, sqliteEnv.db );

// Check to initialize Firebase database
/*
firebaseDB.ref().once( 'value', function( snapshot ) {
  // Database is likely empty if not exists
  //( !snapshot.hasChild( 'User' ) ) ? console.log( "EMPTY" ) : console.log( "NOT E" );

  // Database is empty if true, but performance heavy
  //( !snapshot.numChildren() ) ? console.log( "EMPTY" ) : console.log( "NOT E" );
  //( !snapshot.numChildren() ) ? initAppDB( firebaseDB, sqlDB, prepopulateDB ) : false;
});
*/
