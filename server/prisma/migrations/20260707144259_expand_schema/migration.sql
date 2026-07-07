/*
  Warnings:

  - You are about to drop the column `createdAt` on the `questions` table. All the data in the column will be lost.
  - The `aiFeedback` column on the `responses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('REFRESH');

-- AlterEnum
ALTER TYPE "public"."InterviewStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "public"."analytics" ADD COLUMN     "strongestSkill" TEXT,
ADD COLUMN     "weakestSkill" TEXT;

-- AlterTable
ALTER TABLE "public"."questions" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "public"."responses" DROP COLUMN "aiFeedback",
ADD COLUMN     "aiFeedback" JSONB;

-- CreateTable
CREATE TABLE "public"."resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalFile" TEXT NOT NULL,
    "parsedText" TEXT NOT NULL,
    "skills" JSONB,
    "experienceYears" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "public"."TokenType" NOT NULL DEFAULT 'REFRESH',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resumes_userId_key" ON "public"."resumes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "public"."refresh_tokens"("token");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "public"."refresh_tokens"("userId");

-- AddForeignKey
ALTER TABLE "public"."resumes" ADD CONSTRAINT "resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
