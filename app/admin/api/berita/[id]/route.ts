import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const newfoto = formData.get('newfoto')
    await prisma.berita.update({
        where: {
            id: Number(params.id)
        },
        data: {
            judul: String(formData.get('judul')),
            tanggal: String(formData.get('tanggal')),
            isi: String(formData.get('isi')),
        }
    })
    if (newfoto === 'yes') {
        await prisma.berita.update({
            where: {
                id: Number(params.id)
            },
            data: {
                foto: String(formData.get('namaunik')),
            }
        })
    }
    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    await prisma.berita.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}