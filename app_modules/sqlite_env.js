'use strict';

const sqlite3 = require('sqlite3').verbose();

module.exports = {
  dbPath : null,
  db : null,
  connect : function () {
    this.db = new sqlite3.Database( this.dbPath, (err) => {
      if ( err ) {
        return console.error(err.message);
      }
    });
  }
};
