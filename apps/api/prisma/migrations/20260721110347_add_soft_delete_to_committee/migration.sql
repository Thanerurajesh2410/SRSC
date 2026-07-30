-- AlterTable
ALTER TABLE "public"."Committee" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Committee_deletedAt_idx" ON "public"."Committee"("deletedAt");
