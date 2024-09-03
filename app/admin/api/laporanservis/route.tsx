import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const laporan = await prisma.servisTb.findMany({
    where: {
      status: 'Done'
    },
    orderBy: {
      kodeServis: "asc"
    },
    include:{
      KaryawanTb:true
    }
  });
  return NextResponse.json(laporan, { status: 200 })
}
