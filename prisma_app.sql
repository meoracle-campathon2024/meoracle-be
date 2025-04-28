-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: localhost    Database: prisma_app
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_classificationquerytoclassificationsymptom`
--

DROP TABLE IF EXISTS `_classificationquerytoclassificationsymptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_classificationquerytoclassificationsymptom` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_ClassificationQueryToClassificationSymptom_AB_unique` (`A`,`B`),
  KEY `_ClassificationQueryToClassificationSymptom_B_index` (`B`),
  CONSTRAINT `_ClassificationQueryToClassificationSymptom_A_fkey` FOREIGN KEY (`A`) REFERENCES `classification_queries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_ClassificationQueryToClassificationSymptom_B_fkey` FOREIGN KEY (`B`) REFERENCES `classification_symptoms` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_classificationquerytoclassificationsymptom`
--

LOCK TABLES `_classificationquerytoclassificationsymptom` WRITE;
/*!40000 ALTER TABLE `_classificationquerytoclassificationsymptom` DISABLE KEYS */;
INSERT INTO `_classificationquerytoclassificationsymptom` VALUES (27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(33,2),(35,188),(35,195),(36,195),(36,197),(34,239),(34,335);
/*!40000 ALTER TABLE `_classificationquerytoclassificationsymptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_departmenttodiseasecategory`
--

DROP TABLE IF EXISTS `_departmenttodiseasecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_departmenttodiseasecategory` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_DepartmentToDiseaseCategory_AB_unique` (`A`,`B`),
  KEY `_DepartmentToDiseaseCategory_B_index` (`B`),
  CONSTRAINT `_DepartmentToDiseaseCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_DepartmentToDiseaseCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `disease_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_departmenttodiseasecategory`
--

LOCK TABLES `_departmenttodiseasecategory` WRITE;
/*!40000 ALTER TABLE `_departmenttodiseasecategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `_departmenttodiseasecategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_diseasecategorytoexaminationresult`
--

DROP TABLE IF EXISTS `_diseasecategorytoexaminationresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_diseasecategorytoexaminationresult` (
  `A` int NOT NULL,
  `B` int NOT NULL,
  UNIQUE KEY `_DiseaseCategoryToExaminationResult_AB_unique` (`A`,`B`),
  KEY `_DiseaseCategoryToExaminationResult_B_index` (`B`),
  CONSTRAINT `_DiseaseCategoryToExaminationResult_A_fkey` FOREIGN KEY (`A`) REFERENCES `disease_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_DiseaseCategoryToExaminationResult_B_fkey` FOREIGN KEY (`B`) REFERENCES `examination_results` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_diseasecategorytoexaminationresult`
--

LOCK TABLES `_diseasecategorytoexaminationresult` WRITE;
/*!40000 ALTER TABLE `_diseasecategorytoexaminationresult` DISABLE KEYS */;
/*!40000 ALTER TABLE `_diseasecategorytoexaminationresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('17534f0a-e722-44f9-a7e1-47c38a17d311','48b9f45acec89d209367ac474dec2ab38b1f2a7ccaddde0906d8ea98a4801d5f','2025-04-06 14:32:46.534','20240803120109_add_relations_for_appointments',NULL,NULL,'2025-04-06 14:32:46.335',1),('19568c00-9995-461f-9baf-be419c6f1793','4bf0a542a70b3e6d00b1a1671c1056dc8dc09484e90a97c26c56032c89cfb745','2025-04-06 14:32:49.261','20240806091608_increase_image_file_path_limit',NULL,NULL,'2025-04-06 14:32:49.166',1),('1ed316dd-40fb-46bf-a8b9-b4253be41ddf','787e16413acf3c81d49f17380cfdc69fcf51be8bd9fd36f35c014050d0682bfc','2025-04-06 14:32:49.160','20240806081708_increase_query_content_limit',NULL,NULL,'2025-04-06 14:32:49.056',1),('35f8df4a-be18-47fa-a2f1-e58bc9d8b0c3','679cb9d739b8af3c2fcd4af9054e289ed5913839961ea4b1482c09bd6103eea5','2025-04-06 14:32:46.329','20240803080421_make_symptom_vector_index_mandatory',NULL,NULL,'2025-04-06 14:32:46.306',1),('b256b1e8-a70a-47cc-98fa-6c46d92bc6a1','5d9cc3e16b254b806b290191e65ddd94f914ba852a2a288a8c8270778b257a42','2025-04-06 14:32:46.222','20240803020355_init',NULL,NULL,'2025-04-06 14:32:42.865',1),('b3c3f6b8-9b29-48f7-8cf6-4cadefaf1af9','44f148b0145b7967ecea5993cf5f3646806a65785ce62244caa739487dc6123e','2025-04-06 14:32:46.301','20240803080344_add_vector_index_for_classification_symptoms',NULL,NULL,'2025-04-06 14:32:46.268',1),('c11b59b7-a614-4e47-a952-5f884dd4ee46','6dbab521648f8733fd201f0d9524f73ce8d8043a512b324cd3648b6b3701fbfd','2025-04-06 14:32:46.263','20240803074003_set_prediction_priorities',NULL,NULL,'2025-04-06 14:32:46.230',1),('ff5dd366-a21f-4595-87c7-981bc086a22a','63cd5221c39b2f1ed13939297c87a0b5adc4dd3f2110e31f0d35a39c573172fa','2025-04-06 14:32:49.050','20240804041935_cascade_on_update_and_delete',NULL,NULL,'2025-04-06 14:32:46.539',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `country_id` int NOT NULL,
  `national_identity_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_country_id_fkey` (`country_id`),
  CONSTRAINT `accounts_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` datetime(3) NOT NULL,
  `scheduled_at` datetime(3) NOT NULL,
  `department_id` int NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `query_detail_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_user_id_fkey` (`user_id`),
  KEY `appointments_department_id_fkey` (`department_id`),
  KEY `appointments_query_detail_id_fkey` (`query_detail_id`),
  CONSTRAINT `appointments_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classification_queries`
--

DROP TABLE IF EXISTS `classification_queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification_queries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `query_detail_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `classification_queries_query_detail_id_key` (`query_detail_id`),
  KEY `classification_queries_user_id_fkey` (`user_id`),
  CONSTRAINT `classification_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `classification_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification_queries`
--

LOCK TABLES `classification_queries` WRITE;
/*!40000 ALTER TABLE `classification_queries` DISABLE KEYS */;
INSERT INTO `classification_queries` VALUES (1,1,2),(2,1,4),(3,1,5),(4,1,6),(5,1,7),(6,1,8),(7,1,9),(8,1,10),(9,1,11),(10,1,12),(11,1,13),(12,1,14),(13,1,15),(14,1,16),(15,1,17),(16,1,18),(17,1,19),(18,1,20),(19,1,21),(20,1,22),(21,1,23),(22,1,24),(23,1,25),(24,1,26),(25,1,27),(26,1,28),(27,1,29),(28,1,30),(29,1,31),(30,1,32),(31,1,33),(32,1,34),(33,1,35),(34,1,36),(35,1,37),(36,1,38);
/*!40000 ALTER TABLE `classification_queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classification_symptom_groups`
--

DROP TABLE IF EXISTS `classification_symptom_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification_symptom_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tier` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classification_symptom_groups_parent_id_fkey` (`parent_id`),
  CONSTRAINT `classification_symptom_groups_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `classification_symptom_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification_symptom_groups`
--

LOCK TABLES `classification_symptom_groups` WRITE;
/*!40000 ALTER TABLE `classification_symptom_groups` DISABLE KEYS */;
INSERT INTO `classification_symptom_groups` VALUES (1,NULL,'Neurological and Psychological Symptoms',0),(2,NULL,'Respiratory Symptoms',0),(3,NULL,'Gastrointestinal Symptoms',0),(4,NULL,'Genitourinary Symptoms',0),(5,NULL,'Musculoskeletal Symptoms',0),(6,NULL,'Dermatological Symptoms',0),(7,NULL,'Eye, Ear, Nose, Throat Symptoms',0),(8,NULL,'Cardiovascular Symptoms',0),(9,NULL,'General Symptoms',0),(10,1,'Anxiety and Nervousness',1),(11,1,'Depression',1),(12,1,'Abnormal Involuntary Movements',1),(13,1,'Seizures',1),(14,1,'Emotional Symptoms',1),(15,1,'Memory Disturbance',1),(16,1,'Sleep Disorders',1),(17,1,'Symptoms of Infants',1),(18,2,'Shortness of Breath',1),(19,2,'Cough',1),(20,2,'Throat Symptoms',1),(21,2,'Nasal Congestion',1),(22,2,'Wheezing',1),(23,2,'Apnea',1),(24,2,'Chest Tightness and Pain',1),(25,2,'Flu-like Syndrome',1),(26,3,'Abdominal Pain',1),(27,3,'Vomiting and Nausea',1),(28,3,'Diarrhea and Constipation',1),(29,3,'Blood in Stool',1),(30,3,'Flatulence',1),(31,3,'Liver Symptoms',1),(32,3,'Other Symptoms',1),(33,4,'Vaginal Symptoms',1),(34,4,'Urinary Symptoms',1),(35,4,'Male Genital Symptoms',1),(36,4,'Prostate Symptoms',1),(37,4,'Pregnancy and Postpartum Symptoms',1),(38,5,'Joint Pain and Stiffness',1),(39,5,'Muscle Pain and Weakness',1),(40,5,'Bone Pain',1),(41,5,'Back Pain',1),(42,5,'Neck Pain',1),(43,5,'Limb Symptoms',1),(44,5,'Postural Problems',1),(45,5,'Pelvic Symptoms',1),(46,6,'Skin Lesions and Growths',1),(47,6,'Skin Rashes and Irritations',1),(48,6,'Skin Swelling',1),(49,6,'Nail Symptoms',1),(50,6,'Hair Symptoms',1),(51,6,'General Symptoms',1),(52,7,'Eye Symptoms',1),(53,7,'Ear Symptoms',1),(54,7,'Nose Symptoms',1),(55,7,'Throat Symptoms',1),(56,8,'Palpitations and Irregular Heartbeat',1),(57,8,'Chest Pain',1),(58,8,'Swelling',1),(59,9,'Fever and Chills',1),(60,9,'Fatigue and Weakness',1),(61,9,'Weight Changes',1),(62,9,'Appetite Changes',1),(63,9,'Pain',1),(64,9,'Sweating',1),(65,9,'Pallor',1);
/*!40000 ALTER TABLE `classification_symptom_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classification_symptoms`
--

DROP TABLE IF EXISTS `classification_symptoms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classification_symptoms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classification_symptom_group_id` int NOT NULL,
  `vector_index` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `classification_symptoms_classification_symptom_group_id_fkey` (`classification_symptom_group_id`),
  CONSTRAINT `classification_symptoms_classification_symptom_group_id_fkey` FOREIGN KEY (`classification_symptom_group_id`) REFERENCES `classification_symptom_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=378 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classification_symptoms`
--

LOCK TABLES `classification_symptoms` WRITE;
/*!40000 ALTER TABLE `classification_symptoms` DISABLE KEYS */;
INSERT INTO `classification_symptoms` VALUES (1,'anxiety and nervousness',1,0),(2,'depression',1,0),(3,'shortness of breath',2,0),(4,'depressive or psychotic symptoms',1,0),(5,'sharp chest pain',8,0),(6,'dizziness',1,0),(7,'insomnia',1,0),(8,'abnormal involuntary movements',1,0),(9,'chest tightness',8,0),(10,'palpitations',8,0),(11,'irregular heartbeat',8,0),(12,'breathing fast',2,0),(13,'hoarse voice',7,0),(14,'sore throat',7,0),(15,'difficulty speaking',1,0),(16,'cough',2,0),(17,'nasal congestion',7,0),(18,'throat swelling',7,0),(19,'diminished hearing',7,0),(20,'lump in throat',7,0),(21,'throat feels tight',7,0),(22,'difficulty in swallowing',7,0),(23,'skin swelling',6,0),(24,'retention of urine',4,0),(25,'groin mass',4,0),(26,'leg pain',5,0),(27,'hip pain',5,0),(28,'suprapubic pain',4,0),(29,'blood in stool',3,0),(30,'lack of growth',9,0),(31,'emotional symptoms',1,0),(32,'elbow weakness',5,0),(33,'back weakness',5,0),(34,'pus in sputum',2,0),(35,'symptoms of the scrotum and testes',4,0),(36,'swelling of scrotum',4,0),(37,'pain in testicles',4,0),(38,'flatulence',3,0),(39,'pus draining from ear',7,0),(40,'jaundice',3,0),(41,'mass in scrotum',4,0),(42,'white discharge from eye',7,0),(43,'irritable infant',9,0),(44,'abusing alcohol',1,0),(45,'fainting',1,0),(46,'hostile behavior',1,0),(47,'drug abuse',1,0),(48,'sharp abdominal pain',3,0),(49,'feeling ill',9,0),(50,'vomiting',3,0),(51,'headache',1,0),(52,'nausea',3,0),(53,'diarrhea',3,0),(54,'vaginal itching',4,0),(55,'vaginal dryness',4,0),(56,'painful urination',4,0),(57,'involuntary urination',4,0),(58,'pain during intercourse',4,0),(59,'frequent urination',4,0),(60,'lower abdominal pain',3,0),(61,'vaginal discharge',4,0),(62,'blood in urine',4,0),(63,'hot flashes',4,0),(64,'intermenstrual bleeding',4,0),(65,'hand or finger pain',5,0),(66,'wrist pain',5,0),(67,'hand or finger swelling',5,0),(68,'arm pain',5,0),(69,'wrist swelling',5,0),(70,'arm stiffness or tightness',5,0),(71,'arm swelling',5,0),(72,'hand or finger stiffness or tightness',5,0),(73,'wrist stiffness or tightness',5,0),(74,'lip swelling',6,0),(75,'toothache',7,0),(76,'abnormal appearing skin',6,0),(77,'skin lesion',6,0),(78,'acne or pimples',6,0),(79,'dry lips',6,0),(80,'facial pain',7,0),(81,'mouth ulcer',7,0),(82,'skin growth',6,0),(83,'eye deviation',7,0),(84,'diminished vision',7,0),(85,'double vision',7,0),(86,'cross-eyed',7,0),(87,'symptoms of eye',7,0),(88,'pain in eye',7,0),(89,'eye moves abnormally',7,0),(90,'abnormal movement of eyelid',7,0),(91,'foreign body sensation in eye',7,0),(92,'irregular appearing scalp',6,0),(93,'swollen lymph nodes',9,0),(94,'back pain',5,0),(95,'neck pain',5,0),(96,'low back pain',5,0),(97,'pain of the anus',3,0),(98,'pain during pregnancy',4,0),(99,'pelvic pain',4,0),(100,'impotence',4,0),(101,'infant spitting up',3,0),(102,'vomiting blood',3,0),(103,'regurgitation',3,0),(104,'burning abdominal pain',3,0),(105,'restlessness',1,0),(106,'symptoms of infants',9,0),(107,'wheezing',2,0),(108,'peripheral edema',8,0),(109,'neck mass',9,0),(110,'ear pain',7,0),(111,'jaw swelling',7,0),(112,'mouth dryness',7,0),(113,'neck swelling',9,0),(114,'knee pain',5,0),(115,'foot or toe pain',5,0),(116,'bowlegged or knock-kneed',5,0),(117,'ankle pain',5,0),(118,'bones are painful',5,0),(119,'knee weakness',5,0),(120,'elbow pain',5,0),(121,'knee swelling',5,0),(122,'skin moles',6,0),(123,'knee lump or mass',5,0),(124,'weight gain',9,0),(125,'problems with movement',5,0),(126,'knee stiffness or tightness',5,0),(127,'leg swelling',5,0),(128,'foot or toe swelling',5,0),(129,'heartburn',3,0),(130,'smoking problems',2,0),(131,'muscle pain',5,0),(132,'infant feeding problem',3,0),(133,'recent weight loss',9,0),(134,'problems with shape or size of breast',4,0),(135,'underweight',9,0),(136,'difficulty eating',3,0),(137,'scanty menstrual flow',4,0),(138,'vaginal pain',4,0),(139,'vaginal redness',4,0),(140,'vulvar irritation',4,0),(141,'weakness',9,0),(142,'decreased heart rate',8,0),(143,'increased heart rate',8,0),(144,'bleeding or discharge from nipple',4,0),(145,'ringing in ear',7,0),(146,'plugged feeling in ear',7,0),(147,'itchy ear(s)',7,0),(148,'frontal headache',1,0),(149,'fluid in ear',7,0),(150,'neck stiffness or tightness',5,0),(151,'spots or clouds in vision',7,0),(152,'eye redness',7,0),(153,'lacrimation',7,0),(154,'itchiness of eye',7,0),(155,'blindness',7,0),(156,'eye burns or stings',7,0),(157,'itchy eyelid',7,0),(158,'feeling cold',9,0),(159,'decreased appetite',9,0),(160,'excessive appetite',9,0),(161,'excessive anger',1,0),(162,'loss of sensation',1,0),(163,'focal weakness',1,0),(164,'slurring words',1,0),(165,'symptoms of the face',9,0),(166,'disturbance of memory',1,0),(167,'paresthesia',1,0),(168,'side pain',3,0),(169,'fever',9,0),(170,'shoulder pain',5,0),(171,'shoulder stiffness or tightness',5,0),(172,'shoulder weakness',5,0),(173,'arm cramps or spasms',5,0),(174,'shoulder swelling',5,0),(175,'tongue lesions',6,0),(176,'leg cramps or spasms',5,0),(177,'abnormal appearing tongue',6,0),(178,'ache all over',9,0),(179,'lower body pain',5,0),(180,'problems during pregnancy',4,0),(181,'spotting or bleeding during pregnancy',4,0),(182,'cramps and spasms',5,0),(183,'upper abdominal pain',3,0),(184,'stomach bloating',3,0),(185,'changes in stool appearance',3,0),(186,'unusual color or odor to urine',4,0),(187,'kidney mass',4,0),(188,'swollen abdomen',9,0),(189,'symptoms of prostate',4,0),(190,'leg stiffness or tightness',5,0),(191,'difficulty breathing',2,0),(192,'rib pain',5,0),(193,'joint pain',5,0),(194,'muscle stiffness or tightness',5,0),(195,'pallor',9,0),(196,'hand or finger lump or mass',6,0),(197,'chills',9,0),(198,'groin pain',4,0),(199,'fatigue',9,0),(200,'abdominal distention',3,0),(201,'regurgitation',3,0),(202,'symptoms of the kidneys',4,0),(203,'melena',3,0),(204,'flushing',9,0),(205,'coughing up sputum',2,0),(206,'seizures',1,0),(207,'delusions or hallucinations',1,0),(208,'shoulder cramps or spasms',5,0),(209,'joint stiffness or tightness',5,0),(210,'pain or soreness of breast',4,0),(211,'excessive urination at night',4,0),(212,'bleeding from eye',7,0),(213,'rectal bleeding',3,0),(214,'constipation',3,0),(215,'temper problems',1,0),(216,'coryza',2,0),(217,'wrist weakness',5,0),(218,'eye strain',7,0),(219,'hemoptysis',2,0),(220,'lymphedema',9,0),(221,'skin on leg or foot looks infected',6,0),(222,'allergic reaction',6,0),(223,'congestion in chest',2,0),(224,'muscle swelling',5,0),(225,'pus in urine',4,0),(226,'abnormal size or shape of ear',7,0),(227,'low back weakness',5,0),(228,'sleepiness',9,0),(229,'apnea',2,0),(230,'abnormal breathing sounds',2,0),(231,'excessive growth',9,0),(232,'elbow cramps or spasms',5,0),(233,'feeling hot and cold',9,0),(234,'blood clots during menstrual periods',4,0),(235,'absence of menstruation',4,0),(236,'pulling at ears',7,0),(237,'gum pain',6,0),(238,'redness in ear',7,0),(239,'fluid retention',9,0),(240,'flu-like syndrome',9,0),(241,'sinus congestion',2,0),(242,'painful sinuses',2,0),(243,'fears and phobias',1,0),(244,'recent pregnancy',4,0),(245,'uterine contractions',4,0),(246,'burning chest pain',2,0),(247,'back cramps or spasms',5,0),(248,'stiffness all over',5,0),(249,'muscle cramps, contractures, or spasms',5,0),(250,'low back cramps or spasms',5,0),(251,'back mass or lump',9,0),(252,'nosebleed',7,0),(253,'long menstrual periods',4,0),(254,'heavy menstrual flow',4,0),(255,'unpredictable menstruation',4,0),(256,'painful menstruation',4,0),(257,'infertility',4,0),(258,'frequent menstruation',4,0),(259,'sweating',9,0),(260,'mass on eyelid',7,0),(261,'swollen eye',7,0),(262,'eyelid swelling',7,0),(263,'eyelid lesion or rash',6,0),(264,'unwanted hair',6,0),(265,'symptoms of bladder',4,0),(266,'irregular appearing nails',6,0),(267,'itching of skin',6,0),(268,'hurts to breath',2,0),(269,'nailbiting',1,0),(270,'skin dryness, peeling, scaliness, or roughness',6,0),(271,'skin on arm or hand looks infected',6,0),(272,'skin irritation',6,0),(273,'itchy scalp',6,0),(274,'hip swelling',5,0),(275,'incontinence of stool',3,0),(276,'foot or toe cramps or spasms',5,0),(277,'warts',6,0),(278,'bumps on penis',4,0),(279,'too little hair',6,0),(280,'foot or toe lump or mass',5,0),(281,'skin rash',6,0),(282,'mass or swelling around the anus',3,0),(283,'low back swelling',5,0),(284,'ankle swelling',5,0),(285,'hip lump or mass',5,0),(286,'drainage in throat',2,0),(287,'dry or flaky scalp',6,0),(288,'premenstrual tension or irritability',4,0),(289,'feeling hot',9,0),(290,'feet turned in',5,0),(291,'foot or toe stiffness or tightness',5,0),(292,'pelvic pressure',4,0),(293,'elbow swelling',5,0),(294,'elbow stiffness or tightness',5,0),(295,'early or late onset of menopause',4,0),(296,'mass on ear',7,0),(297,'bleeding from ear',7,0),(298,'hand or finger weakness',5,0),(299,'low self-esteem',1,0),(300,'throat irritation',7,0),(301,'itching of the anus',3,0),(302,'swollen or red tonsils',7,0),(303,'irregular belly button',9,0),(304,'swollen tongue',6,0),(305,'lip sore',6,0),(306,'vulvar sore',4,0),(307,'hip stiffness or tightness',5,0),(308,'mouth pain',7,0),(309,'arm weakness',5,0),(310,'leg lump or mass',5,0),(311,'disturbance of smell or taste',7,0),(312,'discharge in stools',3,0),(313,'penis pain',4,0),(314,'loss of sex drive',1,0),(315,'obsessions and compulsions',1,0),(316,'antisocial behavior',1,0),(317,'neck cramps or spasms',5,0),(318,'pupils unequal',2,0),(319,'poor circulation',9,0),(320,'thirst',9,0),(321,'sleepwalking',1,0),(322,'skin oiliness',6,0),(323,'sneezing',2,0),(324,'bladder mass',4,0),(325,'knee cramps or spasms',5,0),(326,'premature ejaculation',4,0),(327,'leg weakness',5,0),(328,'posture problems',9,0),(329,'bleeding in mouth',7,0),(330,'tongue bleeding',6,0),(331,'change in skin mole size or color',6,0),(332,'penis redness',4,0),(333,'penile discharge',4,0),(334,'shoulder lump or mass',5,0),(335,'polyuria',9,0),(336,'cloudy eye',7,0),(337,'hysterical behavior',1,0),(338,'arm lump or mass',5,0),(339,'nightmares',1,0),(340,'bleeding gums',7,0),(341,'pain in gums',7,0),(342,'bedwetting',1,0),(343,'diaper rash',6,0),(344,'lump or mass of breast',4,0),(345,'vaginal bleeding after menopause',4,0),(346,'infrequent menstruation',4,0),(347,'mass on vulva',4,0),(348,'jaw pain',7,0),(349,'itching of scrotum',4,0),(350,'postpartum problems of the breast',4,0),(351,'eyelid retracted',7,0),(352,'hesitancy',4,0),(353,'elbow lump or mass',5,0),(354,'muscle weakness',5,0),(355,'throat redness',7,0),(356,'joint swelling',5,0),(357,'tongue pain',6,0),(358,'redness in or around nose',7,0),(359,'wrinkles on skin',6,0),(360,'foot or toe weakness',5,0),(361,'hand or finger cramps or spasms',5,0),(362,'back stiffness or tightness',5,0),(363,'wrist lump or mass',5,0),(364,'skin pain',6,0),(365,'low back stiffness or tightness',5,0),(366,'low urine output',4,0),(367,'skin on head or neck looks infected',6,0),(368,'stuttering or stammering',1,0),(369,'problems with orgasm',4,0),(370,'nose deformity',7,0),(371,'lump over jaw',5,0),(372,'sore in nose',7,0),(373,'hip weakness',5,0),(374,'back swelling',5,0),(375,'ankle stiffness or tightness',5,0),(376,'ankle weakness',5,0),(377,'neck weakness',5,0);
/*!40000 ALTER TABLE `classification_symptoms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `short_name` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hospital_id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specific_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_for_hospital_api` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `departments_hospital_id_fkey` (`hospital_id`),
  CONSTRAINT `departments_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease_categories`
--

DROP TABLE IF EXISTS `disease_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease_categories`
--

LOCK TABLES `disease_categories` WRITE;
/*!40000 ALTER TABLE `disease_categories` DISABLE KEYS */;
INSERT INTO `disease_categories` VALUES (1,'Neurological and Psychological'),(2,'Respiratory'),(3,'Gastrointestinal'),(4,'Reproductive'),(5,'Musculoskeletal'),(6,'Sensory'),(7,'Urinary'),(8,'Dermatological'),(9,'General');
/*!40000 ALTER TABLE `disease_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division_types`
--

DROP TABLE IF EXISTS `division_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `division_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `division_types_country_id_fkey` (`country_id`),
  CONSTRAINT `division_types_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division_types`
--

LOCK TABLES `division_types` WRITE;
/*!40000 ALTER TABLE `division_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `division_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisions`
--

DROP TABLE IF EXISTS `divisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parent_id` int DEFAULT NULL,
  `division_type_id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `divisions_division_type_id_fkey` (`division_type_id`),
  KEY `divisions_parent_id_fkey` (`parent_id`),
  CONSTRAINT `divisions_division_type_id_fkey` FOREIGN KEY (`division_type_id`) REFERENCES `division_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `divisions_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `divisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisions`
--

LOCK TABLES `divisions` WRITE;
/*!40000 ALTER TABLE `divisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `divisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examination_results`
--

DROP TABLE IF EXISTS `examination_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examination_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `disease_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` int NOT NULL,
  `national_identity_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `examination_results_country_id_fkey` (`country_id`),
  CONSTRAINT `examination_results_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examination_results`
--

LOCK TABLES `examination_results` WRITE;
/*!40000 ALTER TABLE `examination_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `examination_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospitals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `division_id` int NOT NULL,
  `specific_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `api_spec` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hospitals_division_id_fkey` (`division_id`),
  CONSTRAINT `hospitals_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `divisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_queries`
--

DROP TABLE IF EXISTS `image_queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_queries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `query_detail_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `image_queries_query_detail_id_key` (`query_detail_id`),
  KEY `image_queries_user_id_fkey` (`user_id`),
  CONSTRAINT `image_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `image_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_queries`
--

LOCK TABLES `image_queries` WRITE;
/*!40000 ALTER TABLE `image_queries` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nlp_queries`
--

DROP TABLE IF EXISTS `nlp_queries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nlp_queries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `query_detail_id` int NOT NULL,
  `query_content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nlp_queries_query_detail_id_key` (`query_detail_id`),
  KEY `nlp_queries_user_id_fkey` (`user_id`),
  CONSTRAINT `nlp_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nlp_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nlp_queries`
--

LOCK TABLES `nlp_queries` WRITE;
/*!40000 ALTER TABLE `nlp_queries` DISABLE KEYS */;
INSERT INTO `nlp_queries` VALUES (1,1,1,'ac'),(2,1,3,'abc');
/*!40000 ALTER TABLE `nlp_queries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query_details`
--

DROP TABLE IF EXISTS `query_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query_details`
--

LOCK TABLES `query_details` WRITE;
/*!40000 ALTER TABLE `query_details` DISABLE KEYS */;
INSERT INTO `query_details` VALUES (1,'2025-04-06 14:39:52.994',2),(2,'2025-04-11 16:27:37.710',1),(3,'2025-04-13 15:24:18.168',2),(4,'2025-04-14 07:47:34.542',1),(5,'2025-04-14 07:47:47.008',1),(6,'2025-04-14 07:51:08.359',1),(7,'2025-04-14 07:51:16.500',1),(8,'2025-04-14 07:51:37.013',1),(9,'2025-04-14 07:53:44.392',1),(10,'2025-04-14 07:55:44.695',1),(11,'2025-04-14 07:58:12.108',1),(12,'2025-04-14 07:58:25.875',1),(13,'2025-04-14 07:58:30.047',1),(14,'2025-04-14 08:00:01.721',1),(15,'2025-04-14 08:00:13.590',1),(16,'2025-04-14 08:02:07.065',1),(17,'2025-04-14 08:04:26.387',1),(18,'2025-04-14 08:06:23.159',1),(19,'2025-04-14 08:08:06.273',1),(20,'2025-04-14 08:09:10.031',1),(21,'2025-04-14 09:08:14.556',1),(22,'2025-04-14 09:10:09.998',1),(23,'2025-04-14 09:11:55.241',1),(24,'2025-04-14 09:20:26.484',1),(25,'2025-04-14 14:47:18.699',1),(26,'2025-04-14 14:47:28.218',1),(27,'2025-04-14 14:47:38.018',1),(28,'2025-04-14 14:49:31.363',1),(29,'2025-04-14 14:53:10.744',1),(30,'2025-04-14 15:15:44.529',1),(31,'2025-04-14 15:38:39.054',1),(32,'2025-04-14 15:41:23.175',1),(33,'2025-04-14 15:53:01.573',1),(34,'2025-04-14 15:53:07.853',1),(35,'2025-04-14 15:53:09.304',1),(36,'2025-04-14 15:53:18.462',1),(37,'2025-04-15 14:46:38.000',1),(38,'2025-04-15 14:56:06.004',1);
/*!40000 ALTER TABLE `query_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query_results`
--

DROP TABLE IF EXISTS `query_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) NOT NULL,
  `disease_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disease_category_id` int NOT NULL,
  `query_detail_id` int NOT NULL,
  `fed_back` tinyint(1) NOT NULL,
  `feedback_accuracy` double NOT NULL,
  `priority` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `query_results_disease_category_id_fkey` (`disease_category_id`),
  KEY `query_results_query_detail_id_fkey` (`query_detail_id`),
  CONSTRAINT `query_results_disease_category_id_fkey` FOREIGN KEY (`disease_category_id`) REFERENCES `disease_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `query_results_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query_results`
--

LOCK TABLES `query_results` WRITE;
/*!40000 ALTER TABLE `query_results` DISABLE KEYS */;
INSERT INTO `query_results` VALUES (7,'2025-04-14 15:53:01.806','yeast infection',4,33,0,0,1),(8,'2025-04-14 15:53:01.806','varicose veins',8,33,0,0,2),(9,'2025-04-14 15:53:01.806','hashimoto thyroiditis',1,33,0,0,0),(10,'2025-04-14 15:53:08.027','varicose veins',8,34,0,0,2),(11,'2025-04-14 15:53:08.027','hashimoto thyroiditis',1,34,0,0,0),(12,'2025-04-14 15:53:08.027','yeast infection',4,34,0,0,1),(13,'2025-04-14 15:53:09.514','yeast infection',4,35,0,0,1),(14,'2025-04-14 15:53:09.514','hashimoto thyroiditis',1,35,0,0,0),(15,'2025-04-14 15:53:09.514','varicose veins',8,35,0,0,2),(16,'2025-04-14 15:53:18.642','molluscum contagiosum',6,36,0,0,1),(17,'2025-04-14 15:53:18.642','pulmonic valve disease',8,36,0,0,2),(18,'2025-04-14 15:53:18.642','cryptorchidism',9,36,0,0,0),(19,'2025-04-15 14:46:38.268','uterine atony',9,37,0,0,2),(20,'2025-04-15 14:46:38.268','gas gangrene',3,37,0,0,1),(21,'2025-04-15 14:46:38.268','myelodysplastic syndrome',1,37,0,0,0),(22,'2025-04-15 14:56:06.124','septic arthritis',5,38,0,0,1),(23,'2025-04-15 14:56:06.124','premature ventricular contractions (pvcs)',8,38,0,0,0),(24,'2025-04-15 14:56:06.124','substance-related mental disorder',1,38,0,0,2);
/*!40000 ALTER TABLE `query_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_images`
--

DROP TABLE IF EXISTS `user_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_query_id` int NOT NULL,
  `file_path` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_images_image_query_id_fkey` (`image_query_id`),
  CONSTRAINT `user_images_image_query_id_fkey` FOREIGN KEY (`image_query_id`) REFERENCES `image_queries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_images`
--

LOCK TABLES `user_images` WRITE;
/*!40000 ALTER TABLE `user_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_account_id_key` (`account_id`),
  CONSTRAINT `users_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-28 19:28:40
