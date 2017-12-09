'use strict';

module.exports = ( firebaseDB, destination, length, user1ID, user2ID, 
			default_timestamp, reason
		 ) => {
	var obj = {};

	for ( var i = 0; i < length; i++ ) {
		//firebaseDB.ref( destination + userID[ i ] + '/' + category + '/' +
		//		subcategory[ i ] ).set( preference[ i ] );
		var obj2 = {};
		var obj3 = {};

		if ( reason != "" && reason != undefined ) {
		  obj3[ 'timestamp' ] = default_timestamp;
		  obj3[ 'reason' ] = reason;
		  obj2[ user2ID[ i ] ] = obj3;
                }
		else {
		  obj2[ user2ID[ i ] ] = default_timestamp;
		}

		firebaseDB.ref( destination + user1ID[ i ] ).set( obj2 );
		//console.log( obj2 );
	}
}
