'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'User_Interest' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'User_Interest/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_added', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'INSERT INTO User_Interest_Subcategory VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot3.key, snapshot3.val() ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_removed', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'DELETE FROM User_Interest_Subcategory WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_changed', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'UPDATE User_Interest_Subcategory SET preference = ? WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot3.val(), snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

      });
    });
};
