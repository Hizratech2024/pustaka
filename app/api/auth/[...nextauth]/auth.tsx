import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();
const kunci1 = "Bismillahirrahmanirrahim Allahuakbar ZikriAini2628";
const kunci2 =
  "Iikagennishiro Omaee Omaedakega Tsurainanteomounayo Zenin Kimochiwa Onajinanda";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        usernama: {
          label: "Usernama",
          type: "text",
          placeholder: "Usernama",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.usernama || !credentials.password) {
          return null;
        }

        const user = await prisma.userTb.findUnique({
          where: {
            usernama: credentials.usernama,
          },
          include: {
            KaryawanTb: true,
            MemberTb: true,
            SekolahTb: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordDecrypt = CryptoJS.AES.decrypt(
          credentials.password,
          kunci2
        ).toString(CryptoJS.enc.Utf8);

        const password = CryptoJS.AES.decrypt(passwordDecrypt, kunci1).toString(
          CryptoJS.enc.Utf8
        );
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // const karyawanId = user.karyawanId

        // await prisma.logloginTb.create({
        //   data: {
        //     karyawanId: karyawanId
        //   },
        // })

        return {
          id: user.id + "",
          usernama: user.usernama,
          namaKaryawan: user.KaryawanTb?.nama,
          namaMembern: user.MemberTb?.nama,
          hp: user.KaryawanTb?.hp,
          karyawan: user.KaryawanTb,
          sekolah: user.SekolahTb,
          namasekolah: user.SekolahTb?.nama,
          logo: user.SekolahTb?.logo,
          member: user.MemberTb,
          role: user.role,
          sekolahId: user.SekolahTb?.id,
          // karyawanId: user.karyawanId,
          foto: user.KaryawanTb?.foto,
        } as any;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session = token as any;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 60 * 60,
  },
};

