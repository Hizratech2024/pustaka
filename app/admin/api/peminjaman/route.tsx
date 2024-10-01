import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const sekolahId = Number(token?.sekolahId);
    const formData = await request.formData()

    await prisma.peminjamanTb.create({
        data: {
            noPeminjaman: String(formData.get('noPeminjaman')),
            memberId: Number(formData.get('memberId')),
            tanggalPeminjaman:String(formData.get('tanggal')),
            batasWaktu: String(formData.get('deadline')),
            totalItem: Number(formData.get('totalqty')),
            status:"Pinjam",
            sekolahId:sekolahId,
        },
    })

    const lastId = await prisma.peminjamanTb.findFirst({
        orderBy: {
            id: 'desc',
        },
    });

    if (lastId) {
        const noId = lastId.id;
        const pilihbuku = JSON.parse(String(formData.get('selected'))) as any[];

        var x = [];
        for (let i = 0; i < pilihbuku.length; i++) {
            x.push({
                bukuId: pilihbuku[i].id,
                peminjamanId: noId,
                qty: Number(pilihbuku[i].qty),
            });
        }

        await prisma.detailPeminjaman.createMany({
            data: x
        })

        for (let i = 0; i < pilihbuku.length; i++) {
            await prisma.bukuTb.update({
                where: {
                    id: pilihbuku[i].id
                },
                data: {
                    stok: Number(pilihbuku[i].stokakhir),
                },
            })
        }
    }

    return NextResponse.json({ pesan: 'berhasil' })
}

// export const GET = async () => {
//     const today = new Date();
//     const year = today.getFullYear().toString().slice(-2);
//     const month = (today.getMonth() + 1).toString().padStart(2, '0');
//     const day = today.getDate().toString().padStart(2, '0');

//     const tanggal = `${year}${month}${day}`;

//     const lastTransaksi = await prisma.penjualanTb.findFirst({
//         orderBy: {
//             nofaktur: 'desc',
//         },
//     });
//     let nomorUrut = 1;

//     if (lastTransaksi) {
//         const lastNomorFaktur = lastTransaksi.nofaktur;
//         const lastNomorUrut = parseInt(lastNomorFaktur.slice(-3), 10);
//         nomorUrut = lastNomorUrut + 1;
//     }

//     const nomorUrutFormatted = nomorUrut.toString().padStart(3, '0');

//     const nomorFaktur = `NF${tanggal}${nomorUrutFormatted}`;

//     return NextResponse.json(nomorFaktur, { status: 201 })
// }
