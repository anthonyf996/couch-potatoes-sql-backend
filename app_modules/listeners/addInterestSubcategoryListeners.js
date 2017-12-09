'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'Interest_Subcategory' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Interest_Subcategory VALUES ( ?, ? )', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " inserted successfully." );
      });

      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Interest_Subcategory WHERE category = ? AND subcategory = ?', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " deleted successfully." );
      });

    });
};
