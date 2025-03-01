<?php
	// Este Código fue Desarrollado por el Ingeniero Victor Manuel Freire Parada, Contacto: freire.victormanuel@gmail.com - 0414128462 	
	session_start();
	ob_start();
	
	@require('../bd/conn.php');
	@require('funciones.php');
	
	if ( (count($_SESSION) == 0) || ($_SESSION['autenticado'] != 'SI') ) {		
		session_destroy();
		$direccion == 'index.php';
		//header('location:'.$direccion);	
		die('<script type="text/javascript" language="javascript">window.location.href="'.$direccion.'";</script>');
	}
	
	$pie_pagina	= '	Todos los derechos reservados. 2008&reg;. 
                   	Licencia Otorgada a Osyalit Torres y Margarita Escorihuela
                   	<br />
                   	Website Desarrollado y
                   	Optimizado para <a href="http://download.mozilla.org/?product=firefox-3.0&os=win&lang=es-ES" target="_blank"> 
					Mozilla Firefox 3 </a>. Resolucion a 1024x768';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled Document</title>
    <style media="all" type="text/css">
		.msg{
			width:98%;
			text-align:right;
		}
	</style>
</head>
<body>
	<div id="sistema" class="sistema">
        <div id="encabezado" class="encabezado">
        	<table cellpadding="5" cellspacing="0" border="0" width="98%" align="center">
            	<tr>
                	<td width="25%">
                    	<div align="left">
                   			<img src="<?php echo 'imagenes/fotos_empresas/'.$_SESSION['E_logo']; ?>" height="65" />
               		 	</div>
                    </td>
                    <td width="50%">
                    	 <div class="titulo_sistema">
                        	<em>
                                ::: IDSe V-1.0 alpha :::
                            </em>
                        </div>
                    	<div class="nombre_empresa">
                        	<?php //echo $_SESSION['E_nombre']; ?>
                        </div>
                        <div class="fecha">
							<?php echo 'Hoy es: ' . date('d/m/Y'); ?>
                        </div>
                        <div class="hora">
                            Son las:
                        </div>
                    </td>
                    <td width="25%">
                    	<table align="center" cellpadding="2" cellspacing="0" border="0" width="98%">
                        	<tr>
                            	<td width="50%">
                                	<?php
									$id = $_SESSION['U_id'];
									$consulta = $conn->Execute("SELECT c.rh_f_imagen
																FROM rh_empleados a, b_usuarios b, rh_fotos c
																WHERE a.b_u_id = b.b_u_id 
																AND c.rh_e_id = a.rh_e_id");
									$mensaje	= $conn->ErrorMsg();
									if($mensaje != ''){
										die($mensaje);
									}else{
										if($consulta->fields['rh_f_imagen'] != ''){
											echo '<img src="imagenes/fotos_empleados/'.$consulta->fields['rh_f_imagen'].'" title="Foto Perfil" height="65" alt="FOTO" />';
										}else{
											echo '<img src="imagenes/png/image017.png" title="Foto Perfil" height="65" alt="FOTO" />';
										}
									}
									?>
                                </td>
                                <td>
                                	<div align="justify">
                                		<?php echo bienvenida(); ?>
                                    </div>
                                    <div align="center">
                                    	<br />
										<button class="boton" onclick="cargar_contenido('cuerpo', 'libreria/php/salir.php');">[Desconectar]</button>
                                    </div>
                               	</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="central">
        	<div id="menu" class="menu">
            	<div class="titulo_menu">
                	::: Menu :::
                </div>
                <div class="actualiza_menu">  
					
                </div>
            </div>
            <form id="VWD" name="VWD" class="cmxform" method="post" enctype="multipart/form-data">
                <div id="contenedor" class="contenedor">
                	<div class="msg" id="msg">
                
               		</div>
                    <div class="actualiza_contenedor" id="actualiza_contenedor">
                    	<br /><br /><br /><br /><br /><br /><br /><br />
                    	<img src="imagenes/png/logo_vwd_sistemas.png" />
                    </div>
                </div>
            </form>
        </div>
        <div id="pie" class="pie">
        	<?php echo $pie_pagina; ?>
        </div>
    </div>
    <script type="text/javascript" language="javascript">
		$("#VWD").validate();
		redondear_div(document.getElementById("sistema"));
		redondear_div(document.getElementById("encabezado"));
		redondear_div(document.getElementById("menu"));
		redondear_div(document.getElementById("contenedor"));
		redondear_div(document.getElementById("pie"));
		setInterval("reloj()",1000);
		cargar_contenido('actualiza_menu', 'libreria/php/menu.php');
	</script>
</body>
</html>
