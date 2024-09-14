import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const newpass = formData.get('newpass')

    const cekusernama = await prisma.userTb.findMany({
        where: {
            usernama: String(formData.get('usernama')),
            NOT: {
                id: Number(params.id)
            }
        }
    })

    if (cekusernama.length > 0) {
        return NextResponse.json({ status: 555, pesan: "usernama sudah ada" })
    }

    await prisma.userTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            usernama: String(formData.get('usernama')),
        }
    })

    if (newpass === 'yes') {
        await prisma.userTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                password: await bcrypt.hash(String(formData.get('password')), 10),
            }
        })
    }
    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const user = await prisma.userTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}