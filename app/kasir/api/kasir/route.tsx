import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {
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

    return NextResponse.json({ pesan: 'berhasil' })
}

export const GET = async () => {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const tanggal = `${year}${month}${day}`;

    const lastTransaksi = await prisma.penjualanTb.findFirst({
        orderBy: {
            nofaktur: 'desc',
        },
    });
    let nomorUrut = 1;

    if (lastTransaksi) {
        const lastNomorFaktur = lastTransaksi.nofaktur;
        const lastNomorUrut = parseInt(lastNomorFaktur.slice(-3), 10);
        nomorUrut = lastNomorUrut + 1;
    }

    const nomorUrutFormatted = nomorUrut.toString().padStart(3, '0');

    const nomorFaktur = `NF${tanggal}${nomorUrutFormatted}`;

    return NextResponse.json(nomorFaktur, { status: 201 })
}
