import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await prisma.memberTb.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ pesan: "berhasil" });
  } catch (error) {
    console.log("Terjadi Kesalahan di Sisi Server", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}
