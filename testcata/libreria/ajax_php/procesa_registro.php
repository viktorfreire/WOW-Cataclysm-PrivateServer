<?php

	@require_once('../bd/conn.php');
	
	$login		= $_REQUEST['S_login'];
	$pwd		= $_REQUEST['S_pwd'];
	$pwd2		= $_REQUEST['S_pwd2'];
	$email		= $_REQUEST['email'];
	
	$consulta 	= $conn->Execute("SELECT * FROM account WHERE username = UPPER('$login')");
							  
	$mensaje	= $conn->ErrorMsg();
	if($mensaje != ''){
		die('NOError');
	}
	
	if( !isset($consulta->fields[0]) ){
		
		if($login != NULL && ($pwd == $pwd2) && $email != NULL){
			//SELECT SHA1(CONCAT(UPPER(`username`), ':', UPPER(<pass>)));
			$consulta2 	= $conn->Execute("INSERT INTO account (username, sha_pass_hash, email) VALUES (UPPER('$login'), SHA1(CONCAT(UPPER('$login'), ':', UPPER('$pwd'))), UPPER('$email') )");
			
			$mensaje	= $conn->ErrorMsg();
			if($mensaje != ''){
				die('NOError');
			}
			
			unset($consulta, $consulta2, $maximo);
			die ('SIRegistro');
		}else{
			die('chistoso');	
		}
	}else{
		unset($consulta);
		die ('NORegistro');
	}
	
?>