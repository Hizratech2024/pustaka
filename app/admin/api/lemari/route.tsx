import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const formData = await request.formData()
    await prisma.lemariTb.create({
        data: {
            nama: String(formData.get('nama')),
            jumlahRak:Number(formData.get('jumlah')),
        },
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const kategori = await prisma.lemariTb.findMany({
        orderBy: {
            nama: 'asc'
        },
    });
    return NextResponse.json(kategori, { status: 200 })
}