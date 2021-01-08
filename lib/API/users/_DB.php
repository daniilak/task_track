<?php

class UsersDB {
	function selectByID($id) {
		return DataBase::SQL(
            "SELECT `ID`, `id_vk`, `id_role`, `name` FROM `users` WHERE `ID` = ?",
            [$id]
        );
		
	}
	function select() {
		return DataBase::SQL(
            "SELECT `ID`, `id_vk`, `id_role`, `name` FROM `users` ORDER BY `name`"
        );
	}

	function updateByID($id, $val, $idproject) {
		DataBase::SQL(
            "UPDATE project_users SET status = ? WHERE ID = ? AND id_project = ?", [$val, $id, $idproject], false
        );
        return ['code'=>0];
	}
	
	
	function removeByID($id, $idproject) {
		DataBase::SQL(
            "DELETE FROM project_users WHERE ID = ? AND id_project = ?", [$id, $idproject], false
        );
        return ['code'=>0];
	}
	
	
	function selectByIDProject($id) {
		return DataBase::SQL(
            "SELECT `project_users`.`ID` AS `pr_id`,`users`.`ID` AS `us_id`, `id_vk`, `name`, `photo`, `id_role` , `status` 
            FROM `users` 
            INNER JOIN `project_users` 
            ON `project_users`.`id_user` = `users`.`ID` 
            WHERE `project_users`.`id_project` = ? 
            ORDER BY `name`", [$id]
        );
	}

	
	function updateStatusUser($status) {
		
	}
	
}