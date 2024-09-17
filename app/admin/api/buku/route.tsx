import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic';

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const cekkode = await prisma.bukuTb.findUnique({
        where: {
            kodeBuku: String(formData.get('kodeBuku')),
        }
    })

    if (cekkode) {
        return NextResponse.json({ pesan: 'kode buku sudah ada' })
    }

    await prisma.bukuTb.create({
        data: {
            kategoriId: Number(formData.get('kategoriId')),
            judul: String(formData.get('judul')),
            kodeBuku: String(formData.get('kodeBuku')),
            penerbit: String(formData.get('penerbit')),
            tahunTerbit: String(formData.get('tahun')),
            penulis: String(formData.get('penulis')),
            bahasa: String(formData.get('bahasa')),
            stok: Number(formData.get('jumlah')),
            deskripsi: String(formData.get('deskripsi')),
        },
    })
    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const rak = await prisma.bukuTb.findMany({
        include: {
            KategoriTb: true,
        },
        orderBy: [
            { KategoriTb: { nama: 'asc' } },
            { judul: 'asc' },
        ]
    });
    return NextResponse.json(rak, { status: 200 })
}