/*
  Warnings:

  - You are about to drop the column `experienceYears` on the `resumes` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `resumes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."resumes" DROP COLUMN "experienceYears",
DROP COLUMN "skills",
ADD COLUMN     "aiAnalysis" JSONB;
