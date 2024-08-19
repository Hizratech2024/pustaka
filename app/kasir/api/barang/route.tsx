import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()
    const fotokosong = formData.get('fotokosong')

    const xxx = await prisma.barangTb.findUnique({
        where: {
            kodeBarang: String(formData.get('kodeBarang'))
        },
    })
    if (xxx) {
        return NextResponse.json({ pesan: 'kode barang sudah ada' })
    }

    if (fotokosong === 'no') {
        await prisma.barangTb.create({
            data: {
                namaBarang: String(formData.get('namaBarang')),
                kodeBarang: String(formData.get('kodeBarang')),
                kategoriId: Number(formData.get('kategoriId')),
                merek: String(formData.get('merek')),
                unit: String(formData.get('unit')),
                hargaModal: Number(formData.get('hargaModal')),
                hargaJual: Number(formData.get('hargaJual')),
                stok: Number(formData.get('stok')),
                deskripsi: String(formData.get('deskripsi')),
                foto: String(formData.get('namaunik')),
            }
        })
    }
    else {
        await prisma.barangTb.create({
            data: {
                namaBarang: String(formData.get('namaBarang')),
                kodeBarang: String(formData.get('kodeBarang')),
                kategoriId: Number(formData.get('kategoriId')),
                merek: String(formData.get('merek')),
                unit: String(formData.get('unit')),
                hargaModal: Number(formData.get('hargaModal')),
                hargaJual: Number(formData.get('hargaJual')),
                stok: Number(formData.get('stok')),
                deskripsi: String(formData.get('deskripsi')),
            }
        })
    }

    return NextResponse.json({ pesan: 'berhasil' })
}


export const GET = async () => {
    const barang = await prisma.barangTb.findMany({
        include: {
            KategoriTb: true,
        },
        orderBy:{
            namaBarang:"asc"
        }
    });
    return NextResponse.json(barang, { status: 200 })
}