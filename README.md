# couch-potatoes-sql-backend
A Node.js application written for the Couch Potatoes Dating app that synchronizes the app's remote SQL database with the app's firebase NoSQL database upon listening for a change to the NoSQL database.

A listener is run on a server that hosts this SQL database. It listens for changes to a user's profile, such as the addition of new interests, hobbies, and friends, stored on the NoSQL database.

When a change is made to the NoSQL database the listener updates the SQL database with the changes. Then a matchmaking algorithm is run using the SQL database. It then updates the NoSQL database with a list of matches for a given user.

This allows us to take advantage of the strengths of an SQL database when running querries against structured data. This strength is most apparent in the simplicity of the matchmaking algorithms than can be written in SQL that can query against many tables with thousands of users who each may have hundreds of interests.

For unstructured data we have the NoSQL database to take advantage of the strengths of a NoSQL database as well. User messages vary in length and may include multimedia files such as images or videos which may be very large in size and may vary quite a lot in file length. A NoSQL database can handle this type of data very well with a lot of flexibility.
