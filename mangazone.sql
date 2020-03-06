-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: mangazone_db
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `episode`
--

DROP TABLE IF EXISTS `episode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `episode` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `title_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_title_id_idx` (`title_id`),
  CONSTRAINT `fk_title_1` FOREIGN KEY (`title_id`) REFERENCES `title` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episode`
--

LOCK TABLES `episode` WRITE;
/*!40000 ALTER TABLE `episode` DISABLE KEYS */;
/*!40000 ALTER TABLE `episode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'fiction'),(2,'drama'),(3,'policial'),(4,'terror');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manga`
--

DROP TABLE IF EXISTS `manga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manga` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `state_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `language` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `title_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_state_id_idx` (`state_id`),
  KEY `fk_title_id_idx` (`title_id`),
  CONSTRAINT `fk_state_id` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_title_id` FOREIGN KEY (`title_id`) REFERENCES `title` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manga`
--

LOCK TABLES `manga` WRITE;
/*!40000 ALTER TABLE `manga` DISABLE KEYS */;
INSERT INTO `manga` VALUES (2,'One Piece',1,'1990-01-01','esp',1),(3,'Dragon Ball',1,'1990-01-01','esp',2);
/*!40000 ALTER TABLE `manga` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `duration` time NOT NULL,
  `date` date NOT NULL,
  `titulo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_title_id_idx` (`titulo_id`),
  CONSTRAINT `fk_title_1_id` FOREIGN KEY (`titulo_id`) REFERENCES `title` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ova`
--

DROP TABLE IF EXISTS `ova`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ova` (
  `id` int(11) NOT NULL,
  `name` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `date` date DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `title_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_title_id_idx` (`title_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ova`
--

LOCK TABLES `ova` WRITE;
/*!40000 ALTER TABLE `ova` DISABLE KEYS */;
/*!40000 ALTER TABLE `ova` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'complete'),(2,'incomplete');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `title` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sinopsis` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `genre_id` int(11) NOT NULL,
  `emition` tinyint(4) NOT NULL,
  `manga_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_genre_id_idx` (`genre_id`),
  CONSTRAINT `fk_genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
INSERT INTO `title` VALUES (1,'Pirates History',1,1,1,'1990-01-01','One Piece'),(2,'Fighters History',2,1,2,'1991-01-01','Dragon ball'),(3,'Fighters History',3,1,3,'1993-01-01','Bleach'),(4,'Fighters History',4,1,4,'1994-01-01','Naruto'),(5,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(6,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(7,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(8,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(9,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(10,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(11,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(12,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(13,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(14,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(15,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(16,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(17,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(18,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin'),(19,'Sombra Descontrolada',1,1,2,'1990-01-01','Aijin');
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-06 17:09:13
