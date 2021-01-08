<?php
Cookies::authCheck();

$template->templateSetVar('name_role', $GLOBALS['user']['name']);
$template->templateCompile();
$template->templateDisplay();