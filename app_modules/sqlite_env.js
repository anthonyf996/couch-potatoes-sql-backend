'use strict';

const sqlite3 = require( 'sqlite3' ).verbose();

module.exports = {
  // Stores a reference to the sqlite database.
  db : null,
  // Connects to the sqlite database and then stores a reference
  // to the database.
  connect : function ( dbPath ) {
    this.db = new sqlite3.Database( dbPath, (err) => {
      if ( err ) {
        return console.error(err.message);
      }
    });
  },
  // Performs a query on the sqlite database.
  sqlQuery : function ( query, params, printStmt ) {
      this.db.run( query, params, function ( err ) {
        if ( err ) {
          return console.error( err.message );
        }
        else if ( printStmt ) {
          console.log( printStmt );
        }
      });
    }
};
