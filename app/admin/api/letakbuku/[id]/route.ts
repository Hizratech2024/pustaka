import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const formData = await request.formData();
  let temukanId = 0;

  const xxx = await prisma.letakBukuTb.findFirst({
    where: {
      bukuId: Number(params.id),
    },
  });

  if (xxx) {
    temukanId = xxx.id;
  }

  await prisma.letakBukuTb.update({
    where: {
      id: Number(temukanId),
    },
    data: {
      rakId: Number(formData.get("rakId")),
    },
  });

  return NextResponse.json({ status: 200, pesan: "berhasil" });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Temukan letakBukuTb berdasarkan id untuk mendapatkan bukuId dan qty
    const letakBuku = await prisma.letakBukuTb.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!letakBuku) {
      return NextResponse.json(
        { error: "Data letak buku tidak ditemukan." },
        { status: 404 }
      );
    }

    const { bukuId, qty } = letakBuku;

    // Tambahkan qty ke stok buku
    await prisma.bukuTb.update({
      where: { id: Number(bukuId) },
      data: {
        qty: {
          increment: qty, // Tambahkan qty ke stok buku
        },
      },
    });

    // Hapus data letakBukuTb
    const deletedLetakBuku = await prisma.letakBukuTb.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json(
      { message: "Data berhasil dihapus dan stok buku diperbarui." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menghapus data." },
      { status: 500 }
    );
  }
};

// export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {

//     const user = await prisma.letakBukuTb.delete({
//         where: {
//             id: Number(params.id)
//         }
//     })
//     return NextResponse.json(user, { status: 200 })
// }
