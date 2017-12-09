'use strict';
var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );


module.exports = ( firebaseDB, sqliteEnv ) => {
//  firebaseDB.ref( 'Partner_Preference' ).on( 'value', function ( snapshot ) {
//    if ( !firebaseDB.ref( 'Partner_Preference/' + snapshot.key ) ) {
//      sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
//    }
//  });

// TEMPORARY TODO REMOVE DEFAULT MIN AND MAX AGE LATER
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_added', function ( snapshot ) {
      //sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
      sqliteEnv.sqlQuery( 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, 18, 200 ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Partner_Preference_Gender VALUES ( ?, ? )', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Partner_Preference_Gender WHERE user_id = ? AND gender = ?', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_changed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'UPDATE Partner_Preference SET min_age = ?, max_age = ? WHERE user_id = ?', [ snapshot.val().min_age, snapshot.val().max_age, snapshot.key ], "Partner_Preference for User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_removed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'DELETE FROM Partner_Preference WHERE user_id = ?', [ snapshot.key ], "Partner_Preference for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });
};
