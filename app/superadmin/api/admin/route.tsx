import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"


const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'; 


export const POST = async (request: Request) => {

    const formData = await request.formData()

    const cekusernama = await prisma.userTb.findUnique({
        where: {
            usernama: String(formData.get('usernama'))
        },
    })

    if (cekusernama) {
        return NextResponse.json({ pesan: "usernama ada" })
    }

    await prisma.userTb.create({
        data: {
            nama: String(formData.get('nama')),
            usernama: String(formData.get('usernama')),
            password: await bcrypt.hash(String(formData.get('password')), 10),
            role: "Admin",
            SekolahTb: {
                create: {}
            }
        },
        include: {
            SekolahTb: true
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const karyawan = await prisma.userTb.findMany({
        where: {
            role: 'Admin'
        },
        orderBy: {
            id: 'asc'
        },
        include: {
            SekolahTb: true,
        },
    });
    return NextResponse.json(karyawan, { status: 200 })
}