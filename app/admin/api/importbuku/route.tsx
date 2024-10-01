import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const POST = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const sekolahId = Number(token?.sekolahId);
    const formData = await request.formData()

    const pilihbarang = JSON.parse(String(formData.get('selected'))) as any[];
    let kategoriId = 0
    var x = [];
    for (let i = 0; i < pilihbarang.length; i++) {
        const cekkode = await prisma.bukuTb.findFirst({
            where: {
                kodeBuku: String(pilihbarang[i].kodeBuku),
                sekolahId: sekolahId
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
                sekolahId: sekolahId
            }
        })
        if (xxx) {
            kategoriId = xxx.id
        }
        if (!xxx) {
            const zzz = await prisma.kategoriTb.create({
                data: {
                    nama: pilihbarang[i].kategori,
                    sekolahId: sekolahId
                }
            })
            kategoriId = zzz.id
        }
        x.push({
            judul: pilihbarang[i].judul,
            kodeBuku: String(pilihbarang[i].kodeBuku),
            kategoriId: Number(kategoriId),
            penerbit: pilihbarang[i].penerbit,
            tahunTerbit: String(pilihbarang[i].tahun),
            penulis: (pilihbarang[i].penulis),
            bahasa: (pilihbarang[i].bahasa),
            stok: Number(pilihbarang[i].jumlah),
            stokinput: Number(pilihbarang[i].jumlah),
            stoklemari: Number(pilihbarang[i].jumlah),
            sekolahId: sekolahId
        });
    }

    await prisma.bukuTb.createMany({
        data: x,
    })

    return NextResponse.json({ pesan: 'berhasil' })
}
