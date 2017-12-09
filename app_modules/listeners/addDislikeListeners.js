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
    firebaseDB.ref( 'Dislike' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Dislike VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        // Update lists of potential dates and friends for both users involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });

      // Add listener to remove data from the corresponding table in the SQL database.
      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Dislike WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );

        // Update lists of potential dates and friends for both users involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });

      // Add listener to update data in the corresponding table in the SQL database.
      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'UPDATE Dislike SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );

        // Update lists of potential dates and friends for both users involved
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });
    });
};
