'use strict';

var notiEnv = require( './notification_env' );
var readFileToArray = require( './readFileToArray' );

module.exports = ( firebaseDB, chatID ) => {
  // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var messageID = firebaseDB.ref( 'Message' ).push().getKey();

  var txtFileDir = "./txt/"; // NOTE: Change to '../' when adding to app_env.js
  var potatoQuestionsFile = "PotatoQuestions.txt";

  var questions = readFileToArray( txtFileDir + potatoQuestionsFile );

  var potatoQuestion = questions[ getRandomInt( 0, questions.length ) ];

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

  firebaseDB.ref( 'Message' ).child( messageID ).set( newMessage );
  firebaseDB.ref( 'Chat_Message' ).child( chatID ).child( messageID ).set( true );
}
