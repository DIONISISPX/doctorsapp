CREATE DATABASE  IF NOT EXISTS `myhealth` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myhealth`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myhealth
-- ------------------------------------------------------
-- Server version	8.0.36

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

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `patient_id` bigint DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('SCHEDULED','COMPLETED','CANCELLED','NO_SHOW') DEFAULT 'SCHEDULED',
  `reason` text,
  PRIMARY KEY (`id`),
  KEY `appointments_ibfk_1` (`patient_id`),
  KEY `appointments_ibfk_2` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`),
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,4,1,'2025-04-10 10:00:00','2025-04-10 10:30:00','CANCELLED','Flu symptoms'),(2,4,2,'2025-04-11 10:00:00','2025-04-11 10:30:00','COMPLETED','Flu symptoms'),(3,4,1,'2025-04-12 07:30:00','2025-04-12 08:00:00','COMPLETED','Flu Symptoms'),(4,4,1,'2025-04-15 07:30:00','2025-04-15 08:00:00','COMPLETED','Flu'),(5,4,1,'2025-04-17 07:30:00','2025-04-17 08:00:00','COMPLETED','Flu'),(6,4,1,'2025-04-17 07:00:00','2025-04-17 07:30:00','COMPLETED','Flu'),(7,4,2,'2025-04-10 05:00:00','2025-04-10 05:30:00','CANCELLED','Flu'),(8,4,3,'2025-04-09 07:00:00','2025-04-09 07:30:00','CANCELLED','Ponos sthn koilia tou paidiou mou'),(9,8,2,'2025-04-16 07:00:00','2025-04-16 07:30:00','CANCELLED','Flu'),(10,8,3,'2025-04-09 07:30:00','2025-04-09 08:00:00','CANCELLED','AA'),(11,4,1,'2025-04-20 06:30:00','2025-04-20 07:00:00','COMPLETED','Flu'),(12,4,46,'2025-04-10 07:00:00','2025-04-10 07:30:00','CANCELLED','Ponos sthn koilia'),(13,4,3,'2025-04-25 07:30:00','2025-04-25 08:00:00','COMPLETED','Flu'),(14,3,3,'2025-04-25 08:30:00','2025-04-25 09:00:00','SCHEDULED','Flu'),(15,8,38,'2025-04-30 07:30:00','2025-04-30 08:00:00','SCHEDULED','Flu'),(16,4,1,'2025-06-11 07:30:00','2025-06-11 08:00:00','SCHEDULED','Flu'),(17,4,27,'2025-06-29 08:00:00','2025-06-29 08:30:00','SCHEDULED','Stomachache');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `doctor_amka` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `stars` double DEFAULT '0',
  `rate_count` double DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'12345678901','Dr. Sophia Chen','Cardiology','s.chen@myhealth.gr','2101234567','Athens Central Hospital, Building A, 3rd Floor',4.2,6),(2,'23456789012','Dr. Nikos Papadopoulos','Neurology','n.papadopoulos@myhealth.gr','2102345678','Thessaloniki General, Wing B, 1st Floor',3.7,3),(3,'34567890123','Dr. Elena Petrova','Pediatrics','e.petrova@myhealth.gr','2103456789','Piraeus Medical Center, Children\'s Wing',4,1),(4,'45678901234','Dr. Dimitris Ioannou','Orthopedics','d.ioannou@myhealth.gr','2104567890','Athens Central Hospital, Surgical Tower',4,1),(5,'56789012345','Dr. Maria Gonzalez','Oncology','m.gonzalez@myhealth.gr','2105678901','Thessaloniki General, Oncology Center',NULL,NULL),(27,'78901654321','Dr. Alexandra Kokkinou','Dermatology','a.kokkinou@myhealth.gr','2107890165','Athens Skin Clinic',5,1),(28,'67890123456','Dr. Andreas Georgiou','Cardiology','a.georgiou@myhealth.gr','2106789012','Athens Central Hospital, Building A, 3rd Floor',NULL,NULL),(29,'34567810987','Dr. Zoe Vasilaki','Psychiatry','z.vasilaki@myhealth.gr','2103456781','Athens Mental Health Center',NULL,NULL),(30,'23456109876','Dr. Giorgos Makris','Pediatrics','g.makris@myhealth.gr','2102345610','Piraeus Medical Center, Children\'s Wing',NULL,NULL),(31,'56789432109','Dr. Despina Karagianni','Orthopedics','d.karagianni@myhealth.gr','2105678943','Athens Central Hospital, Surgical Tower',NULL,NULL),(32,'90123876543','Dr. Christina Moraitou','Oncology','c.moraitou@myhealth.gr','2109012387','Athens Oncology Center',NULL,NULL),(33,'01234567890','Dr. Michalis Sotiriou','Neurology','m.sotiriou@myhealth.gr','2100123456','Patras General Hospital, Neurology Wing',NULL,NULL),(34,'89012765432','Dr. Stavros Thanopoulos','Dermatology','s.thanopoulos@myhealth.gr','2108901276','Thessaloniki General, Dermatology Dept',NULL,NULL),(35,'45678321098','Dr. Vasilis Antoniou','Pediatrics','v.antoniou@myhealth.gr','2104567832','Athens Central Hospital, Pediatric Center',NULL,NULL),(36,'12345698765','Dr. Maria Sotiropoulou','Gastroenterology','m.sotiropoulou@myhealth.gr','2101234569','Athens Central Hospital, GI Center',NULL,NULL),(37,'78901234567','Dr. Sofia Papadakis','Cardiology','s.papadakis@myhealth.gr','2107890123','Thessaloniki General, Cardiac Center',NULL,NULL),(38,'45678921098','Dr. Dimitris Psychogios','Psychiatry','d.psychogios@myhealth.gr','2104567892','Thessaloniki General, Psychiatry Wing',NULL,NULL),(39,'67890543210','Dr. Panagiotis Raptis','Orthopedics','p.raptis@myhealth.gr','2106789054','Thessaloniki General, Ortho Center',NULL,NULL),(40,'90123456789','Dr. Anna Vlachou','Neurology','a.vlachou@myhealth.gr','2109012345','Athens Central Hospital, Neuro Center',NULL,NULL),(41,'56789032109','Dr. Eirini Markou','OB/GYN','e.markou@myhealth.gr','2105678903','Athens Women\'s Health Center',NULL,NULL),(42,'34567210987','Dr. Eleni Nikolaou','Pediatrics','e.nikolaou@myhealth.gr','2103456721','Larissa Children\'s Hospital',NULL,NULL),(43,'89012345678','Dr. Yannis Kourkoulis','Cardiology','y.kourkoulis@myhealth.gr','2108901234','Heraklion University Hospital, Heart Institute',NULL,NULL),(44,'01234987654','Dr. Thanasis Papamichael','Oncology','t.papamichael@myhealth.gr','2100123498','Thessaloniki General, Oncology Center',NULL,NULL),(45,'67890143210','Dr. Christos Alexopoulos','Family Medicine','c.alexopoulos@myhealth.gr','2106789014','Piraeus Primary Care Center',NULL,NULL),(46,'23456709876','Dr. Nikos Kalogeropoulos','Gastroenterology','n.kalogeropoulos@myhealth.gr','2102345670','Heraklion University Hospital, GI Dept',NULL,NULL);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor_availability`
--

DROP TABLE IF EXISTS `doctor_availability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_availability` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `doctor_id` bigint DEFAULT NULL,
  `day_of_week` tinyint DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_availability_ibfk_1` (`doctor_id`),
  CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_availability`
--

LOCK TABLES `doctor_availability` WRITE;
/*!40000 ALTER TABLE `doctor_availability` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor_availability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `patients_amka` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `patient_amka_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'$2a$10$QL7.QgN7o407V6pTZVx6feUHWQOtJCSjtnQFeoMwj8/H7XWte74Ei','test','test','a1234'),(2,'$2a$10$anyIqY3eeXZdVBekYsFJ/OCPNtHisIfV9OdbrNIwVYG1cOVEEuUqi','baggelis','kitsios','1234565789'),(3,'$2a$10$.qO5eda.bBNN1D1t1/n/jeB2926xfbKqi30GHktdav5o2k4YWCvrm','D','Xris','123456'),(4,'$2a$10$9XR6avkmHQCc.AiYtUHovOmfo2S79mfCoOeHfB6Fk2lHtz5BgnWyO','Aris','Kou','123456a'),(5,'$2a$10$krGg5TXyk7rEz0GRR.w2YOx/qYGGzEL8NXPLAbvTIHdUdaf7DBC4G','Aris','Koumoutsakos',NULL),(6,'$2a$10$JX7L.rsqw.dELlUf6kJPgOsT6WQ5VfujQ8sNE6x3eVAbTLx9hXbT.','Aris1','Koumoutsakos1','1234567'),(7,'$2a$10$P5T658KrtNmzCdCd1.Oxae3Hrp9Z7m7/LGOUlKvXwRpmao2Fu2xlS','Dionisis','Christodoulopoulos','12345678'),(8,'$2a$10$R6zeGLk6hLVDIwVwqDApeuDM7NzlBOpbOUBG78xbtT.Rj9dPDf.Fi','Giorgos','Mamantzis','12345'),(9,'$2a$10$Wyc5raibgceugXXhOqJS7eE6MAyDUkuyS2Dq57ja9qXpXhECfOzPC','Lily ','Karastergiou','1234567891');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'myhealth'
--

--
-- Dumping routines for database 'myhealth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-07 17:42:46
