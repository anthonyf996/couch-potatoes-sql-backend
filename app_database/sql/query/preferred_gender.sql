SELECT user_id, gender FROM User WHERE gender IN (
	SELECT gender FROM Partner_Preference_Gender
	WHERE User_id = '710895f16f4b4a5fa185ee462eccecc5'
)
;
