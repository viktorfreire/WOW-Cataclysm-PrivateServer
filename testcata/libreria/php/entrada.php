<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
				<table width="300" cellpadding="5" cellspacing="0" border="0">
                    <tr>
                        <td colspan="2">
                            <div class="txt_input">
                                Nombre de Cuenta:
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div align="left">
                                <input 
                                	id="S_login" 
                                    name="S_login" 
                                    type="text" 
                                    size="20" 
                                    maxlength="20" 
                                    class="input" 
                                    onclick="$(this).css({background:'#ffffff', color:'#333333'});" 
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td width="50%">
                            <div class="texto">
                                <br />
                            </div>
                        </td>
                        <td width="50%">
                            <div class="texto">
                                <input id="boton" type="button" class="boton" value="Entrar" onclick="alert('Nuestro portal se encuentra en Desarrollo, por los momentos solo puedes crear tu cuenta para jugar en nuestro servidor');" />
                                <!--<input id="boton" type="button" class="boton" value="Entrar" onclick="entrada('#S_login', '#S_pwd');" />-->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="texto">
                                <br />
                            </div>
                        </td>
                        <td>
                            <div class="texto">
                            	<a href="#" onclick="cargar_contenido('datos', 'libreria/php/seguridad.php');">
                                	¿olvido sus datos?
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="txt_input">
                                Contraseña:
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div align="left">
                                <input 
                                	id="S_pwd" 
                                    name="S_pwd" 
                                    type="password" 
                                    size="20" 
                                    maxlength="20" 
                                    class="input" 
                                    onclick="$(this).css({background:'#ffffff', color:'#333333'});" 
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                    	<td colspan="2">
                        	<div align="center">
                            	<br />
                            </div>
                        </td>
                    </tr>
                    <tr>
                    	<td colspan="2">
                        	<div align="center" class="titulo_wow">
                            	<a href="#" onclick="cargar_contenido('datos', 'libreria/php/registro.php');">Registrarse en TestCata</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                    	<td colspan="2">
                        	<div align="center" class="titulo_wow">
                            	<a href="magnet:?xt=urn:btih:99a9885675e06f1f677ca93be43f475284bb0f0b&amp;dn=WOW+Cataclysm+4.0.6+%28Espa%26ntilde%3Bol%29&amp;tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&amp;tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&amp;tr=udp%3A%2F%2Ftracker.istole.it%3A6969&amp;tr=udp%3A%2F%2Ftracker.ccc.de%3A80" title="Descarga el Juego aquí">Descarga el Juego aquí</a>
                            </div>
                        </td>
                    </tr>
                    
                </table>
</body>
</html>
