-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `moodId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_moodId_fkey` FOREIGN KEY (`moodId`) REFERENCES `Mood`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
