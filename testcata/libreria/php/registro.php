<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body>
				<table width="300" cellpadding="5" cellspacing="0" border="0">
                    <tr>
                        <td width="60%">
                            <div class="txt_input">
                                Nombre de Cuenta:
                            </div>
                        </td>
                        <td>
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
                        <td width="60%">
                            <div class="txt_input">
                                Contraseña:
                            </div>
                        </td>
                        <td>
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
                        <td width="60%">
                            <div class="txt_input">
                                Repita Contraseña:
                            </div>
                        </td>
                        <td>
                            <div align="left">
                                <input 
                                	id="S_pwd2" 
                                    name="S_pwd2" 
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
                        <td width="60%">
                            <div class="txt_input">
                                e-Mail:
                            </div>
                        </td>
                        <td>
                            <div align="left">
                                <input 
                                	id="email" 
                                    name="email" 
                                    type="email" 
                                    size="20" 
                                    maxlength="2000" 
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
                            <div class="texto" align="center">
                                <input id="boton" type="button" class="boton" value="[Registrar]" onclick="registro('#S_login', '#S_pwd', '#S_pwd2', '#email');" />
                            </div>
                        </td>
                    </tr>
                </table>
</body>
</html>
