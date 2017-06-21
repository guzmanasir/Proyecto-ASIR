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
INSERT INTO `contiene` VALUES (69,65,3,0,' vol. 1','The Best Ska Music from The Balkans '),(79,54,2,0,' 54','Toots and the Maytals '),(80,54,2,0,' Yesterday','Kingstonians '),(81,54,2,0,' Coming In From The Cold [01]','Bob Marley '),(82,54,2,0,' It Pays','Desmond Dekker '),(83,55,2,0,' Wish Someone Would Care (Full album)','Irma Thomas (Usa, 1964)  '),(84,55,2,0,' A Change Is Gonna Come (1964) HD','Sam Cooke '),(85,55,2,0,' Lover\'s Prayer','Otis Redding '),(86,55,2,0,' I say a little prayer ( Official song ) HQ version , Photos / Photoshoots','Aretha Franklin '),(87,56,3,0,' All Around The World (Official Video) ft. Desiigner','Mura Masa '),(88,56,3,0,' Trying To Find A Balance (Official Video)','Atmosphere '),(89,56,3,0,' WHOA','Earl Sweatshirt '),(89,63,4,0,' WHOA','Earl Sweatshirt '),(90,56,3,0,' Hurt Me (Official Audio)','Post Malone '),(91,57,3,0,'unknown','OLD SCHOOL REGGAE MIX 80\'S 90\'S VOL.1 EARLY 90\'S OLDIES DANCEHALL MIX'),(92,57,3,0,'unknown','Reggae greats of the 1960/70s some of the best reggae tunes ever'),(93,57,3,0,' {DJ GIO GUARDIAN} REGGAE/DANCEHALL','OLDIES BUT GOODIES '),(94,58,2,0,' Prueba revistadelmotor.es','Renault Grand Scenic '),(95,58,2,0,'unknown','ESPAÑOL PRUEBA DULCES AMERICANOS (ESTADOUNIDENSES) #2 | PedritMejias'),(96,58,2,0,'unknown','GUITAR PRUEBA MASTERGAME (¡¿UN NUEVO JUEGO?!) | GuitarHeroStyles'),(97,58,2,0,' Centímetros Cúbicos','Prueba Lexus LC 500: Un deportivo que parece traído del futuro, pero es real '),(98,59,2,0,' Le Prisme Culturel','UNDEFINED '),(99,59,2,0,' Undefined (English Subtitles)','Tiara ft. Hatsune Miku '),(100,59,2,0,' Episode 1','Undefined Season 2 '),(101,59,2,0,' Episode 1','Undefined '),(102,60,2,0,' The Trooper (Official Video)','Iron Maiden '),(103,60,2,0,'unknown','Best of Iron Maiden 2017 | All Albums | Ultimate Playlist | Greatests Hits'),(104,60,2,0,' Fear Of The Dark (lyrics)','Iron Maiden '),(105,60,2,0,' Run To The Hills (Official Video)','Iron Maiden '),(114,63,4,0,' Time Tough','Toots & The Maytals '),(115,63,4,0,' Sailing On','Toots & The Maytals '),(117,63,4,0,' Liar Liar GE2017','Captain SKA '),(118,64,4,0,' The Story Of 1966','Let\'s Do Rocksteady '),(119,64,4,0,'Original Cool Sounds of Duke Reid\'s Treasure Isle','Rock Steady Soul '),(120,64,4,0,'unknown','Rock steady mix!! Last Flight To Reggae City (full)'),(121,64,4,0,' Rock Steady Official Video','The Whispers '),(123,65,3,0,'unknown','The Ska Challenge SS1 EP.1 วิ่งสู้ฟัด'),(124,65,3,0,'unknown','DIT IS SKA!'),(124,72,2,0,'unknown','DIT IS SKA!'),(125,65,3,0,' Pressure Drop','Toots & The Maytals '),(126,66,2,0,'unknown','CASH MONEY OLDIES SOUL MIX  Old School  (R&B, Disco, Pop , rnb & Soul) Old school slow Mix'),(127,66,2,0,' 100 Rhythm & Blues Favourites (One Day Music) [Full Album]','Various Artists '),(128,66,2,0,'unknown','OH HENRY\'S R&B OLDIES BUT GOODIES 60\'S & 70\'S MIXED'),(129,66,2,0,' Soulful \'60s Blues For Today\'s Dancers','New Breed R&B '),(130,67,2,0,'unknown','Asda rave return part 2 with #discoboy'),(131,68,2,0,'unknown','qwer Tom'),(132,68,2,0,' Trailer (HD) ','Despicable Me 2 '),(133,68,2,0,'unknown','What\'s your name? A qwer educational dank meme.'),(134,69,2,0,'unknown','WOW Shocking footage showing dominos employee buying pizzas from Asda'),(135,69,2,0,'unknown','ASDA Coventry Toy Shopping on Ava Toy Show'),(136,70,2,0,'unknown','asddaa'),(137,70,2,0,'unknown','Asddaa'),(138,70,2,0,'unknown','asddaa'),(139,70,2,0,'unknown','El Meneaiito chacarero de la Vane :D Asddaa'),(140,70,2,0,'unknown','asddaa'),(145,72,2,0,' SHROUD EZ FRAGS!! ft STEWIE2K & SKA (Funny Moments!)','CS:GO '),(146,72,2,0,'unknown','hukum rimba cover ska'),(147,72,2,0,' Get Smart (Official FULL Version)','Melbourne Ska Orchestra '),(148,73,4,0,' Hola','J. Balvin '),(149,73,4,0,' Hola','Joey Montana '),(150,73,4,0,'unknown','BB KI VINES MR. HOLA PART 1 TO 6 FULL SERIES'),(151,73,4,0,' Dont Mind (EXPLICIT)','Kent Jones '),(152,74,4,0,'unknown','Bo Burnham\'s \"Sad\" from \"what.\"'),(153,74,4,0,' Sad Song (Lyric Video) ft. Elena Coats','We The Kings '),(154,74,4,0,' Sad ft. Lil Yachty','Kodie Shane '),(155,74,4,0,'unknown','7 Things We\'re Sad To See The Car Industry Killing Off'),(156,75,4,1,'primera','primera'),(157,75,4,0,'unknown','Relaxing Blues Music 2017 | 90 Min Best of B. B.  KING | www.RelaxingBlues.Com'),(158,75,4,1,'unknown','Relaxing Blues Blues Music 2014 Vol 2  |  www.RelaxingBlues.com'),(159,75,4,1,'unknown','Relaxing Sweet Blues Music No.5 | 2017 Vol 6 | www.RelaxingBlues.Com'),(160,76,4,0,' 2k17 |Prod By WuanBeatz| (Video)','Sada Baby '),(161,76,4,0,' #SkubaRuffin ft Poppa Sada x Tooda Man (Shot By Dexta Dave)','Sada Baby '),(162,76,4,0,' No Ordinary Love','Sade '),(163,76,4,0,' Sticks & Stones Official Video (Shot By @Kogoloud)','Sada Baby '),(164,77,4,0,'me, Ultima ','Abençoe'),(165,77,4,0,' Anuel AA x Bad Bunny [Video Original]','La Última Vez '),(166,77,4,0,' Anuel AA ft Justin Bieber, Bad Bunny (Official Audio)','La Última Vez Remix '),(167,77,4,0,' Anuel AA ✘ Bad Bunny [Video Lyric]','La Última Vez '),(168,78,2,0,'unknown','asdda'),(169,78,2,0,'unknown','asdda'),(170,78,2,0,'unknown','videoplayback'),(171,78,2,0,'unknown','mi primer video'),(172,79,2,0,' MÚSICA NUEVA NOVIEMBRE 2016','Lo que Esta Sonando (NOVIEMBRE 2016) '),(173,79,2,0,'unknown','Jounel Ft. Javy, Baby Johnny, Barber V13 Y Masta – Así Vivimos (Prod. El Jetty)'),(174,79,2,0,'unknown','reggaeton mix  perreo en la discoteka dj ber'),(175,80,2,0,'unknown','ASD HS Graduation Ceremony 2017'),(175,81,4,0,' repair, causes, types, symptoms & pathology','Atrial septal defect (ASD) '),(176,80,2,0,' repair, causes, types, symptoms & pathology','Atrial septal defect (ASD) '),(176,81,4,0,'unknown','ASD HS Graduation Ceremony 2017'),(177,80,2,0,' Doar A.S.D. (Vox Latina Remix)','Parazitii '),(178,80,2,0,'8 (Complete Collection)','asdfmovie 1'),(181,82,4,0,'unknown','Top 3 sda songs 2017 by best sda choirs from kenya tanzania rwanda adventist songs'),(181,83,4,0,'unknown','Top 3 sda songs 2017 by best sda choirs from kenya tanzania rwanda adventist songs'),(182,82,4,0,'unknown','2017 SDA SONGS COLLECTION BY ADVENTIST CHOIRS ACROSS EAST AFRICA| NYIMBO ZA INJILI KUABUDU'),(182,83,4,0,'unknown','2017 SDA SONGS COLLECTION BY ADVENTIST CHOIRS ACROSS EAST AFRICA| NYIMBO ZA INJILI KUABUDU'),(184,83,4,0,'unknown','Top 6 sda songs 2016|2017 in east africa collection by adventist church choirs'),(195,75,4,0,' DominGo se confie à DFG pour HyperX','Quoi de neuf, docteur ? '),(196,75,4,1,'unknown','Dfg'),(197,75,4,0,'unknown','NUEVA ECIJA KAY GANDA BY REDSTILO FT BITUIN RAGGAE RAP VERSION'),(198,75,4,1,'unknown','Virat hosts team RCB at Nueva! | VIVO IPL 2017'),(199,75,4,1,'unknown','sdfsda'),(200,75,4,0,'unknown','SDFSDA'),(201,75,4,1,'unknown','.xcvxcv');
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
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enlace`
--

LOCK TABLES `enlace` WRITE;
/*!40000 ALTER TABLE `enlace` DISABLE KEYS */;
INSERT INTO `enlace` VALUES (60,'https://www.youtube.com/watch?v=btomXvCcbYo',NULL,NULL,0,'https://i.ytimg.com/vi/btomXvCcbYo/default.jpg'),(61,'https://www.youtube.com/watch?v=-N0xAZMQGZU',NULL,NULL,0,'https://i.ytimg.com/vi/-N0xAZMQGZU/default.jpg'),(62,'https://www.youtube.com/watch?v=UhH1Lxv-8sA',NULL,NULL,0,'https://i.ytimg.com/vi/UhH1Lxv-8sA/default.jpg'),(63,'https://www.youtube.com/watch?v=nlD_qrDEgsM',NULL,NULL,0,'https://i.ytimg.com/vi/nlD_qrDEgsM/default.jpg'),(66,'https://www.youtube.com/watch?v=83Y2hv-3UCM',NULL,NULL,0,'https://i.ytimg.com/vi/83Y2hv-3UCM/default.jpg'),(67,'https://www.youtube.com/watch?v=cFIqxnSo-gQ',NULL,NULL,0,'https://i.ytimg.com/vi/cFIqxnSo-gQ/default.jpg'),(68,'https://www.youtube.com/watch?v=mxtfdH3-TQ4',NULL,NULL,0,'https://i.ytimg.com/vi/mxtfdH3-TQ4/default.jpg'),(69,'https://www.youtube.com/watch?v=Qw-mLUAJufU',NULL,NULL,0,'https://i.ytimg.com/vi/Qw-mLUAJufU/default.jpg'),(70,'https://www.youtube.com/watch?v=umt6ptahbDs',NULL,NULL,0,'https://i.ytimg.com/vi/umt6ptahbDs/default.jpg'),(71,'https://www.youtube.com/watch?v=VzPbengp2XE',NULL,NULL,0,'https://i.ytimg.com/vi/VzPbengp2XE/default.jpg'),(72,'https://www.youtube.com/watch?v=pCLGqTCm1EE',NULL,NULL,0,'https://i.ytimg.com/vi/pCLGqTCm1EE/default.jpg'),(73,'https://www.youtube.com/watch?v=zonE7tMyNMY',NULL,NULL,0,'https://i.ytimg.com/vi/zonE7tMyNMY/default.jpg'),(74,'https://www.youtube.com/watch?v=WmnUayaQyBk',NULL,NULL,0,'https://i.ytimg.com/vi/WmnUayaQyBk/default.jpg'),(75,'https://www.youtube.com/watch?v=WkfvL3Nz0SI',NULL,NULL,0,'https://i.ytimg.com/vi/WkfvL3Nz0SI/default.jpg'),(76,'https://www.youtube.com/watch?v=tX6VursfSao',NULL,NULL,0,'https://i.ytimg.com/vi/tX6VursfSao/default.jpg'),(77,'https://www.youtube.com/watch?v=qGizyia26GM',NULL,NULL,0,'https://i.ytimg.com/vi/qGizyia26GM/default.jpg'),(78,'https://www.youtube.com/watch?v=zYqABr-rAZo',NULL,NULL,0,'https://i.ytimg.com/vi/zYqABr-rAZo/default.jpg'),(79,'https://www.youtube.com/watch?v=yjg6flu3zuc',NULL,NULL,0,'https://i.ytimg.com/vi/yjg6flu3zuc/default.jpg'),(80,'https://www.youtube.com/watch?v=xFDkOSR7Kgk',NULL,NULL,0,'https://i.ytimg.com/vi/xFDkOSR7Kgk/default.jpg'),(81,'https://www.youtube.com/watch?v=g3Z4PX2JI_c',NULL,NULL,0,'https://i.ytimg.com/vi/g3Z4PX2JI_c/default.jpg'),(82,'https://www.youtube.com/watch?v=Wc6MQdonSYY',NULL,NULL,0,'https://i.ytimg.com/vi/Wc6MQdonSYY/default.jpg'),(83,'https://www.youtube.com/watch?v=ZeZ_N1VIHRw',NULL,NULL,0,'https://i.ytimg.com/vi/ZeZ_N1VIHRw/default.jpg'),(84,'https://www.youtube.com/watch?v=ZFRzO_KZkkQ',NULL,NULL,0,'https://i.ytimg.com/vi/ZFRzO_KZkkQ/default.jpg'),(85,'https://www.youtube.com/watch?v=Jo-klvlKdjM',NULL,NULL,0,'https://i.ytimg.com/vi/Jo-klvlKdjM/default.jpg'),(86,'https://www.youtube.com/watch?v=KtBbyglq37E',NULL,NULL,0,'https://i.ytimg.com/vi/KtBbyglq37E/default.jpg'),(87,'https://www.youtube.com/watch?v=Z9doCz9P6Pw',NULL,NULL,0,'https://i.ytimg.com/vi/Z9doCz9P6Pw/default.jpg'),(88,'https://www.youtube.com/watch?v=gbEwHJX95QE',NULL,NULL,0,'https://i.ytimg.com/vi/gbEwHJX95QE/default.jpg'),(89,'https://www.youtube.com/watch?v=anRkutaPS9w',NULL,NULL,0,'https://i.ytimg.com/vi/anRkutaPS9w/default.jpg'),(90,'https://www.youtube.com/watch?v=xPuWZwsP4U0',NULL,NULL,0,'https://i.ytimg.com/vi/xPuWZwsP4U0/default.jpg'),(91,'https://www.youtube.com/watch?v=80RmJl7r5lw',NULL,NULL,0,'https://i.ytimg.com/vi/80RmJl7r5lw/default.jpg'),(92,'https://www.youtube.com/watch?v=5f6MFNnUiR8',NULL,NULL,0,'https://i.ytimg.com/vi/5f6MFNnUiR8/default.jpg'),(93,'https://www.youtube.com/watch?v=V1_21xHrmns',NULL,NULL,0,'https://i.ytimg.com/vi/V1_21xHrmns/default.jpg'),(94,'https://www.youtube.com/watch?v=AWi_MCtRyFA',NULL,NULL,0,'https://i.ytimg.com/vi/AWi_MCtRyFA/default.jpg'),(95,'https://www.youtube.com/watch?v=lRbK7hOpJr0',NULL,NULL,0,'https://i.ytimg.com/vi/lRbK7hOpJr0/default.jpg'),(96,'https://www.youtube.com/watch?v=tXj6lzPkVNY',NULL,NULL,0,'https://i.ytimg.com/vi/tXj6lzPkVNY/default.jpg'),(97,'https://www.youtube.com/watch?v=r--H7US-8uI',NULL,NULL,0,'https://i.ytimg.com/vi/r--H7US-8uI/default.jpg'),(98,'https://www.youtube.com/watch?v=0BzD7VFVYCs',NULL,NULL,0,'https://i.ytimg.com/vi/0BzD7VFVYCs/default.jpg'),(99,'https://www.youtube.com/watch?v=R4yjXptNU9U',NULL,NULL,0,'https://i.ytimg.com/vi/R4yjXptNU9U/default.jpg'),(100,'https://www.youtube.com/watch?v=dpa7_6AllFA',NULL,NULL,0,'https://i.ytimg.com/vi/dpa7_6AllFA/default.jpg'),(101,'https://www.youtube.com/watch?v=jbnddQ9l0IA',NULL,NULL,0,'https://i.ytimg.com/vi/jbnddQ9l0IA/default.jpg'),(102,'https://www.youtube.com/watch?v=X4bgXH3sJ2Q',NULL,NULL,0,'https://i.ytimg.com/vi/X4bgXH3sJ2Q/default.jpg'),(103,'https://www.youtube.com/watch?v=Wn4TMpdV5iE',NULL,NULL,0,'https://i.ytimg.com/vi/Wn4TMpdV5iE/default.jpg'),(104,'https://www.youtube.com/watch?v=qEja72NSg5Q',NULL,NULL,0,'https://i.ytimg.com/vi/qEja72NSg5Q/default.jpg'),(105,'https://www.youtube.com/watch?v=86URGgqONvA',NULL,NULL,0,'https://i.ytimg.com/vi/86URGgqONvA/default.jpg'),(106,'https://www.youtube.com/watch?v=Yck_spqqDd8',NULL,NULL,0,'https://i.ytimg.com/vi/Yck_spqqDd8/default.jpg'),(107,'https://www.youtube.com/watch?v=PXTL_DjwpJ8',NULL,NULL,0,'https://i.ytimg.com/vi/PXTL_DjwpJ8/default.jpg'),(108,'https://www.youtube.com/watch?v=9sYkyUeRjI8',NULL,NULL,0,'https://i.ytimg.com/vi/9sYkyUeRjI8/default_live.jpg'),(109,'https://www.youtube.com/watch?v=UvaCuwYuCho',NULL,NULL,0,'https://i.ytimg.com/vi/UvaCuwYuCho/default.jpg'),(114,'https://www.youtube.com/watch?v=TXxOU49TVKA',NULL,NULL,0,'https://i.ytimg.com/vi/TXxOU49TVKA/default.jpg'),(115,'https://www.youtube.com/watch?v=zPNln7nPCJc',NULL,NULL,0,'https://i.ytimg.com/vi/zPNln7nPCJc/default.jpg'),(117,'https://www.youtube.com/watch?v=HxN1STgQXW8',NULL,NULL,0,'https://i.ytimg.com/vi/HxN1STgQXW8/default.jpg'),(118,'https://www.youtube.com/watch?v=-b0MXi8SuyY',NULL,NULL,0,'https://i.ytimg.com/vi/-b0MXi8SuyY/default.jpg'),(119,'https://www.youtube.com/watch?v=dTk_f5R5vs8',NULL,NULL,0,'https://i.ytimg.com/vi/dTk_f5R5vs8/default.jpg'),(120,'https://www.youtube.com/watch?v=aOjJuGH9wps',NULL,NULL,0,'https://i.ytimg.com/vi/aOjJuGH9wps/default.jpg'),(121,'https://www.youtube.com/watch?v=rPJz3syNbtE',NULL,NULL,0,'https://i.ytimg.com/vi/rPJz3syNbtE/default.jpg'),(123,'https://www.youtube.com/watch?v=iEONkPEYt8s',NULL,NULL,0,'https://i.ytimg.com/vi/iEONkPEYt8s/default.jpg'),(124,'https://www.youtube.com/watch?v=dRrECdUmkd8',NULL,NULL,0,'https://i.ytimg.com/vi/dRrECdUmkd8/default.jpg'),(125,'https://www.youtube.com/watch?v=6rb13ksYO0s',NULL,NULL,0,'https://i.ytimg.com/vi/6rb13ksYO0s/default.jpg'),(126,'https://www.youtube.com/watch?v=LxgQl2dZP-M',NULL,NULL,0,'https://i.ytimg.com/vi/LxgQl2dZP-M/default.jpg'),(127,'https://www.youtube.com/watch?v=nVewXR7RVe0',NULL,NULL,0,'https://i.ytimg.com/vi/nVewXR7RVe0/default.jpg'),(128,'https://www.youtube.com/watch?v=iZG9QJ4CLl0',NULL,NULL,0,'https://i.ytimg.com/vi/iZG9QJ4CLl0/default.jpg'),(129,'https://www.youtube.com/watch?v=yTiaCeejfJM',NULL,NULL,0,'https://i.ytimg.com/vi/yTiaCeejfJM/default.jpg'),(130,'https://www.youtube.com/watch?v=xT-0Wo6Yvow',NULL,NULL,0,'https://i.ytimg.com/vi/xT-0Wo6Yvow/default.jpg'),(131,'https://www.youtube.com/watch?v=vpuaYI2YEJ4',NULL,NULL,0,'https://i.ytimg.com/vi/vpuaYI2YEJ4/default.jpg'),(132,'https://www.youtube.com/watch?v=TlbnGSMJQbQ',NULL,NULL,0,'https://i.ytimg.com/vi/TlbnGSMJQbQ/default.jpg'),(133,'https://www.youtube.com/watch?v=LY9LX9PITkw',NULL,NULL,0,'https://i.ytimg.com/vi/LY9LX9PITkw/default.jpg'),(134,'https://www.youtube.com/watch?v=tU7q595tt8k',NULL,NULL,0,'https://i.ytimg.com/vi/tU7q595tt8k/default.jpg'),(135,'https://www.youtube.com/watch?v=ILLD7Jzqnd4',NULL,NULL,0,'https://i.ytimg.com/vi/ILLD7Jzqnd4/default.jpg'),(136,'https://www.youtube.com/watch?v=Ak72q-cSMgU',NULL,NULL,0,'https://i.ytimg.com/vi/Ak72q-cSMgU/default.jpg'),(137,'https://www.youtube.com/watch?v=nfVO9jPj0WA',NULL,NULL,0,'https://i.ytimg.com/vi/nfVO9jPj0WA/default.jpg'),(138,'https://www.youtube.com/watch?v=gyJcpuGAK58',NULL,NULL,0,'https://i.ytimg.com/vi/gyJcpuGAK58/default.jpg'),(139,'https://www.youtube.com/watch?v=Qunh8CQekxI',NULL,NULL,0,'https://i.ytimg.com/vi/Qunh8CQekxI/default.jpg'),(140,'https://www.youtube.com/watch?v=73_ba-CkNsk',NULL,NULL,0,'https://i.ytimg.com/vi/73_ba-CkNsk/default.jpg'),(141,'https://www.youtube.com/watch?v=wYcXtRuj_Zk',NULL,NULL,0,'https://i.ytimg.com/vi/wYcXtRuj_Zk/default.jpg'),(142,'https://www.youtube.com/watch?v=jsB-wyjly3Y',NULL,NULL,0,'https://i.ytimg.com/vi/jsB-wyjly3Y/default.jpg'),(144,'https://www.youtube.com/watch?v=IxxOlbmIzvI',NULL,NULL,0,'https://i.ytimg.com/vi/IxxOlbmIzvI/default.jpg'),(145,'https://www.youtube.com/watch?v=QJRzOQnSwmU',NULL,NULL,0,'https://i.ytimg.com/vi/QJRzOQnSwmU/default.jpg'),(146,'https://www.youtube.com/watch?v=FzRtCNJztNY',NULL,NULL,0,'https://i.ytimg.com/vi/FzRtCNJztNY/default.jpg'),(147,'https://www.youtube.com/watch?v=CVyJkKKfRFs',NULL,NULL,0,'https://i.ytimg.com/vi/CVyJkKKfRFs/default.jpg'),(148,'https://www.youtube.com/watch?v=KNnD4O-TtOs',NULL,NULL,0,'https://i.ytimg.com/vi/KNnD4O-TtOs/default.jpg'),(149,'https://www.youtube.com/watch?v=Mfu9jgj_z18',NULL,NULL,0,'https://i.ytimg.com/vi/Mfu9jgj_z18/default.jpg'),(150,'https://www.youtube.com/watch?v=BxA13D_ADeI',NULL,NULL,0,'https://i.ytimg.com/vi/BxA13D_ADeI/default.jpg'),(151,'https://www.youtube.com/watch?v=n49qi-dU9IE',NULL,NULL,0,'https://i.ytimg.com/vi/n49qi-dU9IE/default.jpg'),(152,'https://www.youtube.com/watch?v=S_x4_QrMcm8',NULL,NULL,0,'https://i.ytimg.com/vi/S_x4_QrMcm8/default.jpg'),(153,'https://www.youtube.com/watch?v=BZsXcc_tC-o',NULL,NULL,0,'https://i.ytimg.com/vi/BZsXcc_tC-o/default.jpg'),(154,'https://www.youtube.com/watch?v=QGIDU7V3osQ',NULL,NULL,0,'https://i.ytimg.com/vi/QGIDU7V3osQ/default.jpg'),(155,'https://www.youtube.com/watch?v=BEl8W0TMDYg',NULL,NULL,0,'https://i.ytimg.com/vi/BEl8W0TMDYg/default.jpg'),(156,'https://www.youtube.com/watch?v=vhJV9dDrp_4',NULL,NULL,0,'https://i.ytimg.com/vi/vhJV9dDrp_4/default.jpg'),(157,'https://www.youtube.com/watch?v=qr6fNVQ1SHM',NULL,NULL,0,'https://i.ytimg.com/vi/qr6fNVQ1SHM/default.jpg'),(158,'https://www.youtube.com/watch?v=D93PBlwBp8s',NULL,NULL,0,'https://i.ytimg.com/vi/D93PBlwBp8s/default.jpg'),(159,'https://www.youtube.com/watch?v=xrj3ulR01K0',NULL,NULL,0,'https://i.ytimg.com/vi/xrj3ulR01K0/default.jpg'),(160,'https://www.youtube.com/watch?v=lGjBhgsyY94',NULL,NULL,0,'https://i.ytimg.com/vi/lGjBhgsyY94/default.jpg'),(161,'https://www.youtube.com/watch?v=nASxztRsFdI',NULL,NULL,0,'https://i.ytimg.com/vi/nASxztRsFdI/default.jpg'),(162,'https://www.youtube.com/watch?v=_WcWHZc8s2I',NULL,NULL,0,'https://i.ytimg.com/vi/_WcWHZc8s2I/default.jpg'),(163,'https://www.youtube.com/watch?v=LL5_0ksxwiM',NULL,NULL,0,'https://i.ytimg.com/vi/LL5_0ksxwiM/default.jpg'),(164,'https://www.youtube.com/watch?v=JLfhZQYUCfQ',NULL,NULL,0,'https://i.ytimg.com/vi/JLfhZQYUCfQ/default.jpg'),(165,'https://www.youtube.com/watch?v=Vuj9JLpWZ0E',NULL,NULL,0,'https://i.ytimg.com/vi/Vuj9JLpWZ0E/default.jpg'),(166,'https://www.youtube.com/watch?v=WohVRrrUJA4',NULL,NULL,0,'https://i.ytimg.com/vi/WohVRrrUJA4/default.jpg'),(167,'https://www.youtube.com/watch?v=TZ4olKW-dOM',NULL,NULL,0,'https://i.ytimg.com/vi/TZ4olKW-dOM/default.jpg'),(168,'https://www.youtube.com/watch?v=g4XKmDlDoUQ',NULL,NULL,0,'https://i.ytimg.com/vi/g4XKmDlDoUQ/default.jpg'),(169,'https://www.youtube.com/watch?v=7_vEdQvQ3s4',NULL,NULL,0,'https://i.ytimg.com/vi/7_vEdQvQ3s4/default.jpg'),(170,'https://www.youtube.com/watch?v=clYmqeniLAk',NULL,NULL,0,'https://i.ytimg.com/vi/clYmqeniLAk/default.jpg'),(171,'https://www.youtube.com/watch?v=XhymtjIoJ2I',NULL,NULL,0,'https://i.ytimg.com/vi/XhymtjIoJ2I/default.jpg'),(172,'https://www.youtube.com/watch?v=7OYE5CxcH7Q',NULL,NULL,0,'https://i.ytimg.com/vi/7OYE5CxcH7Q/default.jpg'),(173,'https://www.youtube.com/watch?v=2sspP8dcMnY',NULL,NULL,0,'https://i.ytimg.com/vi/2sspP8dcMnY/default.jpg'),(174,'https://www.youtube.com/watch?v=oy90bbwysT0',NULL,NULL,0,'https://i.ytimg.com/vi/oy90bbwysT0/default.jpg'),(175,'https://www.youtube.com/watch?v=KD-G0zrArpY',NULL,NULL,0,'https://i.ytimg.com/vi/KD-G0zrArpY/default.jpg'),(176,'https://www.youtube.com/watch?v=ed6__8FaSOU',NULL,NULL,0,'https://i.ytimg.com/vi/ed6__8FaSOU/default.jpg'),(177,'https://www.youtube.com/watch?v=BFwH9z0UFIE',NULL,NULL,0,'https://i.ytimg.com/vi/BFwH9z0UFIE/default.jpg'),(178,'https://www.youtube.com/watch?v=PF9z-kEmic4',NULL,NULL,0,'https://i.ytimg.com/vi/PF9z-kEmic4/default.jpg'),(181,'https://www.youtube.com/watch?v=J-a_CecZ29g',NULL,NULL,0,'https://i.ytimg.com/vi/J-a_CecZ29g/default.jpg'),(182,'https://www.youtube.com/watch?v=jwbJEbVxpT4',NULL,NULL,0,'https://i.ytimg.com/vi/jwbJEbVxpT4/default.jpg'),(184,'https://www.youtube.com/watch?v=iGuXJrotirM',NULL,NULL,0,'https://i.ytimg.com/vi/iGuXJrotirM/default.jpg'),(187,'https://www.youtube.com/watch?v=Q9XfPyWbqS8',NULL,NULL,0,'https://i.ytimg.com/vi/Q9XfPyWbqS8/default.jpg'),(192,'https://www.youtube.com/watch?v=iaBEKo5sM7w',NULL,NULL,0,'https://i.ytimg.com/vi/iaBEKo5sM7w/default.jpg'),(193,'https://www.youtube.com/watch?v=AlPuH7VRjrg',NULL,NULL,0,'https://i.ytimg.com/vi/AlPuH7VRjrg/default.jpg'),(194,'https://www.youtube.com/watch?v=ovJpo4y2UPM',NULL,NULL,0,'https://i.ytimg.com/vi/ovJpo4y2UPM/default.jpg'),(195,'https://www.youtube.com/watch?v=MjecTDgJhD4',NULL,NULL,0,'https://i.ytimg.com/vi/MjecTDgJhD4/default.jpg'),(196,'https://www.youtube.com/watch?v=YJTiknkIa9Y',NULL,NULL,0,'https://i.ytimg.com/vi/YJTiknkIa9Y/default.jpg'),(197,'https://www.youtube.com/watch?v=Y51UhtvoKSo',NULL,NULL,0,'https://i.ytimg.com/vi/Y51UhtvoKSo/default.jpg'),(198,'https://www.youtube.com/watch?v=VOvUcAb1I4I',NULL,NULL,0,'https://i.ytimg.com/vi/VOvUcAb1I4I/default.jpg'),(199,'https://www.youtube.com/watch?v=vHnGBpJ4kRA',NULL,NULL,0,'https://i.ytimg.com/vi/vHnGBpJ4kRA/default.jpg'),(200,'https://www.youtube.com/watch?v=zM5uja7BuWE',NULL,NULL,0,'https://i.ytimg.com/vi/zM5uja7BuWE/default.jpg'),(201,'https://www.youtube.com/watch?v=Z3j3AOtqGyQ',NULL,NULL,0,'https://i.ytimg.com/vi/Z3j3AOtqGyQ/default.jpg');
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
INSERT INTO `favorito` VALUES (2,56,1),(2,57,0),(2,63,1),(2,64,0),(2,65,0),(2,70,1),(2,73,1),(2,74,1),(2,75,1),(2,76,1),(2,77,1),(3,55,0),(3,80,0),(4,57,0),(4,60,1),(4,72,1),(4,78,1),(4,79,0),(4,80,1);
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
  `reproducciones` int(11) DEFAULT '0',
  PRIMARY KEY (`idlista`,`usuario_id`),
  KEY `fk_lista_usuario1_idx` (`usuario_id`),
  CONSTRAINT `fk_lista_usuario1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista`
--

LOCK TABLES `lista` WRITE;
/*!40000 ALTER TABLE `lista` DISABLE KEYS */;
INSERT INTO `lista` VALUES (54,'Reggae Lista',2,0,'2017-06-10 17:43:43',36),(55,'Soul Lista',2,0,'2017-06-10 17:45:20',2),(56,'Rap Lista',3,0,'2017-06-10 17:48:02',0),(57,'Lista con noimbre largo tercera',3,0,'2017-06-10 18:28:35',0),(58,'Prueba1',2,1,'2017-06-11 21:08:09',0),(59,'Prueba2',2,0,'2017-06-11 21:08:41',0),(60,'pruebas5',2,0,'2017-06-11 21:15:32',1),(61,'prueba6',2,0,'2017-06-11 21:20:28',0),(62,'prueba7',2,0,'2017-06-11 21:20:55',0),(63,'lista jesus1',4,0,'2017-06-12 16:20:38',1),(64,'lista jesus3',4,0,'2017-06-12 17:05:35',8),(65,'Skaaaaaa',3,0,'2017-06-12 19:38:19',32),(66,'rnb lista',2,0,'2017-06-17 01:27:56',0),(67,'prueba6',2,0,'2017-06-17 23:25:41',0),(68,'holalalala',2,0,'2017-06-17 23:26:17',0),(69,'prueba10',2,0,'2017-06-17 23:26:42',0),(70,'pruebasasasa',2,0,'2017-06-17 23:27:11',1),(71,'lalalalalala',2,0,'2017-06-17 23:27:29',0),(72,'skalaka',2,0,'2017-06-17 23:28:05',0),(73,'prueba',4,0,'2017-06-18 01:13:19',0),(74,'papapa',4,0,'2017-06-18 01:13:54',0),(75,'pruebaaaaa',4,0,'2017-06-18 01:14:15',12),(76,'otramaaas',4,1,'2017-06-18 01:14:41',0),(77,'ultima',4,1,'2017-06-18 01:15:54',2),(78,'pruebaaaasa',2,0,'2017-06-18 18:16:22',5),(79,'prueba1000',2,0,'2017-06-18 18:16:58',4),(80,'pruebamil',2,0,'2017-06-18 18:18:43',8),(81,'prueba',4,1,'2017-06-19 01:53:14',0),(82,'prueba2',4,1,'2017-06-19 01:53:25',0),(83,'prueba3',4,1,'2017-06-19 01:53:36',0);
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
INSERT INTO `pertenece` VALUES (54,2,3,0),(55,2,7,0),(56,3,22,0),(57,3,4,0),(58,2,6,0),(59,2,7,0),(60,2,4,0),(61,2,15,0),(62,2,15,0),(63,4,4,0),(64,4,5,0),(65,3,3,0),(65,3,4,0),(65,3,5,0),(66,2,6,0),(67,2,4,0),(67,2,5,0),(67,2,6,0),(68,2,4,0),(68,2,12,0),(69,2,4,0),(70,2,5,0),(71,2,4,0),(72,2,4,0),(73,4,19,0),(74,4,6,0),(75,4,6,0),(75,4,7,0),(76,4,5,0),(77,4,4,0),(78,2,4,0),(79,2,21,0),(80,2,5,0),(81,4,4,0),(82,4,6,0),(83,4,5,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'admin','admin','admin@admin.com',0),(3,'jesus','jesus','jesus@jesus.com',0),(4,'jesus75','jesus1','jesus1@jesus1.com',0);
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

-- Dump completed on 2017-06-19 23:05:31
