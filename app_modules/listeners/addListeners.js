'use strict';

var addUserListeners = require( './addUserListeners' );
var addPartnerPrefListeners = require( './addPartnerPrefListeners' );
var addInterestListeners = require( './addInterestListeners' );
var addInterestSubcategoryListeners = require( './addInterestSubcategoryListeners' );
var addUserInterestListeners = require( './addUserInterestListeners' );
var addDateListeners = require( './addDateListeners' );
var addBefriendListeners = require( './addBefriendListeners' );
var addLikeListeners = require( './addLikeListeners' );
var addDislikeListeners = require( './addDislikeListeners' );
var addBlockListeners = require( './addBlockListeners' );
var addReportListeners = require( './addReportListeners' );

module.exports = ( firebaseDB, sqliteEnv ) => {
/*
    let queryLimit = 30;

    let sqlQuery = function ( sqliteDB, query, params, printStmt ) {
      sqliteDB.run( query, params, function ( err ) {
        if ( err ) {
          return console.error( err.message );
        }
        else if ( printStmt ) {
          console.log( printStmt );
        }
      });
    };

    sqlQuery( sqliteDB, 'PRAGMA foreign_keys = ON;', [], 'Foreign Keys = ON' );
*/

    // Add User listeners
    addUserListeners( firebaseDB, sqliteEnv );

    // Add Partner_Preference listeners
    addPartnerPrefListeners( firebaseDB, sqliteEnv );

    // Add Interest listeners
    addInterestListeners( firebaseDB, sqliteEnv );

    // Add Interest_Subcategory listeners
    addInterestSubcategoryListeners( firebaseDB, sqliteEnv );

    // Add User_Interest listeners
    addUserInterestListeners( firebaseDB, sqliteEnv );

    // Add Date listeners
    addDateListeners( firebaseDB, sqliteEnv );

    // Add Befriend listeners
    addBefriendListeners( firebaseDB, sqliteEnv );

    // Add Like listeners
    addLikeListeners( firebaseDB, sqliteEnv );

    // Add Dislike listeners
    addDislikeListeners( firebaseDB, sqliteEnv );

    // Add Block listeners
    addBlockListeners( firebaseDB, sqliteEnv );

    // Add Report listeners
    addReportListeners( firebaseDB, sqliteEnv );
};
