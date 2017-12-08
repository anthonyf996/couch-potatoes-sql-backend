'use strict';

const sqlite3 = require('sqlite3').verbose();

module.exports = {
  //dbPath : null,
  //db : null,
  connect : function ( dbPath ) {
    this.db = new sqlite3.Database( dbPath, (err) => {
      if ( err ) {
        return console.error(err.message);
      }
    });
  },
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
