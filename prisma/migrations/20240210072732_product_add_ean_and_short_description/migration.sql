/*
  Warnings:

  - A unique constraint covering the columns `[ean]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "ean" TEXT;
ALTER TABLE "Product" ADD COLUMN "shortDescription" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_ean_key" ON "Product"("ean");
