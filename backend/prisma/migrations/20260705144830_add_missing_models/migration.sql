/*
  Warnings:

  - The `status` column on the `AdCampaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,likeableType,likeableId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `likeableId` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likeableType` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_SUBSCRIBER', 'NEW_VIDEO', 'NEW_COMMENT', 'LIKE');

-- CreateEnum
CREATE TYPE "LikeableType" AS ENUM ('VIDEO', 'SHORT', 'COMMENT');

-- CreateEnum
CREATE TYPE "LikeType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "AdCampaignStatus" AS ENUM ('ACTIVE', 'PAUSED', 'ENDED');

-- AlterTable
ALTER TABLE "AdCampaign" ADD COLUMN     "advertiserName" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "AdCampaignStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "AdImpression" ADD COLUMN     "shortId" TEXT,
ADD COLUMN     "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "likeableId" TEXT NOT NULL,
ADD COLUMN     "likeableType" "LikeableType" NOT NULL,
ADD COLUMN     "type" "LikeType" NOT NULL DEFAULT 'LIKE';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL;

-- CreateIndex
CREATE INDEX "AdCampaign_status_idx" ON "AdCampaign"("status");

-- CreateIndex
CREATE INDEX "AdImpression_shortId_idx" ON "AdImpression"("shortId");

-- CreateIndex
CREATE INDEX "AdImpression_viewedAt_idx" ON "AdImpression"("viewedAt");

-- CreateIndex
CREATE INDEX "Like_userId_likeableType_likeableId_idx" ON "Like"("userId", "likeableType", "likeableId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_likeableType_likeableId_key" ON "Like"("userId", "likeableType", "likeableId");

-- AddForeignKey
ALTER TABLE "AdImpression" ADD CONSTRAINT "AdImpression_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "Short"("id") ON DELETE SET NULL ON UPDATE CASCADE;
