'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'Block' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Block VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });

      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Block WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });

      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'UPDATE Block SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });
    });
};
