'use strict';

module.exports = ( file ) => {
  var fs = require( 'fs' );

  var buf = fs.readFileSync( file );
  buf = buf.toString();

  var wordBuffer = [];
  var nextLine = '';

  for ( var i = 0; i < buf.length; i++ ) {
    if ( buf[ i ] == '\n' ) {
      wordBuffer.push( nextLine );
      nextLine = '';
    }
    else {
      nextLine += buf[ i ];
    }
  }

  return wordBuffer;
};
