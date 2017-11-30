'use strict';

var notiEnv = require( './notification_env' );

module.exports = ( firebaseDB ) => {
  firebaseDB.ref( 'Chat_Message/' ).on( 'child_added', ( snapshot4 ) => {
    var chatID = snapshot4.key;
  firebaseDB.ref( 'Chat_Message/' + chatID ).on( 'child_added', ( snapshot ) => {
    if ( snapshot != null && snapshot.val() != null )  {
      firebaseDB.ref( 'Message/' + snapshot.key ).once( 'value', ( snapshot2 ) => {
        var sender = snapshot2.val()[ 'name' ];
        var senderID = snapshot2.val()[ 'user_id' ];

        firebaseDB.ref( 'Chat_User/' + chatID ).once( 'value', ( snapshot3 ) => {
          var chatUsers = snapshot3.val();

          var timestamp = notiEnv.getCurrTimestamp();

          for ( var key in chatUsers ) {
            if ( key != senderID ) {
	      notiEnv.addNotification( firebaseDB, key, timestamp, "New message from " + sender + " on " + timestamp );
            }
          }
        });
      });
    }
  });
  });
}
