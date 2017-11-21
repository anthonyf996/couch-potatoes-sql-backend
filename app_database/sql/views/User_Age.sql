CREATE VIEW User_Age AS SELECT user_id, (strftime('%Y', 'now') - strftime('%Y', birth_date)) - (strftime('%m-%d', 'now') < strftime('%m-%d', birth_date)) AS age FROM User;
