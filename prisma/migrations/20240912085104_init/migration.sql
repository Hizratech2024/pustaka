-- CreateTable
CREATE TABLE "AdminTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "usernama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SekolahTb" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "nama" TEXT,
    "npsn" TEXT,
    "alamat" TEXT,
    "email" TEXT,
    "telp" TEXT,
    "hp" TEXT,
    "logo" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SekolahTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KaryawanTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "usernama" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KaryawanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "usernama" TEXT NOT NULL,
    "foto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTb" (
    "id" SERIAL NOT NULL,
    "karyawanId" INTEGER NOT NULL,
    "usernama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsermemberTb" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "usernama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsermemberTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategoriTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategoriTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BukuTb" (
    "id" SERIAL NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "kodeBuku" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "penerbit" TEXT NOT NULL,
    "tahunTerbit" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "bahasa" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BukuTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LemariTb" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlahRak" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LemariTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RakTb" (
    "id" SERIAL NOT NULL,
    "lemariId" INTEGER NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RakTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LetakBukuTb" (
    "id" SERIAL NOT NULL,
    "rakId" INTEGER NOT NULL,
    "bukuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LetakBukuTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeminjamanTb" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "tanggalPeminjaman" TIMESTAMP(3) NOT NULL,
    "tanggalPengembalian" TIMESTAMP(3),
    "batasWaktu" TIMESTAMP(3) NOT NULL,
    "totalItem" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "denda" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeminjamanTb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPeminjaman" (
    "id" SERIAL NOT NULL,
    "peminjamanId" INTEGER NOT NULL,
    "bukuId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DetailPeminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminTb_usernama_key" ON "AdminTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "SekolahTb_adminId_key" ON "SekolahTb"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_hp_key" ON "KaryawanTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_email_key" ON "KaryawanTb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KaryawanTb_usernama_key" ON "KaryawanTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "MemberTb_hp_key" ON "MemberTb"("hp");

-- CreateIndex
CREATE UNIQUE INDEX "MemberTb_email_key" ON "MemberTb"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MemberTb_usernama_key" ON "MemberTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_karyawanId_key" ON "UserTb"("karyawanId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTb_usernama_key" ON "UserTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "UsermemberTb_memberId_key" ON "UsermemberTb"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "UsermemberTb_usernama_key" ON "UsermemberTb"("usernama");

-- CreateIndex
CREATE UNIQUE INDEX "BukuTb_kodeBuku_key" ON "BukuTb"("kodeBuku");

-- AddForeignKey
ALTER TABLE "SekolahTb" ADD CONSTRAINT "SekolahTb_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTb" ADD CONSTRAINT "UserTb_karyawanId_fkey" FOREIGN KEY ("karyawanId") REFERENCES "KaryawanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsermemberTb" ADD CONSTRAINT "UsermemberTb_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BukuTb" ADD CONSTRAINT "BukuTb_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "KategoriTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RakTb" ADD CONSTRAINT "RakTb_lemariId_fkey" FOREIGN KEY ("lemariId") REFERENCES "LemariTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LetakBukuTb" ADD CONSTRAINT "LetakBukuTb_rakId_fkey" FOREIGN KEY ("rakId") REFERENCES "RakTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LetakBukuTb" ADD CONSTRAINT "LetakBukuTb_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "BukuTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeminjamanTb" ADD CONSTRAINT "PeminjamanTb_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "MemberTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPeminjaman" ADD CONSTRAINT "DetailPeminjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "BukuTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPeminjaman" ADD CONSTRAINT "DetailPeminjaman_peminjamanId_fkey" FOREIGN KEY ("peminjamanId") REFERENCES "PeminjamanTb"("id") ON DELETE CASCADE ON UPDATE CASCADE;
