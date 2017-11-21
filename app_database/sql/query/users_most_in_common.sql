SELECT user_id, SUM( NUM_COMMON ) AS NUM_COMMON FROM (

	SELECT T1.user_id, COUNT(*) AS NUM_COMMON
	FROM User_Interest_Subcategory T1
	WHERE EXISTS ( 
		SELECT T2.user_id, T2.category, T2.subcategory
		FROM User_Interest_Subcategory T2
		WHERE 
		T2.category = T1.category AND T2.subcategory = T1.subcategory AND
		user_id = '710895f16f4b4a5fa185ee462eccecc5'
	) AND user_id <> '710895f16f4b4a5fa185ee462eccecc5'
	GROUP BY user_id

	UNION ALL

	SELECT DISTINCT T3.user_id, 0 AS NUM_COMMON
	FROM User_Interest_Subcategory T3
) 
GROUP BY user_id ORDER BY NUM_COMMON DESC
;
