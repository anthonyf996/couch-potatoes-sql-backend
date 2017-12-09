'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'Like' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Like VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });

      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Like WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });

      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'UPDATE Like SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
      });
    });
};
