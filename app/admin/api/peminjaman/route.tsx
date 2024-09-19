import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.detailPeminjaman.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      BukuTb: true,
      PeminjamanTb: true,
    },
  });

  return NextResponse.json(res, { status: 200 });
}
