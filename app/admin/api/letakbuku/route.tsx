import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const formData = await request.formData()

    await prisma.letakBukuTb.create({
        data: {
            bukuId: Number(formData.get('bukuId')),
            rakId: Number(formData.get('rakId')),
        },
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const rak = await prisma.letakBukuTb.findMany({
        include: {
            BukuTb:{
                include:{
                    KategoriTb:true
                }
            } ,
            RakTb:{
                include:{
                    LemariTb:true,
                }
            }
        },
        orderBy: [
            { RakTb: { nama: 'asc' } },
            { BukuTb:{ judul: 'asc' } },
        ]
    });
    return NextResponse.json(rak, { status: 200 })
}