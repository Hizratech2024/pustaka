import { NextResponse, NextRequest } from "next/server";
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
  const qty = Number(formData.get("qty"));
  let jumlahbuku = 0;

  const xxx = await prisma.bukuTb.findUnique({
    where: {
      id: Number(formData.get("bukuId")),
    },
  });

  if (xxx) {
    jumlahbuku = xxx.qty;
  }

  if (jumlahbuku < qty) {
    return NextResponse.json({ pesan: "tidak bisa" });
  }

  const hasil = jumlahbuku - Number(qty);

  const aaa = await prisma.letakBukuTb.findFirst({
    where: {
      bukuId: Number(formData.get("bukuId")),
      rakId: Number(formData.get("rakId")),
    },
  });

  if (aaa) {
    const qtysementara = aaa.qty;
    const hasiledit = qtysementara + qty;

    await prisma.letakBukuTb.update({
      where: {
        id: aaa.id,
      },
      data: {
        bukuId: Number(formData.get("bukuId")),
        rakId: Number(formData.get("rakId")),
        qty: hasiledit,
      },
    });

    await prisma.bukuTb.update({
      where: {
        id: Number(formData.get("bukuId")),
      },
      data: {
        qty: hasil,
      },
    });
  } else {
    await prisma.letakBukuTb.create({
      data: {
        bukuId: Number(formData.get("bukuId")),
        rakId: Number(formData.get("rakId")),
        qty: Number(formData.get("qty")),
        sekolahId: sekolahId,
      },
    });

    await prisma.bukuTb.update({
      where: {
        id: Number(formData.get("bukuId")),
      },
      data: {
        qty: hasil,
      },
    });
  }

  return NextResponse.json({ pesan: "berhasil" });
};

export const GET = async () => {
  const rak = await prisma.letakBukuTb.findMany({
    include: {
      BukuTb: {
        include: {
          KategoriTb: true,
        },
      },
      RakTb: {
        include: {
          LemariTb: true,
        },
      },
    },
    orderBy: [{ RakTb: { nama: "asc" } }, { BukuTb: { judul: "asc" } }],
  });
  return NextResponse.json(rak, { status: 200 });
};
