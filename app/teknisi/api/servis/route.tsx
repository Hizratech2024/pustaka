import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    await prisma.servisTb.create({
        data: {
            kodeServis:String(formData.get('noservis')),
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
            hp: String(formData.get('hp')),
            namaBarang: String(formData.get('namaBarang')),
            noSeri: String(formData.get('noseri')),
            perlengkapan: String(formData.get('perlengkapan')),
            jenis: String(formData.get('jenis')),
            detailSoftware: String(formData.get('software')),
            detailHardware: String(formData.get('hardware')),
            status: String(formData.get('status')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}


export const GET = async () => {
    const servis = await prisma.servisTb.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(servis, { status: 200 })
}