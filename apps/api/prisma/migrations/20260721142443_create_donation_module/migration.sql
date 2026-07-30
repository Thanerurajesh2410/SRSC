-- CreateTable
CREATE TABLE "public"."Donation" (
    "id" TEXT NOT NULL,
    "donorName" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "referenceNo" TEXT,
    "donationType" TEXT NOT NULL,
    "remarks" TEXT,
    "receiptNumber" TEXT NOT NULL,
    "donatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_receiptNumber_key" ON "public"."Donation"("receiptNumber");

-- CreateIndex
CREATE INDEX "Donation_deletedAt_idx" ON "public"."Donation"("deletedAt");
