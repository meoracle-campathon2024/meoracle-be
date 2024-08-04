-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_department_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_query_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `classification_queries` DROP FOREIGN KEY `classification_queries_query_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `classification_queries` DROP FOREIGN KEY `classification_queries_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `classification_symptom_groups` DROP FOREIGN KEY `classification_symptom_groups_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `classification_symptoms` DROP FOREIGN KEY `classification_symptoms_classification_symptom_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `departments` DROP FOREIGN KEY `departments_hospital_id_fkey`;

-- DropForeignKey
ALTER TABLE `division_types` DROP FOREIGN KEY `division_types_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `divisions` DROP FOREIGN KEY `divisions_division_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `divisions` DROP FOREIGN KEY `divisions_parent_id_fkey`;

-- DropForeignKey
ALTER TABLE `examination_results` DROP FOREIGN KEY `examination_results_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `hospitals` DROP FOREIGN KEY `hospitals_division_id_fkey`;

-- DropForeignKey
ALTER TABLE `image_queries` DROP FOREIGN KEY `image_queries_query_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `image_queries` DROP FOREIGN KEY `image_queries_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `nlp_queries` DROP FOREIGN KEY `nlp_queries_query_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `nlp_queries` DROP FOREIGN KEY `nlp_queries_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `query_results` DROP FOREIGN KEY `query_results_disease_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `query_results` DROP FOREIGN KEY `query_results_query_detail_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_images` DROP FOREIGN KEY `user_images_image_query_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_account_id_fkey`;

-- AddForeignKey
ALTER TABLE `division_types` ADD CONSTRAINT `division_types_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_division_type_id_fkey` FOREIGN KEY (`division_type_id`) REFERENCES `division_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `divisions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_queries` ADD CONSTRAINT `classification_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_queries` ADD CONSTRAINT `classification_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nlp_queries` ADD CONSTRAINT `nlp_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nlp_queries` ADD CONSTRAINT `nlp_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_queries` ADD CONSTRAINT `image_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_queries` ADD CONSTRAINT `image_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `query_results` ADD CONSTRAINT `query_results_disease_category_id_fkey` FOREIGN KEY (`disease_category_id`) REFERENCES `disease_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `query_results` ADD CONSTRAINT `query_results_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_images` ADD CONSTRAINT `user_images_image_query_id_fkey` FOREIGN KEY (`image_query_id`) REFERENCES `image_queries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_symptoms` ADD CONSTRAINT `classification_symptoms_classification_symptom_group_id_fkey` FOREIGN KEY (`classification_symptom_group_id`) REFERENCES `classification_symptom_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_symptom_groups` ADD CONSTRAINT `classification_symptom_groups_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `classification_symptom_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospitals` ADD CONSTRAINT `hospitals_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examination_results` ADD CONSTRAINT `examination_results_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
