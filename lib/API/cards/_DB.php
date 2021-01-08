<?php

class CardsDB {
	
	function __construct() {
		$this->nameTable = 'cards';
	}
	function selectDetales($id) {
		return DataBase::SQL(
            "SELECT 
            	*
            	FROM `detales`
            	WHERE `id_card` = ? ORDER BY ID DESC",
            [$id]
        );
        
	}
	function insertDetalesComment($id_card,$comment) {
		DataBase::SQL(
			"INSERT INTO `detales` 
			(`id_card`,`type_detale`, `from_u_id`, `type_edit`, `msg`)
			VALUES (?,?,?,?,?) ", [$id_card, 'msg' ,$_COOKIE['id'], 'msg', $comment], false);
		return ["code"=> 0];
	}
	function select($id) {
		
		$s = DataBase::SQL(
            "SELECT 
            	status
            	FROM `project_users`
            	WHERE `id_user` = ? AND  id_project = ? LIMIT 1",
            [$GLOBALS['user']['ID'], $id]
           );
        $status = $s[0]['status'];
        
        if ($status == 0) {
        	return [];
        }
        if ($status == 5) {
        	$cards = DataBase::SQL(
		        "SELECT 
		        	*
		        	FROM `".$this->nameTable."`
		        	WHERE `id_project` = ? AND (id_worker = ? OR status = 'tested')
		        	ORDER BY `ID` DESC",
		        [$id, $GLOBALS['user']['ID']]
		    );
        }
        
        if ($status == 4) {
        	$cards = DataBase::SQL(
		        "SELECT 
		        	*
		        	FROM `".$this->nameTable."`
		        	WHERE `id_project` = ? AND id_worker = ?
		        	ORDER BY `ID` DESC",
		        [$id, $GLOBALS['user']['ID']]
		    );
        }

        if ($status > 0 && $status < 4 ) {
        	$cards = DataBase::SQL(
		        "SELECT 
		        	*
		        	FROM `".$this->nameTable."`
		        	WHERE `id_project` = ?
		        	ORDER BY `ID` DESC",
		        [$id]
		    );
        }
		// Узнаем, какая status у человека 
		// Если status == 0 or status == 4 or status == 5
		// id_worker == X and id_worker == 0
		
		
        for ($i = 0; $i < count($cards); $i++) {
        	$s = DataBase::SQL(
	            "SELECT 
	            	name
	            	FROM `users`
	            	WHERE `ID` = ?",
	            [$cards[$i]['id_author']]
	        );
	        $cards[$i]['author_name'] = $s[0]['name'];
	        
	        $cards[$i]['worker_name'] = "Не выбран";
	        if ($cards[$i]['id_worker'] > 0 ) {
	        	$s = DataBase::SQL(
		            "SELECT 
		            	name
		            	FROM `users`
		            	WHERE `ID` = ?",
		            [$cards[$i]['id_worker']]
		        );
		        $cards[$i]['worker_name'] = $s[0]['name'];
	        }
        	
        }
		return $cards;
	}
	function insert($id, $user_id) {
	
		DataBase::SQL(
            "INSERT INTO  `".$this->nameTable."`
	             (id_project, id_author)
	             VALUES (?, ?)",
            [$id, $user_id],
            false
        );
        return ["code"=> 0];
	}
	function updateField($id_card,  $val, $action) {
		if ($action == "edit_name_card") {
			$action = "name";
		}
		if ($action == "edit_desc_card") {
			$action = "description";
		}
		
		if ($action == "edit_priority_card") {
			$action = "priority";
		}
		if ($action == "edit_deadline_card") {
			$action = "date_deadline";
		}
		if ($action == "edit_readline_card") {
			$action = "date_readline";
		}
		if ($action == "edit_worker_card") {
			$action = "id_worker";
		}
		if ($action == "edit_parent_card") {
			$action = "id_parent";
		}
		
		$s = DataBase::SQL("SELECT `id_project` FROM `cards` WHERE `ID` = ?",[$id_card]);
		
		$Id_project = $s[0]['id_project'];
		$s = DataBase::SQL("SELECT COUNT(*) as count  FROM `project_users` WHERE `id_user` = ? AND `id_project` = ? AND status > 0 AND status <= 2;",[$GLOBALS['user']['ID'], $Id_project]);
		if ($s[0]['count'] == 0 && $action != 'edit_col_card') {
			return ["code"=> 1];
		} 
		if ($action == "edit_col_card") {
			// если в туду:
			
			$dataCard = DataBase::SQL("SELECT * FROM `cards` WHERE `ID` = ?",[$id_card]);
			if ($dataCard[0]['status'] == "appointed") {
				
				if ($dataCard[0]['id_worker'] == "0") {
					return ["code"=> 4];
				}
				if ($dataCard[0]['date_deadline'] == "0000-00-00 00:00:00") {
					return ["code"=> 4];
				}
				if ($dataCard[0]['date_readline'] == "0000-00-00 00:00:00") {
					return ["code"=> 4];
				}
				
			}
			// если не заполнено
			// 
			$action = "status";
			$count = DataBase::SQL("SELECT `ID`,`id_parent`,`status` FROM `cards` WHERE `id_parent` = ?",[$id_card]);
			
			if (count($count) != 0) {
				for ($i = 0; $i < count($count); $i++) {
					if ($count[$i]['status'] != $val) {
						return ["code"=> 2, 'old'=>$dataCard[0]['status']];
					}
				}
				
			}
			$s = DataBase::SQL(
	            "SELECT 
	            	status
	            	FROM `project_users`
	            	WHERE `id_user` = ? AND  id_project = ? LIMIT 1",
	            [$GLOBALS['user']['ID'], $Id_project]
	           );
	        $status = $s[0]['status'];
	        
	        if ($status == 5) {
	        	$count = DataBase::SQL(
					"SELECT COUNT(*) as count 
					FROM detales 
					WHERE `ID` > 
						(SELECT `ID`  
						FROM `detales` 
						WHERE `id_card` = ?  AND `now_val` = 'tested' 
						ORDER BY `ID`  DESC  
						LIMIT 1
						) AND `id_card` = ? AND `from_u_id` = ?  AND `type_detale` = 'msg';",[$id_card,$id_card,$_COOKIE['id']]);
				if ($count[0]['count'] == 0) {
					return ["code"=> 3];
				}
	        }
			
			//  проверить, что в detales есть msg от автора $_COOKIE['id'] после 
			// проверить, что 
			// нет других карточек, которые ссылаются на неё - то ок
			// если есть, то 
			// 
		}
		$lastVal = DataBase::SQL("SELECT `".$action."` as last_val FROM cards WHERE `ID` = ?", [$id_card]);
		$lastVal = trim($lastVal[0]['last_val']);
		$val = trim($val);
		if ($lastVal == $val) {
			return ["code"=> 0];
		}
		DataBase::SQL("UPDATE cards SET `".$action."` = ? WHERE `ID` = ?", [trim($val), $id_card], false);
		
		DataBase::SQL(
			"INSERT INTO `detales` 
			(`id_card`,`type_detale`, `from_u_id`, `last_val`, `now_val`, `type_edit`)
			VALUES (?,?,?,?,?,?) ", [$id_card, 'edit' ,$_COOKIE['id'], $lastVal, $val, $action], false);
		
        return ["code"=> 0];
	}
	

	
	
}