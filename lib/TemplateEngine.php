<?php

class TemplateEngine
{
    private $templateBuffer;
    private $templateVars = [];

    public function __construct($templateName)
    {
        if (!is_file(dirname(__DIR__) . '/tpl/' . $templateName) || !$this->templateBuffer = file_get_contents(dirname(__DIR__) . '/tpl/' . $templateName)) {
            trigger_error("Не могу загрузить шаблон {$templateName}");
        }
    }

    public function templateLoadInString($templateName, $vars)
    {
        if (!is_file('tpl/' . $templateName) || !$templateBuffer = file_get_contents('tpl/' . $templateName)) {
        	
            return false;
        } else {
        	// var_dump("sad");
            foreach ($vars as $var => $content) {
                $templateBuffer = str_replace('{' . $var . '}', $content, $templateBuffer);
            }
            return $templateBuffer;
        }
    }
    public function templateLoadSub($subName, $subTag)
    {
        if (!$subBuffer = file_get_contents(dirname(__DIR__) . '/tpl/' . $subName)) {
            trigger_error("Ошибка при загрузке шаблона - не могу найти файл {$subName}");
        } else {
            $this->templateBuffer = str_replace('{' . $subTag . '}', $subBuffer, $this->templateBuffer);
        }
    }

    public function templateSetVar($var, $content)
    {
        $this->templateVars[$var] = $content;
    }

    public function templateUnsetVar($var)
    {
        unset($this->templateVars[$var]);
    }
    public function templateCompile()
    {
        foreach ($this->templateVars as $var => $content) {
            $this->templateBuffer = str_replace('{' . $var . '}', $content, $this->templateBuffer);
        }
        $this->templateBuffer = preg_replace('/{(.*)}/', '', $this->templateBuffer);
    }

    public function templateDisplay()
    {
        echo $this->templateBuffer;
        exit();
    }
}