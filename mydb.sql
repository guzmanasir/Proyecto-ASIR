-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

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
-- Table structure for table `contiene`
--

CREATE DATABASE mydb;

USE mydb;

DROP TABLE IF EXISTS `contiene`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contiene` (
  `enlace_idenlace` int(11) NOT NULL,
  `lista_idlista` int(11) NOT NULL,
  `lista_usuario_id` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `cancion` varchar(255) DEFAULT NULL,
  `artista` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`enlace_idenlace`,`lista_idlista`,`lista_usuario_id`),
  KEY `fk_enlace_has_lista_lista1_idx` (`lista_idlista`,`lista_usuario_id`),
  KEY `fk_enlace_has_lista_enlace1_idx` (`enlace_idenlace`),
  CONSTRAINT `fk_enlace_has_lista_enlace1` FOREIGN KEY (`enlace_idenlace`) REFERENCES `enlace` (`idenlace`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_enlace_has_lista_lista1` FOREIGN KEY (`lista_idlista`, `lista_usuario_id`) REFERENCES `lista` (`idlista`, `usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contiene`
--

LOCK TABLES `contiene` WRITE;
/*!40000 ALTER TABLE `contiene` DISABLE KEYS */;
INSERT INTO `contiene` VALUES (60,49,2,0,'unknown','Full album Toots and the maytals'),(61,49,2,0,'unknown','Toots And The Maytals\'s Greatest Hits | The Best Of Toots And The Maytals'),(62,49,2,0,'46 Was My Number ','54'),(63,49,2,0,' This Is Desmond Dekker (Full Album)','Desmond Dekker  '),(63,50,2,0,'sasasa','ahora nossss'),(66,50,2,0,'xcvxvxv','xvcxvxc'),(67,50,2,0,' 007 Shanty Town','Desmond Dekker '),(68,50,2,0,' \"Israelites\" (Official Audio)','Desmond Dekker & The Aces '),(69,51,3,0,' vol. 1','The Best Ska Music from The Balkans '),(70,51,3,0,' eller sommarpresent!','Det här ska du önska dig i student'),(71,51,3,0,'unknown','The Ska Challenge SS1 EP.0 จุดเริ่มต้นของสงคราม');
/*!40000 ALTER TABLE `contiene` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enlace`
--

DROP TABLE IF EXISTS `enlace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enlace` (
  `idenlace` int(11) NOT NULL AUTO_INCREMENT,
  `URL` varchar(45) NOT NULL,
  `artista` varchar(45) DEFAULT NULL,
  `cancion` varchar(45) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idenlace`),
  UNIQUE KEY `URL_UNIQUE` (`URL`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enlace`
--

LOCK TABLES `enlace` WRITE;
/*!40000 ALTER TABLE `enlace` DISABLE KEYS */;
INSERT INTO `enlace` VALUES (60,'https://www.youtube.com/watch?v=btomXvCcbYo',NULL,NULL,0,'https://i.ytimg.com/vi/btomXvCcbYo/default.jpg'),(61,'https://www.youtube.com/watch?v=-N0xAZMQGZU',NULL,NULL,0,'https://i.ytimg.com/vi/-N0xAZMQGZU/default.jpg'),(62,'https://www.youtube.com/watch?v=UhH1Lxv-8sA',NULL,NULL,0,'https://i.ytimg.com/vi/UhH1Lxv-8sA/default.jpg'),(63,'https://www.youtube.com/watch?v=nlD_qrDEgsM',NULL,NULL,0,'https://i.ytimg.com/vi/nlD_qrDEgsM/default.jpg'),(66,'https://www.youtube.com/watch?v=83Y2hv-3UCM',NULL,NULL,0,'https://i.ytimg.com/vi/83Y2hv-3UCM/default.jpg'),(67,'https://www.youtube.com/watch?v=cFIqxnSo-gQ',NULL,NULL,0,'https://i.ytimg.com/vi/cFIqxnSo-gQ/default.jpg'),(68,'https://www.youtube.com/watch?v=mxtfdH3-TQ4',NULL,NULL,0,'https://i.ytimg.com/vi/mxtfdH3-TQ4/default.jpg'),(69,'https://www.youtube.com/watch?v=Qw-mLUAJufU',NULL,NULL,0,'https://i.ytimg.com/vi/Qw-mLUAJufU/default.jpg'),(70,'https://www.youtube.com/watch?v=umt6ptahbDs',NULL,NULL,0,'https://i.ytimg.com/vi/umt6ptahbDs/default.jpg'),(71,'https://www.youtube.com/watch?v=VzPbengp2XE',NULL,NULL,0,'https://i.ytimg.com/vi/VzPbengp2XE/default.jpg');
/*!40000 ALTER TABLE `enlace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etiqueta` (
  `idetiqueta` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idetiqueta`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
/*!40000 ALTER TABLE `etiqueta` DISABLE KEYS */;
INSERT INTO `etiqueta` VALUES (3,'reggae'),(4,'ska'),(5,'rocksteady'),(6,'rythm and blues'),(7,'blues'),(8,'soul'),(9,'rock'),(10,'rockabilly'),(11,'metal'),(12,'heavy metal'),(13,'pop'),(14,'country'),(15,'drum and bass'),(16,'jazz'),(17,'blues'),(18,'punk'),(19,'salsa'),(20,'latin'),(21,'reggaeton'),(22,'rap'),(23,'house'),(24,'\'50'),(25,'\'60'),(26,'\'80'),(27,'swing');
/*!40000 ALTER TABLE `etiqueta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorito`
--

DROP TABLE IF EXISTS `favorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorito` (
  `usuario_id` int(11) NOT NULL,
  `lista_idlista` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`usuario_id`,`lista_idlista`),
  KEY `fk_usuario_has_lista_lista1_idx` (`lista_idlista`),
  KEY `fk_usuario_has_lista_usuario_idx` (`usuario_id`),
  CONSTRAINT `fk_usuario_has_lista_lista1` FOREIGN KEY (`lista_idlista`) REFERENCES `lista` (`idlista`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_lista_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
INSERT INTO `favorito` VALUES (3,49,1),(3,50,0);
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista`
--

DROP TABLE IF EXISTS `lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lista` (
  `idlista` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idlista`,`usuario_id`),
  KEY `fk_lista_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_lista_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista`
--

LOCK TABLES `lista` WRITE;
/*!40000 ALTER TABLE `lista` DISABLE KEYS */;
INSERT INTO `lista` VALUES (49,'toots',2,0,'2017-06-05 09:22:50'),(50,'Desmond',2,0,'2017-06-05 09:22:50'),(51,'nueva lsita',3,0,'2017-06-05 09:24:04');
/*!40000 ALTER TABLE `lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pertenece`
--

DROP TABLE IF EXISTS `pertenece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pertenece` (
  `lista_idlista` int(11) NOT NULL,
  `lista_usuario_id` int(11) NOT NULL,
  `etiqueta_idetiqueta` int(11) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`lista_idlista`,`lista_usuario_id`,`etiqueta_idetiqueta`),
  KEY `fk_lista_has_etiqueta_etiqueta1_idx` (`etiqueta_idetiqueta`),
  KEY `fk_lista_has_etiqueta_lista1_idx` (`lista_idlista`,`lista_usuario_id`),
  CONSTRAINT `fk_lista_has_etiqueta_etiqueta1` FOREIGN KEY (`etiqueta_idetiqueta`) REFERENCES `etiqueta` (`idetiqueta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_lista_has_etiqueta_lista1` FOREIGN KEY (`lista_idlista`, `lista_usuario_id`) REFERENCES `lista` (`idlista`, `usuario_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pertenece`
--

LOCK TABLES `pertenece` WRITE;
/*!40000 ALTER TABLE `pertenece` DISABLE KEYS */;
INSERT INTO `pertenece` VALUES (49,2,4,0),(50,2,4,0),(51,3,4,0);
/*!40000 ALTER TABLE `pertenece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'admin','admin','admin@admin.com',0),(3,'jesus','jesus','jesus@jesus.com',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-08 13:56:12
