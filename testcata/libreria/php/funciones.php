<?php
	session_start();
	//  Evito que la pagina utilice el cache del browser
	header("Cache-Control: no-cache");
	
	// Función que crea el mensaje de bienvenida al sistema, depandiendo de la hora que sea!!!
	function bienvenida(){
		
		@require('../bd/conn.php');
		
		$hora = date('H');
		
		if ($hora < 12){
			$saludo = " Buenos Dias!";
		}else if ($hora < 18) {
			$saludo = " Buenas Tardes!";
		}else{ 
			$saludo = " Buenas Noches!";
		}
		
		if($_SESSION['U_sexo'] == 0){
			$bienvenida = '<strong>' . $saludo . '</strong> Sr. '  . $_SESSION['U_apellidos'];
		}elseif($_SESSION['U_sexo'] == 1){
			$bienvenida = '<strong>' . $saludo . '</strong> Sra. ' . $_SESSION['U_apellidos'];
		}else{
			$bienvenida = $saludo . ' Administrador';
		}
		
		//$bienvenida .= '(' . strtolower($consulta->fields['TU_descripcion']) . ')';
		unset($consulta);
		return ucwords(strtolower($bienvenida));
	}
	
	// Funcion que construye el Menu del sistema
	function menu($usr_cod){
		@require('../bd/conn.php');
		//@require('sesion.php');
		$lista 		= NULL;
		// BUSCO LOS MODULOS DEL SISTEMA
		$menu1 		= $conn->Execute("SELECT  a.*
												FROM b_menuopciones a, b_menuasignacion b
											   	WHERE a.b_mo_id = b.b_mo_id
												 AND b.b_u_id = '$usr_cod'
												 AND substr(a.b_mo_id,7,8) = '00000000'
												ORDER BY a.b_mo_titulo");
		
		$mensaje	= $conn->ErrorMsg();
		if($mensaje != ''){
			die($mensaje);
		}
		
		// EMPIEZO A ARMAR MI LISTA "MENU"
		$lista		.= '<ul id="nav">';
		$i				= 0;
		do{
			$op1 = substr($menu1->fields['b_mo_id'],2,4);
			// BUSCO LAS OPCIONES PRINCIPALES DE LOS MODULOS
			
			$menu2 = $conn->Execute("SELECT a.*
																FROM b_menuopciones a, b_menuasignacion b
																WHERE a.b_mo_id = b.b_mo_id
																AND b.b_u_id = '$usr_cod'
																AND substr(a.b_mo_id,3,4) = '$op1'
																AND substr(a.b_mo_id,7,4) != '0000'
																AND substr(a.b_mo_id,11,4) = '0000'
																ORDER BY a.b_mo_titulo");
			$mensaje	= $conn->ErrorMsg();
			if($mensaje != ''){
				die($mensaje);
			}
			
			if($i == 0){
				$lista .= 	'<li id="first"><div>';
			}else{
				$lista .= 	'<li><div>';
			}
			if( isset($menu2->fields[0]) ){
					
				// ENTRA SI EL MODULO CONTIENE OPCIONES PRINCIPALES
				$lista .= 	'<a href="#" title="'. $menu1->fields['b_mo_titulo'].'" onclick="$(\'#'.$menu1->fields['b_mo_id'].' \').toggle(\'fast\');" >'. 
									ucwords(strtolower($menu1->fields['b_mo_titulo'])) .'
								</a>';
				$j=0;
				
				$lista .= '<ul id="'.$menu1->fields['b_mo_id'].'" style="background:url('. $menu1->fields['b_mo_imagen'] .') bottom right no-repeat;">';
				
				do{
					$op2 = substr($menu2->fields['b_mo_id'],6,4);
					// BUSCO LAS OPCIONES SECUNDARIAS DE LOS MODULOS
					$menu3 = $conn->Execute("SELECT  a.*
																		FROM b_menuopciones a, b_menuasignacion b
																		WHERE a.b_mo_id = b.b_mo_id
																		 AND b.b_u_id = '$usr_cod'
																		 AND substr(a.b_mo_id,3,4) = '$op1'
																		 AND substr(a.b_mo_id,7,4) = '$op2'
																		 AND substr(a.b_mo_id,11,4) != '0000'
																		ORDER BY a.b_mo_titulo");
					$mensaje	= $conn->ErrorMsg();
					if($mensaje != ''){
						die($mensaje);
					}
					
					if($j == 0){
						$lista .= 	'<li id="first"><div>';
					}else{
						$lista .= 	'<li><div>';
					}
					
					if( isset($menu3->fields[0]) ){
						// ENTRA SI EL MODULO CONTIENE OPCIONES SECUNDARIAS
						$lista .= 	'<a href="#" title="'. $menu2->fields['b_mo_titulo'].'" onclick="$(\'#'.$menu2->fields['b_mo_id'].' \').toggle(\'fast\');" >&nbsp;&nbsp;<img src="'. strtolower($menu2->fields['b_mo_imagen']) .'" width="18" />'. 
											ucwords(strtolower($menu2->fields['b_mo_titulo'])) .'
									</a>';
						$k=0;
						
						$lista .= '<ul id="'.$menu2->fields['b_mo_id'].'"';
						do{
							if($k == 0){
								$lista .= 	'<li id="first"><div>';
							}else{
								$lista .= 	'<li><div>';
							}
							$lista .= 	'<a href="#" title="' . $menu3->fields['b_mo_titulo'].'" onclick="cargar_contenido(\'actualiza_contenedor\',\''.strtolower($menu3->fields['b_mo_enlace']).'\');" >
												'. ucwords(strtolower($menu3->fields['b_mo_titulo'])) .'
											</a></div></li>';
							$k++;
							$menu3->Movenext();
						}while(!$menu3->EOF);
						
						unset($menu3);
						$lista .= '</ul>';
						
					}else{
						// ENTRA SI EL MODULO NO CONTIENE OPCIONES SECUNDARIAS
						$lista .= 	'<a href="#" title="' . $menu2->fields['b_mo_titulo'].'" onclick="cargar_contenido(\'actualiza_contenedor\',\''.strtolower($menu2->fields['b_mo_enlace']).'\');" >
											'. ucwords(strtolower($menu2->fields['b_mo_titulo'])) .'
										</a>';
					}
					
					$lista .= '</div></li>'; 
					$j++;
					$menu2->Movenext();
				}while(!$menu2->EOF);
				unset($menu2);
				
				$lista .= '</ul>';
				
			}else{
				// ENTRA SI EL MODULO NO CONTIENE OPCIONES PRINCIPALES
				$lista .= 	'<a href="#" title="' . $menu1->fields['b_mo_titulo'].'" onclick="cargar_contenido(\'actualiza_contenedor\',\''.strtolower($menu1->fields['b_mo_enlace']).'\');" >
									'. ucwords(strtolower($menu1->fields['b_mo_titulo'])) .'
								</a>';
			}
			$lista .= '</div></li>';
			$i++;
			$menu1->Movenext();
			
		}while(!$menu1->EOF);
		unset($menu1);
		$lista .= '</ul>';
		return $lista;
	}
	
	function iniciales($cadena){
		$tamano = strlen($cadena);
		$i = 0;
		do{
			if($i == 0){
				$ini = substr($cadena, $i, 1);
			}else{
				if($cadena[$i] == ' ' && $i != $tamano){
					$ini .= substr($cadena, $i+1, 1);
				}
			}
			++$i;
		}while($i < $tamano);
		
		return strtoupper($ini);
 	}
	
	function opciones_principales($xxx){
		@require('../bd/conn.php');
		
		$consulta = $conn->Execute("SELECT *
								FROM b_menuopciones
								WHERE substr(
								b_mo_id, 10, 1
								) <> '0' AND 
								substr(
								b_mo_id, 14, 1
								) = '0'
								ORDER BY b_mo_id");
		$mensaje	= $conn->ErrorMsg();
		if($mensaje != ''){
			die($mensaje);
		}else{
			if($consulta->fields['b_mo_id']!=''){
				if($xxx==1){
					do{	
						$op = substr($consulta->fields['b_mo_id'],0,10);
						$listado .= '<li><a href="#" onclick="op_menu(\''.$op.'\');">'.utf8_encode(ucwords(strtolower($consulta->fields['b_mo_titulo']))).'</a></li>';
						$consulta->movenext();
					}while(!$consulta->EOF);
					
					return '<ul id="usuarios">' . $listado . '</ul>';
				}else{
					do{	
						$op 	 = substr($consulta->fields['b_mo_id'],0,10);
						$fila1 	= '<tr class="cambiable"><td><div><input size="20" type="text" id="'.$consulta->fields['b_mo_id'].'d" class="'.$consulta->fields['b_mo_id'].'d" size="10" value="'.utf8_encode(ucwords(strtolower($consulta->fields['b_mo_titulo']))).'"/></div></td>';
						$fila2 	= '<td><div><input size="20" type="text" id="'.$consulta->fields['b_mo_id'].'e" class="'.$consulta->fields['b_mo_id'].'e" size="10" value="'.$consulta->fields['b_mo_enlace'].'"/></div></td>';
						$fila3 	= '<td><div></div><input id="'.$consulta->fields['b_mo_id'].'i" class="'.$consulta->fields['b_mo_id'].'i" size="10" value="imagenes/png/'.$consulta->fields['b_mo_imagen'].'" type="file"/></td>';
						$fila4 	= '<td><div><img 
													src="imagenes/png/actualizar.png" 
													alt="modificar Opcion Principal" 
													longdesc="modificar Opcion Principal" 
													border="0" 
													align="right" 
													onclick="modificar_menu(\''.$consulta->fields['b_mo_id'].'\');"
												/></div></td></tr>';
						$consulta->movenext();
						$fila	.= $fila1 . $fila2 . $fila3 . $fila4;
					}while(!$consulta->EOF);
					
					return $fila;
				}
				
			}
		}
	}
	
	
?>