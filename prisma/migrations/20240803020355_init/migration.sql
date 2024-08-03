-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(7) NOT NULL,
    `short_name` VARCHAR(127) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `division_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `divisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `division_type_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `lon` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NULL,

    UNIQUE INDEX `users_account_id_key`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `country_id` INTEGER NOT NULL,
    `national_identity_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classification_queries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `query_detail_id` INTEGER NOT NULL,

    UNIQUE INDEX `classification_queries_query_detail_id_key`(`query_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nlp_queries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `query_detail_id` INTEGER NOT NULL,
    `query_content` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `nlp_queries_query_detail_id_key`(`query_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image_queries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `query_detail_id` INTEGER NOT NULL,

    UNIQUE INDEX `image_queries_query_detail_id_key`(`query_detail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `query_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `query_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL,
    `disease_name` VARCHAR(191) NOT NULL,
    `disease_category_id` INTEGER NOT NULL,
    `query_detail_id` INTEGER NOT NULL,
    `estimated_accuracy` DOUBLE NOT NULL,
    `fed_back` BOOLEAN NOT NULL,
    `feedback_accuracy` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_query_id` INTEGER NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classification_symptoms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `classification_symptom_group_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classification_symptom_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_id` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `tier` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disease_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospitals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `division_id` INTEGER NOT NULL,
    `specific_address` VARCHAR(191) NOT NULL,
    `api_spec` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `specific_address` VARCHAR(191) NOT NULL,
    `id_for_hospital_api` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `scheduled_at` DATETIME(3) NOT NULL,
    `department_id` INTEGER NOT NULL,
    `note` TEXT NOT NULL,
    `query_detail_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examination_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_name` VARCHAR(191) NOT NULL,
    `country_id` INTEGER NOT NULL,
    `national_identity_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClassificationQueryToClassificationSymptom` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClassificationQueryToClassificationSymptom_AB_unique`(`A`, `B`),
    INDEX `_ClassificationQueryToClassificationSymptom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DiseaseCategoryToExaminationResult` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DiseaseCategoryToExaminationResult_AB_unique`(`A`, `B`),
    INDEX `_DiseaseCategoryToExaminationResult_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DepartmentToDiseaseCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DepartmentToDiseaseCategory_AB_unique`(`A`, `B`),
    INDEX `_DepartmentToDiseaseCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `division_types` ADD CONSTRAINT `division_types_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_division_type_id_fkey` FOREIGN KEY (`division_type_id`) REFERENCES `division_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `divisions` ADD CONSTRAINT `divisions_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `divisions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_queries` ADD CONSTRAINT `classification_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_queries` ADD CONSTRAINT `classification_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nlp_queries` ADD CONSTRAINT `nlp_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nlp_queries` ADD CONSTRAINT `nlp_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_queries` ADD CONSTRAINT `image_queries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image_queries` ADD CONSTRAINT `image_queries_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `query_results` ADD CONSTRAINT `query_results_disease_category_id_fkey` FOREIGN KEY (`disease_category_id`) REFERENCES `disease_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `query_results` ADD CONSTRAINT `query_results_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_images` ADD CONSTRAINT `user_images_image_query_id_fkey` FOREIGN KEY (`image_query_id`) REFERENCES `image_queries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_symptoms` ADD CONSTRAINT `classification_symptoms_classification_symptom_group_id_fkey` FOREIGN KEY (`classification_symptom_group_id`) REFERENCES `classification_symptom_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classification_symptom_groups` ADD CONSTRAINT `classification_symptom_groups_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `classification_symptom_groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `hospitals` ADD CONSTRAINT `hospitals_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_hospital_id_fkey` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examination_results` ADD CONSTRAINT `examination_results_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationQueryToClassificationSymptom` ADD CONSTRAINT `_ClassificationQueryToClassificationSymptom_A_fkey` FOREIGN KEY (`A`) REFERENCES `classification_queries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClassificationQueryToClassificationSymptom` ADD CONSTRAINT `_ClassificationQueryToClassificationSymptom_B_fkey` FOREIGN KEY (`B`) REFERENCES `classification_symptoms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiseaseCategoryToExaminationResult` ADD CONSTRAINT `_DiseaseCategoryToExaminationResult_A_fkey` FOREIGN KEY (`A`) REFERENCES `disease_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiseaseCategoryToExaminationResult` ADD CONSTRAINT `_DiseaseCategoryToExaminationResult_B_fkey` FOREIGN KEY (`B`) REFERENCES `examination_results`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartmentToDiseaseCategory` ADD CONSTRAINT `_DepartmentToDiseaseCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DepartmentToDiseaseCategory` ADD CONSTRAINT `_DepartmentToDiseaseCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `disease_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
