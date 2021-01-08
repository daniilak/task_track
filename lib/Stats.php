<?php

class Stats
{
	private $facID;
	private $ID;
	private $all;
	
	public function __construct($ID) 
    {
    	$this->setID($ID);
    	$this->all = [];
    }
    public function setID($ID) 
    {
    	$this->ID = intval($ID);
    }
    public function getID() 
    {
    	return $this->ID;
    }


	// public function getListEvents()	{
		
	// 	return DataBase::SQL("SELECT GROUP_CONCAT(`name_event` SEPARATOR '`') cnt FROM `events`")[0]['cnt'];
	// }
	

	public function getFacs()	{
		
		return DataBase::SQL("SELECT `ID`, `full_name` FROM `facs` WHERE `facs`.`ID` > 1");
	}
	public function getEventsList()	{
		
		return DataBase::SQL("SELECT `ID`, `name` FROM `events`");
	}
	
	public function getTypeEventsList()	{
		
		return DataBase::SQL("SELECT `ID`, `type` FROM `type_sections`");
	}
	
	
	
	public function countEvents()	{
		
		return DataBase::SQL("
			SELECT GROUP_CONCAT(cnt) cnt, GROUP_CONCAT(CONCAT(\"'\",`name_event`,\"'\") SEPARATOR ',') as `l`
			  FROM
			(
			  SELECT COUNT(`sections`.`id_event`) as `cnt`, `events`.`name_event`
			    FROM `sections`
                INNER JOIN `events` ON `events`.`ID` = `sections`.`id_event`
			   GROUP BY `sections`.`id_event`
			) q "
		)[0];
	}
	public function countEventsByFac($id)	{
		
		return DataBase::SQL("
			SELECT  GROUP_CONCAT(IFNULL(`count`,0) )as `count`
			FROM
			(
			    SELECT COUNT(`sections`.`id_event`) as `count`,`sections`.`id_event` FROM `sections`
				WHERE `id_fac` = ?
				GROUP BY `sections`.`id_event`
			) `q`
			RIGHT JOIN `events` ON `events`.`ID` = `q`.`id_event`",
			[$id]
		)[0]["count"];
	}
	public function countEventsByType($id)	{
		
		return DataBase::SQL("
			SELECT  GROUP_CONCAT(IFNULL(`count`,0) )as `count`
			FROM
			(
			    SELECT COUNT(`sections`.`id_event`) as `count`,`sections`.`id_event` FROM `sections`
				WHERE `id_type_section` = ?
				GROUP BY `sections`.`id_event`
			) `q`
			RIGHT JOIN `events` ON `events`.`ID` = `q`.`id_event`",
			[$id]
		)[0]["count"];
	}
	public function countRecoms()	{
		
		return DataBase::SQL('
			SELECT COUNT( `recommendations`.`ID`) as `count`, `recommendations`.`recommendation` as `name`, `events`.`name_event`
			FROM `recommendations`
			INNER JOIN `recom_request` ON `recom_request`.`id_recom` = `recommendations`.`ID`
			INNER JOIN `events` ON `events`.`ID` = `recommendations`.`id_event`
			WHERE `recom_request`.`checked` = 1 
			GROUP BY `recommendations`.`id_event`,`recommendations`.`ID`'
		);
	}
	





	/*
	* Подсчитываем количество секций 
	*
	*/
	public function countSections()	{
		
		// $this->all []= DataBase::SQL("
		// 	SELECT COUNT(`sections`.`id_fac`) AS `count`, '<b>Количество мероприятий всего по конференции:</b>' as 'name'
		// 	FROM `sections`
		// 	INNER JOIN  `facs` ON `facs`.`ID` = `sections`.`id_fac` 
		// 	WHERE `id_event` = ? ",
		// 	[$this->getID()]
		// )[0];
		// $this->all []= [
		// 			'name' =>"<b>Количество мероприятий по факультетам: </b>",
		// 			'count' => '',
		// ];
		// $s = DataBase::SQL("
		// 	SELECT  COUNT(`id_fac`) as `count`, `facs`.`name`
		// 	FROM `sections`
		// 	INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
  //          INNER JOIN `facs` ON `sections`.`id_fac` = `facs`.`ID`
		// 	WHERE  `events`.`ID` = ? 
		// 	GROUP BY `id_fac`",
		// 	[$this->getID()]
		// );
		// foreach ($s as $countPlace) {
		// 	$this->all []= ['name' =>$countPlace['name'],'count' => $countPlace['count'],];
		// }
		
		// $this->all []= ['name' =>"<b>Количество видов мероприятий: </b>",'count' => '',];
		// $s = DataBase::SQL("
		// 	SELECT  COUNT(`id_type_section`) as `count`, `type_sections`.`type`
		// 	FROM `sections`
		// 	INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		// 	INNER JOIN `type_sections` ON `type_sections`.`ID` = `sections`.`id_type_section`
		// 	WHERE  `events`.`ID` = ? 
		// 	GROUP BY `id_type_section`",
		// 	[$this->getID()]
		// );
		// foreach ($s as $countPlace) {
		// 	$this->all []= ['name' =>$countPlace['type'],'count' => $countPlace['count'],];
		// }

		$this->all []= ['name' =>"<b>Количество рекомендаций: </b>",'count' => '',];
		$s = DataBase::SQL('
			SELECT COUNT( `recommendations`.`ID`) as `count`, `recommendations`.`recommendation` as `name`  FROM `recommendations`
			INNER JOIN `recom_request` ON `recom_request`.`id_recom` = `recommendations`.`ID`
			WHERE `recom_request`.`checked` = 1 AND `recommendations`.`id_event` = ?
			GROUP BY `recommendations`.`ID`',
			[$this->getID()]
		);
		foreach ($s as $countPlace) {$this->all []= $countPlace;}
		$this->all []= ['name' =>"<b>Секции по датам: </b>",'count' => '',];
		
		$s = DataBase::SQL('
			SELECT COUNT(*)  as `count` , `sections`.`datetime`
			FROM `sections` 
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE  `events`.`ID` = ?
			GROUP BY DATE_FORMAT(`sections`.`datetime`, "%d")
			ORDER BY DAY(`sections`.`datetime`) DESC ',
			[$this->getID()]
		);
		foreach ($s as $countPlace) {
			$d = explode(' ', $countPlace['datetime']);
			$this->all []= ['name' =>$d[0],'count' => $countPlace['count'],];
		}
		
		$this->all []= DataBase::SQL("
			SELECT COUNT(*) AS `count`,  '<b>Количество участников (Студенты вуза и гости): </b>' as 'name'
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `events`.`ID` = ? ",[$this->getID()]
		)[0];
		
		$this->all []= DataBase::SQL("
			SELECT COUNT(*) AS `count`,  '<b>Количество докладов (Студенты вуза и гости):</b>' as 'name'
			FROM `requests`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `events`.`ID` = ? ",
			[$this->getID()]
		)[0];
		
		$this->all []= DataBase::SQL("
			SELECT COUNT(*) AS `count`,  '<b>Количество участников cтудентов вуза (c повторениями): </b>' as 'name'
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ? ",
			[$this->getID()]
		)[0];

		$this->all []= DataBase::SQL("
			SELECT COUNT(*) AS `count`,  '<b>Количество участников гостей в секциях (c повторениями): </b>' as 'name'
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` != 1  AND `events`.`ID` = ?  AND `sections`.`id_type_section` = 1 ",
			[$this->getID()]
		)[0];
		
		$this->all []= DataBase::SQL("
			SELECT COUNT(`count`) AS `count` ,  '<b>Количество докладов у гостей в секциях: </b>' as 'name' FROM ( SELECT COUNT(*) AS `count` FROM (SELECT  `num_student`, `requests`.`name_project`
				FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `events`.`ID` = 2 AND `users_sections`.`is_chuvsu` != 1  AND `sections`.`id_type_section` = 1
	                    ) AS `t` GROUP BY `name_project` ) AS `k` ",
	        [$this->getID()]
	    )[0];
	                    
	    $this->all []= DataBase::SQL("
			SELECT COUNT(*) AS `count`,  '<b>Количество участников cтудентов вуза в секциях (c повторениями): </b>' as 'name'
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ?  AND `sections`.`id_type_section` = 1 ",
			[$this->getID()]
		)[0];
		
		$this->all []= DataBase::SQL("
			SELECT COUNT(`count`) AS `count` ,  '<b>Количество докладов у студентов вуза в секциях: </b>' as 'name' FROM 
				( 
					SELECT COUNT(*) AS `count` FROM 
					(
						SELECT  `num_student`, `requests`.`name_project`
						FROM `users_sections`
						INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
						INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
						INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
						WHERE `events`.`ID` = 2 AND `users_sections`.`is_chuvsu` = 1  AND `sections`.`id_type_section` = 1
	            	) AS `t` 
	    			GROUP BY `name_project` 
	    		) AS `k` ",
	    	[$this->getID()]
	    )[0];

		$this->all []= DataBase::SQL("
			SELECT COUNT(`count`) AS `count` , '<b>Уникальных участников студентов ЧувГУ (в секциях):</b>' as 'name' FROM (SELECT  COUNT(*) AS `count`  FROM `users_sections`  
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ? AND `sections`.`id_type_section` = 1
			 GROUP BY  `num_student` ORDER BY `count` ) AS `t`",
			[$this->getID()]
		)[0];

		
		$s = DataBase::SQL("
			SELECT COUNT(`count`) AS `count` , '<b>Уникальных участников студентов ЧувГУ:</b>' as 'name' FROM (SELECT  COUNT(*) AS `count`  FROM `users_sections`  
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ?
			 GROUP BY  `num_student` ORDER BY `count` ) AS `t`",
			[$this->getID()]
		)[0];
		
		$this->countStip();
		$this->countUserFacs();
		
		
		return $this->all;
	}

	
	public function countStip()
	{
		
		$s = DataBase::SQL("
		SELECT  COUNT(`stip`) as `count`,`stip` FROM (SELECT  DISTINCT `users_sections`.`num_student`, `stip` 
		FROM `users_sections`
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		WHERE `is_chuvsu` = 1   AND `events`.`ID` = ?
        GROUP BY  `users_sections`.`num_student` ) as `t`
		GROUP BY `stip`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			switch (intval($countPlace['stip']))
			{
				case 0:
				$this->all []= [
					'name' =>"Не указан тип (контракт/бюджет)",
					'count' => $countPlace['count'],
					];
				break;
				case 1:
				$this->all []= [
					'name' =>"Бюджет",
					'count' => $countPlace['count'],
					];
				break;
				case 2:
					$this->all []= [
					'name' =>"Контракт",
					'count' => $countPlace['count'],
					];
				break;
			}
		}
	}
	
	public function countUserFacs()
	{
		$this->all []= [
					'name' =>"<b>Уникальные участники ЧувГУ по факультетам: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT  COUNT(`id_lk_chuvsu`) as `count`,`name` FROM 
		(
			SELECT  DISTINCT `users_sections`.`num_student`, `id_lk_chuvsu`, `facs`.`name` 
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			INNER JOIN `facs`     ON `facs`.`id_lk_chuvsu`   = `users_sections`.`faculty_id`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ? 
			GROUP BY `num_student`
		) as `t`
		GROUP BY `id_lk_chuvsu`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>$countPlace['name'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Уникальные участники ЧувГУ по курсам: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT COUNT(*) AS `count`, `users_sections`.`course`
		FROM `users_sections`  
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		WHERE `num_student` != ' ' AND `events`.`ID` = ? AND `course` > 0 AND `course` < 7
		GROUP BY `course` ORDER BY `count` ",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>"№ ".$countPlace['course'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Уникальные участники ЧувГУ по уровням: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT  COUNT(`level`) as `count`,`level` FROM 
		(
			SELECT  DISTINCT `users_sections`.`num_student`, `level`
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ? 
			GROUP BY `num_student`
		) as `t`
		GROUP BY `level`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>($countPlace['level'] == '') ? 'Нет в базе lk.chuvsu.ru' : $countPlace['level'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Сколько студентов ЧувГУ заняли места: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT  COUNT(`place`) as `count`,`place` FROM 
		(
			SELECT  DISTINCT `users_sections`.`num_student`, `requests`.`place`
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` = 1  AND `events`.`ID` = ?  AND `requests`.`place` < 4
			GROUP BY `num_student`
		) as `t`
		GROUP BY `place`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>"№ ". $countPlace['place'],
					'count' => $countPlace['count'],
			];
		}
		$this->all []= [
					'name' =>"<b>Сколько других учреждений заняли мест (дипломов): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
			SELECT  COUNT(`place`) as `count`, `requests`.`place`
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `is_chuvsu` != 1  AND `events`.`ID` = ?   AND `requests`.`place` < 4
			GROUP BY `place`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>"№".$countPlace['place'],
					'count' => $countPlace['count'],
			];
		}
		$this->all []= [
					'name' =>"<b>Сколько раздано дипломов, по местам со всей конференции + гости-выступающие(дипломы): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
			SELECT  COUNT(`place`) as `count`, `requests`.`place`
			FROM `users_sections`
			INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
			INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			WHERE `events`.`ID` = ? AND  `requests`.`place` != 4
			GROUP BY `place`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>"№ ".$countPlace['place'],
					'count' => $countPlace['count'],
			];
		}
		
		
		
		$this->all []= [
					'name' =>"<b>Откуда участники: (с повторениями): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
			 SELECT  COUNT(`id_type_inst`) as `count`, `user_types_inst`.`type`
		FROM `users_sections`
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
        INNER JOIN `user_types_inst` ON `user_types_inst`.`ID` = `users_sections`.`id_type_inst`
		WHERE `events`.`ID` = ?
		GROUP BY `id_type_inst`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>$countPlace['type'],
					'count' => $countPlace['count'],
			];
		}
		
		
		$this->all []= [
					'name' =>"<b>Количество рекомендаций (по факультетно): </b>",
					'count' => '',
			];
		foreach (DataBase::SQL("SELECT `ID`, `name` FROM `facs` WHERE `ID` > 0 ",FALSE, TRUE) as $f) {
			
			$s = DataBase::SQL("
			 SELECT COUNT(`recommendations`.`recommendation`) as `count`, `recommendations`.`recommendation`
				FROM `requests`  
				INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
				INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
				INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		        INNER JOIN `recom_request` ON `recom_request`.`id_request` = `requests`.`ID`
		        INNER JOIN `recommendations` ON `recom_request`.`id_recom` = `recommendations`.`ID`
				WHERE  `events`.`ID` = ? AND `recom_request`.`checked` = 1 AND `recommendations`.`id_event` = ? AND `sections`.`id_fac` = ?
		        GROUP BY `recommendation`",[$this->getID(), $this->getID(),$f['ID']], TRUE);

			foreach ($s as $countPlace) {
				$this->all []= [
						'name' =>'Факультет '.$f['name'].' '.$countPlace['recommendation'],
						'count' => $countPlace['count'],
				];
			}
		}
	
		$this->all []= [
					'name' =>"<b>Rоличество секций с разбивкой на виды (по факультетно): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
			SELECT   `facs`.`name`, COUNT(`sections`.`id_type_section`) as `count`, `type_sections`.`type`
			FROM `sections`
			INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
			INNER JOIN `type_sections` ON `type_sections`.`ID` = `sections`.`id_type_section`
			INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
			WHERE  `events`.`ID` = ?
			GROUP BY `sections`.`id_fac`, `sections`.`id_type_section`
			ORDER BY  `sections`.`id_fac`, `sections`.`id_type_section`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'].' '.$countPlace['type'],
					'count' => $countPlace['count'],
			];
		}
		$this->all []= [
					'name' =>"<b>Количество докладов (по факультетно): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT  `facs`.`name`, COUNT(*) AS `count`
		FROM `requests`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		WHERE `events`.`ID` = ?
		GROUP BY `sections`.`id_fac`
		ORDER BY  `sections`.`id_fac`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Количество участников студентов ЧГУ (для итогов по факультетам): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT DISTINCT  `num_student`, COUNT(*) AS `count`, `facs`.`name`
		FROM `users_sections`  
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		WHERE `is_chuvsu` = 1  AND `events`.`ID` = ?
		GROUP BY `sections`.`id_fac` 
        ORDER BY `count`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'],
					'count' => $countPlace['count'],
			];
		}
		$this->all []= [
					'name' =>"<b>Количество  участников не из ЧГУ (по факультетно): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT DISTINCT  `num_student`, COUNT(*) AS `count`, `facs`.`name`
		FROM `users_sections`  
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		WHERE `is_chuvsu` != 1  AND `events`.`ID` = ?
		GROUP BY `sections`.`id_fac` 
        ORDER BY `count`",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Откуда участники: (с повторениями)  (по факультетно): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
			 SELECT  COUNT(`id_type_inst`) as `count`, `user_types_inst`.`type`, `facs`.`name`
		FROM `users_sections`
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
        INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
        INNER JOIN `user_types_inst` ON `user_types_inst`.`ID` = `users_sections`.`id_type_inst`
		WHERE  `events`.`ID` = ?
		GROUP BY `id_type_inst`, `sections`.`id_fac`
        ORDER BY  `sections`.`id_fac`, `id_type_inst`",[$this->getID()], TRUE);
			foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'].' '.$countPlace['type'],
					'count' => $countPlace['count'],
			];
		}
		
		$this->all []= [
					'name' =>"<b>Количество мест (по факультетно): </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT COUNT(*) AS `count`, `facs`.`name`, `requests`.`place`
		FROM `requests`  
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
		WHERE `events`.`ID` = ? AND (`requests`.`place` >= 1 AND `requests`.`place` <= 3)
		GROUP BY `sections`.`id_fac` , `requests`.`place`
        ORDER BY `sections`.`id_fac`, `requests`.`place`",[$this->getID()], TRUE);
			foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>'Факультет '.$countPlace['name'].' место '.$countPlace['place'],
					'count' => $countPlace['count'],
			];
		}
		
		
		
		
		$this->all []= [
					'name' =>"<b>Список секций, у которых убрано ограничение на места: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("SELECT 
				`sections`.`name`, 
				`sections`.`ID`,
				COUNT(`sections`.`ID`) as `count`
				FROM `sections`
				INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
				WHERE `id_disabled_place` = 1 AND `id_type_section` = 1 AND `sections`.`id_event` = ?
				GROUP BY  `sections`.`ID`",[$this->getID()], TRUE);
		foreach ($s as $cp) {
			$ss = DataBase::SQL("SELECT 
				COUNT(*) as `places`
				FROM `requests`
				WHERE `place` != 4 AND `requests`.`id_section` = ?",[$cp['ID']], TRUE);
			$sss = DataBase::SQL("SELECT 
				COUNT(`requests`.`id_section`) as `count`,
                SUM(`users_sections`.`is_chuvsu`) as `sum`
				FROM `requests`
                INNER JOIN `users_sections` ON `requests`.`ID` = `users_sections`.`id_request`
				WHERE `place` != 4 AND `requests`.`id_section` = ?",[$cp['ID']], TRUE);
			if ($ss[0]['places'] > floor($cp['count']*0.3) && $sss[0]['sum'] == $sss[0]['count'])
			$this->all []= [
					'name' =>$cp['name']. ' Докладов:'.$cp['count'].' Мест= '.$ss[0]['places'].'  Max= '.floor($cp['count']*0.3),
					'count' => $cp['count'].' = '.$ss[0]['places'].'/'.floor($cp['count']*0.3),
			];
		
			// foreach ($s as $countPlace) {
			// $this->all []= [
			// 		'name' =>'Факультет '.$countPlace['fac_name'].' '.$countPlace['name'],
			// 		'count' => $countPlace['count'],
			// ];
		}
		
		
		
		$this->all []= [
					'name' =>"<b>участники из учреждений: </b>",
					'count' => '',
			];
		$s = DataBase::SQL("
		SELECT COUNT(*) AS `count`, `users_sections`.`name_organization`
		FROM `users_sections`  
		INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
		INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
		INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
		WHERE `events`.`ID` = ?
		GROUP BY `name_organization` ORDER BY `count` ",[$this->getID()], TRUE);
		foreach ($s as $countPlace) {
			$this->all []= [
					'name' =>$countPlace['name_organization'],
					'count' => $countPlace['count'],
			];
		}
		
// 		$this->all []= [
// 					'name' =>"<b>Для отчета </b>",
// 					'count' => '',
// 			];
		
// 		$s = DataBase::SQL("
// 			SELECT   `facs`.`name`,`facs`.`ID`, `type_sections`.`type`, `sections`.`name` as `sec_name` , COUNT(`requests`.`ID`) as `c_id`, COUNT(`users_sections`.`num_student`) as `c_n`,
// GROUP_CONCAT(
//   `users_sections`.`name_organization`
//   ORDER BY `users_sections`.`name_organization` 
//   SEPARATOR ';'
// ) as `concat`
// FROM `users_sections`
// INNER JOIN `requests` ON `requests`.`ID` = `users_sections`.`id_request`
// INNER JOIN `sections` ON `sections`.`ID` = `requests`.`id_section`
// INNER JOIN `events`   ON `events`.`ID`   = `sections`.`id_event`
// INNER JOIN `type_sections` ON `type_sections`.`ID` = `sections`.`id_type_section`
// INNER JOIN `facs` 	  ON `facs`.`ID` = `sections`.`id_fac`
// WHERE  `events`.`ID` = 2 AND `type_sections`.`ID` != 1
// GROUP BY `sections`.`id_fac`, `sections`.`id_type_section`
// ORDER BY  `sections`.`id_fac`, `sections`.`id_type_section`
// ",[$this->getID()], TRUE);
// 			$u = [];
// 			foreach ($s as $c) {
// 				if (!isset($u[$c['ID']]))
// 					$u[$c['ID']][0] = $c;
// 				else
// 					$u[$c['ID']] []= $c;
// 			}
// 			foreach ($u as $key => $y) {
// 				$this->all []= [
// 					'name' =>"<b>".$y[0]['name']."</b>",
// 					'count' => '',
// 				];	
				
// 				// var_dump($y);
// 				foreach ($y as $t) {
					
// 					$this->all []= [
// 							'name' => $t['type'].': '.$t['sec_name'].' <br>откуда: '.$t['concat'],
// 							'count' => $t['c_id'].' '.$t['c_n'],
// 					];
// 				}
// 			}
			
		
		

		
		

		
		
	}
	
	public function getEvents()	{
		
		return DataBase::SQL("
		SELECT *
		FROM `events`",[$this->getID()], TRUE);
	}

	/*
	* Топ 20 участников
	*
	*/
	public function topTwentyUsers()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(*) AS `count`, `users_sections`.`last_name`,`users_sections`.`num_student`  FROM `users_sections` WHERE `num_student` != ' ' GROUP BY  `num_student` ORDER BY `count` DESC LIMIT 20");
		$stmt->execute();
		return $stmt->fetchAll();
	}
	

	/*
	* Подсчитываем участников-гостей
	*
	*/
	public function countGuestRequest()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(*) AS `count`  FROM `users_sections` WHERE `name_organization` != 'ФГБОУ ВО «ЧГУ им. И.Н. Ульянова»'");
		$stmt->execute();
		$s = $stmt->fetchAll();
		$s[0]['text'] = "Кол-во гостей-участников";
		return $s[0];
	}
	/*
	* Подсчитываем участников-гостей
	*
	*/
	public function countGuestRequestChuvsu()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(*) AS `count`  FROM `users_sections` WHERE `name_organization` = 'ФГБОУ ВО «ЧГУ им. И.Н. Ульянова»'");
		$stmt->execute();
		$s = $stmt->fetchAll();
		$s[0]['text'] = "Количество участников из ЧувГУ";
		return $s[0];
	}
	/*
	* Подсчитываем количество рекомендаций
	*
	*/
	public function countRecommend()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(`recommendations`.`ID`) AS `count`,`recommendations`.`recommendation` AS `text`
		FROM `requests`
		
		INNER JOIN `recom_request` ON `requests`.`ID` = `recom_request`.`id_request`
		INNER JOIN `recommendations` ON `recommendations`.`ID` = `recom_request`.`id_recom`
		WHERE `checked` = 1
		GROUP BY `recommendations`.`ID`");
		$stmt->execute();
		return $stmt->fetchAll();
	}
	
	/*
	* Подсчитываем количество научных руководителей
	*
	*/
	public function countLeaders()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(*) AS `count`,`positions`.`name`
		FROM `leaders`
		INNER JOIN `positions` ON `leaders`.`id_position` = `positions`.`ID`
		GROUP BY `leaders`.`id_position`");
		$stmt->execute();
		return $stmt->fetchAll();
	}
	
	/*
	* Подсчитываем количество по плану/вне плана 
	*
	*/
	public function countOutOnPlan()
	{
		$stmt = DataBase::query()->prepare("SELECT COUNT(`requests`.`out_plan`) AS `count`,`requests`.`out_plan` FROM `requests` GROUP BY `requests`.`out_plan`");
		$stmt->execute();
		return $stmt->fetchAll();
	}
	
	/*
	* Подсчитываем количество секций 
	*
	*/
	public function countSectionsOld()
	{
		$stmt = DataBase::query()->prepare("
		SELECT COUNT(`sections`.`id_fac`) AS `count`,`sections`.`name`, `facs`.`ID` AS `id_fac`
		FROM `sections`
		INNER JOIN  `facs` ON `facs`.`ID` = `sections`.`id_fac`");
		$stmt->execute();
		return $stmt->fetchAll();
		
	}
	
	/*
	* Подсчитываем количество докладов на секциях
	*
	*/
	public function countRequests()
	{
		$stmt = DataBase::query()->prepare("
		SELECT  COUNT(`requests`.`id_section`) AS `count`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
		INNER JOIN `facs` ON `facs`.`ID` = `sections`.`id_fac`");

		$stmt->execute();
		$s = $stmt->fetchAll();
		$s[0]['text'] = "Количество докладов";
		return $s[0];
	}
	/*
	* Подсчитываем количество докладов на секциях на чгу
	*
	*/
	public function countRequestsChuvsu()
	{
		// $stmt = DataBase::query()->prepare("
		// SELECT  COUNT(`requests`.`id_section`) AS `count`
		// FROM  `sections`
		// INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
		// INNER JOIN `facs` ON `facs`.`ID` = `sections`.`id_fac`");

		// $stmt->execute();
		// $s = $stmt->fetchAll();
		$s[0]['count'] = '3746';
		
		$s[0]['text'] = "Докладов c чгу";
		return $s[0];
	}
	/*
	* 
	*
	*/
	public function countSectionAllFaculties()
	{
		$stmt = DataBase::query()->prepare("
		SELECT 
				COUNT(*) AS `count`,
				`facs`.`name` 
			FROM `sections` 
			INNER JOIN `facs` 
			ON `facs`.`ID`=`sections`.`id_fac` 
			GROUP BY `sections`.`id_fac` ");
		
		$stmt->execute();
		return $stmt->fetchAll();

	}
	public function countRequestAllFaculties()
	{
		$stmt = DataBase::query()->prepare("
		SELECT 
				COUNT(*) AS `count`,
				`facs`.`name` 
			FROM `sections` 
			INNER JOIN `facs` 
			ON `facs`.`ID`=`sections`.`id_fac` 
			INNER JOIN `requests` 
			ON `requests`.`id_section` = `sections`.`ID`
			GROUP BY `sections`.`id_fac` ");
		
		$stmt->execute();
		return $stmt->fetchAll();

	}
	public function countPlacePlacesAllFaculties()
	{
		$stmt = DataBase::query()->prepare("
			SELECT 
				COUNT(*) AS `count`,
				`facs`.`name`,
				`facs`.`ID`,
                `requests`.`place`
			FROM `sections` 
			INNER JOIN `facs` 
			ON `facs`.`ID`=`sections`.`id_fac` 
			INNER JOIN `requests` 
			ON `requests`.`id_section` = `sections`.`ID`
            WHERE  `requests`.`place` != 4
			GROUP BY `sections`.`id_fac`, `requests`.`place`
			ORDER BY  `facs`.`ID`");
		
		$stmt->execute();
		return $stmt->fetchAll();

	}
	public function countPlaceRequestsAllFaculties()
	{
		$stmt = DataBase::query()->prepare("
			SELECT 
				COUNT(*) AS `count`,
				`facs`.`name`

			FROM `sections` 
			INNER JOIN `facs` 
			ON `facs`.`ID`=`sections`.`id_fac` 
			INNER JOIN `requests` 
			ON `requests`.`id_section` = `sections`.`ID`
			GROUP BY `sections`.`id_fac`
			ORDER BY  `facs`.`ID`");
		$stmt->execute();
		return $stmt->fetchAll();

	}
	
	/*
	* Подсчитываем количество мест на секциях
	*
	*/
	public function countPlaces()
	{
		$stmt = DataBase::query()->prepare("
		SELECT  COUNT(`requests`.`id_section`) AS `count` , `requests`.`place` as `text`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
		INNER JOIN `facs` ON `facs`.`ID` = `sections`.`id_fac`
		WHERE  `requests`.`place` != 4
		GROUP BY `requests`.`place`");
		$stmt->execute();
		return $stmt->fetchAll();
	}
	public function countPlacesChuvsu()
	{
		
		
		return [
			[ 'count' => 371, 'text' => 1],
			[ 'count' => 431, 'text' => 2],
			[ 'count' => 448, 'text' => 3]
		];
	}
	public function countInst()
	{
		$stmt = DataBase::query()->prepare("
		SELECT  COUNT(`users_sections`.`name_organization`) AS `count` , `users_sections`.`name_organization` as `text`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
        INNER JOIN `users_sections` ON `users_sections`.`id_request` = `requests`.`ID`
		INNER JOIN `facs` ON `facs`.`ID` = `sections`.`id_fac`
		GROUP BY  `users_sections`.`name_organization`
		ORDER BY  `count`  DESC" );
		$stmt->execute();
		return $stmt->fetchAll();
	}
	

	/*
	* Подсчитываем количество докладов на секциях
	*
	*/
	public function countSectionsOfFacs($id_fac)
	{
		$stmt = DataBase::query()->prepare("
		SELECT  `sections`.`name`,`sections`.`id_type_section`,COUNT(`requests`.`id_section`) AS `count`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
		INNER JOIN `facs` ON `facs`.`ID` = `sections`.`id_fac`
		GROUP BY `requests`.`id_section`");
		$stmt->bindValue(1,  $id_fac, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetchAll();
	}
	/*
	* Подсчитываем количество участников чгу в докладах
	*
	*/
	public function countRequestUsersByReportChuvsu($id_fac)
	{
		$stmt = DataBase::query()->prepare("
		SELECT COUNT(`users_sections`.`id_type_inst`) AS `count`,`users_sections`.`name_organization`, `user_types_inst`.`type`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
        INNER JOIN `users_sections` ON  `requests`.`ID` = `users_sections`.`id_request`
        INNER JOIN `user_types_inst` ON  `user_types_inst`.`ID` = `users_sections`.`id_type_inst`
		WHERE 
			`users_sections`.`id_type_inst` = 1 
			AND `users_sections`.`num_student` != ' ' 
			AND `sections`.`id_type_section` = 1 
			AND `sections`.`id_fac` = ?
		GROUP BY `users_sections`.`id_type_inst`");
		$stmt->bindValue(1,  $id_fac, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetchAll();
	}
	/*
	* Подсчитываем количество участников
	*
	*/
	public function countRequestUsersByReport($id_fac)
	{
		$stmt = DataBase::query()->prepare("
		SELECT COUNT(`users_sections`.`name_organization`) AS `count`,`users_sections`.`name_organization`, `user_types_inst`.`type`
		FROM  `sections`
		INNER JOIN `requests` ON `requests`.`id_section` = `sections`.`ID`
        INNER JOIN `users_sections` ON  `requests`.`ID` = `users_sections`.`id_request`
        INNER JOIN `user_types_inst` ON  `user_types_inst`.`ID` = `users_sections`.`id_type_inst`
		WHERE 
			`sections`.`id_fac` = ?
		GROUP BY `users_sections`.`name_organization`");
		$stmt->bindValue(1,  $id_fac, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetchAll();
	}
	/*
	* Подсчитываем количество гостей
	*
	*/
	public function getGuests()
	{
		$stmt = DataBase::query()->prepare("
		SELECT `user_types_inst`.`type`, `guests`.`name_organization`,`positions`.`name`, SUM(`guests`.`count`) AS `num`
		FROM `sections`
		INNER JOIN `guests`
		ON `guests`.`id_section` = `sections`.`ID`
		INNER JOIN `user_types_inst` ON `guests`.`id_user_types_inst` = `user_types_inst`.`ID`
		INNER JOIN `positions` ON `guests`.`id_position` = `positions`.`ID`
		WHERE `guests`.`count` > 0
		GROUP BY  `guests`.`name_organization`,`guests`.`id_position`		");
	
		$stmt->execute();
		return $stmt->fetchAll();
	}
	
	
}