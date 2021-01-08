<?php

/**
 * Kidris Engine
 * Инициализация движка
 */
error_reporting (E_ALL);
session_start();
require_once('lib/Loader.php');
new Controller($_GET);
