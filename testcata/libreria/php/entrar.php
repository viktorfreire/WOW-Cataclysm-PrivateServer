<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
	<table width="330" cellpadding="0" cellspacing="0" border="0">
    	<tr>
        	<td>
            	<?php 
                @require('mensajes.php');
				$resultado = $_REQUEST['resultado'];
				
                if($resultado == 'NOentrada'){ 
                    echo $mensaje6 . '<div align="center"><button class="boton" onclick="window.location.href=\'index.php\'";>[Volver]</button></div>';
                }
				if($resultado == 'NORegistro'){ 
                    echo $mensaje7 . '<div align="center"><button class="boton" onclick="cargar_contenido(\'datos\', \'libreria/php/registro.php\')">[Volver]</button></div>';
                }
				if($resultado == 'SIentrada'){
                    echo '<script type="text/javascript" language="javascript">cargar_contenido("cuerpo", "libreria/php/sistema.php");</script>';
                }
				if($resultado == 'SIRegistro'){
                    echo $mensaje8 . '<div align="center"><button class="boton" onclick="window.location.href=\'index.php\'";>[Volver]</button></div>';
                }
				if($resultado == 'chistoso'){
                    echo $mensaje9 . '<div align="center"><button class="boton" onclick="cargar_contenido(\'datos\', \'libreria/php/registro.php\')">[Volver]</button></div>';
                }
                ?>
            </td>
		</tr>
	</table>
</body>
</html>
