import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()

    await prisma.lemariTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            jumlahRak: Number(formData.get('jumlah')),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const user = await prisma.lemariTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}