<?php
require_once(__DIR__ . '/_DB.php');

class Cards extends CardsDB {
	
	function getAll() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->select(intval($_POST['id']));
		
		return $d;
	}
	function getDetales() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->selectDetales(intval($_POST['id']));
		
		return $d;
	}
	function commentCard() {
		if (!isset($_POST['id_card'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['comment'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->insertDetalesComment(intval($_POST['id_card']), trim($_POST['comment']));
		
		return $d;
	}
	
	
	function updateCard() {
		if (!isset($_POST['value'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['id_card'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['action'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->updateField(intval($_POST['id_card']), $_POST['value'], $_POST['action']);
		
		return $d;
	}
	
	// function getByID() {
	// 	if (!isset($_POST['id'])) {
	// 		$this->withJson(['error'=>'no param']);
	// 	}
	// 	$d = $this->selectByID(intval($_POST['id']));
		
	// 	return $d;
	// }
	
	function add(){
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}

		$d = $this->insert($_POST['id'], intval($GLOBALS['user']['ID']));
		
		return $d;
	}
	// function addByCode(){
	// 	if (!isset($_POST['code'])) {
	// 		$this->withJson(['error'=>'no param']);
	// 	}

	// 	$d = $this->updateByCode($_POST['code'], intval($GLOBALS['user']['ID']));
		
	// 	return $d;
	// }
	
	
	// function remove(){
	// 	if (!isset($_POST['id_news'])) {
	// 		$this->withJson(['error'=>'no param']);
	// 	}
	// 	$d = $this->insert(intval($_POST['text']));
		
	// 	return ['success'=>true];
	// }
	
	function withJson($arr){
		echo json_encode($arr);
		exit();
	}
}
