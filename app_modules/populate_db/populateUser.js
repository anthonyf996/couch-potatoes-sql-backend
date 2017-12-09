'use strict';

// Module to populate the "User_Interest" object on the Firebase
// database with values from the passed arrays.
// Note: Each array MUST have equal length.
module.exports = ( firebaseDB, destination, length, userID, email, firstName, 
			middleName, lastName, birthDate, gender, city, state, 
			country, bio, latitude, longitude, locked, suspended, profilePic
			) => {
	var obj = {};

	for ( var i = 0; i < length; i++ ) {
		var obj2 = {
			'email' : email[ i ],
			'birth_date' : birthDate[ i ],
			'firstName' : firstName[ i ],
			'middleName' : middleName[ i ],
			'lastName' : lastName[ i ],
			'gender' : gender [ i ],
			'city' : city[ i ],
			'state' : state[ i ],
			'country' : country[ i ],
			//'bio' : bio[ i ],
			'bio' : 'Test bio',
			'latitude' : latitude[ i ],
			'longitude' : longitude[ i ],
			//'locked' : locked [ i ],
			//'suspended' : suspended[ i ]
			'locked' : false,
			'suspended' : false,
			'profile_pic' : profilePic[ i ]
		};
		firebaseDB.ref( destination ).child( userID[i] ).set( obj2 );
	}
}
