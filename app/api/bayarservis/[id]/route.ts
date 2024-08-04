import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const formData = await request.formData()

    await prisma.penjualanTb.create({
        data: {
            nofaktur: String(formData.get('nofaktur')),
            kasir: String(formData.get('kasir')),
            tanggal:String(formData.get('tanggal')),
            totalItem: Number(formData.get('totalItem')),
            totalBayar: Number(formData.get('totalBayar')),
        },
    })

    const lastId = await prisma.penjualanTb.findFirst({
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
                penjualanId: noId,
                hargaModal: Number(pilihbarang[i].hargaModal),
                hargaJual: Number(pilihbarang[i].hargaJual),
                qty: Number(pilihbarang[i].qty),
            });
        }

        await prisma.detailPenjualanTb.createMany({
            data: x
        })

        for (let i = 0; i < pilihbarang.length; i++) {
            await prisma.barangTb.update({
                where: {
                    id: pilihbarang[i].id
                },
                data: {
                    stok: Number(pilihbarang[i].stokakhir),
                },
            })
        }
    }

    await prisma.servisTb.update({
        where: {
            id: Number(params.id)
        },
        data: {
            status: "Final",
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}




