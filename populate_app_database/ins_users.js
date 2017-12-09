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

var userID = readFileToArray( randDataDir + 'user_id_hash.csv' );
var email = readFileToArray( randDataDir + 'email.csv' );
var birthDate = readFileToArray( randDataDir + 'birth_date.csv' );
var firstName = readFileToArray( randDataDir + 'firstname.csv' );
var middleName = readFileToArray( randDataDir + 'middlename.csv' );
var lastName = readFileToArray( randDataDir + 'lastname.csv' );
var gender = readFileToArray( randDataDir + 'gender.csv' );
var city = readFileToArray( randDataDir + 'city.csv' );
var state = readFileToArray( randDataDir + 'state.csv' );
var country = readFileToArray( randDataDir + 'country.csv' );
var latitude = readFileToArray( randDataDir + 'latitude.csv' );
var longitude = readFileToArray( randDataDir + 'longitude.csv' );
var profilePic = readFileToArray( randDataDir + 'profilepics.csv' );

appEnv.populateUser( firebaseEnv.db,  "User", 1000, userID, email, firstName, middleName,
			lastName, birthDate, gender, city, state, country,
			"Test BIO", latitude, longitude, false, false, profilePic );
