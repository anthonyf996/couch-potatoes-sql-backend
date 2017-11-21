-- Source: https://stackoverflow.com/questions/3123951/sqlite-how-to-calculate-age-from-birth-date
SELECT user_id, (strftime('%Y', 'now') - strftime('%Y', birth_date)) - (strftime('%m-%d', 'now') < strftime('%m-%d', birth_date)) FROM User;
