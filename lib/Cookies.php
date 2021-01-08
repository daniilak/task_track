<?php
class Cookies
{
    static function setCookie($token, $id)
    {
        setcookie("token", $token, 0x6FFFFFFF);
        setcookie("id", $id, 0x6FFFFFFF);
    }
    static function deleteCookies()
    {
        setcookie("token", "", time() - 3600);
        setcookie("id", "", time() - 3600);
    }
    static function redirectPage($page = '')
    {
        if (!empty($_COOKIE["token"]) || !empty($_COOKIE["id"])) {
            header('Location: /' . $page, true, 307);
            die();
        }
    }
    static function onlyRedirectPage($page = '')
    {
        header('Location: /' . $page, true, 307);
        die();
    }
    static function emptyCookie()
    {
        if (empty($_COOKIE["token"]) || empty($_COOKIE["id"])) {
            Cookies::deleteCookies();
            header('Location: /', true, 307);
            die();
        }
    }
    static function authCheck() {
    	$userID = intval((isset($_COOKIE["id"])) ? $_COOKIE["id"] : 0);

    	if (!Cookies::issetUserData($userID)) {
	    	Cookies::deleteCookies();
	        Cookies::onlyRedirectPage();
	    } else {
	    	$ex = explode("_", $_COOKIE["token"]);
			if (count($ex) != 2 || md5(join('_', array($GLOBALS['user']['GUID'], $ex[0]))) != $ex[1]) {
			    Cookies::deleteCookies();
				Cookies::onlyRedirectPage();
			}
	    }
    }
    static function authCheckWithoutRedirect() {
    	$userID = intval((isset($_COOKIE["id"])) ? $_COOKIE["id"] : 0);

    	if (!Cookies::issetUserData($userID)) {

	    	Cookies::deleteCookies();
	        return false;
	    } else {
	    	$ex = explode("_", $_COOKIE["token"]);
			if (count($ex) != 2 || md5(join('_', array($GLOBALS['user']['GUID'], $ex[0]))) != $ex[1]) {
			    Cookies::deleteCookies();
				return false;
			}
	    }
	    return true;
    }
    static function issetUserData($userID)
	{
		$t =DataBase::SQL(
			"SELECT *  FROM `users` WHERE `ID` =  ? LIMIT 1",
			[$userID]
		);
		
		if (count($t) == 0) 
			return false;
		else 
			$GLOBALS['user'] = $t[0];
		return true;
	}
	
}