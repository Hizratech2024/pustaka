// import {NextAuth} from 'next-auth/next';

// declare module 'next-auth' {
//     interface User {
//         id: Number;
//         usernama: string;
//         nama: string;
//         status: string;
//         hp: string;
//     }
//     interface Session{
//         user?:User;
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         id: Number;
//         usernama: string;
//         nama: string;
//         status: string;
//         hp: string;
//     }
//   }

import { NextAuth } from 'next-auth/next';


declare module "next-auth"{
    interface Session {
        id: Number;
        usernama: String,
        nama: String,
        karyawanId: Number,
        namasekolah: Number,
        status: string;
        foto: string;
    }
}