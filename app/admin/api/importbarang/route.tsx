import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const pilihbarang = JSON.parse(String(formData.get('selected'))) as any[];

    var x = [];
    for (let i = 0; i < pilihbarang.length; i++) {
        const cekkode = await prisma.barangTb.findUnique({
            where: {
                kodeBarang: pilihbarang[i].kodeBarang
            },
        })
        if (cekkode) {
            continue;
        }
        const xxx = await prisma.kategoriTb.findFirst({
            where: {
                nama: {
                    contains: pilihbarang[i].kategori,
                    mode: 'insensitive'
                },
            }
        })
        const kategoriId = xxx?.id
        x.push({
            namaBarang: pilihbarang[i].namaBarang,
            kodeBarang: pilihbarang[i].kodeBarang,
            kategoriId: Number(kategoriId),
            merek: pilihbarang[i].merek,
            unit: pilihbarang[i].unit,
            hargaModal: Number(pilihbarang[i].hargaModal),
            hargaJual: Number(pilihbarang[i].hargaJual),
            stok: Number(pilihbarang[i].stok),
        });
    }

    await prisma.barangTb.createMany({
        data: x,
    })
    
    return NextResponse.json({ pesan: 'berhasil' })
}
