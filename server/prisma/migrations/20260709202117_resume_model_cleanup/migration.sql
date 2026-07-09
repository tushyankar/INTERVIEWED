/*
  Warnings:

  - Added the required column `filePath` to the `resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."resumes" ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "resumes_userId_isActive_idx" ON "public"."resumes"("userId", "isActive");
