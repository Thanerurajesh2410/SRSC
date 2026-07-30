/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donatedOn` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donation` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `donationType` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `isAnonymous` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `receiptNumber` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `referenceNo` on the `Donation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[receiptNo]` on the table `Donation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donationDate` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMode` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptNo` to the `Donation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DonationCategory" AS ENUM ('GENERAL', 'TEMPLE_CONSTRUCTION', 'ANNADANAM', 'FESTIVAL', 'GOSHALA', 'SPECIAL_POOJA', 'CORPUS');

-- CreateEnum
CREATE TYPE "public"."PaymentMode" AS ENUM ('CASH', 'UPI', 'BANK_TRANSFER', 'CHEQUE');

-- DropIndex
DROP INDEX "public"."Donation_deletedAt_idx";

-- DropIndex
DROP INDEX "public"."Donation_receiptNumber_key";

-- AlterTable
ALTER TABLE "public"."Donation" DROP COLUMN "deletedAt",
DROP COLUMN "donatedOn",
DROP COLUMN "donation",
DROP COLUMN "donationType",
DROP COLUMN "isAnonymous",
DROP COLUMN "paymentMethod",
DROP COLUMN "phone",
DROP COLUMN "receiptNumber",
DROP COLUMN "referenceNo",
ADD COLUMN     "category" "public"."DonationCategory" NOT NULL,
ADD COLUMN     "donationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "paymentMode" "public"."PaymentMode" NOT NULL,
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "receiptNo" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_receiptNo_key" ON "public"."Donation"("receiptNo");
