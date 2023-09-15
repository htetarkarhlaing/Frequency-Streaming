/*
  Warnings:

  - Added the required column `channelId` to the `ChannelParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ChannelParticipant` ADD COLUMN `channelId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ChannelParticipant` ADD CONSTRAINT `ChannelParticipant_channelId_fkey` FOREIGN KEY (`channelId`) REFERENCES `Channel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
