'use strict';

module.exports = ( firebaseDB, tablePath, user1ID, user2ID ) => {
  let getDisplayName = ( firstName, middleName, lastName ) => {
    var str = "";

    if ( firstName != undefined ) {
      str += firstName;
    }
    if ( middleName != undefined ) {
      str += " ";
      str += middleName;
    }
    if ( lastName != undefined ) {
      str += " ";
      str += lastName;
    }

    return str;
  };

  firebaseDB.ref( tablePath + user2ID + '/' + user1ID ).once( 'value', ( snapshot ) => {
    // Create new chat
    if ( snapshot != null && snapshot.val() != null )  {
      // Get new chat ID
      var chatID = firebaseDB.ref( 'Chat_User' ).push().getKey();

      firebaseDB.ref( 'User_Chat/' + user1ID + '/' ).child( chatID ).set( true );
      firebaseDB.ref( 'User_Chat/' + user2ID + '/' ).child( chatID ).set( true );

      console.log( user1ID + ' adding to User_Chat with chatID ' + chatID );
      console.log( user2ID + ' adding to User_Chat with chatID ' + chatID );

      firebaseDB.ref( 'User' ).child( user1ID ).once( 'value', ( snapshot ) => {
        firebaseDB.ref( 'User' ).child( user2ID ).once( 'value', ( snapshot2 ) => {

          var user1FName = snapshot.val()[ 'firstName' ];
          var user1MName = snapshot.val()[ 'middleName' ];
          var user1LName = snapshot.val()[ 'lastName' ];

          var user1DispName = getDisplayName( user1FName, user1MName, user1LName );

          var user2FName = snapshot.val()[ 'firstName' ];
          var user2MName = snapshot.val()[ 'middleName' ];
          var user2LName = snapshot.val()[ 'lastName' ];

          var user2DispName = getDisplayName( user2FName, user2MName, user2LName );

          firebaseDB.ref( 'Chat_User/' + chatID ).child( user1ID ).set( user1DispName );
          firebaseDB.ref( 'Chat_User/' + chatID ).child( user2ID ).set( user2DispName );

          console.log( user1ID + ' adding to Chat_User with chatID ' + chatID + ' and displayName ' + user1DispName );
          console.log( user2ID + ' adding to Chat_User with chatID ' + chatID + ' and displayName ' + user2DispName );
        });
      });
    }
  });
}
