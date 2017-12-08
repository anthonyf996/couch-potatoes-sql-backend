var sql_env = require( '../sqlite_env' );

dbPath = '../../app_database/app.db';
sql_env.connect( dbPath );
sql_env.sqlQuery( 'PRAGMA foreign_keys = ON;', [], 'Foreign Keys = ON' );
