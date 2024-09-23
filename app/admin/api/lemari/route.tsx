import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { BaseNextRequestConfig } from "next/dist/server/base-http";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const POST = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const sekolahId = Number(token?.sekolahId);

  const formData = await request.formData();
  await prisma.lemariTb.create({
    data: {
      nama: String(formData.get("nama")),
      jumlahRak: Number(formData.get("jumlah")),
      sekolahId: sekolahId,
    },
  });
  return NextResponse.json({ pesan: "berhasil" });
};

export const GET = async () => {
  const kategori = await prisma.lemariTb.findMany({
    orderBy: {
      nama: "asc",
    },
  });
  return NextResponse.json(kategori, { status: 200 });
};
