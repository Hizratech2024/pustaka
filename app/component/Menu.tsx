import Link from "next/link";
import { signOut } from 'next-auth/react'
import React from 'react'
import Swal from 'sweetalert2';

export default function Menu() {
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
                <svg width={25} height={24} viewBox="0 0 640 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z" /> </svg>

              </div>
              <span className="nav-text">Master</span>
            </a>
            <ul aria-expanded="false" id="master">
              <li className="mini-dashboard">Master</li>
              <li>
                <Link href="/admin/kategori">Kategori</Link>
              </li>
              <li>
                <Link href="/admin/buku">Buku</Link>
              </li>
              <li>
                <Link href="/admin/lemari">Lemari</Link>
              </li>
              <li>
                <Link href="/admin/rak">Rak</Link>
              </li>
              <li>
                <Link href="/admin/letakbuku">Letak Buku</Link>
              </li>
            </ul>
          </li>

          <li>
            <a href="#karyawan" className="has-arrow " aria-expanded="false">
              <div className="menu-icon">
                <svg width={25} height={24} viewBox="0 0 640 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>

              </div>
              <span className="nav-text">User</span>
            </a>
            <ul aria-expanded="false" id="karyawan">
              <li className="mini-dashboard">User</li>
              <li>
                <Link href="/admin/karyawan">Karyawan</Link>
              </li>
              <li>
                <Link href="/admin/member">Member</Link>
              </li>
            </ul>
          </li>

          <li className="menu-title">Transaksi</li>
          <li>
            <Link href="/admin/transaksi/peminjaman " className="" aria-expanded="false">
              <div className="menu-icon">
                <svg
                  viewBox="0 0 700 1000"
                  fill="currentColor"
                  width={25} height={24}
                >
                 <path d="M682 256c12 5.333 18 14.667 18 28v562c0 9.333-4 17.667-12 25-8 7.333-17.333 11-28 11-30.667 0-46-12-46-36V324c0-8-4-14-12-18L198 90c-21.333-6.667-44-3.333-68 10-29.333 13.333-48 28-56 44l408 228c12 5.333 18 14.667 18 28v550c0 14.667-6 24-18 28-4 2.667-9.333 4-16 4-9.333 0-16-1.333-20-4-5.333-4-72.667-46.333-202-127S44 726.667 32 720c-17.333-12-26-23.333-26-34L0 162c0-18.667 4.667-36 14-52 18.667-30.667 52.667-56.333 102-77s88-23.667 116-9l450 232" />
                 </svg> </div>
              <span className="nav-text">Peminjaman</span>
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
                <Link href="/admin/labapenjualan">Laporan Laba</Link>
              </li>
              <li>
                <Link href="/admin/laporanservis">Laporan Servis</Link>
              </li>
            </ul>
          </li>

        </ul>
        {/* <div className="switch-btn">
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
        </div> */}
      </div>
    </div>
  );
}
