'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'Date' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Date VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );

	checkToCreateChat( firebaseDB, 'Date/', snapshot.key, snapshot2.key );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Date WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Date SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val() );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });
};
