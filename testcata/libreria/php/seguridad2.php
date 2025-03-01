<?php
	@require_once('../bd/conn.php');
	@require_once('mensajes.php');
	$variable	= $_REQUEST['valor'];
	
	//SELECT SHA1(CONCAT(UPPER(`username`), ':', UPPER(<pass>)));
	$consulta 	= $conn->Execute("SELECT id FROM account WHERE username = UPPER('$variable') or email = UPPER('$variable')");
	$mensaje	= $conn->ErrorMsg();
	if($mensaje != ''){
		die($mensaje3);
	}
	//$_SESSION['usuario']	= $consulta->fields['b_u_id'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
	<?php 
	if(isset($consulta->fields[0])){;
	?>
    <input type="hidden" id="id" name="id" value="<?php echo $consulta->fields['id']; ?>" />
	<table width="100%" border="0" cellpadding="3" cellspacing="0">
      	<tr>
        	<td width="50%">
            	<div class="txt_input">
                	¿Como se llama su PJ?:
            	</div>        
        	</td>
        	<td>
            	<div align="left">
                	<input id="S_respuesta1" name="S_respuesta1" type="text" size="20" maxlength="100" class="input" />
            	</div>
        	</td>
      	</tr>
        <tr>
       		<td width="50%">
            	<div class="txt_input">
                	Raza:
            	</div>        
        	</td>
        	<td>
            	<div align="left">
                	<select id="raza" name="raza">
                    	<option value="s" selected="selected">Seleccione</option>
                        <option value="1" >Humano</option>
                        <option value="2" >Orco</option>
                        <option value="3" >Enano</option>
                        <option value="4" >Elfo de la Noche</option>
                        <option value="5" >No Muerto</option>
                        <option value="6" >Tauren</option>
                        <option value="7" >Gnome</option>
                        <option value="8" >Troll</option>
                        <option value="9" >Goblin</option>
                        <option value="10" >Elfo de Sangre</option>
                        <option value="11" >Dranei</option>
                        <option value="22" >Huargen</option>
                    </select>
            	</div>
        	</td>
      	</tr>
        <tr>
       		<td width="50%">
            	<div class="txt_input">
                	Clase:
            	</div>        
        	</td>
        	<td>
            	<div align="left">
                	<select id="clase" name="clase">
                    	<option value="s" selected="selected">Seleccione</option>
                        <option value="1" >Guerrero</option>
                        <option value="2" >Paladin</option>
                        <option value="3" >Cazador</option>
                        <option value="4" >Picaro</option>
                        <option value="5" >Sacerdote</option>
                        <option value="6" >DK</option>
                        <option value="7" >Chaman</option>
                        <option value="8" >Mago</option>
                        <option value="9" >Brujo</option>
                        <option value="11" >Druida</option>
                    </select>
            	</div>
        	</td>
      	</tr>
      	<tr>
        	<td colspan="2">
            	<div align="center">
                	<input type="button" value="Solicitar Contraseña" class="boton" onclick="solicita_pwd('#id','#S_respuesta1', '#raza', '#clase');" />
            	</div>
        	</td>
      	</tr>
	</table>
	<?php 
		unset($consulta);
	}else{
		echo $mensaje2;
	}
	?>
</body>
</html>
