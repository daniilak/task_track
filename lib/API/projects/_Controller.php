<?php
require_once(__DIR__ . '/_DB.php');

class Projects extends ProjectsDB {
	
	function getAll() {
		$d = $this->select();
		
		return $d;
	}
	function getByID() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->selectByID(intval($_POST['id']));
		
		return $d;
	}
	
	function add(){
		if (!isset($_POST['name'])) {
			$this->withJson(['error'=>'no param']);
		}

		$d = $this->insert($_POST['name'], intval($GLOBALS['user']['ID']));
		
		return $d;
	}
	function addByCode(){
		if (!isset($_POST['code'])) {
			$this->withJson(['error'=>'no param']);
		}

		$d = $this->updateByCode($_POST['code'], intval($GLOBALS['user']['ID']));
		
		return $d;
	}
	function updateName(){
		if (!isset($_POST['name'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->update(intval($_POST['id']),$_POST['name']);
		
		return ['success'=>true];
	}
	function updateCode(){

		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->updateMd5(intval($_POST['id']));
		
		return $d;
	}
	
	
	
	function remove(){
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$d = $this->deleteByID(intval($_POST['id']));
		
		return $d;
	}
	
	function withJson($arr){
		echo json_encode($arr);
		exit();
	}
}
