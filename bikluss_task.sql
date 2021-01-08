-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 08 2021 г., 19:17
-- Версия сервера: 5.6.39-83.1
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bikluss_task`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cards`
--

CREATE TABLE IF NOT EXISTS `cards` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `id_project` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'appointed',
  `id_author` int(11) NOT NULL,
  `id_worker` int(11) NOT NULL,
  `name` varchar(300) NOT NULL DEFAULT 'Безымянный',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_started` datetime NOT NULL,
  `date_ended` datetime NOT NULL,
  `date_deadline` datetime NOT NULL,
  `date_readline` datetime NOT NULL,
  `priority` int(11) NOT NULL DEFAULT '0',
  `type_card` int(11) NOT NULL,
  `description` text NOT NULL,
  `id_parent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `detales`
--

CREATE TABLE IF NOT EXISTS `detales` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `id_card` int(11) NOT NULL,
  `type_detale` varchar(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `from_u_id` int(11) NOT NULL,
  `msg` text NOT NULL,
  `last_val` text NOT NULL,
  `now_val` text NOT NULL,
  `type_edit` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_removed` tinyint(4) DEFAULT '0',
  `code` varchar(60) NOT NULL,
  `roles` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `project_users`
--

CREATE TABLE IF NOT EXISTS `project_users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `date_assigned` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_leaved` datetime NOT NULL,
  `dates_warning` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `id_vk` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `GUID` varchar(60) NOT NULL,
  `photo` text,
  `social_networks` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
