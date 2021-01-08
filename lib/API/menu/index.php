<?php
require_once(__DIR__ . '/_Controller.php');
$d = new Menu();

switch ($params[2]) {
	case "get":
		$d->withJson($d->get());
	break;
	case "getOpen":
		$d->withJson($d->getOpen());
	break;
	default:
		$d->withJson(["error"=>"default"]);	
}

exit();


