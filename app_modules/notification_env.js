'use strict';

module.exports = {
  addNotification : function ( firebaseDB, userID, timestamp, description ) {
    firebaseDB.ref( 'User_Notification' ).child( userID ).child( timestamp ).child( 'description' ).set( description );
    firebaseDB.ref( 'User_Notification' ).child( userID ).child( timestamp ).child( 'viewed' ).set( false );

    console.log( 'Added notification "' + description + '" for user ' + userID + ' on ' + timestamp );
  },
  newEvent : function ( partner, ev, timestamp ) {
    return "New " + ev + " with " + partner + " on " + timestamp;
  },
  getCurrTimestamp : function () {
    var date = new Date();

    var str = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    
    return str;
  }
}
