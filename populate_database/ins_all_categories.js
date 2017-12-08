'use strict';

var homeDir = '../';

const sqliteEnv = require( homeDir + 'app_modules/sqlite_env' );
const firebaseEnv = require( homeDir + 'app_modules/firebase_env' );
const appEnv = require( homeDir + 'app_modules/app_env' );

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


var readFileToArray = require( '../app_modules/readFileToArray' );

var academiaPath = '../txt/Academia.txt';
var gamePath = '../txt/Game.txt';
var foodPath = '../txt/Food.txt';
var literaturePath = '../txt/Literature.txt';
var recreationPath = '../txt/Recreation.txt';
var moviePath = '../txt/Movie.txt';
var musicPath = '../txt/Music.txt';
var sportPath = '../txt/Sport.txt';
var tvPath = '../txt/TV.txt';

var interestPath = '../txt/interests.txt';

var academiaCat = readFileToArray( academiaPath );
var gameCat = readFileToArray( gamePath );
var foodCat = readFileToArray( foodPath );
var literatureCat = readFileToArray( literaturePath );
var recreationCat = readFileToArray( recreationPath );
var movieCat = readFileToArray( moviePath );
var musicCat = readFileToArray( musicPath );
var sportCat = readFileToArray( sportPath );
var tvCat = readFileToArray( tvPath );

var interestList = readFileToArray( interestPath );

function addArrayToFirebase ( firebaseDB, dest, array ) {
  //for ( var i = 0; i < array.length; i++ ) {
  //  firebaseDB.ref( dest ).set( array[ i ] );
  //}
  firebaseDB.ref( dest ).set( array );
}

/*
function print ( array ) {
  for ( var i = 0; i < array.length; i++ ) {
    console.log( array[ i ] );
  }
}

print( musicCat );
*/

var interestPath = 'Interest';

addArrayToFirebase( firebaseEnv.db, interestPath, interestList );

var interestSubcatPath = 'Interest_Subcategory/';

addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Academia', academiaCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Game', gameCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Food', foodCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Literature', literatureCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Recreation', recreationCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Movie', movieCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Music', musicCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'Sport', sportCat );
addArrayToFirebase( firebaseEnv.db, interestSubcatPath + 'TV', tvCat );
