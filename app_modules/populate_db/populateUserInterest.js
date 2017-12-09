'use strict';

// Module to populate the "User_Interest" object on the Firebase
// database with values from the passed arrays.
// Note: Each array MUST have equal length.
module.exports = ( firebaseDB, destination, length, userID, category, 
			subcategory, preference
		 ) => {
	var obj = {};

	for ( var i = 0; i < length; i++ ) {
		firebaseDB.ref( destination + userID[ i ] + '/' + category + '/' +
				subcategory[ i ] ).set( preference[ i ] );
	}
}
