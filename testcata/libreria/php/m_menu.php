<?php 
	@require('../bd/conn.php');
	
	$consulta = $conn->Execute("SELECT * FROM menu_opciones order by op_cod");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
	<div align="center">
        <div class="titulo_seccion">
        	::: Maestro Menú :::
        </div>
        <div class="contenido_seccion">
        	<table class="tabla_consulta" align="center" cellpadding="2" cellspacing="0">
            	<tr class="titulo">
                	<td>
                    	Código Opción
                    </td>
                    <td>
                    	Descripción
                    </td>
                    <td>
                    	Acceso
                    </td>
                    <td>
                    	Imagen
                    </td>
                    <td>
                    	Acciones
                    </td>
                </tr>
                <tr class="datos">
                	<td>
                    	<input type="text" id="" name="" value="" size="14" class="input" />
                    </td>
                    <td>
                    	<input type="text" id="" name="" value="" size="14" class="input" />
                    </td>
                    <td>
                    	<input type="text" id="" name="" value="" size="12" class="input" />
                    </td>
                    <td>
                    	<input type="file" id="" name="" value="" size="5" class="boton" />
                    </td>
                    <td>
                    	<a href="#" onclick="">
                        	<img src="imagenes/png/agregar.png" alt=" + " title="Agregar Nueva Opción" />
                        </a>
                    </td>
                </tr>
                <?php
				do{
				?>
                <tr class="datos">
                	<td>
                    	<input type="text" id="" name="" value="<?php echo $consulta->fields['op_cod']; ?>" size="14" class="input" />
                    </td>
                    <td>
                    	<input type="text" id="" name="" value="<?php echo ucwords(strtolower($consulta->fields['op_des'])); ?>" size="14" class="input" />
                    </td>
                    <td>
                    	<input type="text" id="" name="" value="<?php echo ucwords(strtolower($consulta->fields['op_tip_prog'])); ?>" size="12" class="input" />
                    </td>
                    <td>
                    	<img src="<?php echo $consulta->fields['op_imagen']; ?>" alt=" <?php echo $consulta->fields['op_imagen']; ?> " />
                    	<input type="file" id="" name="" value="" size="5" class="boton" />
                    </td>
                    <td>
                    	<a href="#" onclick="">
                        	<img src="imagenes/png/actualizar.png" alt=" + " title="Agregar Nueva Opción" />
                        </a>
                        <a href="#" onclick="">
                        	<img src="imagenes/png/eliminar.png" alt=" + " title="Agregar Nueva Opción" />
                        </a>
                    </td>
                </tr>
                <?php
					$consulta->Movenext();
				}while(!$consulta->EOF);
				?>
            </table>
        </div>
	</div>
</body>
</html>
