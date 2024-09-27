import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const POST = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const sekolahId = Number(token?.sekolahId);
    const formData = await request.formData()
    await prisma.berita.create({
        data: {
            judul: String(formData.get('judul')),
            tanggal: String(formData.get('tanggal')),
            isi: String(formData.get('isi')),
            foto: String(formData.get('namaunik')),
            sekolahId:sekolahId
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const berita = await prisma.berita.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    });
    return NextResponse.json(berita, { status: 200 })
}