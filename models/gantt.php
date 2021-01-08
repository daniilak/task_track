<?php
Cookies::authCheck();
$exp = explode('/', $_GET['route']);
$projectID = 0;
if (count($exp) == 2) {
	if (isset($exp[1])) {
		$projectID = intval($exp[1]);
	}
}

$projects = DataBase::SQL("SELECT `projects`.`ID`, `projects`.`name`, `projects`.`date_created` FROM `projects` WHERE `is_removed` = 0 AND `ID` = ?;", [$projectID]);
$users = DataBase::SQL("SELECT `users`.`ID`, `users`.`name` FROM `users`");

$data = '';
$links = '';
$user = '';
for ($i = 0; $i < count($users); $i++) {
	$user.= '{
			key: '.$users[$i]['ID'].',
			label: "'.$users[$i]['name'].'"},';
}

$linksID = 1; 
for ($i = 0; $i < count($projects); $i++) {
	$projects[$i]['ID'];
	$date_createdA = explode(" ",$projects[$i]['date_created']);
	$date_createdd = explode("-", $date_createdA[0]);
	$date_created = $date_createdd[2]."-".$date_createdd[1]."-".$date_createdd[0];
	$date_start = $date_createdd[0].",".(intval($date_createdd[1]) - 1).",".intval($date_createdd[2]);
	// $data .= '{
	// 	"id":'.($projects[$i]['ID']*10000).', "text":"Project #'.$projects[$i]['ID'].' '.$projects[$i]['name'].'", "start_date":"'.$date_created.'", "duration":"'.($projects[$i]['ID']*50).'", "progress": 0, "stage":0, "open": true},';
	
	
	$cards = DataBase::SQL("SELECT `ID`, `status`, `id_author`,`id_worker`,`name`,`date_created`,`date_deadline`, `id_parent`, `priority` FROM `cards` WHERE `id_project` = ? ORDER BY ID;", [$projects[$i]['ID']]);
	
	
	for ($k = 0; $k < count($cards); $k++) {
		$date_createdA = explode(" ",$cards[$k]['date_created']);
		$date_created0 = explode("-", $date_createdA[0]);
		$date_created1 = explode(":", $date_createdA[1]);
		$date_created = $date_created0[2]."-".$date_created0[1]."-".$date_created0[0]." ".$date_created1[0].':'.$date_created1[1];
		
		$date_deadlineA = explode(" ",$cards[$k]['date_deadline']);
		$date_deadline = explode("-", $date_deadlineA[0]);
		$date_deadline = $date_deadline[2]."-".$date_deadline[1]."-".$date_deadline[0];
		
		// $projects[$i]['ID']*10000
		$parent = ($cards[$k]['id_parent'] == 0) ? 0 : $cards[$k]['id_parent'];
		$progress = 0;
		$stage = 0;
		if ($cards[$k]['status'] == "appointed") {
			$progress = 0;
			$stage = 0;
		}
		if ($cards[$k]['status'] == "worked") {
			$progress = 0.3;
			$stage = 1;
		}
		if ($cards[$k]['status'] == "tested") {
			$progress = 0.6;
			$stage = 2;
		}
		if ($cards[$k]['status'] == "done") {
			$progress = 1;
			$stage = 3;
		}
		$start = strtotime($date_created0[2]."-".$date_created0[1]."-".$date_created0[0]);
		$end = strtotime($date_deadline);
		
		$days_between = ceil(abs($end - $start) / 86400);
		if ($days_between > 738100) {
			$days_between = 100;
		}
			$data .= '{
				id: '.$cards[$k]['ID'].',
				text: "Task #'.$cards[$k]['ID'].' '.$cards[$k]['name'].'",
				start_date: "'.$date_created.'",
				progress:'.$progress.',
				duration: '.$days_between.',
				priority: '.$cards[$k]['priority'].',
				stage: '.$stage.',
				user: '.$cards[$k]['id_worker'].',
				open: '.(($cards[$k]['status'] =='done') ? "false": "true").',
				parent: '.$cards[$k]['id_parent'].'
			},';
			
		// $data .= '{
		// "id":'.$cards[$k]['ID'].', "text":"Task #'.$cards[$k]['ID'].' '.$cards[$k]['name'].'", "start_date":"'.$date_created.'", "duration":"'.$days_between.'", "parent":"'.($parent).'", "progress":'.$progress.', "open": '.(($cards[$k]['status'] =='done') ? "false": "true") .', "stage":'.$stage.'},';
		
		$links .= '{
			"id":"'.$linksID.'","source":"'.$parent.'","target":"'.$cards[$k]['ID'].'","type":"0"},';
		$linksID= $linksID + 1;
	}
	
	// {"id":2, "text":"Task #1", "start_date":"02-04-2018", "duration":"8", "parent":"1", "progress":0.5, "open": true},
}
// 
// 


$template = new TemplateEngine("gant.tpl");
$template->templateSetVar('data', $data);
$template->templateSetVar('links', $links);
$template->templateSetVar('user', $user);
$template->templateSetVar('date_start', $date_start);

$template->templateCompile();
$template->templateDisplay();