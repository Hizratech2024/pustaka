import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    const passwordlama = String(formData.get('passwordlama'))

    const cekuser = await prisma.userTb.findUnique({
        where: {
            usernama: String(params.id)
        },
    })


    if (!cekuser) {
        return NextResponse.json({ status: 404, pesan: "User tidak ditemukan" })
    }

    const isPasswordValid = await bcrypt.compare(passwordlama, cekuser.password)

    if (!isPasswordValid) {
        return NextResponse.json({ status: 200, pesan: "Password salah" })
    }

    await prisma.userTb.update({
        where: {
            usernama: String(params.id)
        },
        data: {
            password: await bcrypt.hash(String(formData.get('passwordbaru')), 10),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })
}
