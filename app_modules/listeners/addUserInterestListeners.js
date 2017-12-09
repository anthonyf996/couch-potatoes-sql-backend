'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'User_Interest' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'User_Interest/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_added', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'INSERT INTO User_Interest_Subcategory VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot3.key, snapshot3.val() ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_removed', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'DELETE FROM User_Interest_Subcategory WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_changed', function ( snapshot3 ) {
          sqliteEnv.sqlQuery( 'UPDATE User_Interest_Subcategory SET preference = ? WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot3.val(), snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteEnv, 'User_Potential_Date/', snapshot.key );
        updatePotentFriends( firebaseDB, sqliteEnv, 'User_Potential_Friend/', snapshot.key );
        });

      });
    });
};
