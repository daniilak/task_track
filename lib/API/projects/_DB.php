<?php

class ProjectsDB {
	
	function __construct() {
		$this->nameTable = 'project_users';
	}
	
	function select() {
		return DataBase::SQL(
            "SELECT 
            	`projects`.`ID`,
            	`projects`. `date_created`,
            	`projects`.`is_removed`,
            	`projects`. `name`,
            	`projects`. `code`,
            	`projects`. `roles`,
            	`project_users`.`id_role`,
            	`project_users`.`date_assigned`,
            	`project_users`.`status`
            	
            	
            	FROM `".$this->nameTable."`
            	INNER JOIN `projects` 
            		ON `projects`.`ID` = `project_users`.`id_project` 
            	WHERE `project_users`.`id_user` = ?
            	ORDER BY `projects`.`ID` DESC",
            [$_COOKIE["id"]]
        );
	}
	function selectByID($id) {
		return DataBase::SQL(
            "SELECT 
            	`projects`.`ID`,
            	`projects`. `date_created`,
            	`projects`. `name`,
            	`projects`. `code`,
            	`projects`. `roles`,
            	`project_users`.`id_role`,
            	`project_users`.`id_user`,
            	`project_users`.`date_assigned`,
            	`project_users`.`status`
            	
            	
            	FROM `".$this->nameTable."`
            	INNER JOIN `projects` 
            		ON `projects`.`ID` = `project_users`.`id_project` 
            	WHERE `projects`.`id` = ? 
            	ORDER BY `projects`.`ID` DESC",
            [$id]
        );
	}
	
	function insert($name, $id_user) {
		
		$code = strval(md5(time()));
				
		
		DataBase::SQL(
			"INSERT INTO `projects` (`name`, `code`) VALUES (?,?)",
			[$name, $code],
            false
		);

		$s = DataBase::SQL("SELECT MAX(`ID`) AS `max` FROM `projects` LIMIT 1", false, true);

		DataBase::SQL(
			"INSERT INTO `".$this->nameTable."`  (`id_user`, `id_project`, `id_role`, `status`) VALUES (?, ?, 0, 1)",
			[$id_user, $s[0]['max']],
            false
		);
		return $this->getLast();
	}
	function updateByCode($code, $id_user) {
		
		$s = DataBase::SQL("SELECT COUNT(*) AS `count` FROM `projects` WHERE `code` LIKE ? LIMIT 1", [$code], true);
		if (intval($s[0]['count']) == 0) {
			return ["code"=> 2];
		}
		$s = DataBase::SQL("
		SELECT COUNT(*) AS `count` 
		FROM `projects` 
		INNER JOIN `project_users` 
			ON `project_users`.`id_project` = `projects`.`ID`  
		WHERE `code` LIKE ? AND `project_users`.`id_user` = ?
		LIMIT 1", [$code, $id_user], true);
		if (intval($s[0]['count']) >= 1) {
			return ["code"=> 1];
		} 
		
		$s = DataBase::SQL("SELECT `ID` FROM `projects` WHERE `code` LIKE ? LIMIT 1", [$code], true);
		DataBase::SQL(
			"INSERT INTO `project_users`  (`id_user`, `id_project`, `id_role`) VALUES (?, ?, 1)",
			[$id_user, $s[0]['ID']],
            false
        );
        return ["code"=> 0];
		
	}
	function update($id, $name) {
		$s = DataBase::SQL(
			"SELECT COUNT(*) AS `count` 
			FROM `projects` 
			INNER JOIN `project_users` 
			ON `project_users`.`id_project` = `projects`.`ID`  
			WHERE `projects`.`ID`  = ? AND `project_users`.`id_user` = ?
			LIMIT 1",
			[$id, $_COOKIE["id"]],
			true
		);
		if (intval($s[0]['count']) == 0) {
			return ["code"=> 1];
		} 
		DataBase::SQL(
			"UPDATE `projects`  SET `name` = ? WHERE `ID` = ?",
			[$name, $id],
            false
        );
        return ["code"=> 0];
		
	}
	function updateMd5($id) {
		$s = DataBase::SQL(
			"SELECT COUNT(*) AS `count` 
			FROM `projects` 
			INNER JOIN `project_users` 
			ON `project_users`.`id_project` = `projects`.`ID`  
			WHERE `projects`.`ID`  = ? AND `project_users`.`id_user` = ?
			LIMIT 1",
			[$id, $_COOKIE["id"]],
			true
		);
		if (intval($s[0]['count']) == 0) {
			return ["code"=> 1];
		} 
		$code = md5(time());
		DataBase::SQL(
			"UPDATE `projects`  SET `code` = ? WHERE `ID` = ?",
			[$code, $id],
            false
        );
        return ["code"=> $code];
		
	}
	function deleteByID($id) {
		$s = DataBase::SQL(
			"SELECT COUNT(*) AS `count` 
			FROM `projects` 
			INNER JOIN `project_users` 
			ON `project_users`.`id_project` = `projects`.`ID`  
			WHERE `projects`.`ID`  = ? AND `project_users`.`id_user` = ?
			LIMIT 1",
			[$id, $_COOKIE["id"]],
			true
		);
		if (intval($s[0]['count']) == 0) {
			return ["code"=> 1];
		} 
		DataBase::SQL(
			"UPDATE `projects`  SET `is_removed` = 1 WHERE `ID` = ?",
			[$id],
            false
        );
        return ["code"=> 0];
		
	}
	

	function getLast() {
		$s = DataBase::SQL("SELECT MAX(`ID`) AS `max` FROM `".$this->nameTable."` LIMIT 1");
		return $s[0]['max'];
	}
	
	
}