# couch-potatoes-sql-backend
Node.js application written for the Couch Potatoes Dating app that synchronizes the app's remote SQL database with the app's firebase NoSQL database upon listening for a change to the NoSQL database.
When a change is made a matchmaking algorithm is run using the SQL database. It then updates the NoSQL database with a list of matches for a given user.
