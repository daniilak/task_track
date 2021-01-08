<?php
Cookies::authCheckWithoutRedirect();
echo json_encode(['role'=>(isset($GLOBALS['user']) ? 1 : 0)]);
exit();


