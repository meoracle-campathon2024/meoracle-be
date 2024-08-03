/*
  Warnings:

  - You are about to drop the column `estimated_accuracy` on the `query_results` table. All the data in the column will be lost.
  - Added the required column `priority` to the `query_results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `query_results` DROP COLUMN `estimated_accuracy`,
    ADD COLUMN `priority` INTEGER NOT NULL;
