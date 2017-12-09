'use strict';

var potentMatchDir = '../potential_matches/';
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    firebaseDB.ref( 'Interest' ).on( 'child_added', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'INSERT INTO Interest VALUES ( ? )', [ snapshot.val() ], "Interest " + snapshot.val() + " inserted successfully." );
    });

    firebaseDB.ref( 'Interest' ).on( 'child_removed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'DELETE FROM Interest WHERE category = ?', [ snapshot.val() ], "Interest " + snapshot.val() + " deleted successfully." );
    });
};
