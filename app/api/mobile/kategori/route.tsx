import { NextRequest, NextResponse } from "next/server"
import { PrismaClient, KategoriTb } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const POST = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const sekolahId = Number(token?.sekolahId);
    const body = await request.json();
    await prisma.kategoriTb.create({
        data: {
            nama: body.nama,
            sekolahId: sekolahId
        }
    })
    return NextResponse.json({ pesan: 'berhasil', status: 200 })
}

export const GET = async () => {
    const kategori = await prisma.kategoriTb.findMany({
        orderBy: {
            nama: 'asc'
        }
    });
    return NextResponse.json(kategori, { status: 200 })
}