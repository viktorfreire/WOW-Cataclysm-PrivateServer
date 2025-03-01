-- phpMyAdmin SQL Dump
-- version 2.10.1
-- http://www.phpmyadmin.net
-- 
-- Servidor: localhost
-- Tiempo de generación: 17-10-2010 a las 19:44:23
-- Versión del servidor: 5.0.45
-- Versión de PHP: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

-- 
-- Base de datos: `idse`
-- 
DROP DATABASE `idse`;
CREATE DATABASE `idse` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `idse`;

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_acceso`
-- 

DROP TABLE IF EXISTS `b_acceso`;
CREATE TABLE IF NOT EXISTS `b_acceso` (
  `b_a_id` int(11) NOT NULL auto_increment,
  `b_u_id` int(11) NOT NULL,
  `b_a_login` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `b_a_pass` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `b_a_preg` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `b_a_resp` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `b_a_tp` int(11) NOT NULL COMMENT '0 activo, 1 inactivo, permite visualizar los almacenes tipo compras',
  `b_a_fecrea` date NOT NULL,
  `b_a_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_a_id`),
  KEY `b_u_id` (`b_u_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Datos de acceso al sistema' AUTO_INCREMENT=5 ;

-- 
-- Volcar la base de datos para la tabla `b_acceso`
-- 

INSERT INTO `b_acceso` (`b_a_id`, `b_u_id`, `b_a_login`, `b_a_pass`, `b_a_preg`, `b_a_resp`, `b_a_tp`, `b_a_fecrea`, `b_a_ucrea`) VALUES 
(1, 1, '69bd4469cf26d24a114f678c0db7950a', '63bb77756f946140617d17ad33174293', 'COLOR FAVORITO', '3cbe93dcece02ff36e270764494aecfd', 0, '2010-08-17', 1),
(4, 15, '5367faa829f53ce6b635a5afd2524a0b', '5367faa829f53ce6b635a5afd2524a0b', 'COMO ME LLAMO', 'f61dc6f1b594752703e3479ea3a83e48', 1, '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_cargos`
-- 

DROP TABLE IF EXISTS `b_cargos`;
CREATE TABLE IF NOT EXISTS `b_cargos` (
  `b_c_id` int(11) NOT NULL auto_increment,
  `b_c_nombre` varchar(100) NOT NULL,
  `b_c_fecrea` date NOT NULL,
  `b_c_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_c_id`),
  KEY `b_c_nombre` (`b_c_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Cargos de la empresa' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `b_cargos`
-- 

INSERT INTO `b_cargos` (`b_c_id`, `b_c_nombre`, `b_c_fecrea`, `b_c_ucrea`) VALUES 
(1, 'GERENTE', '2010-08-30', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_ciudades`
-- 

DROP TABLE IF EXISTS `b_ciudades`;
CREATE TABLE IF NOT EXISTS `b_ciudades` (
  `b_ci_id` int(11) NOT NULL auto_increment,
  `b_es_id` int(11) NOT NULL,
  `b_ci_nombre` varchar(100) NOT NULL,
  `b_ci_fecrea` date NOT NULL,
  `b_ci_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_ci_nombre`),
  KEY `b_ci_id` (`b_ci_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- 
-- Volcar la base de datos para la tabla `b_ciudades`
-- 

INSERT INTO `b_ciudades` (`b_ci_id`, `b_es_id`, `b_ci_nombre`, `b_ci_fecrea`, `b_ci_ucrea`) VALUES 
(4, 2, 'CARACAS', '2010-08-29', 1),
(3, 2, 'VALENCIA', '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_departamentos`
-- 

DROP TABLE IF EXISTS `b_departamentos`;
CREATE TABLE IF NOT EXISTS `b_departamentos` (
  `b_d_id` int(11) NOT NULL auto_increment,
  `b_d_nombre` varchar(100) NOT NULL,
  `b_d_telf` varchar(15) NOT NULL,
  `b_d_email` varchar(500) NOT NULL,
  `b_d_fecrea` date NOT NULL,
  `b_d_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_d_id`),
  KEY `b_d_nombre` (`b_d_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Departamentos de la empresa' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `b_departamentos`
-- 

INSERT INTO `b_departamentos` (`b_d_id`, `b_d_nombre`, `b_d_telf`, `b_d_email`, `b_d_fecrea`, `b_d_ucrea`) VALUES 
(1, 'ADMINISTRACIÃ³N', '02418781383', 'ADMIN@ADMIN.COM', '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_documentos`
-- 

DROP TABLE IF EXISTS `b_documentos`;
CREATE TABLE IF NOT EXISTS `b_documentos` (
  `b_dc_id` int(11) NOT NULL auto_increment,
  `b_dc_tipo` varchar(100) NOT NULL,
  `b_dc_codigo` varchar(50) NOT NULL,
  `b_dc_controli` int(11) NOT NULL COMMENT 'numero de control inicio',
  `b_dc_controlf` int(11) NOT NULL COMMENT 'numero de control fin',
  `b_dc_documi` int(11) NOT NULL COMMENT 'numero del documento inicio',
  `b_dc_documf` int(11) NOT NULL COMMENT 'numero del documento fin',
  `b_dc_fecrea` date NOT NULL,
  `b_dc_ucrea` int(11) NOT NULL,
  `b_dc_femodi` date NOT NULL,
  `b_dc_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`b_dc_id`),
  KEY `b_dc_controli` (`b_dc_controli`,`b_dc_controlf`,`b_dc_documi`,`b_dc_documf`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='tabla con el control de documentos del sistema' AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `b_documentos`
-- 

INSERT INTO `b_documentos` (`b_dc_id`, `b_dc_tipo`, `b_dc_codigo`, `b_dc_controli`, `b_dc_controlf`, `b_dc_documi`, `b_dc_documf`, `b_dc_fecrea`, `b_dc_ucrea`, `b_dc_femodi`, `b_dc_umodi`) VALUES 
(2, 'REQUISICION', 'REQ', 1, 99999, 1, 99999, '2010-10-12', 15, '0000-00-00', 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_econtactos`
-- 

DROP TABLE IF EXISTS `b_econtactos`;
CREATE TABLE IF NOT EXISTS `b_econtactos` (
  `b_ec_id` int(11) NOT NULL auto_increment,
  `b_en_id` int(11) NOT NULL,
  `b_ec_nombres` varchar(500) NOT NULL,
  `b_ec_apellidos` varchar(500) NOT NULL,
  `b_ec_dpto` varchar(100) NOT NULL,
  `b_ec_cargo` varchar(100) NOT NULL,
  `b_ec_telf1` varchar(15) NOT NULL,
  `b_ec_telf2` varchar(15) NOT NULL,
  `b_ec_email1` varchar(500) NOT NULL,
  `b_ec_email2` varchar(500) NOT NULL,
  `b_ec_fecrea` date NOT NULL,
  `b_ec_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_ec_id`),
  KEY `b_en_id` (`b_en_id`,`b_ec_nombres`,`b_ec_apellidos`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `b_econtactos`
-- 

INSERT INTO `b_econtactos` (`b_ec_id`, `b_en_id`, `b_ec_nombres`, `b_ec_apellidos`, `b_ec_dpto`, `b_ec_cargo`, `b_ec_telf1`, `b_ec_telf2`, `b_ec_email1`, `b_ec_email2`, `b_ec_fecrea`, `b_ec_ucrea`) VALUES 
(5, 1, 'PEPITO', 'PEREZ', 'MANTENIMIENTO', 'GERENTE', '02418781383', '02418786338', '123@AOL.COM', '1234@AOL.COM', '2010-09-11', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_egrupos`
-- 

DROP TABLE IF EXISTS `b_egrupos`;
CREATE TABLE IF NOT EXISTS `b_egrupos` (
  `b_eg_id` int(11) NOT NULL auto_increment,
  `b_eg_nombre` varchar(200) NOT NULL,
  `b_eg_desc` varchar(500) NOT NULL,
  `b_eg_fecrea` date NOT NULL,
  `b_eg_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_eg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `b_egrupos`
-- 

INSERT INTO `b_egrupos` (`b_eg_id`, `b_eg_nombre`, `b_eg_desc`, `b_eg_fecrea`, `b_eg_ucrea`) VALUES 
(1, 'COMPRAS AL MAYOR', 'GRUPO DE PROVEEDORES AL MAYOR', '2010-09-04', 15),
(2, 'ZONA SUR', 'PROVEEDORES DE LA ZONA SUR DEL MUNICIPIO', '2010-09-08', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_empresa`
-- 

DROP TABLE IF EXISTS `b_empresa`;
CREATE TABLE IF NOT EXISTS `b_empresa` (
  `b_e_id` int(11) NOT NULL auto_increment,
  `b_e_razon` varchar(500) collate latin1_spanish_ci NOT NULL,
  `b_e_rif` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_e_nit` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_e_direccion` varchar(1000) collate latin1_spanish_ci NOT NULL,
  `b_e_telf1` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_e_telf2` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_e_telf3` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_e_web` varchar(250) collate latin1_spanish_ci NOT NULL,
  `b_e_email` varchar(250) collate latin1_spanish_ci NOT NULL,
  `b_e_status` int(11) NOT NULL COMMENT '0 - activo, 1 - inactivo',
  `b_e_logo` varchar(500) collate latin1_spanish_ci NOT NULL COMMENT 'logo de la empresa',
  `b_e_fecrea` date NOT NULL,
  `b_e_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_e_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Datos de la empresa' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `b_empresa`
-- 

INSERT INTO `b_empresa` (`b_e_id`, `b_e_razon`, `b_e_rif`, `b_e_nit`, `b_e_direccion`, `b_e_telf1`, `b_e_telf2`, `b_e_telf3`, `b_e_web`, `b_e_email`, `b_e_status`, `b_e_logo`, `b_e_fecrea`, `b_e_ucrea`) VALUES 
(1, 'LATIN SECURITY DE VENEZUELA, C.A.', 'J-31161433-8', '', 'C.C. PASEO LAS INDUSTRIAS, NIVEL 1, OFICINA 104', '02416172079', '', '', 'WWW.LATINSECURITY.NET', 'VENTAS@LATINSECURITY,NET', 0, 'logo_latin.png', '2010-08-17', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_entidades`
-- 

DROP TABLE IF EXISTS `b_entidades`;
CREATE TABLE IF NOT EXISTS `b_entidades` (
  `b_en_id` int(11) NOT NULL auto_increment,
  `b_en_tipo` varchar(1) NOT NULL COMMENT 'C - Clientes, P - Proveedores',
  `b_eg_id` int(11) NOT NULL COMMENT 'grupo al que pertenece',
  `b_en_nombres` varchar(500) NOT NULL COMMENT 'Nombre del Cliente si es persona natural',
  `b_en_apellidos` varchar(500) NOT NULL,
  `b_en_ci` varchar(15) NOT NULL COMMENT 'CI si es persona natural',
  `b_en_rif` varchar(20) NOT NULL COMMENT 'rif si es persona natural',
  `b_en_nacion` varchar(100) NOT NULL COMMENT 'nacionalidad si es persona natural',
  `b_en_erazon` varchar(500) NOT NULL COMMENT 'razon social de la empresa',
  `b_en_erif` varchar(20) NOT NULL,
  `b_en_direccion` varchar(2000) NOT NULL,
  `b_en_telf1` varchar(15) NOT NULL,
  `b_en_telf2` varchar(15) NOT NULL,
  `b_en_telf3` varchar(15) NOT NULL,
  `b_en_web` varchar(1000) NOT NULL,
  `b_en_email` varchar(1000) NOT NULL,
  `b_en_estatus` int(11) NOT NULL COMMENT '0 - Inactivo, 1 - Activo',
  `b_en_tcontrib` int(11) NOT NULL,
  `b_en_tempresa` varchar(1) NOT NULL COMMENT 'Juridica, Gobierno',
  `b_en_inter` int(11) NOT NULL COMMENT '0 - No, 1 - pertenece a una intertienda',
  `b_en_cuenta` varchar(30) NOT NULL COMMENT 'cuenta contable a la que afecta',
  `b_en_diascred` varchar(2) NOT NULL default '0' COMMENT 'cantidad de dias de credito',
  `b_en_limcred` varchar(10) NOT NULL default '0' COMMENT 'monto del limite del credito',
  `b_en_descu` varchar(2) NOT NULL default '0' COMMENT 'porcentaje de descuento',
  `b_f_id` int(11) NOT NULL COMMENT 'id de la foto',
  `b_en_ucrea` int(11) NOT NULL COMMENT 'usuario que creo el registro',
  `b_en_fecrea` date NOT NULL,
  `b_en_umodi` int(11) NOT NULL COMMENT 'ultimo usuario que lo modifico',
  `b_en_femodi` date NOT NULL,
  PRIMARY KEY  (`b_en_id`),
  KEY `b_en_ci` (`b_en_ci`,`b_en_rif`,`b_en_erif`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Tabla que almacena tanto los clientes como los proveedores' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `b_entidades`
-- 

INSERT INTO `b_entidades` (`b_en_id`, `b_en_tipo`, `b_eg_id`, `b_en_nombres`, `b_en_apellidos`, `b_en_ci`, `b_en_rif`, `b_en_nacion`, `b_en_erazon`, `b_en_erif`, `b_en_direccion`, `b_en_telf1`, `b_en_telf2`, `b_en_telf3`, `b_en_web`, `b_en_email`, `b_en_estatus`, `b_en_tcontrib`, `b_en_tempresa`, `b_en_inter`, `b_en_cuenta`, `b_en_diascred`, `b_en_limcred`, `b_en_descu`, `b_f_id`, `b_en_ucrea`, `b_en_fecrea`, `b_en_umodi`, `b_en_femodi`) VALUES 
(1, 'P', 2, '', '', '', '', '', 'PC ACTUAL', 'G-123456789-1', 'C.C. METROPOLIS, LOCAL 1ABC', '02418781383', '', '02418324295', 'WWW.PCACTUAL.COM', 'CONTACTO@HOTMAIL.COM', 1, 2, 'G', 0, '20', '7', '10000', '20', 0, 15, '2010-09-05', 0, '0000-00-00');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_estados`
-- 

DROP TABLE IF EXISTS `b_estados`;
CREATE TABLE IF NOT EXISTS `b_estados` (
  `b_es_id` int(11) NOT NULL auto_increment,
  `b_p_id` int(11) NOT NULL,
  `b_es_nombre` varchar(100) NOT NULL,
  `b_es_fecrea` date NOT NULL,
  `b_es_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_es_nombre`),
  KEY `b_es_id` (`b_es_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `b_estados`
-- 

INSERT INTO `b_estados` (`b_es_id`, `b_p_id`, `b_es_nombre`, `b_es_fecrea`, `b_es_ucrea`) VALUES 
(2, 1, 'CARABOBO', '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_impret`
-- 

DROP TABLE IF EXISTS `b_impret`;
CREATE TABLE IF NOT EXISTS `b_impret` (
  `b_i_id` int(11) NOT NULL auto_increment,
  `b_i_nombre` varchar(100) NOT NULL,
  `b_i_desc` varchar(500) NOT NULL,
  `b_i_valor` varchar(3) NOT NULL COMMENT 'este campo representa el % que aplica para este registro',
  `b_i_tipo` varchar(1) NOT NULL,
  `b_i_fecrea` date NOT NULL,
  `b_i_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_i_id`),
  KEY `b_i_nombre` (`b_i_nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla con la informacion de las retenciones y los impuestos ' AUTO_INCREMENT=1 ;

-- 
-- Volcar la base de datos para la tabla `b_impret`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_irentidades`
-- 

DROP TABLE IF EXISTS `b_irentidades`;
CREATE TABLE IF NOT EXISTS `b_irentidades` (
  `b_ire_id` int(11) NOT NULL,
  `b_i_id` int(11) NOT NULL,
  `b_en_id` int(11) NOT NULL,
  `b_ire_fecrea` date NOT NULL,
  `b_ire_ucrea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='tabla que relaciona la tabla b_impret con la tabla b_entidad';

-- 
-- Volcar la base de datos para la tabla `b_irentidades`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_medidas`
-- 

DROP TABLE IF EXISTS `b_medidas`;
CREATE TABLE IF NOT EXISTS `b_medidas` (
  `b_m_id` int(11) NOT NULL auto_increment,
  `b_m_nombre` varchar(100) NOT NULL,
  `b_m_abrevia` varchar(10) NOT NULL,
  `b_m_fecrea` date NOT NULL,
  `b_m_ucrea` int(11) NOT NULL,
  `b_m_femodi` date NOT NULL,
  `b_m_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`b_m_id`),
  KEY `b_m_nombre` (`b_m_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Unidades de medidas' AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `b_medidas`
-- 

INSERT INTO `b_medidas` (`b_m_id`, `b_m_nombre`, `b_m_abrevia`, `b_m_fecrea`, `b_m_ucrea`, `b_m_femodi`, `b_m_umodi`) VALUES 
(1, 'METROS', 'MTS', '2010-09-12', 15, '2010-09-12', 15),
(2, 'CENTIMETROS', 'CM', '2010-09-12', 15, '0000-00-00', 0),
(3, 'MILIMETROS', 'MM', '2010-09-12', 15, '0000-00-00', 0),
(4, 'GRAMOS', 'GR', '2010-09-29', 15, '0000-00-00', 0),
(5, 'KILOS', 'KG', '2010-09-29', 15, '0000-00-00', 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_menuasignacion`
-- 

DROP TABLE IF EXISTS `b_menuasignacion`;
CREATE TABLE IF NOT EXISTS `b_menuasignacion` (
  `b_ma_id` int(11) NOT NULL auto_increment,
  `b_mo_id` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_u_id` int(11) NOT NULL,
  `b_ma_fecrea` date NOT NULL,
  `b_ma_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_ma_id`),
  KEY `b_mo_id` (`b_mo_id`,`b_u_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Niveles asignados por usuarios' AUTO_INCREMENT=46 ;

-- 
-- Volcar la base de datos para la tabla `b_menuasignacion`
-- 

INSERT INTO `b_menuasignacion` (`b_ma_id`, `b_mo_id`, `b_u_id`, `b_ma_fecrea`, `b_ma_ucrea`) VALUES 
(1, 'M-000100000000', 1, '2010-08-20', 1),
(7, 'M-000100020004', 1, '2010-08-25', 1),
(3, 'M-000100020001', 1, '2010-08-23', 1),
(4, 'M-000100020000', 1, '2010-08-23', 1),
(5, 'M-000100020002', 1, '2010-08-23', 1),
(9, 'M-000100020003', 1, '2010-08-25', 1),
(10, 'M-000100020005', 1, '2010-08-26', 1),
(12, 'M-000100000000', 15, '2010-08-29', 1),
(13, 'M-000100020000', 15, '2010-08-29', 1),
(14, 'M-000100020002', 15, '2010-08-29', 1),
(15, 'M-000100020003', 15, '2010-08-29', 1),
(16, 'M-000100020006', 15, '2010-08-29', 1),
(17, 'M-000100020007', 15, '2010-08-29', 1),
(18, 'M-000100020006', 1, '2010-08-29', 1),
(20, 'M-000100020007', 1, '2010-08-29', 1),
(21, 'M-000200000000', 15, '2010-08-30', 15),
(22, 'M-000200010000', 15, '2010-08-30', 15),
(23, 'M-000200020000', 15, '2010-08-30', 15),
(24, 'M-000300000000', 15, '2010-08-30', 15),
(25, 'M-000300010000', 15, '2010-08-30', 15),
(26, 'M-000300010001', 15, '2010-08-30', 15),
(27, 'M-000300010002', 15, '2010-09-04', 15),
(28, 'M-000200010001', 15, '2010-09-04', 15),
(29, 'M-000200020001', 15, '2010-09-04', 15),
(30, 'M-000200010002', 15, '2010-09-12', 15),
(31, 'M-000200010003', 15, '2010-09-12', 15),
(32, 'M-000200010004', 15, '2010-09-12', 15),
(33, 'M-000200030000', 15, '2010-09-12', 15),
(34, 'M-000200030002', 15, '2010-09-12', 15),
(35, 'M-000200030001', 15, '2010-09-12', 15),
(36, 'M-000200030003', 15, '2010-09-12', 15),
(37, 'M-000100020008', 1, '2010-09-12', 1),
(38, 'M-000100020009', 1, '2010-09-12', 1),
(39, 'M-000100020008', 15, '2010-09-12', 1),
(40, 'M-000100020009', 15, '2010-09-12', 1),
(41, 'M-000300020000', 15, '2010-10-12', 15),
(42, 'M-000300020001', 15, '2010-10-12', 15),
(43, 'M-000100020010', 1, '2010-10-12', 1),
(44, 'M-000100020010', 15, '2010-10-12', 1),
(45, 'M-000300020002', 15, '2010-10-16', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_menuopciones`
-- 

DROP TABLE IF EXISTS `b_menuopciones`;
CREATE TABLE IF NOT EXISTS `b_menuopciones` (
  `b_mo_id` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_mo_titulo` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_mo_imagen` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `b_mo_enlace` varchar(500) collate latin1_spanish_ci NOT NULL,
  `b_mo_fecrea` date NOT NULL,
  `b_mo_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_mo_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Opciones del Menu';

-- 
-- Volcar la base de datos para la tabla `b_menuopciones`
-- 

INSERT INTO `b_menuopciones` (`b_mo_id`, `b_mo_titulo`, `b_mo_imagen`, `b_mo_enlace`, `b_mo_fecrea`, `b_mo_ucrea`) VALUES 
('M-000100000000', 'CONFIGURACION', 'IMAGENES/PNG/CONFIGURACION.PNG', 'CONFIGURACION.PHP', '2010-08-20', 1),
('M-000100020003', 'USUARIOS', 'IMAGENES/PNG/USUARIOS.PNG', 'MODULOS/CONFIGURACION/M_USUARIOS.PHP', '2010-08-25', 0),
('M-000100020002', 'ACCESOS', 'IMAGENES/PNG/ACCESO.PNG', 'MODULOS/CONFIGURACION/M_ACCESO.PHP', '2010-08-23', 0),
('M-000100020001', 'MENU', 'IMAGENES/PNG/MENU.PNG', 'MODULOS/CONFIGURACION/M_MENU.PHP', '2010-08-23', 0),
('M-000100020000', 'MAESTROS', 'IMAGENES/PNG/MAESTROS.PNG', 'MAESTROS.PHP', '2010-08-23', 0),
('M-000100020004', 'EMPRESA Y SUCURSALES', 'IMAGENES/PNG/EMPRESA.PNG', 'MODULOS/CONFIGURACION/M_EMPRESA.PHP', '2010-08-25', 0),
('M-000100020005', 'ZONAS GEOGRAFICAS', 'IMAGENES/PNG/GEOGRAFICO.PNG', 'MODULOS/CONFIGURACION/M_GEOGRAFICO.PHP', '2010-08-26', 0),
('M-000200000000', 'ALMACENES', 'IMAGENES/PNG/ALMACENES.PNG', 'ALMACENES.PHP', '2010-08-27', 1),
('M-000300000000', 'COMPRAS', 'IMAGENES/PNG/COMPRAS.PNG', 'COMPRAS.PHP', '2010-08-27', 1),
('M-000200010000', 'MAESTROS', 'IMAGENES/PNG/MAESTROS.PNG', 'MAESTROS.PHP', '2010-08-27', 0),
('M-000200020000', 'CONSULTAS', 'IMAGENES/PNG/CONSULTAS.PNG', 'CONSULTAS.PHP', '2010-08-27', 0),
('M-000100020006', 'DEPARTAMENTOS', 'IMAGENES/PNG/DPTO.PNG', 'MODULOS/CONFIGURACION/M_DPTO.PHP', '2010-08-27', 0),
('M-000100020007', 'CARGOS', 'IMAGENES/PNG/CARGOS.PNG', 'MODULOS/CONFIGURACION/M_CARGOS.PHP', '2010-08-27', 0),
('M-000300010000', 'MAESTROS', 'IMAGENES/PNG/MAESTROS.PNG', 'MAESTROS.PHP', '2010-08-30', 0),
('M-000300010001', 'SOCIOS DE NEGOCIOS', 'IMAGENES/PNG/ENTES.PNG', 'MODULOS/COMPRAS/M_ENTES.PHP', '2010-08-30', 0),
('M-000300010002', 'GRUPOS DE SOCIOS', 'IMAGENES/PNG/ENTES.PNG', 'MODULOS/COMPRAS/M_GS.PHP', '2010-09-04', 0),
('M-000200010001', 'ALMACENES', 'IMAGENES/PNG/ALMACENES.PNG', 'MODULOS/ALMACENES/M_ALMACENES.PHP', '2010-09-04', 0),
('M-000200020001', 'INVENTARIO', 'IMAGENES/PNG/INVENTARIO.PNG', 'MODULOS/ALMACENES/INVENTARIO.PHP', '2010-09-04', 0),
('M-000200030000', 'FORMAS', 'IMAGENES/PNG/FORMAS.PNG', 'FORMAS.PHP', '2010-09-12', 0),
('M-000200030001', 'TRANSFERENCIAS', 'IMAGENES/PNG/TRANSFERENCIAS.PNG', 'MODULOS/ALMACENES/TRANSFERENCIAS.PHP', '2010-09-12', 0),
('M-000200030003', 'PRODUCTOS', 'IMAGENES/PNG/PRODUCTOS.PNG', 'MODULOS/ALMACENES/PRODUCTOS.PHP', '2010-09-12', 0),
('M-000200010002', 'GRUPOS DE PRODUCTOS', 'IMAGENES/PNG/ALMACENES.PNG', 'MODULOS/ALMACENES/M_GRUPOPROD.PHP', '2010-09-12', 0),
('M-000200010003', 'MARCAS Y LINEAS', 'IMAGENES/PNG/ALMACENES.PNG', 'MODULOS/ALMACENES/M_ML.PHP', '2010-09-12', 0),
('M-000200010004', 'BASES DE PINTURAS', 'IMAGENES/PNG/ALMACENES.PNG', 'MODULOS/ALMACENES/M_BP.PHP', '2010-09-12', 0),
('M-000100020008', 'UNIDADES DE MEDIDA', 'IMAGENES/PNG/MEDIDAS.PNG', 'MODULOS/CONFIGURACION/M_MEDIDAS.PHP', '2010-09-12', 0),
('M-000100020009', 'BASES LEGALES', 'IMAGENES/PNG/BL.PNG', 'MODULOS/CONFIGURACION/M_BL.PHP', '2010-09-12', 0),
('M-000300020000', 'FORMAS', 'IMAGENES/PNG/FORMAS.PNG', 'FORMAS.PHP', '2010-10-12', 0),
('M-000300020001', 'REQUISICIONES', 'IMAGENES/PNG/REQUI.PNG', 'MODULOS/COMPRAS/REQUISICIONES.PHP', '2010-10-12', 0),
('M-000100020010', 'CONTROL DOCUMENTOS', 'IMAGENES/PNG/DOCUMENTOS.PNG', 'MODULOS/CONFIGURACION/DOCUMENTOS.PHP', '2010-10-12', 0),
('M-000300020002', 'COSTOS', 'IMAGENES/PNG/COSTOS.PNG', 'MODULOS/COMPRAS/COSTOS.PHP', '2010-10-16', 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_municipios`
-- 

DROP TABLE IF EXISTS `b_municipios`;
CREATE TABLE IF NOT EXISTS `b_municipios` (
  `b_m_id` int(11) NOT NULL auto_increment,
  `b_ci_id` int(11) NOT NULL,
  `b_m_nombre` varchar(100) NOT NULL,
  `b_m_fecrea` date NOT NULL,
  `b_m_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_m_nombre`),
  KEY `b_m_id` (`b_m_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Municipios' AUTO_INCREMENT=4 ;

-- 
-- Volcar la base de datos para la tabla `b_municipios`
-- 

INSERT INTO `b_municipios` (`b_m_id`, `b_ci_id`, `b_m_nombre`, `b_m_fecrea`, `b_m_ucrea`) VALUES 
(3, 3, 'NAGUANAGUA', '2010-08-29', 1),
(2, 3, 'SAN DIEGO', '2010-08-29', 1),
(1, 3, 'VALENCIA', '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_pais`
-- 

DROP TABLE IF EXISTS `b_pais`;
CREATE TABLE IF NOT EXISTS `b_pais` (
  `b_p_id` int(11) NOT NULL auto_increment,
  `b_p_nombre` varchar(100) NOT NULL,
  `b_p_fecrea` date NOT NULL,
  `b_p_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_p_nombre`),
  KEY `b_p_id` (`b_p_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Paises' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `b_pais`
-- 

INSERT INTO `b_pais` (`b_p_id`, `b_p_nombre`, `b_p_fecrea`, `b_p_ucrea`) VALUES 
(1, 'VENEZUELA', '2010-08-28', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_sucursales`
-- 

DROP TABLE IF EXISTS `b_sucursales`;
CREATE TABLE IF NOT EXISTS `b_sucursales` (
  `b_s_id` int(11) NOT NULL auto_increment,
  `b_e_id` int(11) NOT NULL,
  `b_s_razon` varchar(200) collate latin1_spanish_ci NOT NULL,
  `b_s_rif` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_s_direccion` varchar(1000) collate latin1_spanish_ci NOT NULL,
  `b_s_telf1` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_s_telf2` varchar(20) collate latin1_spanish_ci NOT NULL,
  `b_s_email` varchar(250) collate latin1_spanish_ci NOT NULL,
  `b_s_status` int(11) NOT NULL COMMENT '0 - activo, 1 - inactivo',
  `b_s_fecrea` date NOT NULL,
  `b_s_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_s_id`),
  KEY `b_e_id` (`b_e_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Datos de las sucursales' AUTO_INCREMENT=5 ;

-- 
-- Volcar la base de datos para la tabla `b_sucursales`
-- 

INSERT INTO `b_sucursales` (`b_s_id`, `b_e_id`, `b_s_razon`, `b_s_rif`, `b_s_direccion`, `b_s_telf1`, `b_s_telf2`, `b_s_email`, `b_s_status`, `b_s_fecrea`, `b_s_ucrea`) VALUES 
(4, 1, 'CAIMANES Y ASOCIADOS', 'J-2456798-8', 'EN DONDE SEA', '02418781383', '02418786338', 'VFREIRE@LATINSECURIT', 0, '2010-08-28', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `b_usuarios`
-- 

DROP TABLE IF EXISTS `b_usuarios`;
CREATE TABLE IF NOT EXISTS `b_usuarios` (
  `b_u_id` int(11) NOT NULL auto_increment,
  `b_u_nombres` varchar(50) collate latin1_spanish_ci NOT NULL,
  `b_u_apellidos` varchar(50) collate latin1_spanish_ci NOT NULL,
  `b_u_fecnac` date NOT NULL COMMENT 'Fecha de Nacimiento',
  `b_u_tipo` int(11) NOT NULL,
  `b_u_email` varchar(500) collate latin1_spanish_ci NOT NULL,
  `b_u_telf` varchar(15) collate latin1_spanish_ci NOT NULL,
  `b_u_status` int(11) NOT NULL COMMENT 'estatus del usuario, 0 - activo, 1 - inactivo',
  `b_u_sexo` int(11) NOT NULL COMMENT '0 - hombre, 1 - mujer',
  `b_e_id` int(11) NOT NULL COMMENT 'empresa para la que trabaja',
  `b_s_id` int(11) NOT NULL,
  `b_u_fecrea` date NOT NULL,
  `b_u_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`b_u_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='Usuarios del Sistema' AUTO_INCREMENT=16 ;

-- 
-- Volcar la base de datos para la tabla `b_usuarios`
-- 

INSERT INTO `b_usuarios` (`b_u_id`, `b_u_nombres`, `b_u_apellidos`, `b_u_fecnac`, `b_u_tipo`, `b_u_email`, `b_u_telf`, `b_u_status`, `b_u_sexo`, `b_e_id`, `b_s_id`, `b_u_fecrea`, `b_u_ucrea`) VALUES 
(1, 'VICTOR MANUEL', 'FREIRE PARADA', '1982-08-31', 1, 'FREIRE.VICTORMANUEL@GMAIL.COM', '04144128462', 0, 0, 1, 0, '2010-08-17', 1),
(15, 'OSYALIT', 'TORRES', '2010-01-01', 2, 'TORRESO@GMAIL.COM', '02418786338', 0, 1, 1, 0, '2010-08-29', 1);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `c_req_det`
-- 

DROP TABLE IF EXISTS `c_req_det`;
CREATE TABLE IF NOT EXISTS `c_req_det` (
  `c_rd_id` int(11) NOT NULL auto_increment,
  `c_r_id` varchar(30) NOT NULL,
  `i_p_codigo` varchar(30) NOT NULL,
  `c_rd_cant` int(11) NOT NULL,
  `b_m_id` int(11) NOT NULL,
  `c_rd_fecrea` date NOT NULL,
  `c_rd_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`c_rd_id`),
  KEY `c_r_id` (`c_r_id`,`i_p_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='tabla con el detalle de las requisiciones' AUTO_INCREMENT=20 ;

-- 
-- Volcar la base de datos para la tabla `c_req_det`
-- 

INSERT INTO `c_req_det` (`c_rd_id`, `c_r_id`, `i_p_codigo`, `c_rd_cant`, `b_m_id`, `c_rd_fecrea`, `c_rd_ucrea`) VALUES 
(18, 'REQ-1', 'PIN-VP-BS-1', 12, 2, '2010-10-12', 15),
(19, 'REQ-1', 'CCTV-DW-OP-1', 12, 2, '2010-10-12', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `c_requisicion`
-- 

DROP TABLE IF EXISTS `c_requisicion`;
CREATE TABLE IF NOT EXISTS `c_requisicion` (
  `c_r_id` int(11) NOT NULL auto_increment,
  `c_r_control` varchar(30) NOT NULL,
  `c_r_estatus` int(11) NOT NULL,
  `b_e_id` int(11) NOT NULL,
  `b_e_erif` varchar(15) NOT NULL,
  `b_d_id` int(11) NOT NULL,
  `c_r_solicita` int(11) NOT NULL,
  `c_r_autoriza` int(11) NOT NULL,
  `c_r_recibe` int(11) NOT NULL,
  `c_r_fecrea` date NOT NULL,
  `c_r_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`c_r_id`),
  KEY `c_r_documento` (`c_r_control`,`c_r_solicita`,`c_r_autoriza`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='tabla con las requisiciones' AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `c_requisicion`
-- 

INSERT INTO `c_requisicion` (`c_r_id`, `c_r_control`, `c_r_estatus`, `b_e_id`, `b_e_erif`, `b_d_id`, `c_r_solicita`, `c_r_autoriza`, `c_r_recibe`, `c_r_fecrea`, `c_r_ucrea`) VALUES 
(2, 'REQ-1', 0, 1, 'J-31161433-8', 0, 15, 0, 0, '2010-10-12', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_almacenes`
-- 

DROP TABLE IF EXISTS `i_almacenes`;
CREATE TABLE IF NOT EXISTS `i_almacenes` (
  `i_a_id` int(11) NOT NULL auto_increment,
  `i_a_nombre` varchar(250) NOT NULL,
  `i_a_desc` varchar(500) NOT NULL,
  `i_a_tipo` int(11) NOT NULL,
  `i_s_id` int(11) NOT NULL,
  `i_a_fecrea` date NOT NULL,
  `i_a_ucrea` int(11) NOT NULL,
  `i_a_femodi` date NOT NULL,
  `i_a_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`i_a_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `i_almacenes`
-- 

INSERT INTO `i_almacenes` (`i_a_id`, `i_a_nombre`, `i_a_desc`, `i_a_tipo`, `i_s_id`, `i_a_fecrea`, `i_a_ucrea`, `i_a_femodi`, `i_a_umodi`) VALUES 
(1, 'PRODUCTOS TERMINADOS', 'TODA LA LINEA DE PRODUCCION DE LA EMPRESA', 1, 0, '2010-10-01', 15, '2010-10-01', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_pbase`
-- 

DROP TABLE IF EXISTS `i_pbase`;
CREATE TABLE IF NOT EXISTS `i_pbase` (
  `i_pb_id` int(11) NOT NULL auto_increment,
  `i_pb_nombre` varchar(100) NOT NULL,
  `i_pb_siglas` varchar(5) NOT NULL,
  `i_pb_fecrea` date NOT NULL,
  `i_pb_ucrea` int(11) NOT NULL,
  `i_pb_femodi` date NOT NULL,
  `i_pb_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`i_pb_id`),
  KEY `i_pb_nombre` (`i_pb_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Bases para pinturas' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `i_pbase`
-- 

INSERT INTO `i_pbase` (`i_pb_id`, `i_pb_nombre`, `i_pb_siglas`, `i_pb_fecrea`, `i_pb_ucrea`, `i_pb_femodi`, `i_pb_umodi`) VALUES 
(1, 'CROMO-BASE', 'CB', '2010-09-12', 15, '2010-09-12', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_pcostoc`
-- 

DROP TABLE IF EXISTS `i_pcostoc`;
CREATE TABLE IF NOT EXISTS `i_pcostoc` (
  `i_pc_id` int(11) NOT NULL auto_increment,
  `i_p_codigo` varchar(30) NOT NULL,
  `i_pc_costo` decimal(10,2) NOT NULL,
  `i_pc_estatus` int(11) NOT NULL,
  `i_pc_fecrea` date NOT NULL,
  `i_pc_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`i_pc_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='tabla con los costos de los productos' AUTO_INCREMENT=2 ;

-- 
-- Volcar la base de datos para la tabla `i_pcostoc`
-- 

INSERT INTO `i_pcostoc` (`i_pc_id`, `i_p_codigo`, `i_pc_costo`, `i_pc_estatus`, `i_pc_fecrea`, `i_pc_ucrea`) VALUES 
(1, 'CCTV-DW-OP-1', '150.00', 0, '2010-10-13', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_pgrupo`
-- 

DROP TABLE IF EXISTS `i_pgrupo`;
CREATE TABLE IF NOT EXISTS `i_pgrupo` (
  `i_pg_id` int(11) NOT NULL auto_increment,
  `i_pg_nombre` varchar(100) NOT NULL,
  `i_pg_siglas` varchar(5) NOT NULL,
  `i_pg_fecrea` date NOT NULL,
  `i_pg_ucrea` int(11) NOT NULL,
  `i_pg_femodi` date NOT NULL,
  `i_pg_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`i_pg_id`),
  KEY `i_pg_nombre` (`i_pg_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Grupos de Productos' AUTO_INCREMENT=4 ;

-- 
-- Volcar la base de datos para la tabla `i_pgrupo`
-- 

INSERT INTO `i_pgrupo` (`i_pg_id`, `i_pg_nombre`, `i_pg_siglas`, `i_pg_fecrea`, `i_pg_ucrea`, `i_pg_femodi`, `i_pg_umodi`) VALUES 
(1, 'ALARMAS', 'ALR', '2010-09-12', 15, '2010-09-13', 15),
(2, 'PINTURA', 'PIN', '2010-09-12', 15, '2010-09-13', 15),
(3, 'CIRCUITO CERRADO DE TV', 'CCTV', '2010-09-13', 15, '2010-10-11', 15);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_plinea`
-- 

DROP TABLE IF EXISTS `i_plinea`;
CREATE TABLE IF NOT EXISTS `i_plinea` (
  `i_pl_id` int(11) NOT NULL auto_increment,
  `i_pm_id` int(11) NOT NULL,
  `i_pl_nombre` varchar(100) NOT NULL,
  `i_pl_siglas` varchar(5) NOT NULL,
  `i_pl_ucrea` int(11) NOT NULL,
  `i_pl_fecrea` date NOT NULL,
  `i_pl_umodi` int(11) NOT NULL,
  `i_pl_femodi` date NOT NULL,
  PRIMARY KEY  (`i_pl_id`),
  KEY `i_pl_nombre` (`i_pl_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Lineas de productos' AUTO_INCREMENT=5 ;

-- 
-- Volcar la base de datos para la tabla `i_plinea`
-- 

INSERT INTO `i_plinea` (`i_pl_id`, `i_pm_id`, `i_pl_nombre`, `i_pl_siglas`, `i_pl_ucrea`, `i_pl_fecrea`, `i_pl_umodi`, `i_pl_femodi`) VALUES 
(1, 1, 'OMNI PLUS', 'OP', 15, '2010-09-12', 15, '2010-09-17'),
(2, 1, 'AUTOMATIZACION', 'AUTO', 15, '2010-09-17', 0, '0000-00-00'),
(3, 2, 'BRILLO DE SEDA', 'BS', 15, '2010-09-17', 0, '0000-00-00'),
(4, 2, 'CAUCHO', 'CAU', 15, '2010-09-17', 0, '0000-00-00');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_pmarca`
-- 

DROP TABLE IF EXISTS `i_pmarca`;
CREATE TABLE IF NOT EXISTS `i_pmarca` (
  `i_pm_id` int(11) NOT NULL auto_increment,
  `i_pm_nombre` varchar(100) NOT NULL,
  `i_pm_siglas` varchar(5) NOT NULL,
  `i_pm_fecrea` date NOT NULL,
  `i_pm_ucrea` int(11) NOT NULL,
  `i_pm_femodi` date NOT NULL,
  `i_pm_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`i_pm_id`),
  KEY `i_pm_nombre` (`i_pm_nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Marcas de Productos' AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `i_pmarca`
-- 

INSERT INTO `i_pmarca` (`i_pm_id`, `i_pm_nombre`, `i_pm_siglas`, `i_pm_fecrea`, `i_pm_ucrea`, `i_pm_femodi`, `i_pm_umodi`) VALUES 
(1, 'DIGITAL WATCHDOG', 'DW', '2010-09-12', 15, '2010-09-12', 15),
(2, 'VENEZOLANA DE PINTURAS', 'VP', '2010-09-17', 15, '0000-00-00', 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `i_productos`
-- 

DROP TABLE IF EXISTS `i_productos`;
CREATE TABLE IF NOT EXISTS `i_productos` (
  `i_p_id` int(11) NOT NULL auto_increment,
  `i_p_codigo` varchar(30) NOT NULL,
  `i_p_cfabrica` varchar(30) NOT NULL,
  `i_p_tipo` varchar(20) NOT NULL,
  `i_p_nombre` varchar(100) NOT NULL,
  `i_p_desc` varchar(1000) NOT NULL,
  `i_pg_id` int(11) NOT NULL,
  `i_pl_id` int(11) NOT NULL,
  `i_pm_id` int(11) NOT NULL,
  `i_p_peso` decimal(5,2) NOT NULL,
  `i_p_pemed` varchar(5) NOT NULL COMMENT 'Unidad de medida',
  `i_p_largo` decimal(5,2) NOT NULL,
  `i_p_lamed` varchar(5) NOT NULL COMMENT 'Unidad de medida',
  `i_p_ancho` decimal(5,2) NOT NULL,
  `i_p_anmed` varchar(5) NOT NULL COMMENT 'Unidad de medida',
  `i_p_profun` decimal(5,2) NOT NULL,
  `i_p_prmed` varchar(5) NOT NULL COMMENT 'Unidad de medida',
  `i_p_foto` varchar(500) NOT NULL,
  `i_pb_id` int(11) NOT NULL,
  `i_p_infla` varchar(1) NOT NULL,
  `i_p_estatus` int(11) NOT NULL,
  `i_p_garantia` varchar(1) NOT NULL,
  `i_p_gtiempo` varchar(20) NOT NULL,
  `i_p_inven` varchar(1) NOT NULL,
  `i_p_min` int(11) NOT NULL,
  `i_p_max` int(11) NOT NULL,
  `i_p_exist` int(11) NOT NULL,
  `i_p_activo` varchar(1) NOT NULL,
  `i_p_vence` varchar(1) NOT NULL,
  `i_p_impc` varchar(1) NOT NULL,
  `i_p_impv` varchar(1) NOT NULL,
  `i_p_uv` varchar(10) NOT NULL,
  `i_p_cantuv` int(11) NOT NULL,
  `i_p_uc` varchar(10) NOT NULL,
  `i_p_cantuc` int(11) NOT NULL,
  `i_p_cuenta` varchar(20) NOT NULL,
  `i_p_comi` varchar(1) NOT NULL,
  `i_p_fecrea` date NOT NULL,
  `i_p_ucrea` int(11) NOT NULL,
  `i_p_femodi` date NOT NULL,
  `i_p_umodi` int(11) NOT NULL,
  PRIMARY KEY  (`i_p_id`),
  KEY `i_p_codigo` (`i_p_codigo`,`i_p_cfabrica`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Productos' AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `i_productos`
-- 

INSERT INTO `i_productos` (`i_p_id`, `i_p_codigo`, `i_p_cfabrica`, `i_p_tipo`, `i_p_nombre`, `i_p_desc`, `i_pg_id`, `i_pl_id`, `i_pm_id`, `i_p_peso`, `i_p_pemed`, `i_p_largo`, `i_p_lamed`, `i_p_ancho`, `i_p_anmed`, `i_p_profun`, `i_p_prmed`, `i_p_foto`, `i_pb_id`, `i_p_infla`, `i_p_estatus`, `i_p_garantia`, `i_p_gtiempo`, `i_p_inven`, `i_p_min`, `i_p_max`, `i_p_exist`, `i_p_activo`, `i_p_vence`, `i_p_impc`, `i_p_impv`, `i_p_uv`, `i_p_cantuv`, `i_p_uc`, `i_p_cantuc`, `i_p_cuenta`, `i_p_comi`, `i_p_fecrea`, `i_p_ucrea`, `i_p_femodi`, `i_p_umodi`) VALUES 
(1, 'PIN-VP-BS-1', '1234', '', 'BRILLO DE SEDA COLOR NARANJA', 'PINTURA CROMO BASE', 2, 3, 2, '0.50', 'KG', '10.00', 'CM', '5.00', 'CM', '5.00', 'CM', 'PIN-VP-BS-1.JPG', 1, '1', 1, '0', '0', '', 10, 50, 0, '0', '', '1', '1', '1', 1, '1', 1, '123', '1', '2010-09-30', 15, '0000-00-00', 0),
(2, 'CCTV-DW-OP-1', 'DW-B-2362TIR', '', 'CAMARA TIPO BULLET DW', 'CAMARA DUAL (12-24V) CON INFRA ROJOS', 3, 1, 1, '600.00', 'GR', '15.00', 'CM', '5.00', 'CM', '5.00', 'CM', 'CCTV-DW-OP-1.JPG', 0, '0', 1, '1', '5/A', '', 1, 10, 0, '0', '', '1', '0', '1', 1, '1', 1, '123', '0', '2010-09-30', 15, '0000-00-00', 0);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `rh_empleados`
-- 

DROP TABLE IF EXISTS `rh_empleados`;
CREATE TABLE IF NOT EXISTS `rh_empleados` (
  `rh_e_id` int(11) NOT NULL,
  `rh_e_nombres` varchar(100) collate latin1_spanish_ci NOT NULL,
  `rh_e_apellidos` varchar(100) collate latin1_spanish_ci NOT NULL,
  `rh_e_ci` varchar(12) collate latin1_spanish_ci NOT NULL,
  `rh_e_rif` varchar(12) collate latin1_spanish_ci NOT NULL,
  `rh_e_nacion` varchar(100) collate latin1_spanish_ci NOT NULL,
  `rh_e_direccion` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `rh_e_telfcasa` varchar(15) collate latin1_spanish_ci NOT NULL,
  `rh_e_telfmobil` varchar(15) collate latin1_spanish_ci NOT NULL,
  `rh_e_email` varchar(500) collate latin1_spanish_ci NOT NULL,
  `rh_f_id` int(11) NOT NULL,
  `b_s_id` int(11) NOT NULL,
  `b_d_id` int(11) NOT NULL,
  `b_c_id` int(11) NOT NULL,
  `b_u_id` int(11) NOT NULL,
  `rh_e_fecrea` date NOT NULL,
  `rh_e_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`rh_e_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci COMMENT='empleados de la empresa';

-- 
-- Volcar la base de datos para la tabla `rh_empleados`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `rh_fotos`
-- 

DROP TABLE IF EXISTS `rh_fotos`;
CREATE TABLE IF NOT EXISTS `rh_fotos` (
  `rh_f_id` int(11) NOT NULL,
  `rh_e_id` int(11) NOT NULL,
  `rh_f_imagen` varchar(2000) collate latin1_spanish_ci NOT NULL,
  `rh_f_fecrea` date NOT NULL,
  `rh_f_ucrea` int(11) NOT NULL,
  PRIMARY KEY  (`rh_f_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- 
-- Volcar la base de datos para la tabla `rh_fotos`
-- 

