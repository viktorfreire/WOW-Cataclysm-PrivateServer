<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
	<?php 
    @require('mensajes.php');
	$resultado = $_REQUEST['resultado']; 
    if($resultado == 'NOcambio'){ 
    	echo $mensaje4 . '<div align="center"><button class="boton" onclick="window.location.href=\'index.php\'";>[Volver]</button></div>';
	}
	if($resultado == 'SIcambio'){ 
		//@require_once('../bd/conn1.php');
		echo 'En Desarrollo!!!';
	}
    ?>
</body>
</html>
