'use strict';

// Module to populate the "Partner_Preference" object on the Firebase
// database with values from the passed arrays.
// Note: Each array MUST have equal length.
module.exports = ( firebaseDB, destination, length, userID, minAge, 
			maxAge, gender
		 ) => {
	var obj = {};

	for ( var i = 0; i < length; i++ ) {
		//firebaseDB.ref( destination + userID[ i ] + '/' + category + '/' +
		//		subcategory[ i ] ).set( preference[ i ] );
		var obj2 = {};
		var obj3 = {};

		obj2[ 'min_age' ] = minAge[ i ];
		obj2[ 'max_age' ] = maxAge[ i ];
		obj3[ gender[ i ] ] = true;
		obj2[ 'gender' ] = obj3;

		firebaseDB.ref( destination + userID[ i ] ).set( obj2 );
		//console.log( obj2 );
	}
}
