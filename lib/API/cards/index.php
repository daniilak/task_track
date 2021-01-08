<?php
Cookies::authCheck();
require_once(__DIR__ . '/_Controller.php');
$d = new Cards();
switch ($params[2]) {
	case "getAll":
		$d->withJson($d->getAll());
	break;
	case "getByID":
		$d->withJson($d->getByID()[0]);
	break;
	case "insert":
		$d->withJson($d->add());
	break;
	case "appendByCode":
		$d->withJson($d->addByCode());
	break;
	case "updateCard":
		$d->withJson($d->updateCard());
	break;
	case "getDetales":
		$d->withJson($d->getDetales());
	break;
	case "commentCard":
		$d->withJson($d->commentCard());
	break;
	
	case "remove":
		$d->withJson($d->remove());
	break;
	default:
		$d->withJson(["error"=>"default"]);	
}

exit();


