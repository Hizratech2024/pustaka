import Link from "next/link";
import Buttonlogout from "./Buttonlogout";
import { signOut } from 'next-auth/react'
import React from 'react'
import Swal from 'sweetalert2';

export default function MenuAdmin() {
    function tombol() {
        Swal.fire({
            title: "Anda Yakin..?",
            text: "Logout dari akun ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, logout sekarang!"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut()
            }
        });
    }

    return (
        <div className="deznav">
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <li className="menu-title">System</li>
                    <li>
                        <Link href="/" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                    <path d="M3.29077 9L12.2908 2L21.2908 9V20C21.2908 20.5304 21.0801 21.0391 20.705 21.4142C20.3299 21.7893 19.8212 22 19.2908 22H5.29077C4.76034 22 4.25163 21.7893 3.87656 21.4142C3.50149 21.0391 3.29077 20.5304 3.29077 20V9Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.29077 22V12H15.2908V22" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.29077 6.5C3.29077 3.87479 3.31888 3 6.79077 3C10.2627 3 10.2908 3.87479 10.2908 6.5C10.2908 9.12521 10.3018 10 6.79077 10C3.2797 10 3.29077 9.12521 3.29077 6.5Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.2908 6.5C14.2908 3.87479 14.3189 3 17.7908 3C21.2627 3 21.2908 3.87479 21.2908 6.5C21.2908 9.12521 21.3018 10 17.7908 10C14.2797 10 14.2908 9.12521 14.2908 6.5Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.29077 17.5C3.29077 14.8748 3.31888 14 6.79077 14C10.2627 14 10.2908 14.8748 10.2908 17.5C10.2908 20.1252 10.3018 21 6.79077 21C3.2797 21 3.29077 20.1252 3.29077 17.5Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.2908 17.5C14.2908 14.8748 14.3189 14 17.7908 14C21.2627 14 21.2908 14.8748 21.2908 17.5C21.2908 20.1252 21.3018 21 17.7908 21C14.2797 21 14.2908 20.1252 14.2908 17.5Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <span className="nav-text">Master</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Master</li>
                            <li>
                                <Link href="/admin/kategori">Kategori</Link>
                            </li>
                            <li>
                                <Link href="/admin/produk">Produk</Link>
                            </li>
                            <li>
                                <Link href="/admin/karyawan">Karyawan</Link>
                            </li>
                        </ul>
                    </li>

                    <li className="menu-title">Transaksi</li>
                    <li>
                        <Link href="/admin/tambahstok" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    viewBox="0 0 500 500"
                                    fill="currentColor"
                                    width={25} height={24}
                                >
                                    <path d="M208 416 A32 32 0 0 1 176 448 A32 32 0 0 1 144 416 A32 32 0 0 1 208 416 z" />
                                    <path d="M432 416 A32 32 0 0 1 400 448 A32 32 0 0 1 368 416 A32 32 0 0 1 432 416 z" />
                                    <path d="M167.78 304h261.34l38.4-192H133.89l-8.47-48H32v32h66.58l48 272H432v-32H173.42l-5.64-32z" /> </svg>
                            </div>
                            <span className="nav-text">Tambah Stok</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/kasir/transaksi" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    viewBox="0 0 500 500"
                                    fill="currentColor"
                                    width={25} height={24}
                                >
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M64 64 H448 A32 32 0 0 1 480 96 V352 A32 32 0 0 1 448 384 H64 A32 32 0 0 1 32 352 V96 A32 32 0 0 1 64 64 z"
                                    />
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M304 448l-8-64h-80l-8 64h96z"
                                    />
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={32}
                                        d="M368 448H144"
                                    />
                                    <path d="M32 304v48a32.09 32.09 0 0032 32h384a32.09 32.09 0 0032-32v-48zm224 64a16 16 0 1116-16 16 16 0 01-16 16z" />
                                </svg>
                            </div>
                            <span className="nav-text">Kasir</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/kasir/jasaservis" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    viewBox="0 0 550 500"
                                    fill="currentColor"
                                    width={25} height={24}
                                >
                                    <path d="M570.9 372.3c-11.3 14.2-38.8 24.3-38.8 24.3L327 470.2v-54.3l150.9-53.8c17.1-6.1 19.8-14.8 5.8-19.4-13.9-4.6-39.1-3.3-56.2 2.9L327 381.1v-56.4c23.2-7.8 47.1-13.6 75.7-16.8 40.9-4.5 90.9.6 130.2 15.5 44.2 14 49.2 34.7 38 48.9zm-224.4-92.5v-139c0-16.3-3-31.3-18.3-35.6-11.7-3.8-19 7.1-19 23.4v347.9l-93.8-29.8V32c39.9 7.4 98 24.9 129.2 35.4C424.1 94.7 451 128.7 451 205.2c0 74.5-46 102.8-104.5 74.6zM43.2 410.2c-45.4-12.8-53-39.5-32.3-54.8 19.1-14.2 51.7-24.9 51.7-24.9l134.5-47.8v54.5l-96.8 34.6c-17.1 6.1-19.7 14.8-5.8 19.4 13.9 4.6 39.1 3.3 56.2-2.9l46.4-16.9v48.8c-51.6 9.3-101.4 7.3-153.9-10z" />
                                </svg>
                            </div>
                            <span className="nav-text">Pembayaran Servis</span>
                        </Link>
                    </li>

                    <li className="menu-title">Laporan</li>
                    <li>
                        <a href="#laporan" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.5687 13.8887C18.2435 13.8887 18.8098 14.4455 18.7066 15.1118C18.1013 19.0318 14.7456 21.9423 10.6982 21.9423C6.22029 21.9423 2.59082 18.3129 2.59082 13.836C2.59082 10.1476 5.39293 6.71181 8.54766 5.93497C9.22556 5.7676 9.92029 6.24445 9.92029 6.94234C9.92029 11.6708 10.0792 12.8939 10.9771 13.5592C11.875 14.2244 12.9308 13.8887 17.5687 13.8887Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M21.9834 9.95121C22.0371 6.91331 18.3055 2.01647 13.7581 2.10068C13.4045 2.107 13.1213 2.40173 13.1055 2.75437C12.9908 5.25226 13.1455 8.4891 13.2318 9.95647C13.2581 10.4133 13.6171 10.7723 14.0729 10.7986C15.5813 10.8849 18.936 11.0028 21.3981 10.6302C21.7329 10.5796 21.9781 10.2891 21.9834 9.95121Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>

                            </div>
                            <span className="nav-text">Laporan</span>
                        </a>
                        <ul aria-expanded="false" id="laporan">
                            <li className="mini-dashboard">Laporan</li>

                            <li>
                                <Link href="/admin/penjualan">Laporan Penjualan</Link>
                            </li>
                            <li>
                                <Link href="/admin/labapenjualan">Laporan Laba Penjualan</Link>
                            </li>
                        </ul>
                    </li>

                </ul>
                <div className="switch-btn">
                    <Link href="" onClick={tombol} >
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.36 6.63965C19.6184 7.89844 20.4753 9.50209 20.8223 11.2478C21.1693 12.9936 20.9909 14.803 20.3096 16.4474C19.6284 18.0918 18.4748 19.4972 16.9948 20.486C15.5148 21.4748 13.7749 22.0026 11.995 22.0026C10.2151 22.0026 8.47515 21.4748 6.99517 20.486C5.51519 19.4972 4.36164 18.0918 3.68036 16.4474C2.99909 14.803 2.82069 12.9936 3.16772 11.2478C3.51475 9.50209 4.37162 7.89844 5.63 6.63965"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 2V12"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="nav-text">Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
