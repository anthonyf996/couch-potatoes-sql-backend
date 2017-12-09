'use strict';

// Location of modules that find potential matches ( date or friend ) for a 
// user of the app.
var potentMatchDir = '../potential_matches/';

// Module that updates list of potential date matches for a given user.
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );

// Module that updates list of potential friend matches for a given user.
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    // Add listener to add new data to the corresponding table in the SQL database.
    firebaseDB.ref( 'User_Interest' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'User_Interest/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_added', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'INSERT INTO User_Interest_Subcategory VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot3.key, snapshot3.val() ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " inserted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

    // Add listener to remove data from the corresponding table in the SQL database.
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_removed', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'DELETE FROM User_Interest_Subcategory WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " deleted successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

    // Add listener to update data in the corresponding table in the SQL database.
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_changed', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'UPDATE User_Interest_Subcategory SET preference = ? WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot3.val(), snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " updated successfully." );

        // Update lists of potential dates and friends for the user involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

      });
    });
};
