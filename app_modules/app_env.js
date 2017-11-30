'use strict';

var popUser = require( './populateUser' );
var popUserInterest = require( './populateUserInterest' );
var popPartnerPreference = require( './populatePartnerPreference' );
var popUserAction = require( './populateUserAction' );
var updatePotentDates = require( './updatePotentialDates' );
var updatePotentFriends = require( './updatePotentialFriends' );
var checkToCreateChat = require( './checkToCreateChat' );
var addMessageNotificationListener = require( './addMessageNotificationListener' );

module.exports = {
  syncDB : function ( firebaseDB, sqliteDB ) {
/*
    let syncTable = function ( tableRef, sqliteDB, parentKey, query, params, func ) {
      tableRef.on( 'child_changed', function ( snapshot ) {
        sqlQuery( sqliteDB, query, params, func );
      }); 
    };
*/

    let queryLimit = 30;

    let sqlQuery = function ( sqliteDB, query, params, printStmt ) {
      sqliteDB.run( query, params, function ( err ) {
        if ( err ) {
          return console.error( err.message );
        }
        else if ( printStmt ) {
          console.log( printStmt );
        }
      });
    };

    sqlQuery( sqliteDB, 'PRAGMA foreign_keys = ON;', [], 'Foreign Keys = ON' );

    firebaseDB.ref( 'User' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO User VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )', [ snapshot.key, snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended ], "User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'User' ).on( 'child_changed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'UPDATE User SET birth_date = ?, gender = ?, city = ?, state = ?, country = ?, latitude = ?, longitude = ?, locked = ?, suspended = ? WHERE user_id = ?', [ snapshot.val().birth_date, snapshot.val().gender, snapshot.val().city, snapshot.val().state, snapshot.val().country, snapshot.val().latitude, snapshot.val().longitude, snapshot.val().locked, snapshot.val().suspended, snapshot.key ], "User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'User' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM User WHERE user_id =  ?', [ snapshot.key ], "User " + snapshot.key + " deleted successfully." );
      // Update All Potential Dates and Friends
    });

/*
    firebaseDB.ref( 'Partner_Preference' ).on( 'value', function ( snapshot ) {
      if ( !firebaseDB.ref( 'Partner_Preference/' + snapshot.key ) ) {
        sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
      }
    });
*/
    firebaseDB.ref( 'Partner_Preference' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference VALUES ( ?, ?, ? )', [ snapshot.key, snapshot.val().min_age, snapshot.val().max_age ], "Partner_Preference for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Partner_Preference_Gender VALUES ( ?, ? )', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });

      firebaseDB.ref( 'Partner_Preference/' + snapshot.key + '/gender' ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Partner_Preference_Gender WHERE user_id = ? AND gender = ?', [ snapshot.key, snapshot2.key ], "Partner_Preference_Gender for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_changed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'UPDATE Partner_Preference SET min_age = ?, max_age = ? WHERE user_id = ?', [ snapshot.val().min_age, snapshot.val().max_age, snapshot.key ], "Partner_Preference for User " + snapshot.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'Partner_Preference' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM Partner_Preference WHERE user_id = ?', [ snapshot.key ], "Partner_Preference for User " + snapshot.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
    });

    firebaseDB.ref( 'Interest' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO Interest VALUES ( ? )', [ snapshot.val() ], "Interest " + snapshot.val() + " inserted successfully." );
    });

    firebaseDB.ref( 'Interest' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM Interest WHERE category = ?', [ snapshot.val() ], "Interest " + snapshot.val() + " deleted successfully." );
    });

/*
    firebaseDB.ref( 'Interest' ).on( 'child_added', function ( snapshot ) {
      sqlQuery( sqliteDB, 'INSERT INTO Interest VALUES ( ? )', [ snapshot.key ], "Interest " + snapshot.key + " inserted successfully." );
    });

    firebaseDB.ref( 'Interest' ).on( 'child_removed', function ( snapshot ) {
      sqlQuery( sqliteDB, 'DELETE FROM Interest WHERE category = ?', [ snapshot.key ], "Interest " + snapshot.key + " deleted successfully." );
    });
*/

/*
    firebaseDB.ref( 'Interest_Subcategory' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Interest_Subcategory VALUES ( ?, ? )', [ snapshot.key, snapshot2.key ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.key + " inserted successfully." );
      });

      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Interest_Subcategory WHERE category = ? AND subcategory = ?', [ snapshot.key, snapshot2.key ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.key + " deleted successfully." );
      });

    });
*/

    firebaseDB.ref( 'Interest_Subcategory' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Interest_Subcategory VALUES ( ?, ? )', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " inserted successfully." );
      });

      firebaseDB.ref( 'Interest_Subcategory/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Interest_Subcategory WHERE category = ? AND subcategory = ?', [ snapshot.key, snapshot2.val() ], "Interest_Subcategory " + snapshot.key + " " + snapshot2.val() + " deleted successfully." );
      });

    });

    firebaseDB.ref( 'User_Interest' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'User_Interest/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_added', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'INSERT INTO User_Interest_Subcategory VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot3.key, snapshot3.val() ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " inserted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_removed', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'DELETE FROM User_Interest_Subcategory WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

        firebaseDB.ref( 'User_Interest/' + snapshot.key + '/' + snapshot2.key ).on( 'child_changed', function ( snapshot3 ) {
          sqlQuery( sqliteDB, 'UPDATE User_Interest_Subcategory SET preference = ? WHERE user_id = ? AND category = ? AND subcategory = ?', [ snapshot3.val(), snapshot.key, snapshot2.key, snapshot3.key ], "User_Interest_Subcategory for User " + snapshot.key + ": " + snapshot2.key + " " + snapshot3.key + " updated successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        });

      });
    });

    firebaseDB.ref( 'Date' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Date VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );

	checkToCreateChat( firebaseDB, 'Date/', snapshot.key, snapshot2.key );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Date WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Date/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Date SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Date for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val() );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Befriend' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Befriend VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );

	checkToCreateChat( firebaseDB, 'Befriend/', snapshot.key, snapshot2.key );
      });

      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Befriend WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Befriend/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Befriend SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Befriend for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val() );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Like' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Like VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );

        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });

      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Like WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });

      firebaseDB.ref( 'Like/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Like SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Like for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Dislike' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Dislike VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Dislike WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Dislike/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Dislike SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Dislike for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Block' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Block VALUES ( ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val()['timestamp'] ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Block WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Block/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Block SET timestamp = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val()['timestamp'], snapshot.key, snapshot2.key ], "Block for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val()['timestamp'] );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });

    firebaseDB.ref( 'Report' ).on( 'child_added', function ( snapshot ) {
      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_added', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'INSERT INTO Report VALUES ( ?, ?, ?, ? )', [ snapshot.key, snapshot2.key, snapshot2.val().timestamp, snapshot2.val().reason ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " inserted successfully on " + snapshot2.val().timestamp + " for " + snapshot2.val().reason );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_removed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'DELETE FROM Report WHERE user1_id = ? AND user2_id = ?', [ snapshot.key, snapshot2.key ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " deleted successfully." );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });

      firebaseDB.ref( 'Report/' + snapshot.key ).on( 'child_changed', function ( snapshot2 ) {
        sqlQuery( sqliteDB, 'UPDATE Report SET timestamp = ?, reason = ? WHERE user1_id = ? AND user2_id = ?', [ snapshot2.val().timestamp, snapshot2.val().reason, snapshot.key, snapshot2.key ], "Report for User " + snapshot.key + " with User " + snapshot2.key + " updated successfully. Timestamp is " + snapshot2.val().timestamp + " and reason is " + snapshot2.val().reason );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot.key, queryLimit );
        updatePotentDates( firebaseDB, sqliteDB, 'User_Potential_Date/', snapshot2.key, queryLimit );
        updatePotentFriends( firebaseDB, sqliteDB, 'User_Potential_Friend/', snapshot2.key, queryLimit );
      });
    });

  },
  addListeners : function ( firebaseDB ) {
    addMessageNotificationListener( firebaseDB );
  },
  getRandInt : function ( low, high ) {
    return Math.floor( Math.random() * ( high - low + 1 ) + low );
  },
  populateUser : popUser,
  populateUserInterest : popUserInterest,
  populatePartnerPreference : popPartnerPreference,
  populateUserAction : popUserAction,
  updatePotentialDates : updatePotentDates,
  updatePotentialFriends : updatePotentFriends,
  checkToCreateChat : checkToCreateChat
};
