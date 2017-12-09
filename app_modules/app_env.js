'use strict';

// Location of modules that insert randomly generated data into the 
// Firebase database.
const populateDir = './populate_db/';

// Location of modules that find potential matches ( date or friend ) for a 
// user of the app.
const potentMatchDir = './potential_matches/';

// Location of modules that add listeners needed to synchronize the Firebase 
// database and the SQL database used by the app.
const listenersDir = './listeners/';

// Location of modules that handle the potato question feature of the app.
const potatoQDir = './potato_questions/';

// Module that adds all listeners needed to synchronize the Firebase database 
// and the SQL database used by the app.
const addListenersMod = require( listenersDir + 'addListeners' );

module.exports = {
  // Synchronizes the Firebase and SQL databases.
  // This is done by adding listeners that listen for changes
  // to the Firebase database. Upon firing, the listeners will make the
  // corresponding changes to the SQL database.
  syncDB : addListenersMod
};
