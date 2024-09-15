-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2024 a las 21:17:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `llamadopacientes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_pacientes`
--

CREATE TABLE `cache_pacientes` (
  `id` int(11) NOT NULL,
  `nombre_paciente` varchar(255) DEFAULT NULL,
  `cedula` varchar(255) DEFAULT NULL,
  `consultorio_llamado` varchar(255) DEFAULT NULL,
  `nivel_triage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cache_pacientes`
--

INSERT INTO `cache_pacientes` (`id`, `nombre_paciente`, `cedula`, `consultorio_llamado`, `nivel_triage`) VALUES
(1, 'Usuario  Prueba', '12345', 'Triage 3', NULL),
(2, 'Usuario  Prueba', '12345', 'Triage 3', NULL),
(3, 'Usuario Prueba ', '12345', 'Triage 3', NULL),
(4, 'Usuario Prueba ', '12345', 'Triage 3', NULL),
(5, 'Usuario Prueba', '12345', 'Triage 3', NULL),
(6, 'Usuario Prueba', '12345', 'Triage 3', NULL),
(7, 'Usuario Prueba', '12345', 'Consultorio 2 Urgencias', '4'),
(8, 'Usuario Prueba', '12345', 'Consultorio 2 Urgencias', '4'),
(9, 'Usuario Prueba', '12345', 'Consultorio 1 Ginecologia', '4'),
(10, 'Usuario Prueba', '12345', 'Consultorio 1 Ginecologia', '4'),
(11, 'Diana Sotelo', '987654', 'Consultorio 4 Urgencias', '2'),
(12, 'Juan Perez', '654321', 'Consultorio 4 Urgencias', '5'),
(13, 'Pedro Varela', '12345', 'Consultorio 4 Urgencias', '3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultorios`
--

CREATE TABLE `consultorios` (
  `id` int(11) NOT NULL,
  `nombre_consultorio` varchar(255) DEFAULT NULL,
  `id_servicio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consultorios`
--

INSERT INTO `consultorios` (`id`, `nombre_consultorio`, `id_servicio`) VALUES
(1, 'Consultorio 1', 1),
(2, 'Consultorio 2', 1),
(3, 'Consultorio 3', 1),
(4, 'Consultorio 4', 1),
(5, 'Consultorio 1', 2),
(6, 'Consultorio 2', 2),
(7, 'Consultorio 3', 2),
(8, 'Triage 1', 3),
(9, 'Triage 2', 3),
(10, 'Triage 3', 3),
(11, 'Triage Pediatria', 3),
(12, 'Triage Ginecologia', 3),
(13, 'Procedimientos', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id` int(11) NOT NULL,
  `nombre_servicio` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id`, `nombre_servicio`) VALUES
(1, 'Urgencias'),
(2, 'Ginecologia'),
(3, 'Triage'),
(4, 'Procedimientos');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache_pacientes`
--
ALTER TABLE `cache_pacientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cache_pacientes`
--
ALTER TABLE `cache_pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultorios`
--
ALTER TABLE `consultorios`
  ADD CONSTRAINT `consultorios_ibfk_1` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
