import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {


    await prisma.servisTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            status: "Proses",
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}
