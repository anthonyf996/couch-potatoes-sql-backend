'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'Report' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Report VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val().timestamp, snapshot2.val().reason ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val().timestamp + " for " + snapshot2.val().reason );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Report WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Report SET timestamp = ?, reason = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val().timestamp, snapshot2.val().reason, snapshot.key, snapshot2.key ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val().timestamp + " and reason is " + snapshot2.val().reason );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });
};
