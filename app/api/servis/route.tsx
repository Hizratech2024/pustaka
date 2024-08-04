import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()




export const GET = async () => {
    const servis = await prisma.servisTb.findMany({
        orderBy: {
            id: "asc"
        }
    });
    return NextResponse.json(servis, { status: 200 })
}