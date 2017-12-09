'use strict'

const admin = require('firebase-admin');

module.exports = {
  // Firebase database reference.
  db : null,
  // Connects to the Firebase database and then stores a reference to the database.
  connect : function ( cred, url ) {
    try {
      var error = "";

      if ( !cred ) {
        error += "Please specify Firebase credentials!\n";
      }
      if ( !url ) {
        error +=  "Specify Firebase URL!\n";
      }
      if ( error ) {
        throw error;
      }

      var serviceAccount = require( cred );

      admin.initializeApp({
        credential: admin.credential.cert( serviceAccount ),
        databaseURL: url
      });

      this.db = admin.database();
    } catch ( err ) {
      throw err;
    }
  }
};
