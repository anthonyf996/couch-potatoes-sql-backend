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
    firebaseDB.ref( 'Interest_Subcategory' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'INSERT INTO Interest_Subcategory VALUES ( ?, ? )', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " inserted successfully." );
      });

      // Add listener to remove data from the corresponding table in the SQL database.
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqliteEnv.sqlQuery( 'DELETE FROM Interest_Subcategory WHERE category = ? AND subcategory = ?', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " deleted successfully." );
      });

    });
};
