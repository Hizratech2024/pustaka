import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const formData = await request.formData()

    const pilihkaryawan = JSON.parse(String(formData.get('selected'))) as any[];

    var x = [];
    for (let i = 0; i < pilihkaryawan.length; i++) {
        const cekemail = await prisma.karyawanTb.findUnique({
            where: {
                email: pilihkaryawan[i].email
            },
        })
        if (cekemail) {
            continue;
        }
        const cekhp = await prisma.karyawanTb.findUnique({
            where: {
                hp: pilihkaryawan[i].hp
            },
        })
        if (cekhp) {
            continue;
        }

        await prisma.karyawanTb.create({
            data: {
                nama: pilihkaryawan[i].nama,
                tempatLahir: pilihkaryawan[i].tempatLahir,
                tanggalLahir: pilihkaryawan[i].tanggalLahir,
                alamat: pilihkaryawan[i].alamat,
                hp: pilihkaryawan[i].hp,
                email: pilihkaryawan[i].email,
                UserTb: {
                    create: {
                        usernama: pilihkaryawan[i].email,
                        password: await bcrypt.hash(String(pilihkaryawan[i].password), 10),
                        status: pilihkaryawan[i].status
                    }
                }
            },
            include: {
                UserTb: true
            }
        })
    }

    return NextResponse.json({ pesan: 'berhasil' })
}
