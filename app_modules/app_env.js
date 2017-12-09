'use strict';

var populateDir = './populate_db/';
var potentMatchDir = './potential_matches/';
var listenersDir = './listeners/';
var potatoQDir = './potato_questions/';

var popUser = require( populateDir + 'populateUser' );
var popUserInterest = require( populateDir + 'populateUserInterest' );
var popPartnerPreference = require( populateDir + 'populatePartnerPreference' );
var popUserAction = require( populateDir + 'populateUserAction' );
var updatePotentDates = require( potentMatchDir + 'updatePotentialDates' );
var updatePotentFriends = require( potentMatchDir + 'updatePotentialFriends' );
var checkToCreateChat = require( listenersDir + 'checkToCreateChat' );
var addMessageNotificationListener = require( listenersDir + 'addMessageNotificationListener' );
var getPotatoQ = require( potatoQDir + 'getPotatoQuestion' );
var addListenersMod = require( listenersDir + 'addListeners' );

module.exports = {
  syncDB : function ( firebaseDB, sqliteEnv ) {
    addListenersMod( firebaseDB, sqliteEnv );
  },
  populateUser : popUser,
  populateUserInterest : popUserInterest,
  populatePartnerPreference : popPartnerPreference,
  populateUserAction : popUserAction,
  updatePotentialDates : updatePotentDates,
  updatePotentialFriends : updatePotentFriends,
  checkToCreateChat : checkToCreateChat,
  getPotatoQuestion : getPotatoQ
};
