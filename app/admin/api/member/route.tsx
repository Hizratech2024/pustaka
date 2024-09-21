import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();

  const cekusernama = await prisma.userTb.findUnique({
    where: {
      usernama: String(formData.get("usernama")),
    },
  });

  const cekemail = await prisma.memberTb.findUnique({
    where: {
      email: String(formData.get("email")),
    },
  });

  const cekhp = await prisma.memberTb.findUnique({
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
      usernama: String(formData.get("username")),
      password: await bcrypt.hash(String(formData.get("password")), 10),
      role: "member",
      MemberTb: {
        create: {
          nama: String(formData.get("nama")),
          nis: Number(formData.get("nis")),
          tempatLahir: String(formData.get("tempatLahir")),
          tanggalLahir: String(formData.get("tanggalLahir")),
          alamat: String(formData.get("alamat")),
          hp: String(formData.get("nope")),
          email: String(formData.get("email")),
          status: String(formData.get("status")),
        },
      },
    },
    include: {
      MemberTb: true,
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}

export async function GET() {
  const res = await prisma.memberTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(res, { status: 200 });
}
