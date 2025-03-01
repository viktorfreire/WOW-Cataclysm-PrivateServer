// variables con las imagenes de carga, warning y error
	var cargador = '<img src="imagenes/gif/cargador.gif" alt="Cargador" longdesc="Cargador" />&nbsp;&nbsp;';
	var warning  = '<img src="imagenes/png/warning.png"  alt="Atencion" longdesc="Atencion" />&nbsp;&nbsp;';
// funcion que se carga al principio de todo - Cargador del Portal Web
	window.onload = function() {
		cargar_contenido('datos', 'libreria/php/entrada.php');
	}
	
// Función para mostrar la hora
	function reloj() {
		var tipo = 'Am';
		var fObj = new Date() ; 
		var horas = fObj.getHours() ; 
		var minutos = fObj.getMinutes() ; 
		var segundos = fObj.getSeconds() ; 
		if (horas <= 9) horas = "0" + horas; 
		if (horas > 12){
			horas = horas - 12;
			tipo = 'Pm';
		}
		if (minutos <= 9) minutos = "0" + minutos; 
		if (segundos <= 9) segundos = "0" + segundos; 
		$('.hora').html("Son las: "+horas+":"+minutos+":"+segundos+" "+tipo);
		window.status = "Son las: "+horas+":"+minutos+":"+segundos+" "+tipo;
	}
	
	function vfreire(contenedor){
		if ($(contenedor).is(":hidden")) {
			$(contenedor).slideDown('slow');
		}else{
			$(contenedor).slideUp('slow');
		}
	}
	
// Funcion Generica de Ajax para el procesamiento de la información
	function ajax(url1, url2, datos, contenedor){
		$.ajax({
			url: "libreria/ajax_php/"+url1,
			data: datos,
			async:true,
			contentType: "application/x-www-form-urlencoded",
			dataType: "html",
			global: true,
			ifModified: false,
			processData:true,
			timeout: 10000,
			type: "POST",
			cache: false,
			
			beforeSend: function(objeto){
				$('.msg').html(cargador+'Procesando los Datos');
			},
						
			error: function(objeto, quepaso, otroobj){
				$('.msg').html(warning+'Error en la Funcion Ajax ('+quepaso+')');
			},
				
			success: function(resultado){
				cargar_contenido(contenedor, 'libreria/php/'+url2+'?resultado='+resultado);
			}, 
			
			complete: function(resultado){
				
			}
		});
	}
	
// Función que permite redondear las esquinas de los DIV
	function redondear_div(vdiv){
		sett = 	{
					tl: { radius: 10 },
					tr: { radius: 10 },
					bl: { radius: 10 },
					br: { radius: 10 },
					antiAlias: true,
					autoPad: false
				};
			
		var vCorner = new curvyCorners(sett, vdiv);
		vCorner.applyCornersToAll();	
	}
	
// Función que carga dinamicamente el contenido de las paginas
	function cargar_contenido(contenedor, url){
		$('.msg').html(cargador+'Abriendo Secci&oacute;n');
		$('.'+contenedor).fadeOut("slow", function(){
			$('.'+contenedor).html('');
			$('.'+contenedor).load(url, function(){
				$('.'+contenedor).fadeIn("slow");
				$('.msg').html('');
			});
		});
	}
	
// Funcion que llama a la sección seguridad 2 la cual valida que el usuario exista en la BD para poder modificar la pwd
	function buscar_datos(obj){
		var valor = $(obj).attr('value');
		cargar_contenido('busqueda', 'libreria/php/seguridad2.php?valor='+valor);
	}
	
// Función que realiza la validacion pertinente para poder realizar la modificacion del pwd
	function resetea_pwd(obj1, obj2, obj3, obj4){
		if( $(obj1).attr('value') == $(obj2).attr('value') ){
			if( $(obj1).attr('value') == '' || $(obj1).attr('value') == null || $(obj1).attr('value') == 'undefined'){
				$(obj1).css({background:'#CC0000'});	
				$(obj2).css({background:'#CC0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');	
			}else{
				var datos = "N_S_pwd="+$(obj1).attr('value')+"&S_id="+$(obj3).attr('value')+"&S_respuesta="+$(obj4).attr('value');
				ajax('procesa_resetea_pwd.php', 'resultado.php', datos, 'busqueda');
			}
		}else{ 
			$(obj1).css({color:'#FF0000'});	
			$(obj2).css({color:'#FF0000'});
			$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
		}
	}
	
	function ValidaMail(mail) {
		var exr = /^[0-9a-z_\-\.]+@[0-9a-z\-\.]+\.[a-z]{2,4}$/i;
		return exr.test(mail);
	}
	
	
// Función que solicita pwd
	function solicita_pwd(obj1, obj2, obj3, obj4){
		
		if( ($(obj1).attr('value') == null || $(obj1).attr('value') == '' || $(obj1).attr('value') == 'undefined') || ($(obj2).attr('value') == null || $(obj2).attr('value') == '' || $(obj2).attr('value') == 'undefined') || $(obj3+' option[selected]').attr('value') == 's' || $(obj4+' option[selected]').attr('value') == 's' ){
			
			$(obj1).css({color:'#FF0000'});	
			$(obj2).css({color:'#FF0000'});
			$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			
		}else{ 
			
			var datos = "id="+$(obj1).attr('value')+"&nombre="+$(obj2).attr('value')+"&r="+$(obj3+' option[selected]').attr('value')+"&r="+$(obj4+' option[selected]').attr('value');
			ajax('procesa_solicita_pwd.php', 'resultado.php', datos, 'busqueda');
				
		}
	}
	
// Funcion que se encarga de realizar el logeo del usuario en el sistema
	function entrada(obj1, obj2){
		document.getElementById('boton').disabled = true;
		if( $(obj1).attr('value') == null || $(obj1).attr('value') == '' || $(obj1).attr('value') == 'undefined' || $(obj2).attr('value') == null ){
			$(obj1).css({background:'#CC0000'});	
			$(obj2).css({background:'#CC0000'});
			$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');	
			document.getElementById('boton').disabled = false;
		}else{
			var datos = "S_login="+$(obj1).attr('value')+"&S_pwd="+$(obj2).attr('value');
			ajax('procesa_entrada.php', 'entrar.php', datos, 'datos');
		}
	}

// Funcion que se encarga de realizar el registro del usuario en el sistema
	function registro(obj1, obj2, obj3, obj4){
		document.getElementById('boton').disabled = true;
		if( ($(obj1).attr('value') == null || $(obj1).attr('value') == '' || $(obj1).attr('value') == 'undefined') || ($(obj2).attr('value') == null || $(obj2).attr('value') == '' || $(obj2).attr('value') == 'undefined') || ($(obj3).attr('value') == null || $(obj3).attr('value') == '' || $(obj3).attr('value') == 'undefined') || ($(obj4).attr('value') == null || $(obj4).attr('value') == '' || $(obj4).attr('value') == 'undefined')){
			$(obj1).css({background:'#CC0000'});	
			$(obj2).css({background:'#CC0000'});
			$(obj3).css({background:'#CC0000'});
			$(obj4).css({background:'#CC0000'});
			$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');	
			document.getElementById('boton').disabled = false;
		}else{
			
			if( $(obj2).attr('value') == $(obj3).attr('value') ){
				if(!ValidaMail($(obj4).attr('value'))) {
					$(obj4).css({background:'#CC0000'});
					$('.msg').html(warning+'Coloca un e-Mail valido!!!');	
					document.getElementById('boton').disabled = false;
				}else{
					var datos = "S_login="+$(obj1).attr('value')+"&S_pwd="+$(obj2).attr('value')+"&S_pwd2="+$(obj3).attr('value')+"&email="+$(obj4).attr('value');
					ajax('procesa_registro.php', 'entrar.php', datos, 'datos');	
				}
			}else{
				$(obj2).css({background:'#CC0000'});
				$(obj3).css({background:'#CC0000'});
				$('.msg').html(warning+'Las Contraseñas no son iguales, por favor revisa!!!');	
				document.getElementById('boton').disabled = false;
			}
			
		}
	}
	
	function procesar_menu(x1, x2){
		if(x1 == 1){
			// Estoy Agregando un Modulo
			var titulo = $('#t').attr('value');
			var enlace = $('#e').attr('value');
			var imagen = $('#i').attr('value');
			var continuar = null;
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#t').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#t').css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#e').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#e').css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#i').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#i').css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+x2+"&opcion=1";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/modulos.php', datos, 'abc');
			}
		}
		if(x1 == 2){
			// Estoy Agregando un Modulo
			var id 			= x2;
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			if(id == '' || id == null || id == 'undefined' || id.length < 14){
				continuar = 'NO';
				$('.msg').html(warning+'Error en el Paso de Variables');
			}else{
				var continuar = 'SI';
			}
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#T-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#T-'+x2).css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#E-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#E-'+x2).css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#I-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#I-'+x2).css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+id+"&opcion=2";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/modulos.php', datos, 'abc');
			}
		}
		if(x1 == 3){
			// Estoy Agregando un Modulo
			var id 			= x2;
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			
			if(confirm('Esta Seguro de Realizar esta Operación? Recuerde que los Registros asociados a este codigo tambien seran eliminados!!!')){
				if(id != '' && id != null && id != 'undefined'){
					var datos = "id="+id+"&opcion=3";
					ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/modulos.php', datos, 'abc');	
				}
			}
		}
		if(x1 == 4){
			// Estoy Agregando una opcion principal a un modulo
			var id		= $('#x').attr('value');
			var titulo 	= $('#t').attr('value');
			var enlace 	= $('#e').attr('value');
			var imagen 	= $('#i').attr('value');
			var continuar = null;
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#t').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#t').css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#e').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#e').css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#i').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#i').css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+id+"&opcion=4";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');
			}	
		}
		
		if(x1 == 5){
			// Estoy modificando la opcion princiapl de un modulo seleccionado
			var id 			= x2;
			var id2			= $('#x').attr('value');
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			if(id == '' || id == null || id == 'undefined' || id.length < 14){
				continuar = 'NO';
				$('.msg').html(warning+'Error en el Paso de Variables');
			}else{
				var continuar = 'SI';
			}
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#T-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#T-'+x2).css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#E-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#E-'+x2).css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#I-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#I-'+x2).css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+id+"&id2="+id2+"&opcion=5";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');
			}	
		}
		
		if(x1 == 6){
			// Estoy eliminando la opcion principal de un modulo seleccionado
			var id 			= x2;
			var id2			= $('#x').attr('value');
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			
			if(confirm('Esta Seguro de Realizar esta Operacion? Recuerde que los Registros asociados a este codigo tambien seran eliminados!!!')){
				if(id != '' && id != null && id != 'undefined'){
					var datos = "id="+id+"&id2="+id2+"&opcion=6";
					ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');	
				}
			}
		}
		
		if(x1 == 7){
			// Estoy Agregando una opcion secundaria a una opcion principal
			var id		= $('#x').attr('value');
			var id2		= $('#xx').attr('value');
			var titulo 	= $('#t').attr('value');
			var enlace 	= $('#e').attr('value');
			var imagen 	= $('#i').attr('value');
			var continuar = null;
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#t').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#t').css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#e').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#e').css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#i').css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#i').css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+id+"&id2="+id2+"&opcion=7";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');
			}	
		}
		
		if(x1 == 8){
			// Estoy modificando la opcion princiapl de un modulo seleccionado
			var id 			= x2;
			var id2			= $('#xx').attr('value');
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			if(id == '' || id == null || id == 'undefined' || id.length < 14){
				continuar = 'NO';
				$('.msg').html(warning+'Error en el Paso de Variables');
			}else{
				var continuar = 'SI';
			}
			if(titulo == '' || titulo == null || titulo == 'undefined' || titulo.length < 4){
				continuar = 'NO';
				$('#T-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#T-'+x2).css({background:'#ffffff'});
			}
			if(enlace == '' || enlace == null || enlace == 'undefined' || enlace.length < 6){
				continuar = 'NO';
				$('#E-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#E-'+x2).css({background:'#ffffff'});
			}
			if(imagen == '' || imagen == null || imagen == 'undefined' || imagen.length < 6){
				continuar = 'NO';
				$('#I-'+x2).css({background:'#FF0000'});
				$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
			}else{
				var continuar = 'SI';
				$('#I-'+x2).css({background:'#ffffff'});
			}
			if(continuar == 'SI'){
				var datos = "titulo="+titulo+"&enlace="+enlace+"&imagen="+imagen+"&id="+id+"&id2="+id2+"&opcion=8";
				ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');
			}	
		}
		
		if(x1 == 9){
			// Estoy eliminando la opcion principal de un modulo seleccionado
			var id 			= x2;
			var id2			= $('#xx').attr('value');
			var titulo 		= $('#T-'+x2).attr('value');
			var enlace 		= $('#E-'+x2).attr('value');
			var imagen 		= $('#I-'+x2).attr('value');
			var continuar 	= null;
			
			if(confirm('Esta Seguro de Realizar esta Operacion? Recuerde que los Registros asociados a este codigo tambien seran eliminados!!!')){
				if(id != '' && id != null && id != 'undefined'){
					var datos = "id="+id+"&id2="+id2+"&opcion=9";
					ajax('../../modulos/configuracion/procesa_modulos.php', '../../modulos/configuracion/opciones.php', datos, 'def');	
				}
			}
		}
	}
	
	function procesar_accesos(){
		if( $('#u').attr('value') != '' || $('#u').attr('value') != 'undefined' || $('#u').attr('value') != null){
			cargar_contenido('accesos', 'modulos/configuracion/opciones.php?op=4&codigo='+$('#u').attr('value'));
		}
	}
	
	function procesar_accesos2(obj){
		var id 		= $(obj).attr('id');
		var user	= $('#u').attr('value');
		var valor 	= $(obj).attr('value');
		if(id != '' && id != null && valor != '' && valor != null && user != '' && user != null){
			if(valor == 0){
				var datos = "opcion=1&id="+id+"&user="+user;	
			}
			if(valor == 1){
				var datos = "opcion=2&id="+id+"&user="+user;	
			}
			ajax('../../modulos/configuracion/procesa_accesos.php', '../../modulos/configuracion/opciones.php', datos, 'accesos');
		}
	}
	
	function procesar_empresa(codigo){
		if(codigo != '' && codigo != null){
			var razon 			= $('#razon').attr('value');
			var rif 			= $('#rif').attr('value');
			var nit 			= $('#nit').attr('value');
			var direccion 		= $('#direccion').attr('value');
			var telf1 			= $('#telf1').attr('value');
			var telf2 			= $('#telf2').attr('value');
			var telf3 			= $('#telf3').attr('value');
			var web 			= $('#web').attr('value');
			var email			= $('#email').attr('value');
			var logo			= $('#logo').attr('value');
			var estatus			= $('#estatus').attr('value');
			
			if(razon != null && rif != null && direccion != null && telf1 != null && telf3 != null && email != null && estatus != null){
				var datos = "opcion=1&id="+codigo+"&razon="+razon+"&rif="+rif+"&nit="+nit+"&direccion="+direccion+"&telf1="+telf1+"&telf2="+telf2+"&telf3="+telf3+"&web="+web+"&email="+email+"&logo="+logo+"&estatus="+estatus;	
				ajax('../../modulos/configuracion/procesa_empresa.php', '../../modulos/configuracion/m_empresa.php', datos, 'actualiza_contenedor');	
			}
		}
	}
	
	function procesar_sucursales(empresa, sucursal, op){
		if(op == 1){
			//Agrego una sucursal
			var razon 			= $('#razon').attr('value');
			var rif 			= $('#rif').attr('value');
			var direccion 		= $('#direccion').attr('value');
			var telf1 			= $('#telf1').attr('value');
			var telf2 			= $('#telf2').attr('value');
			var email			= $('#email').attr('value');
			var estatus			= $('#estatus').attr('value');
			if(razon != null && rif != null && direccion != null && telf1 != null && telf2 != null && email != null && estatus != null){	
				var datos = "opcion=2&razon="+razon+"&empresa="+empresa+"&rif="+rif+"&direccion="+direccion+"&telf1="+telf1+"&telf2="+telf2+"&email="+email+"&estatus="+estatus;	
				ajax('../../modulos/configuracion/procesa_empresa.php', '../../modulos/configuracion/m_sucursales.php', datos, 'actualiza_contenedor');
			}
		}
		if(op == 2){
			//Modifico la sucursal
			var razon 			= $('#R-'+sucursal).attr('value');
			var rif 			= $('#r-'+sucursal).attr('value');
			var direccion 		= $('#D-'+sucursal).attr('value');
			var telf1 			= $('#T-'+sucursal).attr('value');
			var telf2 			= $('#t-'+sucursal).attr('value');
			var email			= $('#E-'+sucursal).attr('value');
			var estatus			= $('#e-'+sucursal).attr('value');
			if(razon != null && rif != null && direccion != null && telf1 != null && telf2 != null && email != null && estatus != null){
				var datos = "opcion=3&razon="+razon+"&empresa="+empresa+"&sucursal="+sucursal+"&rif="+rif+"&direccion="+direccion+"&telf1="+telf1+"&telf2="+telf2+"&email="+email+"&estatus="+estatus;
				ajax('../../modulos/configuracion/procesa_empresa.php', '../../modulos/configuracion/m_sucursales.php', datos, 'actualiza_contenedor');
			}
		}
		
		if(op == 3){
			//Elimino la sucursal
			var razon 			= $('#R-'+sucursal).attr('value');
			var rif 			= $('#r-'+sucursal).attr('value');
			var direccion 		= $('#D-'+sucursal).attr('value');
			var telf1 			= $('#T-'+sucursal).attr('value');
			var telf2 			= $('#t-'+sucursal).attr('value');
			var email			= $('#E-'+sucursal).attr('value');
			var estatus			= $('#e-'+sucursal).attr('value');
			if(razon != null && rif != null && direccion != null && telf1 != null && telf2 != null && email != null && estatus != null){
				var datos = "opcion=4&razon="+razon+"&empresa="+empresa+"&sucursal="+sucursal+"&rif="+rif+"&direccion="+direccion+"&telf1="+telf1+"&telf2="+telf2+"&email="+email+"&estatus="+estatus;
				ajax('../../modulos/configuracion/procesa_empresa.php', '../../modulos/configuracion/m_sucursales.php', datos, 'actualiza_contenedor');
			}
		}	
	}
	
	function procesar_usuarios(opcion, id){
		if(opcion == 1){
			// AGREGO UN USUARIO NUEVO
			var nombres 	= $('#N').attr('value');
			var apellidos 	= $('#A').attr('value');
			var nacimiento 	= $('#F').attr('value');
			var tipo	 	= $('#TU').attr('value');
			var email	 	= $('#E').attr('value');
			var telf	 	= $('#T').attr('value');
			var estatus 	= $('#e').attr('value');
			var sexo	 	= $('#S').attr('value');
			var empresa 	= $('#EN').attr('value');
			var sucursal 	= $('#SU').attr('value');
			
			if(nombres != null && apellidos != null && nacimiento != null && tipo != null && estatus != null && sexo != null){
				var datos = "opcion=1&nombres="+nombres+"&apellidos="+apellidos+"&nacimiento="+nacimiento+"&tipo="+tipo+"&email="+email+"&telf="+telf+"&estatus="+estatus+"&sexo="+sexo+"&empresa="+empresa+"&sucursal="+sucursal;
				ajax('../../modulos/configuracion/procesa_usuarios.php', '../../modulos/configuracion/m_usuarios2.php', datos, 'actualiza_contenedor');
			}
		}
		
		if(opcion == 2){
			//MODIFICO EL USUARIO SELECCIONADO
			var nombres 	= $('#N-'+id).attr('value');
			var apellidos 	= $('#A-'+id).attr('value');
			var nacimiento 	= $('#F-'+id).attr('value');
			var tipo	 	= $('#TU-'+id).attr('value');
			var email	 	= $('#E-'+id).attr('value');
			var telf	 	= $('#T-'+id).attr('value');
			var estatus 	= $('#e-'+id).attr('value');
			var sexo	 	= $('#S-'+id).attr('value');
			var empresa 	= $('#EN-'+id).attr('value');
			var sucursal 	= $('#SU-'+id).attr('value');
			
			if(nombres != null && apellidos != null && nacimiento != null && tipo != null && estatus != null && sexo != null){
				var datos = "opcion=2&nombres="+nombres+"&apellidos="+apellidos+"&id="+id+"&nacimiento="+nacimiento+"&tipo="+tipo+"&email="+email+"&telf="+telf+"&estatus="+estatus+"&sexo="+sexo+"&empresa="+empresa+"&sucursal="+sucursal;
				ajax('../../modulos/configuracion/procesa_usuarios.php', '../../modulos/configuracion/m_usuarios.php', datos, 'actualiza_contenedor');
			}
		}
		
		if(opcion == 3){
			// ELIMINO EL USUARIO SELECCIONADO
			if(id != null){
				var datos = "opcion=3&id="+id;
				ajax('../../modulos/configuracion/procesa_usuarios.php', '../../modulos/configuracion/m_usuarios.php', datos, 'actualiza_contenedor');
			}
		}
		
		if(opcion == 4){
			// Entro en los datos de seguridad del usuario
			cargar_contenido('actualiza_contenedor', 'modulos/configuracion/m_usuarios2.php?id='+id+'&opcion=2');
		}
		
		if(opcion == 5 || opcion == 6){
			//if(id != null){
				var usuario 	= $('#user').attr('value');
				var pass 		= $('#pass').attr('value');
				var pregunta 	= $('#preg').attr('value');
				var respuesta 	= $('#resp').attr('value');
				var tp 			= $('#tp').attr('checked');
				if(tp == true)  tp = 1;
				if(tp == false) tp = 0;
				var continuar 	= '';
				
				if(usuario == '' || usuario == null || usuario == 'undefined' || usuario.length < 6){
					continuar = 'NO';
					$('#user').css({background:'#FF0000'});
					$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
				}else{
					var continuar = 'SI';
					$('#user').css({background:'#ffffff'});
				}
				
				if(pass == '' || pass == null || pass == 'undefined' || pass.length < 6){
					continuar = 'NO';
					$('#pass').css({background:'#FF0000'});
					$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
				}else{
					var continuar = 'SI';
					$('#pass').css({background:'#ffffff'});
				}
				
				if(pregunta == '' || pregunta == null || pregunta == 'undefined' || pregunta.length < 6){
					continuar = 'NO';
					$('#preg').css({background:'#FF0000'});
					$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
				}else{
					var continuar = 'SI';
					$('#preg').css({background:'#ffffff'});
				}
				
				if(respuesta == '' || respuesta == null || respuesta == 'undefined' || respuesta.length < 6){
					continuar = 'NO';
					$('#resp').css({background:'#FF0000'});
					$('.msg').html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
				}else{
					var continuar = 'SI';
					$('#resp').css({background:'#ffffff'});
				}
				
				
				if(continuar == 'SI'){
					var datos = "opcion="+opcion+"&id="+id+"&u="+usuario+"&p="+pass+"&pr="+pregunta+"&r="+respuesta+"&tp="+tp;
					ajax('../../modulos/configuracion/procesa_usuarios.php', '../../modulos/configuracion/m_usuarios.php', datos, 'actualiza_contenedor');	
				}
			//}
		}
	}
	
	function carga_geografico(opcion, obj){

		if(opcion == 1){
			//Estoy solicitando Agregar un Nuevo Pais
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=1');
		}
		if(opcion == 2){
			// Estoy Solicitando modificar un pais y cargo los estados de este	
			var pais 		= $(obj).attr('value');
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=2&pais='+pais);
			cargar_contenido('def', 'modulos/configuracion/geografico.php?op=1&pais='+pais);
		}
		if(opcion == 3){
			//Estoy solicitando Agregar un Nuevo estado
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=3');
		}
		if(opcion == 4){
			// Estoy Solicitando modificar un estado y cargo las ciudades de este	
			var pais 		= $('#paises').attr('value');
			var estado 		= $(obj).attr('value');
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=4&pais='+pais+'&estado='+estado);
			cargar_contenido('ghi', 'modulos/configuracion/geografico.php?op=2&pais='+pais+'&estado='+estado);
		}
		if(opcion == 5){
			//Estoy solicitando Agregar una Nueva ciudad
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=5');
		}
		if(opcion == 6){
			// Estoy Solicitando modificar una ciudad y cargo los municipios de esta	
			var pais 		= $('#paises').attr('value');
			var estado 		= $('#estados').attr('value');
			var ciudad 		= $(obj).attr('value');
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=6&pais='+pais+'&estado='+estado+'&ciudad='+ciudad);
			cargar_contenido('jkl', 'modulos/configuracion/geografico.php?op=3&pais='+pais+'&estado='+estado+'&ciudad='+ciudad);
		}
		if(opcion == 7){
			//Estoy solicitando Agregar un Nuevo municipio
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=7');
		}
		if(opcion == 8){
			// Estoy Solicitando modificar un municipio
			var pais 		= $('#paises').attr('value');
			var estado 		= $('#estados').attr('value');
			var ciudad 		= $('#ciudades').attr('value');
			var municipio	= $(obj).attr('value');
			cargar_contenido('mno', 'modulos/configuracion/m_geografico.php?op=8&pais='+pais+'&estado='+estado+'&ciudad='+ciudad+'&municipio='+municipio);
		}
	}
	
	function procesar_geo(op, id){
		var continuar = false;
		if(op == 1 || op == 2 || op == 3){
			// Estoy trabajando con los Paises
			var nombre  = $('#pn-'+id).attr('value');
			if(nombre != '' && nombre != null && nombre != 'undefined'){
				continuar 	= true;
				var datos	= "opcion="+op+"&id="+id+"&nombre="+nombre;			
			}
		}
		
		if(op == 4 || op == 5 || op == 6){
			// Estoy trabajando con los Estados	
			var pais 	= $('#paises').attr('value');
			var nombre  = $('#es-'+id).attr('value');
			if(nombre != '' && nombre != null && nombre != 'undefined'){
				continuar 	= true;
				var datos	= "opcion="+op+"&id="+id+"&pais="+pais+"&nombre="+nombre;			
			}
		}
		
		if(op == 7 || op == 8 || op == 9){
			// Estoy trabajando con las Ciudades
			var estado 	= $('#estados').attr('value');
			var nombre  = $('#ci-'+id).attr('value');
			if(nombre != '' && nombre != null && nombre != 'undefined'){
				continuar 	= true;
				var datos	= "opcion="+op+"&id="+id+"&estado="+estado+"&nombre="+nombre;			
			}
		}
		
		if(op == 10 || op == 11 || op == 12){
			// Estoy trabajando con los Municipios
			var ciudad 	= $('#ciudades').attr('value');
			var nombre  = $('#mu-'+id).attr('value');
			if(nombre != '' && nombre != null && nombre != 'undefined'){
				continuar 	= true;
				var datos	= "opcion="+op+"&id="+id+"&ciudad="+ciudad+"&nombre="+nombre;			
			}
		}
		
		if(continuar == true){
			ajax('../../modulos/configuracion/procesa_geo.php', '../../modulos/configuracion/m_geografico.php', datos, 'actualiza_contenedor');	
		}
	}
	
	function procesa_dpto(op, id){
		if(op == 1){
			// Estoy agregando un nuevo departamento	
			var dpto 		= $('#departamento').attr('value');
			var telefono	= $('#telefono').attr('value');
			var email		= $('#email').attr('value');
			
			if(dpto != '' || dpto != 'undefined' || telefono != '' || telefono != 'undefined' || email != '' || email != 'undefined'){
				var datos	= "opcion="+op+"&id="+id+"&dpto="+dpto+"&telefono="+telefono+"&email="+email;	
				ajax('../../modulos/configuracion/procesa_dpto.php', '../../modulos/configuracion/m_dpto.php', datos, 'actualiza_contenedor');	
			}
		}
		
		if(op == 2 || op == 3){
			// Estoy modificando o eliminando un departamento	
			var dpto 		= $('#d-'+id).attr('value');
			var telefono	= $('#t-'+id).attr('value');
			var email		= $('#e-'+id).attr('value');
			
			if(dpto != '' || dpto != 'undefined' || telefono != '' || telefono != 'undefined' || email != '' || email != 'undefined'){
				var datos	= "opcion="+op+"&id="+id+"&dpto="+dpto+"&telefono="+telefono+"&email="+email;	
				ajax('../../modulos/configuracion/procesa_dpto.php', '../../modulos/configuracion/m_dpto.php', datos, 'actualiza_contenedor');	
			}
		}
	}
	
	function procesa_cargos(op, id){
		if(op == 1){
			// Estoy agregando un nuevo departamento	
			var cargo = $('#cargo').attr('value');
			
			if(cargo != '' || cargo != 'undefined'){
				var datos	= "opcion="+op+"&id="+id+"&cargo="+cargo;	
				ajax('../../modulos/configuracion/procesa_cargos.php', '../../modulos/configuracion/m_cargos.php', datos, 'actualiza_contenedor');	
			}
		}
		
		if(op == 2 || op == 3){
			// Estoy modificando o eliminando un departamento	
			var cargo 		= $('#c-'+id).attr('value');
						
			if(cargo != '' || cargo != 'undefined'){
				var datos	= "opcion="+op+"&id="+id+"&cargo="+cargo;	
				ajax('../../modulos/configuracion/procesa_cargos.php', '../../modulos/configuracion/m_cargos.php', datos, 'actualiza_contenedor');	
			}
		}
	}
	
	function solicita_socio(op, socio){
		if(op == 1){
			cargar_contenido('actualiza_contenedor', 'modulos/compras/socios.php?op='+op+'&socio='+socio);
		}
		if(op == 2){
			cargar_contenido('actualiza_contenedor', 'modulos/compras/socios.php?op='+op+'&socio='+socio);
		}
		if(op == 3){
			if(confirm("¿Esta SEGURO de querer borrar este registro?, ¡esto tambien borrara los contactos asociados!")){
				var datos = 'opcion='+op+'&id='+socio;
				ajax('../../modulos/compras/procesa_entes.php', '../../modulos/compras/m_entes.php', datos, 'actualiza_contenedor');
			}
		}
		if(op == 4){
			cargar_contenido('actualiza_contenedor', 'modulos/compras/socios_contactos.php?op='+op+'&id='+socio);
		}
	}
	
	function procesa_socios(op, socio, id){
		var continuar = false;
		if(op == 1){
			// Agrego un socio
			if(socio == 'P'){
				// Estoy agregando un proveedor
				var tempresa	= $('#tempresa').attr('value');
				var erazon 		= $('#erazon').attr('value');
				var erif 		= $('#erif').attr('value');
				var direccion 	= $('#direccion').attr('value');
				var contribu 	= $('#contribu').attr('value');
				var telf1	 	= $('#telf1').attr('value');
				var telf2	 	= $('#telf2').attr('value');
				var web		 	= $('#web').attr('value');
				var email	 	= $('#email').attr('value');
				var diascred 	= $('#diascred').attr('value');
				var limcred 	= $('#limcred').attr('value');
				var descu	 	= $('#descu').attr('value');
				var inter	 	= $('#descu').attr('checked');
				var grupo	 	= $('#grupo').attr('value');
				var estatus	 	= $('#estatus').attr('value');
				if(inter == true)  inter = 1;
				if(inter == false) inter = 0;
				var cuenta	 	= $('#descu').attr('value');
				
				if(tempresa != 0 && tempresa != '' && erazon != '' && ( erif.substr(0,2)=='J-' || erif.substr(0,2)=='G-' ) && direccion != '' && contribu != 0 && telf1 != '' && telf2 != '' && email != '' && web != '' ){
					var datos = 'socio='+socio+'&opcion='+op+'&tempresa='+tempresa+'&erazon='+erazon+'&erif='+erif+'&direccion='+direccion+'&contribu='+contribu+'&telf1='+telf1+'&telf3='+telf2+'&web='+web+'&email='+email+'&diascred='+diascred+'&limcred='+limcred+'&grupo='+grupo+'&descu='+descu+'&inter='+inter+'&cuenta='+cuenta+'&estatus='+estatus;
					continuar = true;
				}
			}
			if(socio == 'C'){
				// Agrego un Cliente
				alert('En Desarrollo');
			}
		}
		
		if(op == 2){
			if(socio == 'P'){
				// Estoy editando un proveedor
				var tempresa	= $('#tempresa').attr('value');
				var erazon 		= $('#erazon').attr('value');
				var erif 		= $('#erif').attr('value');
				var direccion 	= $('#direccion').attr('value');
				var contribu 	= $('#contribu').attr('value');
				var telf1	 	= $('#telf1').attr('value');
				var telf2	 	= $('#telf2').attr('value');
				var web		 	= $('#web').attr('value');
				var email	 	= $('#email').attr('value');
				var diascred 	= $('#diascred').attr('value');
				var limcred 	= $('#limcred').attr('value');
				var descu	 	= $('#descu').attr('value');
				var inter	 	= $('#descu').attr('checked');
				var grupo	 	= $('#grupo').attr('value');
				var estatus	 	= $('#estatus').attr('value');
				if(inter == true)  inter = 1;
				if(inter == false) inter = 0;
				var cuenta	 	= $('#descu').attr('value');
				
				if(tempresa != 0 && tempresa != '' && erazon != '' && ( erif.substr(0,2)=='J-' || erif.substr(0,2)=='G-' ) && direccion != '' && contribu != 0 && telf1 != '' && telf2 != '' && email != '' && web != '' ){
					var datos = 'socio='+socio+'&opcion='+op+'&id='+id+'&tempresa='+tempresa+'&erazon='+erazon+'&erif='+erif+'&direccion='+direccion+'&contribu='+contribu+'&telf1='+telf1+'&telf3='+telf2+'&web='+web+'&email='+email+'&diascred='+diascred+'&limcred='+limcred+'&grupo='+grupo+'&descu='+descu+'&inter='+inter+'&cuenta='+cuenta+'&estatus='+estatus;
					continuar = true;
				}
			}
		}
		
		if(continuar == true){
			ajax('../../modulos/compras/procesa_entes.php', '../../modulos/compras/socios_contactos.php', datos, 'actualiza_contenedor');
		}
	}
	
	function procesa_socontactos(op, id, id2){
		var continuar = false	
		if(op == 1){
			var nombres 	= $('#nombres').attr('value');
			var apellidos 	= $('#apellidos').attr('value');
			var dpto 		= $('#dpto').attr('value');
			var cargo 		= $('#cargo').attr('value');
			var telf1 		= $('#telf1').attr('value');
			var telf2 		= $('#telf2').attr('value');
			var email1 		= $('#email1').attr('value');
			var email2 		= $('#email2').attr('value');
				
			if(nombres != '' && apellidos != '' && dpto != '' && cargo != '' && telf1 != '' && email1 != ''){
				var datos = 'opcion='+op+'&id='+id+'&id2='+id2+'&nombres='+nombres+'&apellidos='+apellidos+'&dpto='+dpto+'&cargo='+cargo+'&telf1='+telf1+'&telf2='+telf2+'&email1='+email1+'&email2='+email2;
				continuar = true;
			}
		}
		
		if(op == 2 || op == 3){
			var nombres 	= $('#n-'+id2).attr('value');
			var apellidos 	= $('#a-'+id2).attr('value');
			var dpto 		= $('#d-'+id2).attr('value');
			var cargo 		= $('#c-'+id2).attr('value');
			var telf1 		= $('#t1-'+id2).attr('value');
			var telf2 		= $('#t2-'+id2).attr('value');
			var email1 		= $('#e1-'+id2).attr('value');
			var email2 		= $('#e2-'+id2).attr('value');
				
			if(nombres != '' && apellidos != '' && dpto != '' && cargo != '' && telf1 != '' && email1 != ''){
				var datos = 'opcion='+op+'&id='+id+'&id2='+id2+'&nombres='+nombres+'&apellidos='+apellidos+'&dpto='+dpto+'&cargo='+cargo+'&telf1='+telf1+'&telf2='+telf2+'&email1='+email1+'&email2='+email2;
				continuar = true;
			}
		}
		
		if(continuar == true){
			ajax('../../modulos/compras/procesa_socontactos.php', '../../modulos/compras/socios_contactos.php', datos, 'actualiza_contenedor');
		}
	}
	
	function procesa_gs(op, id){
		var continuar = false;
		if(op == 1){
			var nombre 	= $('#nombre').attr('value');
			var desc 	= $('#descripcion').attr('value');
			if(nombre != 'undefined' && nombre != null && nombre != '' && desc != 'undefined' && desc != null && desc != ''){
				continuar = true;
			}
		}
		if(op == 2 || op == 3){
			var nombre 	= $('#N-'+id).attr('value');
			var desc 	= $('#D-'+id).attr('value');
			if(nombre != 'undefined' && nombre != null && nombre != '' && desc != 'undefined' && desc != null && desc != ''){
				continuar = true;
			}
		}
		
		if(continuar == true){
			var datos = "id="+id+"&op="+op+"&nombre="+nombre+"&desc="+desc;
			ajax('../../modulos/compras/procesa_gs.php', '../../modulos/compras/m_gs.php', datos, 'actualiza_contenedor');
		}
	}
	
	function procesa_ml(op, id){
		if(op == 1){
			//agrego una nueva linea
			var marca = $('#marca').attr('value');
			var nombre = $('#l-nombre').attr('value');
			var siglas = $('#l-siglas').attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas+'&marca='+marca;
			ajax('../../modulos/almacenes/procesa_ml.php', '../../modulos/almacenes/select_ml.php?marca='+marca, datos, 'lin');
		}
		
		if(op == 2 || op == 3){
			//modifico o elimino lineas
			var marca = $('#marca-'+id).attr('value');
			var nombre = $('#l-no'+id).attr('value');
			var siglas = $('#l-si'+id).attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas+'&marca='+marca;
			ajax('../../modulos/almacenes/procesa_ml.php', '../../modulos/almacenes/select_ml.php?marca='+marca, datos, 'lin');
		}
		
		if(op == 4){
			//agrego una nueva Marca
			var nombre = $('#m-nombre').attr('value');
			var siglas = $('#m-siglas').attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_ml.php', '../../modulos/almacenes/m_ml.php', datos, 'actualiza_contenedor');
		}
		
		if(op == 5 || op == 6){
			//modifico o elimino marcas
			var nombre = $('#m-no'+id).attr('value');
			var siglas = $('#m-si'+id).attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_ml.php', '../../modulos/almacenes/m_ml.php', datos, 'actualiza_contenedor');
		}
		
		if(op == 7){
			$('.lin').load('modulos/almacenes/select_ml.php?marca='+id);
		}
	}
	
	function procesa_grupoprod(op, id){
		if(op == 1){
			//agrego unnuevo grupo
			var nombre = $('#nombre').attr('value');
			var siglas = $('#siglas').attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_grupoprod.php', '../../modulos/almacenes/m_grupoprod.php', datos, 'actualiza_contenedor');
		}
		
		if(op == 2 || op == 3){
			//modifico o elimino un grupo
			var nombre = $('#n-'+id).attr('value');
			var siglas = $('#s-'+id).attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_grupoprod.php', '../../modulos/almacenes/m_grupoprod.php', datos, 'actualiza_contenedor');
		}
	}
	
	function procesa_bp(op, id){
		if(op == 1){
			//agrego unnuevo grupo
			var nombre = $('#nombre').attr('value');
			var siglas = $('#siglas').attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_bp.php', '../../modulos/almacenes/m_bp.php', datos, 'actualiza_contenedor');
		}
		
		if(op == 2 || op == 3){
			//modifico o elimino un grupo
			var nombre = $('#n-'+id).attr('value');
			var siglas = $('#s-'+id).attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas;
			ajax('../../modulos/almacenes/procesa_bp.php', '../../modulos/almacenes/m_bp.php', datos, 'actualiza_contenedor');
		}
	}
	
	function procesa_medidas(op, id){
		if(op == 1){
			//agrego unnuevo grupo
			var tipo 	= $('#tipo').attr('value');
			var nombre 	= $('#nombre').attr('value');
			var siglas 	= $('#siglas').attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas+'&tipo='+tipo;
			ajax('../../modulos/configuracion/procesa_medidas.php', '../../modulos/configuracion/m_medidas.php', datos, 'actualiza_contenedor');
		}
		
		if(op == 2 || op == 3){
			//modifico o elimino un grupo
			var tipo 	= $('#t-'+id).attr('value');
			var nombre 	= $('#n-'+id).attr('value');
			var siglas 	= $('#s-'+id).attr('value');
			
			datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&siglas='+siglas+'&tipo='+tipo;
			ajax('../../modulos/configuracion/procesa_medidas.php', '../../modulos/configuracion/m_medidas.php', datos, 'actualiza_contenedor');
		}
	}
	
	// FUNCION QUE SE ENCARGA DE PROCESAR LOS ALMACENES
	function procesa_almacenes(op, id){
		var nombre 	= $('#i_a_nombre-'+id).attr('value');
		var desc 	= $('#i_a_desc-'+id).attr('value');
		var tipo 	= $('#i_a_tipo-'+id).attr('value');
		
		if(nombre != '' && desc != '' && tipo != ''){
			var datos = 'op='+op+'&id='+id+'&nombre='+nombre+'&desc='+desc+'&tipo='+tipo;
			ajax('../../modulos/almacenes/procesa_almacenes.php', '../../modulos/almacenes/m_almacenes.php', datos, 'actualiza_contenedor');
		}
	}
	
	
	// FUNCIONES QUE SE ENCARGAN DE PROCESAR LOS PRODUCTOS
	function valida_pgrupo(obj, xx, id){
		var tipo = $(obj).attr('title');
		var sgrupo, slinea, smarca = null;
		document.getElementById('i_p_foto-'+id).disabled = true;
					
		if(xx == 'G'){
			var codigo = null;
			if(tipo == 'PINTURA' || tipo == 'PINTURAS' || tipo == 'PAINT'){
				$('.pbase-'+id).slideDown('slow');	
			}else{
				$('.pbase-'+id).slideUp('slow');
			}
		}
		
		if(xx == 'M'){
			smarca = $('#i_pmarca-'+id+' option[selected]').attr('class');
			var codigo = smarca;
			$('.lin-'+id).load('modulos/almacenes/select_ml.php?victor=16049651&&marca='+$(obj).attr('value')+'&&id='+id);
		}
		
		if(xx == 'L'){
			smarca = $('#i_pmarca-'+id+' option[selected]').attr('class');
			slinea = $('#i_plinea-'+id+' option[selected]').attr('class');
			var codigo = smarca+'-'+slinea;
			document.getElementById('i_p_foto-'+id).disabled = false;
		}
		
		if(xx == 'F'){
			smarca = $('#i_pmarca-'+id+' option[selected]').attr('class');
			slinea = $('#i_plinea-'+id+' option[selected]').attr('class');
			sfabri = $('#cfabrica-'+id).attr('value').substr(0,8);
			var codigo = smarca+'-'+slinea+'-'+sfabri;
		}
			
		if(xx == 'UV'){
			smarca = $('#i_pmarca-'+id+' option[selected]').attr('class');
			slinea = $('#i_plinea-'+id+' option[selected]').attr('class');
			sfabri = $('#cfabrica-'+id).attr('value').substr(0,8);
			sunida = $('#i_p_uv-'+id).attr('value');
			var codigo = smarca+'-'+slinea+'-'+sfabri+'-'+sunida;
		}
		
		document.getElementById('codigo-'+id).value = codigo;
	}
	
	function procesa_productos(op, id){
		var continuar	= false;
		var codigo 		= $('#codigo-'+id).attr('value');
		var cfabrica	= $('#cfabrica-'+id).attr('value');
		var grupo		= $('#i_pgrupo-'+id).attr('value');
		var base 		= '';
		var tipo 		= $('#i_pgrupo-'+id+' option[selected]').attr('title');
		var marca		= $('#i_pmarca-'+id).attr('value');
		var linea		= $('#i_plinea-'+id).attr('value');
		var nombre		= $('#i_p_nombre-'+id).attr('value');
		var desc		= $('#i_p_desc-'+id).attr('value');
		var peso		= $('#i_p_peso-'+id).attr('value');
		var m1			= $('#medida1-'+id).attr('value');
		var largo		= $('#i_p_largo-'+id).attr('value');
		var m2			= $('#medida2-'+id).attr('value');
		var ancho		= $('#i_p_ancho-'+id).attr('value');
		var m3			= $('#medida3-'+id).attr('value');
		var profun		= $('#i_p_profun-'+id).attr('value');
		var m4			= $('#medida4-'+id).attr('value');
		var minimo		= $('#i_p_min-'+id).attr('value');
		var maximo		= $('#i_p_max-'+id).attr('value');
		var uc			= $('#i_p_uc-'+id).attr('value');
		var cuc			= $('#i_p_cantuc-'+id).attr('value');
		var uv			= $('#i_p_uv-'+id).attr('value');
		var cuv			= $('#i_p_cantuv-'+id).attr('value');
		var impc		= $('#i_p_impc-'+id).attr('checked');
		var impv		= $('#i_p_impv-'+id).attr('checked');
		var cuenta		= $('#i_p_cuenta-'+id).attr('value');
		var estatus		= $('#i_p_estatus-'+id).attr('value');
		var foto		= $('#i_p_foto-'+id).attr('value');
		var infla		= $('#i_p_infla-'+id).attr('checked');
		var garantia	= $('#i_p_garantia-'+id).attr('checked');
		var tgarantia	= $('#i_p_gtiempo-'+id).attr('value')+'/'+$('#gtiempo-'+id).attr('value');
		var activo		= $('#i_p_activo-'+id).attr('checked');
		var comi		= $('#i_p_comi-'+id).attr('checked');
		if(op == 1 || op == 2){
			if(grupo == '' || grupo == null || grupo == 'undefined' || grupo == 0){
				continuar = not('i_pgrupo-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_pgrupo-'+id, 'msg');
				if(tipo == 'PINTURA' || tipo == 'PINTURAS' || tipo == 'PAINT'){
					base = $('#i_pbase-'+id).attr('value');
					if(base == '' || base == null || base == 'undefined' || base == 0){
						continuar = not('i_pbase-'+id, 'msg', 'actualiza_contenedor');
					}else{
						continuar = ok('i_pbase-'+id, 'msg');
					}
				}else{
					base = 0;
				}
			}
			
			if(marca == '' || marca == null || marca == 'undefined' || marca == 0){
				continuar = not('i_pmarca-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_pmarca-'+id, 'msg');
			}
			
			if(linea == '' || linea == null || linea == 'undefined' || linea == 0){
				continuar = not('i_plinea-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_plinea-'+id, 'msg');
			}
			
			if(cfabrica == '' || cfabrica == null || cfabrica == 'undefined' || cfabrica.length == 0 ){
				continuar = not('cfabrica-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('cfabrica-'+id, 'msg');
			}
			
			if(codigo == '' || codigo == null || codigo == 'undefined' || codigo.split('-').length < 3 ){
				continuar = not('codigo-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('codigo-'+id, 'msg');
			}
			
			if(nombre == '' || nombre == null || nombre == 'undefined' || nombre.length < 5 ){
				continuar = not('i_p_nombre-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_nombre-'+id, 'msg');
			}
			
			if(desc == '' || desc == null || desc == 'undefined' || desc.length < 10 ){
				continuar = not('i_p_desc-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_desc-'+id, 'msg');
			}
			
			if(peso == '' || peso == null || peso == 'undefined' || peso == 0 ){
				continuar = not('i_p_peso-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_peso-'+id, 'msg');
				if(m1 == '' || m1 == null || m1 == 'undefined' || m1 == 0 ){
					continuar = not('medida1-'+id, 'msg', 'actualiza_contenedor');
				}else{
					continuar = ok('medida1-'+id, 'msg');
					peso = peso+'/'+m1;
				}
			}
			
			if(largo == '' || largo == null || largo == 'undefined' || largo == 0 ){
				continuar = not('i_p_largo-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_largo-'+id, 'msg');
				if(m2 == '' || m2 == null || m2 == 'undefined' || m2 == 0 ){
					continuar = not('medida2-'+id, 'msg', 'actualiza_contenedor');
				}else{
					continuar = ok('medida2-'+id, 'msg');
					largo = largo+'/'+m2;
				}
			}
			
			if(ancho == '' || ancho == null || ancho == 'undefined' || ancho == 0 ){
				continuar = not('i_p_ancho-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_ancho-'+id, 'msg');
				if(m3 == '' || m3 == null || m3 == 'undefined' || m3 == 0 ){
					continuar = not('medida3-'+id, 'msg', 'actualiza_contenedor');
				}else{
					continuar = ok('medida3-'+id, 'msg');
					ancho = ancho+'/'+m3;
				}
			}
			
			if(profun == '' || profun == null || profun == 'undefined' || profun == 0 ){
				continuar = not('i_p_profun-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_profun-'+id, 'msg');
				if(m4 == '' || m4 == null || m4 == 'undefined' || m4 == 0 ){
					continuar = not('medida4-'+id, 'msg', 'actualiza_contenedor');
				}else{
					continuar = ok('medida4-'+id, 'msg');
					profun = profun+'/'+m4;
				}
			}
			
			if(minimo == '' || minimo == null || minimo == 'undefined'){
				continuar = not('i_p_min-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_min-'+id, 'msg');
			}
			
			if(maximo == '' || maximo == null || maximo == 'undefined'){
				continuar = not('i_p_max-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_max-'+id, 'msg');
			}
			
			if(uc == '' || uc == null || uc == 'undefined' || uc == 0){
				continuar = not('i_p_uc-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_uc-'+id, 'msg');
			}
			
			if(cuc == '' || cuc == null || cuc == 'undefined' || cuc == 0){
				continuar = not('i_p_cantuc-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_cantuc-'+id, 'msg');
			}
			
			if(uv == '' || uv == null || uv == 'undefined' || uv == 0){
				continuar = not('i_p_uv-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_uv-'+id, 'msg');
			}
			
			if(cuv == '' || cuv == null || cuv == 'undefined' || cuv == 0){
				continuar = not('i_p_cantuv-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_cantuv-'+id, 'msg');
			}
			
			if(impc == true){
				impc = 1;
			}else{
				impc = 0;
			}
				
			if(impv == true){
				impv = 1;
			}else{
				impv = 0;
			}
			
			if(foto == '' || foto == null || foto == 'undefined' || foto == 0){
				foto = '';
			}				
				
			if(cuenta == '' || cuenta == null || cuenta == 'undefined' || cuenta == 0){
				continuar = not('i_p_cuenta-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_cuenta-'+id, 'msg');
			}
			
			if(estatus == '' || estatus == null || estatus == 'undefined'){
				continuar = not('i_p_estatus-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('i_p_estatus-'+id, 'msg');
			}
			
			if(infla == true){
				infla = 1;
			}else{
				infla = 0;
			}
			
			if(garantia == true){
				garantia = 1;
				if(tgarantia == '' || tgarantia == null || tgarantia == 'undefined'){
					continuar = not('i_p_gtiempo-'+id, 'msg', 'actualiza_contenedor');
				}else{
					continuar = ok('i_p_gtiempo-'+id, 'msg');
				}	
			}else{
				garantia 	= 0;
				tgarantia 	= 0;
			}
			
			if(activo == true){
				activo = 1;
			}else{
				activo = 0;
			}
			
			if(comi == true){
				comi = 1;
			}else{
				comi = 0;
			}
				
			if(continuar == true){
				var datos = 'op='+op+'&id='+id+'&codigo='+codigo+'&cfabrica='+cfabrica+'&grupo='+grupo+'&base='+base+'&marca='+marca+'&linea='+linea+'&nombre='+nombre+'&desc='+desc+'&peso='+peso+'&largo='+largo+'&ancho='+ancho+'&profun='+profun+'&minimo='+minimo+'&maximo='+maximo+'&uc='+uc+'&cuc='+cuc+'&uv='+uv+'&cuv='+cuv+'&impc='+impc+'&impv='+impv+'&cuenta='+cuenta+'&estatus='+estatus+'&foto='+foto+'&infla='+infla+'&garantia='+garantia+'&tgarantia='+tgarantia+'&activo='+activo+'&comi='+comi;
				ajax('../../modulos/almacenes/procesa_productos.php', '../../modulos/almacenes/productos.php', datos, 'actualiza_contenedor');
			}
		}
		
		if(op == 3){
			if(codigo == '' || codigo == null || codigo == 'undefined' || codigo.split('-').length < 3 ){
				continuar = not('codigo-'+id, 'msg', 'actualiza_contenedor');
			}else{
				continuar = ok('codigo-'+id, 'msg');
			}
			if(continuar == true){
				var datos = 'op='+op+'&id='+id+'&codigo='+codigo+'&cfabrica='+cfabrica+'&grupo='+grupo+'&base='+base+'&marca='+marca+'&linea='+linea+'&nombre='+nombre+'&desc='+desc+'&peso='+peso+'&largo='+largo+'&ancho='+ancho+'&profun='+profun+'&minimo='+minimo+'&maximo='+maximo+'&uc='+uc+'&cuc='+cuc+'&uv='+uv+'&cuv='+cuv+'&impc='+impc+'&impv='+impv+'&cuenta='+cuenta+'&estatus='+estatus+'&foto='+foto+'&infla='+infla+'&garantia='+garantia+'&tgarantia='+tgarantia+'&activo='+activo+'&comi='+comi;
				ajax('../../modulos/almacenes/procesa_productos.php', '../../modulos/almacenes/productos.php', datos, 'actualiza_contenedor');
			}
		}
	}
		
	function ok(contenedor, mensajero){
		$('#'+contenedor).css({background:'#ffffff'});
		$('.'+mensajero).html('');
		return true;
	}
		
	function not(contenedor, mensajero, principal){
		$('#'+contenedor).css({background:'#FF0000'});
		$('.'+mensajero).html(warning+'Los Campos en Color Rojo deben ser Completados Correctamente');
		$('.'+principal).animate({ scrollTop: contenedor}, "fast");
		return false;
	}
	
	function foto_producto(id){
		document.VWD.action = 'modulos/compras/foto_producto.php?codigo='+$('#codigo-'+id).attr('value')+'&&id='+id; 
		document.VWD.target = 'foto_producto-'+id;
		document.VWD.submit();
		document.getElementById('i_p_foto-'+id).disabled = true;
	}
	
	//FUNCIONES QUE SE ENCARGAR DE PROCESAR LOS COSTOS
	function busca_criterio(obj, op){
		$('.envio').slideUp('slow');
		
		if(op == 1){
			var criterio = $(obj).attr('value');
			if(criterio != 0){
				cargar_contenido('criterio2', 'modulos/compras/select_criterio.php?victor=16049651&&criterio='+criterio);
				$('.criterio3').html('');
				$('.criterio4').html('');
				$('.formula1').html('');
				$('.formula2').html('');
			}
		}
			
		if(op == 2){
			$('.formula1').html('');
			$('.formula2').html('');
			var criterio 	= $('#criterio').attr('value');
			var criterio2 	= $(obj).attr('value');
			if(criterio == 2){
				// SI SE SELECCIONO UNA MARCA CARGO LAS LINEAS ASOCIADAS
				cargar_contenido('criterio4', 'modulos/compras/select_criterio.php?victor=16049651&&criterio=3&&criterio3='+criterio2);
			}
			// CARGO LA INFORMACION SELECCIONADA
			cargar_contenido('criterio3', 'modulos/compras/select_criterio.php?victor=16049651&&criterio='+criterio+'&&criterio2='+criterio2);
			// CARGO LA FORMULAS QUE SE PUEDEN UTILIZAR
			cargar_contenido('formula1', 'modulos/compras/formula_costo.php?victor=16049651');
		}
		
		if(op == 3){
			$('.formula1').html('');
			$('.formula2').html('');
			var criterio 	= 3;
			var criterio2 	= $('#criterio2').attr('value');
			var criterio3 	= $(obj).attr('value');
				
				// CARGO LA INFORMACION SELECCIONADA
			cargar_contenido('criterio3', 'modulos/compras/select_criterio.php?victor=16049651&&criterio='+criterio+'&&criterio2='+criterio2+'&&criterio3='+criterio3);
			// CARGO LA FORMULAS QUE SE PUEDEN UTILIZAR
			cargar_contenido('formula1', 'modulos/compras/formula_costo.php?victor=16049651');
			//alert(criterio + ' - ' + criterio2 + ' - ' + criterio3);
		}
	}
		
	function busca_formula(obj){
		var formula = $('#formula').attr('value');
		
		if(formula == 3){
			alert('Formula en Desarrollo');
		}else{
			cargar_contenido('formula2', 'modulos/compras/formula_costo.php?victor=16049651&&formula='+formula);
			$('.envio').slideDown('slow');
		}
	}
		
	function procesa_costo(){
		var nuevo 		= null;
		var actual 		= eval($('#costo').attr('value'));
		var incremento	= eval($('#nuevo').attr('value'));
		var formula 	= $('#formula').attr('value');
		var criterio	= $('#criterio').attr('value');
		var criterio2	= $('#criterio3').attr('value');
		
		if(confirm('Esta Usted SEGURO de actualizar este Costo')){
			var datos = 'criterio1='+criterio+'&criterio2='+criterio2+'&actual='+actual+'&incremento='+incremento+'&formula='+formula;
			ajax('../../modulos/compras/procesa_costo.php', '../../modulos/compras/costos.php', datos, 'actualiza_contenedor');
		}
			
	}
	
	//FUNCIONES QUE SE ENCARGAN DE PROCESAR LOS ENTES
	function solicita_ente(op, socio){
		if(op == 1){
			cargar_contenido('actualiza_contenedor', 'modulos/compras/entes2.php?op='+op+'&socio='+socio);
		}
	}