'use strict';

module.exports = ( firebaseDB, sqliteEnv, destination, userID ) => {
  // Limit size of match list to improve performance.
  var queryLimit = 30;

  // SQL prepared statement parameters
  var params = 	[ 
		  userID,
		  userID,
		  userID,
		  userID,
		  userID,
		  userID,
		  userID,
		  userID,
		  userID,
		  queryLimit
		];

  // SQL query
  var query = 
    // Get list of users ordered by most interests in common in descending order
    "SELECT Res.user_id, SUM( NUM_COMMON ) AS NUM_COMMON FROM ( " +
    " " +
    "	SELECT T1.user_id, COUNT(*) AS NUM_COMMON " +
    "	FROM User_Interest_Subcategory T1 " +
    "	WHERE EXISTS (  " +
    "		SELECT T2.user_id, T2.category, T2.subcategory " +
    "		FROM User_Interest_Subcategory T2 " +
    "		WHERE  " +
    "		T2.category = T1.category AND T2.subcategory = T1.subcategory AND " +
    "		T2.preference = T1.preference AND user_id = ? " +
    "	) AND T1.user_id <> ? " +
    " " +
    "	GROUP BY T1.user_id " +
    " " +
    "	UNION ALL " +
    " " +
    "	SELECT DISTINCT T3.user_id, 0 AS NUM_COMMON " +
    "	FROM User T3 " +
    "   WHERE user_id <> ? " +
    ")  AS Res" +
    " " +
    // Apply filters
    "WHERE Res.user_id NOT IN " +
    " " +
    // Like filter
    "( " +
    "	SELECT user2_id AS user_id FROM Like " +
    "	WHERE user1_id = ? " +
    ") " +
    "AND Res.user_id NOT IN " +
    " " +
    // Dislike filter
    "( " +
    "	SELECT user2_id AS user_id FROM Dislike " +
    "	WHERE user1_id = ? " +
    ") " +
    "AND Res.user_id NOT IN " +
    " " +
    // Block filter
    "( " +
    "	SELECT user2_id AS user_id FROM Block " +
    "	WHERE user1_id = ? " +
    ") " +
    "AND Res.user_id NOT IN " +
    " " +
    // Report filter
    "( " +
    "	SELECT user2_id AS user_id FROM Report " +
    "	WHERE user1_id = ? " +
    ") " +
    "AND Res.user_id NOT IN " +
    " " +
    // Date filter
    "( " +
    "	SELECT user2_id AS user_id FROM Date " +
    "	WHERE user1_id = ? " +
    ") " +
    "AND Res.user_id NOT IN " +
    " " +
    // Befriend filter
    "( " +
    "	SELECT user2_id AS user_id FROM Befriend " +
    "	WHERE user1_id = ? " +
    ") " +
    " " +
    "GROUP BY Res.user_id ORDER BY NUM_COMMON DESC " +
    "LIMIT ?; "

  // Get the list of potential matches for the user corresponding to the
  // passed user id from the SQL database. Then add this list to the
  // Firebase database.
  sqliteEnv.db.all( query, params, function ( err, rows ) {
    if ( err ) {
      throw err;
    }
    else {
      var obj = {};
      var count = 0;
      rows.forEach( ( row ) => {
        obj[ count ] = row.user_id;
        ++count;
      });
      firebaseDB.ref( destination + '/' + userID ).set( obj );
    }
  });
}
