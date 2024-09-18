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
  const qty = Number(formData.get("qty"));
  const bukuId = Number(formData.get("bukuId"));
  const idLain = Number(formData.get("IdLain"));
  const rakId = Number(formData.get("rakId"));

  try {
    // Cari buku di rak lain
    const xxx = await prisma.letakBukuTb.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    let jumlah = 0;

    if (xxx) {
      jumlah = xxx.qty;
    }

    if (qty > jumlah) {
      return NextResponse.json({ pesan: "melebihi" });
    }

    const hasil = jumlah - qty;

    // Update stok buku di rak lain
    await prisma.letakBukuTb.update({
      where: {
        id: Number(params.id),
      },
      data: {
        qty: hasil,
      },
    });

    // Cari buku di rak tujuan
    const yyy = await prisma.letakBukuTb.findFirst({
      where: {
        bukuId: bukuId,
        rakId: rakId,
      },
    });

    if (yyy) {
      // Update stok buku di rak tujuan
      await prisma.letakBukuTb.update({
        where: {
          id: yyy.id,
        },
        data: {
          qty: yyy.qty + qty,
        },
      });
    } else {
      // Buat entri baru jika tidak ada
      await prisma.letakBukuTb.create({
        data: {
          bukuId: bukuId,
          rakId: rakId,
          qty: qty,
        },
      });
    }

    return NextResponse.json({ pesan: "berhasil" });
  } catch (error) {
    console.error("Server Error:", error);
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const formData = await request.formData();
  const qty = Number(formData.get("qty"));
  const bukuId = Number(formData.get("bukuId"));

  let jumlah = 0;

  await prisma.letakBukuTb.delete({
    where: {
      id: Number(params.id),
    },
  });

  const xxx = await prisma.bukuTb.findUnique({
    where: {
      id: bukuId,
    },
  });

  if (xxx) {
    jumlah = xxx.qty;
  }

  const hasil = jumlah + qty;

  await prisma.bukuTb.update({
    where: {
      id: bukuId,
    },
    data: {
      qty: hasil,
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
};
