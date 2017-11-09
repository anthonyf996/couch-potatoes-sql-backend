CREATE TABLE Interest_Subcategory ( category VARCHAR NOT NULL, subcategory VARCHAR NOT NULL, PRIMARY KEY ( category, subcategory ), FOREIGN KEY ( category ) REFERENCES Interest ON DELETE CASCADE );
