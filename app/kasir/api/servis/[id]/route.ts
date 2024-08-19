import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

    const formData = await request.formData()

    await prisma.servisTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
            hp: String(formData.get('hp')),
            namaBarang: String(formData.get('namaBarang')),
            noSeri: String(formData.get('noseri')),
            perlengkapan: String(formData.get('perlengkapan')),
            jenis: String(formData.get('jenis')),
            detailSoftware: String(formData.get('software')),
            detailHardware: String(formData.get('hardware')),
        }
    })
    return NextResponse.json({ pesan: 'berhasil' })


}


export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const servis = await prisma.servisTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(servis, { status: 200 })

}