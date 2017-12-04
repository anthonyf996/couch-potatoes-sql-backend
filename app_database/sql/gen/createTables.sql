CREATE TABLE Befriend ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Block ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Date ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Dislike ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Interest ( category VARCHAR NOT NULL, PRIMARY KEY ( category ) );
CREATE TABLE Interest_Subcategory ( category VARCHAR NOT NULL, subcategory VARCHAR NOT NULL, PRIMARY KEY ( category, subcategory ), FOREIGN KEY ( category ) REFERENCES Interest ON DELETE CASCADE );
CREATE TABLE Like ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Partner_Preference_Gender ( user_id VARCHAR NOT NULL, gender VARCHAR NOT NULL, PRIMARY KEY ( user_id, gender ), FOREIGN KEY ( user_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Partner_Preference ( user_id VARCHAR NOT NULL, min_age INTEGER NOT NULL, max_age INTEGER NOT NULL, PRIMARY KEY ( user_id ), FOREIGN KEY ( user_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE Report ( user1_id VARCHAR NOT NULL, user2_id VARCHAR NOT NULL, timestamp TIMESTAMP NOT NULL, reason VARCHAR NOT NULL, PRIMARY KEY ( user1_id, user2_id ), FOREIGN KEY ( user1_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( user2_id ) REFERENCES User ON DELETE CASCADE );
CREATE TABLE User_Interest_Subcategory ( user_id VARCHAR NOT NULL, category VARCHAR NOT NULL, subcategory VARCHAR NOT NULL, preference VARCHAR NOT NULL, PRIMARY KEY ( user_id, category, subcategory ), FOREIGN KEY ( user_id ) REFERENCES User ON DELETE CASCADE, FOREIGN KEY ( category, subcategory ) REFERENCES Interest_Subcategory ON DELETE CASCADE );
CREATE TABLE USER ( user_id VARCHAR NOT NULL, birth_date DATE NOT NULL, gender VARCHAR(10) NOT NULL, city VARCHAR, state VARCHAR, country VARCHAR, latitude FLOAT, longitude FLOAT, locked BOOLEAN, suspended BOOLEAN, PRIMARY KEY ( user_id ) );