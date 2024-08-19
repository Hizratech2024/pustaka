import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { KategoriTb } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const body: KategoriTb = await request.json()
    const kategori = await prisma.kategoriTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: body.nama,
        }
    })
    return NextResponse.json(kategori, { status: 200 })
}


export const GET = async (request: Request, { params }: { params: { id: string } }) => {
   
        const kategori = await prisma.kategoriTb.findUnique({
            where:{
                id: Number(params.id)
            }
        });
        return NextResponse.json(kategori, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const karyawan = await prisma.kategoriTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(karyawan, { status: 200 })
}