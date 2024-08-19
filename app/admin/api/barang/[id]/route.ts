import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

    const formData = await request.formData()
    const newfoto = formData.get('newfoto')

    await prisma.barangTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            namaBarang: String(formData.get('namaBarang')),
            kategoriId: Number(formData.get('kategoriId')),
            merek: String(formData.get('merek')),
            unit: String(formData.get('unit')),
            hargaModal: Number(formData.get('hargaModal')),
            hargaJual: Number(formData.get('hargaJual')),
            stok: Number(formData.get('stok')),
            deskripsi: String(formData.get('deskripsi')),
        }
    })
    if (newfoto === 'yes') {
        await prisma.barangTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                foto: String(formData.get('namaunik')),
            }
        })
    }
    return NextResponse.json({ pesan: 'berhasil' })


}

export const GET = async (request: Request, { params }: { params: { id: string } }) => {

    const barang = await prisma.barangTb.findUnique({
        where: {
            kodeBarang: (params.id),
        },
        include:{
            KategoriTb:true,
        },
        
    });
    return NextResponse.json(barang, { status: 200 })
}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    const barang = await prisma.barangTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(barang, { status: 200 })

}