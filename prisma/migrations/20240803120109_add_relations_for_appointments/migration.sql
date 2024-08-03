-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_query_detail_id_fkey` FOREIGN KEY (`query_detail_id`) REFERENCES `query_details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
