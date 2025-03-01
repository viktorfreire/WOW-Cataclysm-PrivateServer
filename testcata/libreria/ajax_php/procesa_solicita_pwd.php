<?php
	@require_once('../bd/conn2.php');
	
	$id			= $_REQUEST['id'];
	$nombre		= ucwords(strtolower($_REQUEST['nombre']));
	$raza		= $_REQUEST['r'];
	$clase		= $_REQUEST['c'];
	
	$consulta 	= $conn2->Execute("SELECT account
										FROM characters
										WHERE nombre = '$nombre'
											AND race = '$raza'
											AND class = '$clase' ");
											
	$mensaje	= $conn2->ErrorMsg();
	if($mensaje != ''){
		die('NO');
	}
	
	if( isset($consulta->fields['account']) && $consulta->fields['account'] == $id ){
		unset($consulta);
		echo 'SIcambio';
	}else{
		echo 'NOcambio';
	}
?>