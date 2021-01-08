<?php

class Menu {
	
	function get() {
		$data = json_decode(file_get_contents(__DIR__ . '/../../../config.json'));
        $controllers = (array)$data->controllers;
        Cookies::authCheck();
        $answer = [];
        
        foreach ($data->controllers as $key => $d) {
        	if (isset($d->data->menu) && 1 >= $d->data->status ) {
	        	$answer []= ["icon"=> (!isset($d->data->icon)) ? "" : $d->data->icon,"text"=> $d->data->title,"url"=> "/{$key}",];
	        }
        }
        
		return $answer;
	}
	function getOpen() {
		$data = json_decode(file_get_contents(__DIR__ . '/../../../config.json'));
        $controllers = (array)$data->controllers;
        // var_dump(Cookies::authCheckWithoutRedirect());
        if (Cookies::authCheckWithoutRedirect()) {
        	
        	return $this->get();
        };
        $answer = [];
        
        foreach ($data->controllers as $key => $d) {
        	if (isset($d->data->menu) && $d->data->status == -1) {
	        	$answer []= ["icon"=> (!isset($d->data->icon)) ? "" : $d->data->icon,"text"=> $d->data->title,"url"=> "/{$key}",];
	        }
        }
        
		return $answer;
	}
	
	function withJson($arr){
		echo json_encode($arr);
		exit();
	}
}
