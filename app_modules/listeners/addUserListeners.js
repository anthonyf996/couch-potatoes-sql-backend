'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'User' ).on( 'child_added', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'INSERT INTO User VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [ snapshot.key, snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended ], "User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });

    firebaseDB.ref( 'User' ).on( 'child_changed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'UPDATE User SET birth_date = ?, gender = ?, city = ?, state = ?, country = ?, latitude = ?, longitude = ?, locked = ?, suspended = ? WHERE user_id = ?', [ snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended, snapshot.key ], "User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });

    firebaseDB.ref( 'User' ).on( 'child_removed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'DELETE FROM User WHERE user_id =  ?', [ snapshot.key ], "User " + snapshot.key + " deleted successfully." );
      // TODO Update All Potential Dates and Friends
    });
};
