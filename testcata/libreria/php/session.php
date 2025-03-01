<?php
	ob_start();
	session_start();
	
	if ( (count($_SESSION) != 0) || ($_SESSION['autenticado'] == 'SI') ) {		
		$direccion == 'index.php';
		//header('location:'.$direccion);	
		die('<script type="text/javascript" language="javascript">cargar_contenido("cuerpo", "libreria/php/sistema.php");</script>');
	}else{
		session_destroy();
	}
?>