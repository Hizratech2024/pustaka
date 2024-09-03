import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const POST = async (request: Request) => {
    const formData = await request.formData()

    await prisma.servisTb.create({
        data: {
            kodeServis:String(formData.get('noservis')),
            tanggal:String(formData.get('tanggal')),
            karyawanId: Number(formData.get('namaTeknisi')),
            nama: String(formData.get('nama')),
            alamat: String(formData.get('alamat')),
            hp: String(formData.get('hp')),
            namaBarang: String(formData.get('namaBarang')),
            noSeri: String(formData.get('noseri')),
            perlengkapan: String(formData.get('perlengkapan')),
            jenis: String(formData.get('jenis')),
            detailSoftware: String(formData.get('software')),
            detailHardware: String(formData.get('hardware')),
            status: String(formData.get('status')),
        }
    })

    return NextResponse.json({ pesan: 'berhasil' })
}


export const GET = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
      })
      const karyawanId = Number(token!.karyawanId);

    const servis = await prisma.servisTb.findMany({
        where:{
            karyawanId: karyawanId
        },
        orderBy: {
            id: "asc"
        },
        include:{
            KaryawanTb:true
        }
    });
    return NextResponse.json(servis, { status: 200 })
}