import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const sekolahId = Number(token?.sekolahId);

  const formData = await request.formData();

  const cekkode = await prisma.bukuTb.findFirst({
    where: {
      kodeBuku: String(formData.get("kodeBuku")),
      sekolahId:sekolahId
    },
  });

  if (cekkode) {
    return NextResponse.json({ pesan: "kode buku sudah ada" });
  }

  await prisma.bukuTb.create({
    data: {
      kategoriId: Number(formData.get("kategoriId")),
      judul: String(formData.get("judul")),
      kodeBuku: String(formData.get("kodeBuku")),
      penerbit: String(formData.get("penerbit")),
      tahunTerbit: String(formData.get("tahun")),
      penulis: String(formData.get("penulis")),
      bahasa: String(formData.get("bahasa")),
      stok: Number(formData.get("jumlah")),
      stokinput: Number(formData.get("jumlah")),
      stoklemari: Number(formData.get("jumlah")),
      deskripsi: String(formData.get("deskripsi")),
      sekolahId: sekolahId,
    },
  });
  return NextResponse.json({ pesan: "berhasil" });
};

export const GET = async (request:NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const sekolahId = Number(token?.sekolahId);
  const rak = await prisma.bukuTb.findMany({
    where:{
      sekolahId:sekolahId
    },
    include: {
      KategoriTb: true,
    },
    orderBy: [{ KategoriTb: { nama: "asc" } }, { judul: "asc" }],
  });
  return NextResponse.json(rak, { status: 200 });
};
