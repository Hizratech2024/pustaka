import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.memberTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(res, { status: 200 });
}
