<?php  
	// Este Código fue Desarrollado por el Ingeniero Victor Manuel Freire Parada, Contacto: freire.victormanuel@gmail.com - 0414128462 	
	session_start();
	ob_start();
	
	@require('funciones.php');
	
	if( date('d/m') == substr($_SESSION['U_fecnac'],0,5) ){

		echo '<script type="text/javascript" language="javascript">$(".actualiza_menu").css({background:"url(imagenes/png/torta.png) bottom right no-repeat"});</script>';
	
	} 
					
	/*echo menu(substr($_SESSION['U_ci'], 2, 15)); */
	echo menu($_SESSION['usuario']); 
?> 