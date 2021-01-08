<?php
class ExceptionEngine {
    public function __construct()
    {
        set_error_handler([$this, 'ErrorHandler']);
    }

    public function Logger($msg) {
        $date = date('[H:i:s d.m.Y]');
        file_put_contents('lib/errors.txt', file_get_contents('lib/errors.txt') . "{$date} {$msg}" . PHP_EOL);
    }

    public function ErrorHandler($errno, $errstr, $errfile, $errline)
    {
        require_once('lib/TemplateEngine.php');
        $template = new TemplateEngine('error/page.tpl');

        $template->templateSetVar('error', "
            Ошибка в файле {$errfile} на строке {$errline} <br>
            {$errstr}
        ");

        $this->Logger("Ошибка в файле {$errfile} на строке {$errline}: {$errstr}");

        $template->templateCompile();
        $template->templateDisplay();

        die();
    }}