/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "sku" TEXT,
    "ean" TEXT,
    "categoryId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "costPrice" REAL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "shortDescription" TEXT,
    "manufacturer" TEXT,
    "warranty" TEXT NOT NULL,
    "shippingInfo" TEXT,
    "availability" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("availability", "categoryId", "costPrice", "createdAt", "deletedAt", "description", "ean", "id", "manufacturer", "name", "price", "quantity", "shippingInfo", "shortDescription", "sku", "slug", "updatedAt", "warranty") SELECT "availability", "categoryId", "costPrice", "createdAt", "deletedAt", "description", "ean", "id", "manufacturer", "name", "price", "quantity", "shippingInfo", "shortDescription", "sku", "slug", "updatedAt", "warranty" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
CREATE UNIQUE INDEX "Product_ean_key" ON "Product"("ean");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
