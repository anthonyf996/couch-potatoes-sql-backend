'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'Interest_Subcategory' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Interest_Subcategory VALUES ( ?, ? )', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " inserted successfully." );
      });

      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Interest_Subcategory WHERE category = ? AND subcategory = ?', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " deleted successfully." );
      });

    });
};
