/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ClassName` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `Material Name` varchar(45) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`ID`,`Material Name`),
  KEY `FK1_idx` (`ClassName`),
  KEY `353_idx` (`ClassName`),
  CONSTRAINT `353` FOREIGN KEY (`ClassName`) REFERENCES `subject` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'演算法','Ch1'),(6,'演算法','Ch2'),(7,'演算法','Ch3'),(2,'線性代數','Ch1'),(10,'線性代數','Ch2'),(3,'英文','Ch1'),(9,'英文','Ch2'),(4,'計算機組織','Ch1'),(8,'計算機組織','Ch2'),(5,'資料庫','Ch1');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;
