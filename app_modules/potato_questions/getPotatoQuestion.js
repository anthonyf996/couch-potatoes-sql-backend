'use strict';

// Get object containg useful methods for sending a notification to 
// the Firebase database.
var notiEnv = require( '../notification/notification_env' );

// Module that reads the passed file into an array and then 
// returns the array.
var readFileToArray = require( '../readFileToArray' );

module.exports = ( firebaseDB, chatID ) => {
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  // Returns a random integer in the range [min,max).
  let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Get new message id.
  var messageID = firebaseDB.ref( 'Message' ).push().getKey();

  // Location of potato questions text file
  var txtFileDir = "../../txt/"; // NOTE: Change to '../' when adding to app_env.js
  var potatoQuestionsFile = "PotatoQuestions.txt";

  // Read each potato question from the file and place each into an array
  var questions = readFileToArray( txtFileDir + potatoQuestionsFile );

  // Get random potato question from the array
  var potatoQuestion = questions[ getRandomInt( 0, questions.length ) ];

  // Build a new message for the potato question.
  // The sender of the message will be the app name.
  var appName = "COUCH POTATOES";
  var timestamp = notiEnv.getCurrTimestamp();
  var appMessage = appName + " says:\n" + potatoQuestion;

  var newMessage = {
    'chat_id' : chatID,
    'name' : appName,
    'text' : appMessage,
    'timestamp' : timestamp,
    'user_id' : appName
  };

  // Add the new message containing the potato question to Firebase.
  firebaseDB.ref( 'Message' ).child( messageID ).set( newMessage );

  // Add the new message to the chat specified by the passed chat id.
  firebaseDB.ref( 'Chat_Message' ).child( chatID ).child( messageID ).set( true );
}
