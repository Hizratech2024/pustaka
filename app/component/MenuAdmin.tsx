import Link from "next/link";
import Buttonlogout from "./Buttonlogout";

export default function MenuAdmin() {

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
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    width={25} height={24}
                                >
                                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                </svg>
                            </div>
                            <span className="nav-text">Tambah Stok</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/kasir/transaksi" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    width={25} height={24}
                                >
                                    <path
                                        fill="none"
                                        d="M6 14.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 016 14.5zM16 14.5a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 0116 14.5zM16 8V2H4a1 1 0 00-1-1H0v1h2l.751 6.438A2 2 0 004 12h12v-1H4a1 1 0 01-1-1v-.01L16 8z"
                                    />
                                </svg>
                            </div>
                            <span className="nav-text">Kasir</span>
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
                    <Link href="">
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
                        <span><Buttonlogout /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
