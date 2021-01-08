<?php
class Controller
{
    private $controllers;
    private $controller;
    private $controllerForID;
    private $controllerData;
    private $siteName;

    public function __construct($params)
    {
        $this->parseConfig();
        $this->parseLogout();
        

        $this->controller = 'main';

        if (empty($params['route'])) {
            $this->loadModel();
        }

        $controller = explode('/', $params['route']);
        $this->controller = $controller[0];
        if (isset($controller[1]))
            $this->controllerForID = $controller[1];

        if (isset($this->controllers[$this->controller])) {
            $this->controllerData = $this->controllers[$this->controller];
        } else {
            $this->controller = 404;
        }
        $this->loadModel();
    }

    private function parseLogout()
    {
        if (isset($_GET['logout'])) {
            Cookies::deleteCookies();
            Cookies::redirectPage();
        }
    }

    public function parseConfig()
    {
        $data = json_decode(file_get_contents(__DIR__ . '/../config.json'));
        $this->controllers = (array)$data->controllers;
        $this->siteName = $data->controllers;
    }

    private function loadModel()
    {

        if ($this->controller == "main") {
            Cookies::redirectPage('starter');
        }
        
        if ($this->controller == "api") {
            $this->loadAPI();
        }

        if ($this->controller == 404) {
            $template = new TemplateEngine("{$this->controller}.tpl");
            require_once("models/{$this->controller}.php");
        }

        if (!$this->controllers[$this->controller]->main[0]) {
            Cookies::emptyCookie();
            $template = new TemplateEngine("template.tpl");

            if (isset($this->controllerData->data->issetID) && mb_strlen($this->controllerForID) > 0) {
                // $template->templateLoadSub("{$this->controller}_ID.tpl", "content");
            } else {
                // $template->templateLoadSub("{$this->controller}/page.tpl", "content");
            }
        } else {
            $template = new TemplateEngine("{$this->controller}/page.tpl");
        }

        $template->templateSetVar(
            "title",
            $this->controllers[$this->controller]->data->title
        );
        $template->templateSetVar(
            "js",
            $this->controllers[$this->controller]->data->js
        );
        $template->templateSetVar(
            "css",
            $this->controllers[$this->controller]->data->css
        );

        require_once("models/{$this->controller}.php");
    }
    private function loadAPI()
    {
    	$params = explode('/', $_GET['route']);
    	
		if (!isset($params[1]) || strlen($params[1]) == 0) {
			$this->withJson(["error"=>"no request 1"]);
		}
		if (!isset($params[2]) || strlen($params[2]) == 0) {
			$this->withJson(["error"=>"no request 2"]);
		}
		
		$os = array(
			"projects", "cards", "gantt",
			
			"menu", 'auth', 'manual',
			"users", "requests", "members", 'supervisors', 'juri', 'recs',
			"facs", "eventTypes", 'instTypes',"positions","news", "comments", "conf"
		);
		if (in_array($params[1], $os)) {
		    require_once(__DIR__ . '/API/'.$params[1].'/index.php');
		} else {
			echo json_encode(["error"=>"no request"]);
		}
		exit();
    }
    private function withJson($a)
    {
    	echo json_encode($a);
    	exit();
    }
    
}