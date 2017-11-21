CREATE TABLE Partner_Preference_Gender ( user_id VARCHAR NOT NULL, gender VARCHAR NOT NULL, PRIMARY KEY ( user_id, gender ), FOREIGN KEY ( user_id ) REFERENCES User ON DELETE CASCADE );
