import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const cekusernama = await prisma.userTb.findUnique({
    where: {
      usernama: String(formData.get("usernama")),
    },
  });

  const cekemail = await prisma.karyawanTb.findUnique({
    where: {
      email: String(formData.get("email")),
    },
  });

  const cekhp = await prisma.karyawanTb.findUnique({
    where: {
      hp: String(formData.get("hp")),
    },
  });

  if (cekusernama) {
    return NextResponse.json({ pesan: "usernama ada" });
  }

  if (cekemail) {
    return NextResponse.json({ pesan: "Email sudah ada" });
  }
  if (cekhp) {
    return NextResponse.json({ pesan: "No Hp sudah ada" });
  }

  await prisma.userTb.create({
    data: {
      nama: String(formData.get("nama")),
      usernama: String(formData.get("usernama")),
      password: await bcrypt.hash(String(formData.get("password")), 10),
      role: String(formData.get("status")),
      KaryawanTb: {
        create: {
          nama: String(formData.get("nama")),
          tempatLahir: String(formData.get("tempatlahir")),
          tanggalLahir: String(formData.get("tanggallahir")),
          alamat: String(formData.get("alamat")),
          hp: String(formData.get("hp")),
          email: String(formData.get("email")),
        },
      },
    },
    include: {
      KaryawanTb: true,
    },
  });
  return NextResponse.json({ pesan: "berhasil" });
};

export const GET = async () => {
  const karyawan = await prisma.userTb.findMany({
    where: {
      NOT: {
        OR: [
          {
            role: {
              equals: "Admin",
              mode: "insensitive",
            },
          },
          {
            role: {
              equals: "Member",
              mode: "insensitive",
            },
          },
        ],
      },
    },
    orderBy: {
      id: "asc",
    },
    include: {
      KaryawanTb: true,
    },
  });
  return NextResponse.json(karyawan, { status: 200 });
};
