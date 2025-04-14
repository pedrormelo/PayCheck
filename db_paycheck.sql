-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11/04/2025 às 19:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `paycheck`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `competencia`
--

CREATE TABLE `competencia` (
  `idComp` int(11) NOT NULL,
  `mesPag` varchar(50) NOT NULL,
  `anoPag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `competencia`
--

INSERT INTO `competencia` (`idComp`, `mesPag`, `anoPag`) VALUES
(1, 'Janeiro', 2024),
(2, 'Fevereiro', 2024),
(3, 'Março', 2024),
(4, 'Abril', 2024),
(5, 'Maio', 2024),
(6, 'Junho', 2024),
(7, 'Julho', 2024),
(8, 'Agosto', 2024),
(9, 'Setembro', 2024),
(10, 'Outubro', 2024),
(11, 'Novembro', 2024),
(12, 'Dezembro', 2024),
(13, 'Janeiro', 2025),
(14, 'Fevereiro', 2025),
(15, 'Março', 2025),
(16, 'Abril', 2025),
(17, 'Maio', 2025),
(18, 'Junho', 2025),
(19, 'Julho', 2025),
(20, 'Agosto', 2025),
(21, 'Setembro', 2025),
(22, 'Outubro', 2025),
(23, 'Novembro', 2025),
(24, 'Dezembro', 2025),
(25, 'Janeiro', 2026),
(26, 'Fevereiro', 2026),
(27, 'Março', 2026),
(28, 'Abril', 2026),
(29, 'Maio', 2026),
(30, 'Junho', 2026),
(31, 'Julho', 2026),
(32, 'Agosto', 2026),
(33, 'Setembro', 2026),
(34, 'Outubro', 2026),
(35, 'Novembro', 2026),
(36, 'Dezembro', 2026),
(37, 'Janeiro', 2027),
(38, 'Fevereiro', 2027),
(39, 'Março', 2027),
(40, 'Abril', 2027),
(41, 'Maio', 2027),
(42, 'Junho', 2027),
(43, 'Julho', 2027),
(44, 'Agosto', 2027),
(45, 'Setembro', 2027),
(46, 'Outubro', 2027),
(47, 'Novembro', 2027),
(48, 'Dezembro', 2027),
(49, 'Janeiro', 2028),
(50, 'Fevereiro', 2028),
(51, 'Março', 2028),
(52, 'Abril', 2028),
(53, 'Maio', 2028),
(54, 'Junho', 2028),
(55, 'Julho', 2028),
(56, 'Agosto', 2028),
(57, 'Setembro', 2028),
(58, 'Outubro', 2028),
(59, 'Novembro', 2028),
(60, 'Dezembro', 2028),
(61, 'Janeiro', 2029),
(62, 'Fevereiro', 2029),
(63, 'Março', 2029),
(64, 'Abril', 2029),
(65, 'Maio', 2029),
(66, 'Junho', 2029),
(67, 'Julho', 2029),
(68, 'Agosto', 2029),
(69, 'Setembro', 2029),
(70, 'Outubro', 2029),
(71, 'Novembro', 2029),
(72, 'Dezembro', 2029),
(73, 'Janeiro', 2030),
(74, 'Fevereiro', 2030),
(75, 'Março', 2030),
(76, 'Abril', 2030),
(77, 'Maio', 2030),
(78, 'Junho', 2030),
(79, 'Julho', 2030),
(80, 'Agosto', 2030),
(81, 'Setembro', 2030),
(82, 'Outubro', 2030),
(83, 'Novembro', 2030),
(84, 'Dezembro', 2030),
(85, 'Janeiro', 2031),
(86, 'Fevereiro', 2031),
(87, 'Março', 2031),
(88, 'Abril', 2031),
(89, 'Maio', 2031),
(90, 'Junho', 2031),
(91, 'Julho', 2031),
(92, 'Agosto', 2031),
(93, 'Setembro', 2031),
(94, 'Outubro', 2031),
(95, 'Novembro', 2031),
(96, 'Dezembro', 2031),
(97, 'Janeiro', 2032),
(98, 'Fevereiro', 2032),
(99, 'Março', 2032),
(100, 'Abril', 2032),
(101, 'Maio', 2032),
(102, 'Junho', 2032),
(103, 'Julho', 2032),
(104, 'Agosto', 2032),
(105, 'Setembro', 2032),
(106, 'Outubro', 2032),
(107, 'Novembro', 2032),
(108, 'Dezembro', 2032),
(109, 'Janeiro', 2033),
(110, 'Fevereiro', 2033),
(111, 'Março', 2033),
(112, 'Abril', 2033),
(113, 'Maio', 2033),
(114, 'Junho', 2033),
(115, 'Julho', 2033),
(116, 'Agosto', 2033),
(117, 'Setembro', 2033),
(118, 'Outubro', 2033),
(119, 'Novembro', 2033),
(120, 'Dezembro', 2033),
(121, 'Janeiro', 2034),
(122, 'Fevereiro', 2034),
(123, 'Março', 2034),
(124, 'Abril', 2034),
(125, 'Maio', 2034),
(126, 'Junho', 2034),
(127, 'Julho', 2034),
(128, 'Agosto', 2034),
(129, 'Setembro', 2034),
(130, 'Outubro', 2034),
(131, 'Novembro', 2034),
(132, 'Dezembro', 2034),
(133, 'Janeiro', 2035),
(134, 'Fevereiro', 2035),
(135, 'Março', 2035),
(136, 'Abril', 2035),
(137, 'Maio', 2035),
(138, 'Junho', 2035),
(139, 'Julho', 2035),
(140, 'Agosto', 2035),
(141, 'Setembro', 2035),
(142, 'Outubro', 2035),
(143, 'Novembro', 2035),
(144, 'Dezembro', 2035),
(145, 'Janeiro', 2036),
(146, 'Fevereiro', 2036),
(147, 'Março', 2036),
(148, 'Abril', 2036),
(149, 'Maio', 2036),
(150, 'Junho', 2036),
(151, 'Julho', 2036),
(152, 'Agosto', 2036),
(153, 'Setembro', 2036),
(154, 'Outubro', 2036),
(155, 'Novembro', 2036),
(156, 'Dezembro', 2036),
(157, 'Janeiro', 2037),
(158, 'Fevereiro', 2037),
(159, 'Março', 2037),
(160, 'Abril', 2037),
(161, 'Maio', 2037),
(162, 'Junho', 2037),
(163, 'Julho', 2037),
(164, 'Agosto', 2037),
(165, 'Setembro', 2037),
(166, 'Outubro', 2037),
(167, 'Novembro', 2037),
(168, 'Dezembro', 2037),
(169, 'Janeiro', 2038),
(170, 'Fevereiro', 2038),
(171, 'Março', 2038),
(172, 'Abril', 2038),
(173, 'Maio', 2038),
(174, 'Junho', 2038),
(175, 'Julho', 2038),
(176, 'Agosto', 2038),
(177, 'Setembro', 2038),
(178, 'Outubro', 2038),
(179, 'Novembro', 2038),
(180, 'Dezembro', 2038),
(181, 'Janeiro', 2039),
(182, 'Fevereiro', 2039),
(183, 'Março', 2039),
(184, 'Abril', 2039),
(185, 'Maio', 2039),
(186, 'Junho', 2039),
(187, 'Julho', 2039),
(188, 'Agosto', 2039),
(189, 'Setembro', 2039),
(190, 'Outubro', 2039),
(191, 'Novembro', 2039),
(192, 'Dezembro', 2039),
(193, 'Janeiro', 2040),
(194, 'Fevereiro', 2040),
(195, 'Março', 2040),
(196, 'Abril', 2040),
(197, 'Maio', 2040),
(198, 'Junho', 2040),
(199, 'Julho', 2040),
(200, 'Agosto', 2040),
(201, 'Setembro', 2040),
(202, 'Outubro', 2040),
(203, 'Novembro', 2040),
(204, 'Dezembro', 2040),
(205, 'Janeiro', 2041),
(206, 'Fevereiro', 2041),
(207, 'Março', 2041),
(208, 'Abril', 2041),
(209, 'Maio', 2041),
(210, 'Junho', 2041),
(211, 'Julho', 2041),
(212, 'Agosto', 2041),
(213, 'Setembro', 2041),
(214, 'Outubro', 2041),
(215, 'Novembro', 2041),
(216, 'Dezembro', 2041),
(217, 'Janeiro', 2042),
(218, 'Fevereiro', 2042),
(219, 'Março', 2042),
(220, 'Abril', 2042),
(221, 'Maio', 2042),
(222, 'Junho', 2042),
(223, 'Julho', 2042),
(224, 'Agosto', 2042),
(225, 'Setembro', 2042),
(226, 'Outubro', 2042),
(227, 'Novembro', 2042),
(228, 'Dezembro', 2042),
(229, 'Janeiro', 2043),
(230, 'Fevereiro', 2043),
(231, 'Março', 2043),
(232, 'Abril', 2043),
(233, 'Maio', 2043),
(234, 'Junho', 2043),
(235, 'Julho', 2043),
(236, 'Agosto', 2043),
(237, 'Setembro', 2043),
(238, 'Outubro', 2043),
(239, 'Novembro', 2043),
(240, 'Dezembro', 2043),
(241, 'Janeiro', 2044),
(242, 'Fevereiro', 2044),
(243, 'Março', 2044),
(244, 'Abril', 2044),
(245, 'Maio', 2044),
(246, 'Junho', 2044),
(247, 'Julho', 2044),
(248, 'Agosto', 2044),
(249, 'Setembro', 2044),
(250, 'Outubro', 2044),
(251, 'Novembro', 2044),
(252, 'Dezembro', 2044),
(253, 'Janeiro', 2045),
(254, 'Fevereiro', 2045),
(255, 'Março', 2045),
(256, 'Abril', 2045),
(257, 'Maio', 2045),
(258, 'Junho', 2045),
(259, 'Julho', 2045),
(260, 'Agosto', 2045),
(261, 'Setembro', 2045),
(262, 'Outubro', 2045),
(263, 'Novembro', 2045),
(264, 'Dezembro', 2045);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contratos`
--

CREATE TABLE `contratos` (
  `idContrato` int(11) NOT NULL,
  `idEmp` int(11) NOT NULL,
  `idStatus` int(11) NOT NULL,
  `idComp` int(11) NOT NULL,
  `dataVen` date NOT NULL,
  `dataRen` date NOT NULL,
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contratos`
--

INSERT INTO `contratos` (`idContrato`, `idEmp`, `idStatus`, `idComp`, `dataVen`, `dataRen`, `valor`) VALUES
(7, 1, 2, 1, '2025-12-31', '2026-12-31', 10000.50),
(8, 2, 3, 2, '2025-10-15', '2026-10-15', 8500.00),
(9, 3, 1, 3, '2025-08-20', '2026-08-20', 9200.75),
(10, 3, 2, 3, '2025-08-20', '2026-08-20', 9200.75),
(11, 4, 2, 4, '2025-11-10', '2026-11-10', 11000.25),
(12, 5, 4, 5, '2025-12-05', '2026-12-05', 10000.00),
(13, 6, 1, 6, '2025-07-14', '2026-07-14', 9500.50),
(14, 1, 2, 3, '2024-01-15', '2025-01-15', 15000.00),
(15, 1, 2, 3, '2025-07-20', '2025-01-21', 15000.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contratos_competencia`
--

CREATE TABLE `contratos_competencia` (
  `idPagamento` int(11) NOT NULL,
  `dataPag` date NOT NULL,
  `idContrato` int(11) NOT NULL,
  `idComp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contratos_competencia`
--

INSERT INTO `contratos_competencia` (`idPagamento`, `dataPag`, `idContrato`, `idComp`) VALUES
(1, '2025-03-20', 10, 3),
(2, '2024-05-10', 12, 3),
(3, '2025-03-20', 10, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresas`
--

CREATE TABLE `empresas` (
  `idEmp` int(11) NOT NULL,
  `nomeEmp` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `empresas`
--

INSERT INTO `empresas` (`idEmp`, `nomeEmp`) VALUES
(1, 'WORLDNET'),
(2, 'MAQ-LAREN - IMPRESSÃO'),
(3, 'MAQ-LAREN - LOCAÇÃO'),
(4, 'VFS - 5º T.A'),
(5, 'VFS - 7º T.A'),
(6, 'TIM S.A'),
(7, 'OI S.A');

-- --------------------------------------------------------

--
-- Estrutura para tabela `situacao`
--

CREATE TABLE `situacao` (
  `idStatus` int(11) NOT NULL,
  `situacao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `situacao`
--

INSERT INTO `situacao` (`idStatus`, `situacao`) VALUES
(1, 'PAGO'),
(2, 'LIQUIDAÇÃO'),
(3, 'EMPENHO'),
(4, 'ASSINATURA GESTOR'),
(5, 'ASSINATURA ORDENADOR');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `competencia`
--
ALTER TABLE `competencia`
  ADD PRIMARY KEY (`idComp`);

--
-- Índices de tabela `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`idContrato`),
  ADD KEY `idEmp` (`idEmp`),
  ADD KEY `idStatus` (`idStatus`),
  ADD KEY `idComp` (`idComp`);

--
-- Índices de tabela `contratos_competencia`
--
ALTER TABLE `contratos_competencia`
  ADD PRIMARY KEY (`idPagamento`),
  ADD KEY `idContrato` (`idContrato`),
  ADD KEY `idComp` (`idComp`);

--
-- Índices de tabela `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`idEmp`);

--
-- Índices de tabela `situacao`
--
ALTER TABLE `situacao`
  ADD PRIMARY KEY (`idStatus`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `competencia`
--
ALTER TABLE `competencia`
  MODIFY `idComp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=265;

--
-- AUTO_INCREMENT de tabela `contratos`
--
ALTER TABLE `contratos`
  MODIFY `idContrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `contratos_competencia`
--
ALTER TABLE `contratos_competencia`
  MODIFY `idPagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `empresas`
--
ALTER TABLE `empresas`
  MODIFY `idEmp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `situacao`
--
ALTER TABLE `situacao`
  MODIFY `idStatus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `contratos`
--
ALTER TABLE `contratos`
  ADD CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`idEmp`) REFERENCES `empresas` (`idEmp`),
  ADD CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `situacao` (`idStatus`),
  ADD CONSTRAINT `contratos_ibfk_3` FOREIGN KEY (`idComp`) REFERENCES `competencia` (`idComp`);

--
-- Restrições para tabelas `contratos_competencia`
--
ALTER TABLE `contratos_competencia`
  ADD CONSTRAINT `contratos_competencia_ibfk_1` FOREIGN KEY (`idContrato`) REFERENCES `contratos` (`idContrato`),
  ADD CONSTRAINT `contratos_competencia_ibfk_2` FOREIGN KEY (`idComp`) REFERENCES `competencia` (`idComp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
