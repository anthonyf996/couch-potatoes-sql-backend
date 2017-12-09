'use strict';

// Get object containg useful methods for sending a notification to 
// the Firebase database
const notificationEnv = require( '../notification/notification_env' );


// Get function that adds a potato question to a chat in the Firebase database
const getPotatoQ = require( '../potato_questions/getPotatoQuestion' );

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

  // If reference returned is not null, both users mutually want to date or 
  // befriend each other. If so, create a new chat and add each user to the
  // new chat.
  firebaseDB.ref( tablePath + user2ID + '/' + user1ID ).once( 'value', ( snapshot ) => {
    // Create new chat
    if ( snapshot != null && snapshot.val() != null )  {
      firebaseDB.ref( tablePath + user1ID + '/' + user2ID ).child( 'chatCreated' ).once( 'value', ( snapshot5 ) => {
      if ( snapshot5 != null && snapshot5.val() != null && snapshot5.val() == false ) {
      firebaseDB.ref( tablePath + user1ID + '/' + user2ID ).child( 'chatCreated' ).set( true );

      // Get new chat ID
      var chatID = firebaseDB.ref( 'Chat_User' ).push().getKey();

      // Add chat to User_Chat object on Firebase under the passed user's id
      firebaseDB.ref( 'User_Chat/' + user1ID + '/' ).child( chatID ).set( true );
      firebaseDB.ref( 'User_Chat/' + user2ID + '/' ).child( chatID ).set( true );

      console.log( user1ID + ' adding to User_Chat with chatID ' + chatID );
      console.log( user2ID + ' adding to User_Chat with chatID ' + chatID );

      // Get name of passed user
      firebaseDB.ref( 'User' ).child( user1ID ).once( 'value', ( snapshot ) => {
        firebaseDB.ref( 'User' ).child( user2ID ).once( 'value', ( snapshot2 ) => {

          var user1FName = snapshot.val()[ 'firstName' ];
          var user1MName = snapshot.val()[ 'middleName' ];
          var user1LName = snapshot.val()[ 'lastName' ];

          var user1DispName = getDisplayName( user1FName, user1MName, user1LName );

          var user2FName = snapshot2.val()[ 'firstName' ];
          var user2MName = snapshot2.val()[ 'middleName' ];
          var user2LName = snapshot2.val()[ 'lastName' ];

          var user2DispName = getDisplayName( user2FName, user2MName, user2LName );

          // Add user to Chat_User object on Firebase under the new chat id
          firebaseDB.ref( 'Chat_User/' + chatID ).child( user1ID ).set( user1DispName );
          firebaseDB.ref( 'Chat_User/' + chatID ).child( user2ID ).set( user2DispName );

          // Add a potato question to the new chat
          getPotatoQ( firebaseDB, chatID );

          console.log( user1ID + ' adding to Chat_User with chatID ' + chatID + ' and displayName ' + user1DispName );
          console.log( user2ID + ' adding to Chat_User with chatID ' + chatID + ' and displayName ' + user2DispName );
   
          var timestamp = notificationEnv.getCurrTimestamp();

          var matchType = '';

	  if ( tablePath == "Date/" ) {
            matchType = 'date';
          }
          else if ( tablePath == "Befriend/" ) {
            matchType = 'friend';
          }

          // Add notification of new chat created to Firebase
	  notificationEnv.addNotification( firebaseDB, user1ID, timestamp, "New " + matchType + " match with " + user2DispName + "! Click to begin chat." );
	  notificationEnv.addNotification( firebaseDB, user2ID, timestamp, "New " + matchType + " match with " + user1DispName + "! Click to begin chat." );
        });
      });
    }
    });
    }
  });
}
