'use strict';

module.exports = ( firebaseDB, sqliteDB ) => {
    firebaseDB.ref( 'User' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO User VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [ snapshot.key, snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended ], "User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'User' ).on( 'child_changed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'UPDATE User SET birth_date = ?, gender = ?, city = ?, state = ?, country = ?, latitude = ?, longitude = ?, locked = ?, suspended = ? WHERE user_id = ?', [ snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended, snapshot.key ], "User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'User' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM User WHERE user_id =  ?', [ snapshot.key ], "User " + snapshot.key + " deleted successfully." );
      // TODO Update All Potential Dates and Friends
    });
};
