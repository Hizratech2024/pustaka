import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  const karyawanId = Number(token!.karyawanId);

  const mulaihari = new Date();
  mulaihari.setHours(0, 0, 0, 0);

  const akhirhari = new Date();
  akhirhari.setDate(akhirhari.getDate() + 1);
  akhirhari.setHours(0, 0, 0, 0);

  const laporan = await prisma.penjualanTb.findMany({
    // where: {
    //   tanggal: {
    //     gte: mulaihari,
    //     lte: akhirhari
    //   },
    //   karyawanId: karyawanId
    // },
    include: {
      KaryawanTb: true,
      DetailPenjualanTb: {
        include: {
          BarangTb: true,
        }
      }
    },
    orderBy: {
      nofaktur: "asc"
    }
  });
  return NextResponse.json(laporan, { status: 200 })
}
