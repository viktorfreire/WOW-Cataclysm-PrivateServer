<?php
	@require_once('../bd/conn.php');
	
	$nuevo_pwd		= $_REQUEST['N_S_pwd'];
	$usuario		= $_REQUEST['S_id'];
	$respuesta		= $_REQUEST['S_respuesta'];
	/*
	$consulta 	= $conn->Execute("SELECT S.S_id 
									FROM seguridad S, usuarios U, empresas E 
									WHERE S.S_id = U.U_id 
									  AND S.S_empresa = U.U_empresa
									  AND U.U_empresa = E.E_id
									  AND U.U_estatus = 0 
									  AND E.E_estatus = 0
									  AND (S.S_id = UPPER('$usuario') OR S.S_login = MD5(UPPER('$usuario')) OR U.U_email = UPPER('$usuario'))
									  AND S.S_respuesta = MD5(UPPER('$respuesta'))");
	*/
	$consulta 	= $conn->Execute("SELECT S.b_u_id
										FROM b_acceso S, b_usuarios U
										WHERE S.b_u_id = U.b_u_id
											AND (U.b_u_nombres = UPPER('$usuario')
													OR U.b_u_apellidos = UPPER('$usuario')
													OR S.b_a_login = MD5(UPPER('$usuario')) 
													OR U.b_u_email = UPPER('$usuario'))
											AND S.b_a_resp = MD5(UPPER('$respuesta'))");
											
	$mensaje	= $conn->ErrorMsg();
	if($mensaje != ''){
		die('NO');
	}
	
	if( isset($consulta->fields['b_u_id']) ){
		$usuario	= $consulta->fields['b_u_id'];
		unset($consulta);
		$consulta2	= $conn->Execute("UPDATE b_acceso 
										SET b_a_pass = MD5(UPPER('$nuevo_pwd')) 
										WHERE b_u_id = $usuario");
		$mensaje	= $conn->ErrorMsg();
		if($mensaje != ''){
			die('NO');
		}
		unset($consulta2);
	}else{
		echo 'NO';
	}
?>