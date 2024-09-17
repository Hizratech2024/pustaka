import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()

    await prisma.bukuTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            judul: String(formData.get('judul')),
            kodeBuku: String(formData.get('kodeBuku')),
            penerbit: String(formData.get('penerbit')),
            tahunTerbit: String(formData.get('tahun')),
            penulis: String(formData.get('penulis')),
            bahasa: String(formData.get('bahasa')),
            stok: Number(formData.get('jumlah')),
            deskripsi: String(formData.get('deskripsi')),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const user = await prisma.bukuTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}