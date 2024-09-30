import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcrypt"
import { supabase,supabaseBUCKET } from "@/app/helper"


const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
 

    const sekolah = await prisma.sekolahTb.findUnique({
        where:{
            id:Number(params.id)
        },
    })
    return NextResponse.json(sekolah, { status: 201 })
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {

        const formData = await request.formData()

        const ceknspn = await prisma.sekolahTb.findMany({
            where: {
                npsn: String(formData.get('nspn')),
                NOT: {
                    id: Number(params.id)
                }
            }
        })

        if (ceknspn.length > 0) {
            return NextResponse.json({ status: 556, pesan: "sudah ada nspn" })
        }

        await prisma.sekolahTb.update({
            where: {
                id: Number(params.id)
            },
            data: {
                nama: String(formData.get('nama')),
                npsn: String(formData.get('npsn')),
                alamat: String(formData.get('alamat')),
                email: String(formData.get('email')),
                telp: String(formData.get('telp')),
                hp: String(formData.get('hp')),
            }
        })

        if (formData.get('newfoto') === 'yes') {

            await prisma.sekolahTb.update({
                where: {
                    id: Number(params.id)
                },
                data: {
                    logo: String(formData.get('namaunik')),
                }
            })
        }      

        return NextResponse.json({ status: 200, pesan: "berhasil" })

}

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

    await prisma.slideTb.delete({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json({ status: 200 })
}

