'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );
var listenersDir = './';
var checkToCreateChat = require( listenersDir + 'checkToCreateChat' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'Date' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Date VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );

	checkToCreateChat( firebaseDB, 'Date/', snapshot.key, snapshot2.key );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Date WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'UPDATE Date SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val() );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot2.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot2.key );
      });
    });
};
