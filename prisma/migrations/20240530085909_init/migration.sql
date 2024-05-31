/*
  Warnings:

  - You are about to drop the column `nofakturId` on the `DetailtambahstokTb` table. All the data in the column will be lost.
  - You are about to drop the column `nofaktur` on the `TambahstokTb` table. All the data in the column will be lost.
  - You are about to drop the `DetailJualTb` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tambahstokId` to the `DetailtambahstokTb` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailJualTb" DROP CONSTRAINT "DetailJualTb_barangId_fkey";

-- DropForeignKey
ALTER TABLE "DetailJualTb" DROP CONSTRAINT "DetailJualTb_nofakturId_fkey";

-- DropForeignKey
ALTER TABLE "DetailtambahstokTb" DROP CONSTRAINT "DetailtambahstokTb_nofakturId_fkey";

-- DropIndex
DROP INDEX "TambahstokTb_nofaktur_key";

-- AlterTable
ALTER TABLE "DetailtambahstokTb" DROP COLUMN "nofakturId",
ADD COLUMN     "tambahstokId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TambahstokTb" DROP COLUMN "nofaktur";

-- AlterTable
ALTER TABLE "TransaksiTB" ALTER COLUMN "tanggal" DROP DEFAULT;

-- DropTable
DROP TABLE "DetailJualTb";

-- CreateTable
CREATE TABLE "DetailTransaksiTb" (
    "id" SERIAL NOT NULL,
    "barangId" INTEGER NOT NULL,
    "transaksiId" INTEGER NOT NULL,
    "hargaModal" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailTransaksiTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PenjualanTb" (
    "id" SERIAL NOT NULL,
    "nofaktur" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "kasir" TEXT NOT NULL,
    "totalItem" INTEGER NOT NULL,
    "totalBayar" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PenjualanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPenjualanTb" (
    "id" SERIAL NOT NULL,
    "barangId" INTEGER NOT NULL,
    "penjualanId" INTEGER NOT NULL,
    "hargaModal" INTEGER NOT NULL,
    "hargaJual" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailPenjualanTb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PenjualanTb_nofaktur_key" ON "PenjualanTb"("nofaktur");

-- AddForeignKey
ALTER TABLE "DetailtambahstokTb" ADD CONSTRAINT "DetailtambahstokTb_tambahstokId_fkey" FOREIGN KEY ("tambahstokId") REFERENCES "TambahstokTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksiTb" ADD CONSTRAINT "DetailTransaksiTb_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "BarangTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailTransaksiTb" ADD CONSTRAINT "DetailTransaksiTb_transaksiId_fkey" FOREIGN KEY ("transaksiId") REFERENCES "TransaksiTB"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualanTb" ADD CONSTRAINT "DetailPenjualanTb_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "BarangTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualanTb" ADD CONSTRAINT "DetailPenjualanTb_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "PenjualanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
