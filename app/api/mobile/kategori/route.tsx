import { NextResponse } from "next/server"
import { PrismaClient, KategoriTb } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {

    const body = await request.json();
    const kategori = await prisma.kategoriTb.create({    
        data: {
            nama: body.nama,
        }
    })
    return NextResponse.json( {pesan: 'berhasil',status:200})
}

export const GET = async () => {
    const kategori = await prisma.kategoriTb.findMany({
        orderBy:{
            nama:'asc'
        }
    });
    return NextResponse.json(kategori, { status: 200 })
}