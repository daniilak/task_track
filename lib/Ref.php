<?php
class Ref
{
    static function GUID()
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }
    static function getSalt()
    {
        return sprintf('%04u%04u%04u%04u%04u%04u%04u%04u', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }
    static function verifyPassword($pass, $hash)
    {
        return (password_verify($pass, $hash)) ? true : false;
    }
    static function verifyCaptcha($gRecaptchaResponse)
    {
        $response = json_decode(
            file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=" . $GLOBALS['reCAPTCHA'] . "&response=" . $gRecaptchaResponse),
            true
        );
        return $response["success"];
    }
    static function requestURL($url)
    {
        $options = [
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER => ['Accept-Language: ru,en-us']
        ];

        $ch = curl_init();
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);

        if (curl_error($ch)) {
            trigger_error('Ошибка при обращении к ссылке: ' . curl_errno($ch) . curl_error($ch));
            return false;
        } else {
            return $response;
        }
    }
    static  function randString() {	
      return substr(md5(uniqid()), 0, 5);
	}
	static function requestVkAPI($method, $params,$token = 0)
    {
        if ($token == 0) 
        {
            $params .= "&access_token=".$GLOBALS['chuvsu_api_key'];
        }
        $url = 'https://api.vk.com/method/' . $method . '?' . $params . '&lang=ru&v=5.28';
        $options = [
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER => ['Accept-Language: ru,en-us']
        ];

        $ch = curl_init();
        curl_setopt_array($ch, $options);
        if(!$res = curl_exec($ch)) 
        {
            require_once('lib/ExceptionEngine.php');
            $exceptionEngine = new ExceptionEngine();
            $exceptionEngine->Logger("Ошибка " . curl_error($ch));
            return false;
        }
        else { $parsedResult = json_decode($res, true); }
        curl_close($ch);
        // var_dump($parsedResult);
        if (isset($parsedResult['error']) && $parsedResult['error']['error_code'] !== 14) 
        {
            return false;
        }
        else 
        {
            return (isset($parsedResult['response'])) ?  $parsedResult['response'] : $parsedResult; 
        }
    }
    
}