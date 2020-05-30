<?php
header("Access-Control-Allow-Origin: *");

use Jacwright\RestServer\RestServer;
use CodeBox\Poiz\FourTwoMattersController;

$DS = DIRECTORY_SEPARATOR;
require_once __DIR__ . $DS  . 'vendor'  . $DS . 'autoload.php';
require_once __DIR__ . $DS  . 'CodeBox' . $DS . 'Poiz' . $DS . 'FourTwoMattersController.php';

$server = new RestServer('debug');
try {
	$server->addClass('CodeBox\Poiz\FourTwoMattersController');
	$server->handle();
} catch (Exception $e) {
}
