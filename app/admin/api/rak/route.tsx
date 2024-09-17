import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const formData = await request.formData()
    let jumlah = 0

    const aaa = await prisma.lemariTb.findUnique({
        where: {
            id: Number(formData.get('lemariId')),
        }
    })

    if (aaa) {
        jumlah = aaa.jumlahRak
    }

    const xxx = await prisma.rakTb.findMany({
        where: {
            lemariId: Number(formData.get('lemariId')),
        }
    })

    if (xxx.length >= jumlah) {
        return NextResponse.json({ pesan: 'Limit Rak' })
    }

    await prisma.rakTb.create({
        data: {
            nama: String(formData.get('nama')),
            lemariId: Number(formData.get('lemariId')),
        },
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const rak = await prisma.rakTb.findMany({
        include: {
            LemariTb: true,
        },
        orderBy: [
            { LemariTb: { nama: 'asc' } },
            { nama: 'asc' },
        ]
    });
    return NextResponse.json(rak, { status: 200 })
}