<?php 
	/* Desarrollado por el Ingeniero Victor Freire, Contectos: freire.victormanuel@gmail.com - 04144128462 */
	
	ob_start();
	session_start();

	@require('adodb/adodb.inc.php');
	//require('../librerias/php/mensajes.php');
	
	// Variables para realizar la Conexion a la Base de datos en MYSQL
	$host      	= "localhost";
	$database  	= "auth";
	$user 		= 'web-registro';
	$pass 		= 'webopelado123';
	
	
	$conn = ADONewConnection('mysql'); 
	@$conn->Connect($host, $user, $pass, $database) or die('<div class="alerta">Nuestro Servidor se Encuentra en Mantenimiento. Disculpe las Molestias.</div>') ;
?>