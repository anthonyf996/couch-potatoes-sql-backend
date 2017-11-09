'use strict'

const admin = require('firebase-admin');

module.exports = {
  cred : null,
  url : null,
  db : null,
  connect : function () {
    try {
      var error = "";

      if ( !this.cred ) {
        error += "Please specify Firebase credentials!\n";
      }
      if ( !this.url ) {
        error +=  "Specify Firebase URL!\n";
      }
      if ( error ) {
        throw error;
      }

      var serviceAccount = require( this.cred );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: this.url
      });

      this.db = admin.database();
    } catch ( err ) {
      throw err;
    }
  }
};


/*
  empty : function () {
    if ( this.db ) {
      var setSize = function ( data ) {
        let size = data.numChildren();
        this.size += size;
      }.bind( this );
      this.db.ref().once( 'value', setSize );
    }
  }
*/
/*
module.exports = ( firebaseDB ) => {
  var isEmpty = { val: false };
  firebaseDB.ref().once( 'value', function( snapshot ) {
    // Database is likely empty is not exists
    //if ( !snapshot.hasChild( 'User' ) ) {
    //  console.log( 'Empty Database' );
    //}

    // Database is empty if true, but performance heavy
    if ( !snapshot.numChildren() ) {
       isEmpty.val = true;
    }

     //return ( !snapshot.hasChild( 'User' ) ) ? true : false;
     //return ( !snapshot.numChildren() ) ? true : false;
  });

  return isEmpty.val;
}
*/
