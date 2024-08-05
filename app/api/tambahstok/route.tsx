import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const tambahstok = await prisma.tambahstokTb.create({
        data: {
            tanggal: String(formData.get('tanggal')),
            admin: String(formData.get('admin')),
            totalItem: Number(formData.get('totalItem')),
            totalBayar: Number(formData.get('totalBayar')),
        },
    })

    const lastId = await prisma.tambahstokTb.findFirst({
        orderBy: {
            id: 'desc',
        },
    });

    if (lastId) {
        const noId = lastId.id;
        const pilihbarang = JSON.parse(String(formData.get('selected'))) as any[];

        var x = [];
        for (let i = 0; i < pilihbarang.length; i++) {
            x.push({
                barangId: pilihbarang[i].id,
                tambahstokId: noId,
                hargaModal: Number(pilihbarang[i].hargaModal),
                hargaJual: Number(pilihbarang[i].hargaJual),
                qty: Number(pilihbarang[i].qty),
            });
        }

        await prisma.detailtambahstokTb.createMany({
            data: x
        })

        for (let i = 0; i < pilihbarang.length; i++) {
            await prisma.barangTb.update({
                where: {
                    id: pilihbarang[i].id
                },
                data: {
                    stok: Number(pilihbarang[i].stokakhir),
                    hargaModal: Number(pilihbarang[i].hargaModal),
                    hargaJual: Number(pilihbarang[i].hargaJual),
                },
            })
        }
    }
    return NextResponse.json(tambahstok, { status: 201 })
}


