'use strict';

// Location of modules that find potential matches ( date or friend ) for a 
// user of the app.
var potentMatchDir = '../potential_matches/';

// Module that updates list of potential date matches for a given user.
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );

// Module that updates list of potential friend matches for a given user.
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );


module.exports = ( firebaseDB, sqliteEnv ) => {
//  firebaseDB.ref( 'Partner_Preference' ).on( 'value', function ( snapshot ) {
//    if ( !firebaseDB.ref( 'Partner_Preference/' + snapshot.key ) ) {
//      sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
//    }
//  });

// TEMPORARY TODO REMOVE DEFAULT MIN AND MAX AGE LATER

    // Add listener to add new data to the corresponding table in the SQL database.
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_added', function ( snapshot ) {
      //sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
      sqliteEnv.sqlQuery( 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, 18, 200 ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );

    // Add listener to add new data to the corresponding table in the SQL database.
      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Partner_Preference_Gender VALUES ( ?, ? )', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " inserted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });

    // Add listener to remove data from the corresponding table in the SQL database.
      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Partner_Preference_Gender WHERE user_id = ? AND gender = ?', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " deleted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });
    });

    // Add listener to update data in the corresponding table in the SQL database.
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_changed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'UPDATE Partner_Preference SET min_age = ?, max_age = ? WHERE user_id = ?', [ snapshot.val().min_age, snapshot.val().max_age, snapshot.key ], "Partner_Preference for User " + snapshot.key + " updated successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });

    // Add listener to remove data from the corresponding table in the SQL database.
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_removed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'DELETE FROM Partner_Preference WHERE user_id = ?', [ snapshot.key ], "Partner_Preference for User " + snapshot.key + " deleted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
    });
};
