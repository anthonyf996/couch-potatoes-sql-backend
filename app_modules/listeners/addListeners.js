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

module.exports = ( firebaseDB, sqliteDB ) => {
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
    addUserListeners( firebaseDB, sqliteDB );

    // Add Partner_Preference listeners
    addPartnerPrefListeners( firebaseDB, sqliteDB );

    // Add Interest listeners
    addInterestListeners( firebaseDB, sqliteDB );

    // Add Interest_Subcategory listeners
    addInterestSubcategoryListeners( firebaseDB, sqliteDB );

    // Add User_Interest listeners
    addUserInterestListeners( firebaseDB, sqliteDB );

    // Add Date listeners
    addDateListeners( firebaseDB, sqliteDB );

    // Add Befriend listeners
    addBefriendListeners( firebaseDB, sqliteDB );

    // Add Like listeners
    addLikeListeners( firebaseDB, sqliteDB );

    // Add Dislike listeners
    addDislikeListeners( firebaseDB, sqliteDB );

    // Add Block listeners
    addBlockListeners( firebaseDB, sqliteDB );

    // Add Report listeners
    addReportListeners( firebaseDB, sqliteDB );
  }
};
