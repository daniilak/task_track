<?php
Cookies::authCheck();
require_once(__DIR__ . '/_Controller.php');
$d = new Projects();
switch ($params[2]) {
	case "getAll":
		$d->withJson($d->getAll());
	break;
	case "getByID":
		$d->withJson($d->getByID()[0]);
	break;
	case "append":
		$d->withJson($d->add());
	break;
	case "appendByCode":
		$d->withJson($d->addByCode());
	break;
	
	case "update":
		$d->withJson($d->updateName());
	break;
	
	case "updateCode":
		$d->withJson($d->updateCode());
	break;
	
	
	case "remove":
		$d->withJson($d->remove());
	break;
	default:
		$d->withJson(["error"=>"default"]);	
}

exit();


