/*
  Warnings:

  - You are about to drop the column `originalFile` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `parsedText` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedAt` on the `resumes` table. All the data in the column will be lost.
  - Added the required column `extractedText` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `resumes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."resumes" DROP COLUMN "originalFile",
DROP COLUMN "parsedText",
DROP COLUMN "uploadedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extractedText" TEXT NOT NULL,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
