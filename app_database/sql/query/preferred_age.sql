SELECT T1.user_id, age FROM User_Age T1 WHERE
T1.age > ( SELECT min_age FROM Partner_Preference 
		WHERE user_id = '710895f16f4b4a5fa185ee462eccecc5' ) AND
T1.age < ( SELECT max_age FROM Partner_Preference
		WHERE user_id = '710895f16f4b4a5fa185ee462eccecc5' )
;
