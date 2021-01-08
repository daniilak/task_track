<?php

$template->templateSetVar('recaptcha_sitekey', $GLOBALS['recaptcha_sitekey']);
$template->templateSetVar('auth_url', "https://oauth.vk.com/authorize?client_id={$GLOBALS['vk_app_id']}&redirect_uri=". urlencode('http://' . $_SERVER['SERVER_NAME'] ."/")."&response_type=code&lang=ru&v=5.28");


if (isset($_GET['code'])) {
	$json = json_decode(Ref::requestURL("https://oauth.vk.com/access_token?client_id={$GLOBALS['vk_app_id']}&client_secret={$GLOBALS['vk_app_secret']}&code={$_GET['code']}&redirect_uri=" . urlencode('http://' . $_SERVER['SERVER_NAME'] . '/')), true);
    if (isset($json['error'])) {
        $template->templateSetVar('msg', 'Произошла ошибка 1 при авторизации <br> Попробуйте еще раз.');
        $template->templateCompile(); $template->templateDisplay();
    }
    $user_id = intval($json['user_id']);
    $access_token = $json['access_token'];
    $t = DataBase::SQL("SELECT *  FROM `users` WHERE `id_vk` = ? LIMIT 1", [$user_id]);
    if (count($t) == 0) {
		$userData = Ref::requestVkApi("users.get", "user_ids={$user_id}&fields=photo_100");
		if (!isset($userData)) {
	    	$template->templateSetVar('msg', 'Произошла ошибка 2 при авторизации <br> Попробуйте еще раз.');
	        $template->templateCompile(); $template->templateDisplay();
	    }
		$secret =  Ref::GUID();
		DataBase::SQL(
			"INSERT INTO `users` (`id_vk`,`photo`,`name`,`GUID`)  VALUES (?,?,?,?)",
			[$user_id, $userData[0]['photo_100'], $userData[0]['first_name'].' '.$userData[0]['last_name'], $secret],
			false
		);
		$maxID = DataBase::SQL("SELECT `ID`,`GUID`  FROM `users` WHERE `id_vk` = ? LIMIT 1", [$userData[0]['id']]);
		$salt = Ref::getSalt();
        $token = $salt . '_' . md5(join('_', array($maxID[0]['GUID'],  $salt)));
        Cookies::setCookie($token, $maxID[0]['ID']);
        Cookies::onlyRedirectPage("starter");
    } else {
    	if (strlen($t[0]['GUID']) > 0) {
        	if (isset($_COOKIE["token"])) {
            	$ex = explode("_", $_COOKIE["token"]);
                if (md5(join('_', array($t[0]['GUID'],  $ex[0]))) != $ex[1]) {
                	$template->templateSetVar('msg', 'Произошла ошибка 3 при авторизации <br> Попробуйте еще раз.');
                	Cookies::deleteCookies();
					$template->templateCompile(); $template->templateDisplay();
                }
			} else {
            	$salt = Ref::getSalt();
                $token = $salt . '_' . md5(join('_', array($t[0]['GUID'],  $salt)));
                Cookies::setCookie($token, $t[0]['ID']);
            }
        } else {
        	$secret = Ref::GUID();
        	DataBase::SQL(
				"UPDATE `users` SET `GUID` = ? WHERE `ID` = ?",
				[$secret, $t[0]['ID']],
				false
			);
            $salt = Ref::getSalt();
            $token = $salt . '_' . md5(join('_', array($secret,  $salt)));
            Cookies::setCookie($token, $t[0]['ID']);;
		}
		Cookies::onlyRedirectPage("starter");
    }
    
}
$template->templateCompile();
$template->templateDisplay();
