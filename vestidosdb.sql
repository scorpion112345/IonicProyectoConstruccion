-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 19, 2019 at 10:33 PM
-- Server version: 5.7.24-log
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vestidosdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `tipo_cita` enum('Presupuesto','Prueba','Entrega') NOT NULL,
  `hora` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `id_vestido` int(11) DEFAULT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `telefono` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id`, `id_vestido`, `nombre`, `apellidos`, `telefono`) VALUES
(76, 62, '10', '10', '10');

-- --------------------------------------------------------

--
-- Table structure for table `pago`
--

CREATE TABLE `pago` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `monto` int(8) NOT NULL,
  `total` int(10) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `tipo` enum('ADMIN','NORMAL') NOT NULL DEFAULT 'NORMAL'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `password`, `tipo`) VALUES
(3, 'David', '123', 'ADMIN'),
(5, 'prueba', '456', 'NORMAL');

-- --------------------------------------------------------

--
-- Table structure for table `vestidos`
--

CREATE TABLE `vestidos` (
  `id` int(11) NOT NULL,
  `modelo` varchar(15) NOT NULL,
  `color` varchar(15) NOT NULL,
  `tela` varchar(15) NOT NULL,
  `talla` enum('Xs','s','M','G','XL','XXL') NOT NULL,
  `complementos` varchar(60) DEFAULT NULL,
  `estado` varchar(50) NOT NULL,
  `observaciones` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vestidos`
--

INSERT INTO `vestidos` (`id`, `modelo`, `color`, `tela`, `talla`, `complementos`, `estado`, `observaciones`) VALUES
(62, '1', 'rojo', 'tela', 'XL', 'Collar,Tutu', 'empezado', 'o lo se');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_clienteCita` (`id_cliente`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vestido` (`id_vestido`);

--
-- Indexes for table `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cliente` (`id_cliente`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vestidos`
--
ALTER TABLE `vestidos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cita`
--
ALTER TABLE `cita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `pago`
--
ALTER TABLE `pago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vestidos`
--
ALTER TABLE `vestidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `fk_clienteCita` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_vestido` FOREIGN KEY (`id_vestido`) REFERENCES `vestidos` (`id`);

--
-- Constraints for table `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `Clean_Older` ON SCHEDULE EVERY '0 1' DAY_HOUR STARTS '2019-04-29 22:20:12' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM cita
    WHERE fecha < NOW()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
