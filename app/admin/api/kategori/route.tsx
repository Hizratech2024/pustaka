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
  await prisma.kategoriTb.create({
    data: {
      nama: String(formData.get("nama")),
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
  const kategori = await prisma.kategoriTb.findMany({
    where:{
      sekolahId:sekolahId
    },
    orderBy: {
      nama: "asc",
    },
  });
  return NextResponse.json(kategori, { status: 200 });
};
