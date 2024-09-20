import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export const GET = async () => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const tanggal = `${year}${month}${day}`;

  const lastTransaksi = await prisma.peminjamanTb.findFirst({
    orderBy: {
      noPeminjaman: "desc",
    },
  });
  let nomorUrut = 1;

  if (lastTransaksi) {
    const lastNomorFaktur = lastTransaksi.noPeminjaman;
    const lastNomorUrut = parseInt(lastNomorFaktur.slice(-3), 10);
    nomorUrut = lastNomorUrut + 1;
  }

  const nomorUrutFormatted = nomorUrut.toString().padStart(3, "0");

  const nomorFaktur = `NP${tanggal}${nomorUrutFormatted}`;

  return NextResponse.json(nomorFaktur, { status: 201 });
};
