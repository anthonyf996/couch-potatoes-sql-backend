'use strict';

// Location of modules that find potential matches ( date or friend ) for a 
// user of the app.
var potentMatchDir = '../potential_matches/';

// Module that updates list of potential date matches for a given user.
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );

// Module that updates list of potential friend matches for a given user.
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );

module.exports = ( firebaseDB, sqliteEnv ) => {
    // Add listener to add new data to the corresponding table in the SQL database.
    firebaseDB.ref( 'Interest' ).on( 'child_added', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'INSERT INTO Interest VALUES ( ? )', [ snapshot.val() ], "Interest " + snapshot.val() + " inserted successfully." );
    });

    // Add listener to remove data from the corresponding table in the SQL database.
    firebaseDB.ref( 'Interest' ).on( 'child_removed', function ( snapshot ) {
      sqliteEnv.sqlQuery( 'DELETE FROM Interest WHERE category = ?', [ snapshot.val() ], "Interest " + snapshot.val() + " deleted successfully." );
    });
};
