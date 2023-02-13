-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: cheese_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB-1:10.4.27+maria~ubu2004


DROP DATABASE IF EXISTS `project_db`;
CREATE DATABASE `project_db`;

USE `project_db`;
 
--
-- Table structure for table `countires`
--

DROP TABLE IF EXISTS `countires`;

CREATE TABLE `countires` (
  `ISO` varchar(255) NOT NULL AUTO_INCREMENT,
  `ISONumeric` varchar(255) DEFAULT NULL,
  `CountryName` varchar(255) DEFAULT NULL,
  `Capital` varchar(255) DEFAULT NULL,
  'CityCode' int(11) NOT NULL ,
  `Area` varchar(255) DEFAULT NULL,
  'Population' int(11) NOT NULL ,
  `Continent` varchar(255) DEFAULT NULL,
  `TopLevelDomain` varchar(255) DEFAULT NULL,
  `CurrencyCode` varchar(255) DEFAULT NULL,
  `CurrencyName` varchar(255) DEFAULT NULL,
  `PhoneCountryCode` varchar(255)DEFAULT NULL,
  `Languages` varchar(255) DEFAULT NULL,
  `Neighbours` varchar(255) DEFAULT NULL,
  `countryDescription` LONGTEXT ,
  PRIMARY KEY (`ISO`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




--
-- Table structure for table `imagedetails`
--

DROP TABLE IF EXISTS `imagedetails`;

CREATE TABLE `imagedetails` (
    'ImageID' int UNSIGNED,
    'UserID' int(11) NOT NULL ,
    'Title' varchar(255) DEFAULT NULL,
    'Description' LONGTEXT,
    'Latitude' DOUBLE,
    'Longitude' DOUBLE,
    'CityCode' int(11) NOT NULL ,
    'Path' varchar(2) DEFAULT NULL,
    'Exif' varchar(2) DEFAULT NULL,
    'ActualCreator' varchar(256) DEFAULT NULL,
    'CreatorURL' varchar(256) DEFAULT NULL,
    'SourceURL' varchar(256) DEFAULT NULL,
    'Colors' LONGTEXT,
 ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;