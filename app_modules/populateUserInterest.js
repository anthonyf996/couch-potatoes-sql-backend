'use strict';

module.exports = ( firebaseDB, destination, length, userID, category, 
			subcategory, preference
		 ) => {
	var obj = {};

	for ( var i = 0; i < length; i++ ) {
		firebaseDB.ref( destination + userID[ i ] + '/' + category + '/' +
				subcategory[ i ] ).set( preference[ i ] );
	}
}
