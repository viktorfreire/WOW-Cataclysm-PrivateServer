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
                                Usuario o e-Mail:
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div align="left">
                              <input id="que" name="que" type="text" size="20" maxlength="1000" class="input" />
                              &nbsp;&nbsp;
                              <input 
                              	type="button" 
                                class="boton" 
                                value="Buscar" 
                                onclick="buscar_datos('#que');"
                              />
                              &nbsp;&nbsp;
                              <img 
                              	src="imagenes/png/back.png" 
                                alt="[Volver]" 
                                title="[Volver]" 
                                onclick="cargar_contenido('datos', 'libreria/php/entrada.php', null);" 
                              />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="busqueda">
                                <br />
                            </div>
                        </td>
                    </tr>
                </table>
</body>
</html>
