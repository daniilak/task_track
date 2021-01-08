<?php
require_once(__DIR__ . '/_DB.php');
class Users extends UsersDB {
	function getAllProject() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$user = $this->selectByIDProject(intval($_POST['id']));
		
		return $user;
	}
	function getByID() {
		if (!isset($_POST['user_id'])) {
			$this->withJson(['error'=>'no param']);
		}
		$user = $this->selectByID(intval($_POST['user_id']));
		
		return $user;
	}
	function editUser() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['idProject'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['val'])) {
			$this->withJson(['error'=>'no param']);
		}
		
		$user = $this->updateByID(intval($_POST['id']), intval($_POST['val']), intval($_POST['idProject']));
		
		return $user;
	}
	function removeUser() {
		if (!isset($_POST['id'])) {
			$this->withJson(['error'=>'no param']);
		}
		if (!isset($_POST['idProject'])) {
			$this->withJson(['error'=>'no param']);
		}
		
		
		$user = $this->removeByID(intval($_POST['id']), intval($_POST['idProject']));
		
		return $user;
	}
	
	function getAll() {
		$user = $this->select();
		
		return $user;
	}
	
	function upStatusUser() {
		$user = [];
		
		return $user;
	}
	
	function downStatusUser() {
		$user = [];
		
		return $user;
	}
	function withJson($arr){
		echo json_encode($arr);
		exit();
	}
}
