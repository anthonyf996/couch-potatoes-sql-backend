'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'Interest' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO Interest VALUES ( ? )', [ snapshot.val() ], "Interest " + snapshot.val() + " inserted successfully." );
    });

    firebaseDB.ref( 'Interest' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM Interest WHERE category = ?', [ snapshot.val() ], "Interest " + snapshot.val() + " deleted successfully." );
    });
};
