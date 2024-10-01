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
  let jumlah = 0;

  const aaa = await prisma.lemariTb.findUnique({
    where: {
      id: Number(formData.get("lemariId")),
    },
  });

  if (aaa) {
    jumlah = aaa.jumlahRak;
  }

  const xxx = await prisma.rakTb.findMany({
    where: {
      lemariId: Number(formData.get("lemariId")),
    },
  });

  if (xxx.length >= jumlah) {
    return NextResponse.json({ pesan: "Limit Rak" });
  }

  await prisma.rakTb.create({
    data: {
      nama: String(formData.get("nama")),
      lemariId: Number(formData.get("lemariId")),
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
  const rak = await prisma.rakTb.findMany({
    where:{
      sekolahId:sekolahId
    },
    include: {
      LemariTb: true,
    },
    orderBy: [{ LemariTb: { nama: "asc" } }, { nama: "asc" }],
  });
  return NextResponse.json(rak, { status: 200 });
};
