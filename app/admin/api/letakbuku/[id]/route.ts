import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic';

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()
    let temukanId = 0

    const xxx = await prisma.letakBukuTb.findFirst({
        where: {
            bukuId: Number(params.id),
        }
    })

    if (xxx) {
        temukanId = xxx.id
    }


    await prisma.letakBukuTb.update({
        where: {
            id: Number(temukanId)
        },
        data: {
            rakId: Number(formData.get('rakId')),
        }
    })

    return NextResponse.json({ status: 200, pesan: "berhasil" })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const user = await prisma.letakBukuTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(user, { status: 200 })
}