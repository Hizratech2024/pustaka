import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const sekolahId = Number(token?.sekolahId);

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

  const ceknis = await prisma.memberTb.findUnique({
    where: {
      nis: String(formData.get("nis")),
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
  if (ceknis) {
    return NextResponse.json({ pesan: "Nomor Identitas sudah ada" });
  }

  await prisma.userTb.create({
    data: {
      nama: String(formData.get("nama")),
      usernama: String(formData.get("usernama")),
      password: await bcrypt.hash(String(formData.get("password")), 10),
      role: "Member",
      MemberTb: {
        create: {
          nama: String(formData.get("nama")),
          nis: String(formData.get("nis")),
          tempatLahir: String(formData.get("tempatLahir")),
          tanggalLahir: String(formData.get("tanggalLahir")),
          alamat: String(formData.get("alamat")),
          hp: String(formData.get("nope")),
          email: String(formData.get("email")),
          status: String(formData.get("status")),
          sekolahId: sekolahId,
        },
      },
    },
    include: {
      MemberTb: true,
    },
  });

  return NextResponse.json({ pesan: "berhasil" });
}

export const GET = async (request: NextRequest) => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const sekolahId = Number(token?.sekolahId);

  const members = await prisma.memberTb.findMany({
    where: {
      sekolahId: sekolahId
    },
    orderBy: {
      id: "asc",
    },
    include: {
      UserTb: true,
    },
  });
  return NextResponse.json(members, { status: 200 });
};
