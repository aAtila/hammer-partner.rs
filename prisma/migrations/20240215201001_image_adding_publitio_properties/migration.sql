/*
  Warnings:

  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publitioId" TEXT,
    "name" TEXT,
    "folder" TEXT,
    "folderId" TEXT,
    "extension" TEXT,
    "thumbnail" TEXT,
    "alt" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("alt", "createdAt", "deletedAt", "height", "id", "productId", "updatedAt", "width") SELECT "alt", "createdAt", "deletedAt", "height", "id", "productId", "updatedAt", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
