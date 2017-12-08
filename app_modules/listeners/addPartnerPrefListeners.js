'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
//  firebaseDB.ref( 'Partner_Preference' ).on( 'value', function ( snapshot ) {
//    if ( !firebaseDB.ref( 'Partner_Preference/' + snapshot.key ) ) {
//      sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
//    }
//  });

// TEMPORARY TODO REMOVE DEFAULT MIN AND MAX AGE LATER
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_added', function ( snapshot ) {
      //sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
      sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, 18, 200 ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference_Gender VALUES ( ?, ? )', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Partner_Preference_Gender WHERE user_id = ? AND gender = ?', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_changed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'UPDATE Partner_Preference SET min_age = ?, max_age = ? WHERE user_id = ?', [ snapshot.val().min_age, snapshot.val().max_age, snapshot.key ], "Partner_Preference for User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM Partner_Preference WHERE user_id = ?', [ snapshot.key ], "Partner_Preference for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });
};
