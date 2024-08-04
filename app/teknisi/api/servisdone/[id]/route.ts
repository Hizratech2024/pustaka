import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()

    await prisma.servisTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            biayaHardware:Number(formData.get('biayaHardware')),
            biayaSoftware:Number(formData.get('biayaSoftware')),
            keterangan:String(formData.get('keterangan')),
            status: "Selesai",
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })
}
