-- DropIndex
DROP INDEX "public"."resumes_userId_key";

-- CreateIndex
CREATE INDEX "resumes_userId_idx" ON "public"."resumes"("userId");
