<?php
Cookies::authCheck();

function getStatus($status) {
	if ($status == 0) {
		return ", не выбрана роль";
	}
	if ($status == 1) {
		return ", менеджер проекта";
	}
	if ($status == 2) {
		return ", аналитик";
	}
	if ($status == 3) {
		return ", лидер команды разработчиков";
	}
	if ($status == 4) {
		return ", разработчик";
	}
	if ($status == 5) {
		return ", тестировщик";
	}
}
$exp = explode('/', $_GET['route']);
$projectID = 0;
if (count($exp) == 2) {
	if (isset($exp[1])) {
		$projectID = intval($exp[1]);
	}
}
$s = DataBase::SQL(
	"SELECT *  FROM `project_users` WHERE `id_user` = ? AND `id_project` = ?",
	[$GLOBALS['user']['ID'], $projectID]
);
$template->templateSetVar('name_role', $GLOBALS['user']['name']);
$template->templateSetVar('id_user', $GLOBALS['user']['ID']);
$template->templateSetVar('id_project', $s[0]['id_project']);
$template->templateSetVar('id_role', $s[0]['id_role']);
$template->templateSetVar('status', getStatus($s[0]['status']));
$template->templateSetVar('id_status', $s[0]['status']);
$template->templateCompile();
$template->templateDisplay();