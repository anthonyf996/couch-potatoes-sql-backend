CREATE TABLE USER ( user_id VARCHAR NOT NULL, birth_date DATE NOT NULL, gender VARCHAR(10) NOT NULL, city VARCHAR, state VARCHAR, country VARCHAR, latitude FLOAT, longitude FLOAT, locked BOOLEAN, suspended BOOLEAN, PRIMARY KEY ( user_id ) );