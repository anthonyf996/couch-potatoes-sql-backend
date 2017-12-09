'use strict';

// Add User listeners
var addUserListeners = require( './addUserListeners' );
// Add Partner_Preference listeners
var addPartnerPrefListeners = require( './addPartnerPrefListeners' );
// Add Interest listeners
var addInterestListeners = require( './addInterestListeners' );
// Add Interest_Subcategory listeners
var addInterestSubcategoryListeners = require( './addInterestSubcategoryListeners' );
// Add User_Interest listeners
var addUserInterestListeners = require( './addUserInterestListeners' );
// Add Date listeners
var addDateListeners = require( './addDateListeners' );
// Add Befriend listeners
var addBefriendListeners = require( './addBefriendListeners' );
// Add Like listeners
var addLikeListeners = require( './addLikeListeners' );
// Add Dislike listeners
var addDislikeListeners = require( './addDislikeListeners' );
// Add Block listeners
var addBlockListeners = require( './addBlockListeners' );
// Add Report listeners
var addReportListeners = require( './addReportListeners' );

module.exports = ( firebaseDB, sqliteEnv ) => {
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
