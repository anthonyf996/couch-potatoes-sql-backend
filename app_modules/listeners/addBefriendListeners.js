'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'Befriend' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Befriend VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );

	checkToCreateChat( firebaseDB, 'Befriend/', snapshot.key, snapshot2.key );
      });

      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Befriend WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Befriend SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val() );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });
};
