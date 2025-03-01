<?php

	@require('../bd/conn.php');
	
	$login		= $_REQUEST['S_login'];
	$pwd		= $_REQUEST['S_pwd'];
	/*
	$consulta 	= $conn->Execute("SELECT U.*, date_format(U.U_fecnac,'%d/%m/%Y') as fecha, E.* 
									FROM seguridad S, usuarios U, empresas E 
									WHERE S.S_id = U.U_id 
									  AND S.S_empresa = U.U_empresa
									  AND U.U_empresa = E.E_id
									  AND U.U_estatus = 0 
									  AND E.E_estatus = 0
									  AND S.S_login = MD5(UPPER('$login')) 
									  and S.S_pwd = MD5(UPPER('$pwd'))");
	*/
	$consulta 	= $conn->Execute("SELECT U.*, date_format(U.b_u_fecnac,'%d/%m/%Y') as fecha, E.*
									FROM b_acceso S, b_usuarios U, b_empresa E
									WHERE S.b_u_id = U.b_u_id
									  AND S.b_a_login = MD5(UPPER('$login')) 
									  AND S.b_a_pass = MD5(UPPER('$pwd'))
									  AND E.b_e_id = U.b_e_id");
							  
	$mensaje	= $conn->ErrorMsg();
	if($mensaje != ''){
		die('NO');
	}
	
	if( isset($consulta->fields[0]) ){
		/* VARIABLES DE LA SESSION DEL USUARIO LOGEADO ********************************************************************** */
		
		$_SESSION['usuario']		= $consulta->fields['b_u_id'];
		$_SESSION['autenticado']	= 'SI';
		$_SESSION['E_id']			= $consulta->fields['b_e_id'];
		$_SESSION['E_nombre']		= $consulta->fields['b_e_razon'];
		$_SESSION['E_rif']			= $consulta->fields['b_e_rif'];
		$_SESSION['E_logo']			= $consulta->fields['b_e_logo'];
		$_SESSION['U_id']			= $consulta->fields['b_u_id'];
		$_SESSION['U_nombres']		= $consulta->fields['b_u_nombres'];
		$_SESSION['U_apellidos']	= $consulta->fields['b_u_apellidos'];
		$_SESSION['U_tipo']			= $consulta->fields['b_u_tipo'];
		$_SESSION['U_fecnac']		= $consulta->fields['fecha'];
		$_SESSION['U_sexo']			= $consulta->fields['b_u_sexo'];
		
		/* FIN ************************************************************************************************************** */
		unset($consulta);
		echo 'OK';
	}else{
		unset($consulta);
		echo 'NO';
	}
	
?>