import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { supabaseBUCKET, supabaseUrl } from '../helper'

export default function Header() {
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [foto, setFoto] = useState("")

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

    useEffect(() => {
        reload()
    }, [])

    const reload = async () => {
        try {
            const response = await fetch(`/api/karyawan`);
            const result = await response.json();
            setNama(result.nama)
            setEmail(result.email)
            setFoto(result.foto)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <div className="nav-header">
                <a href="/" className="brand-logo">
                    <img alt="" width="55" height="55" className="logo-abbr" src="/tema/images/logoatas.png" />
                    <img alt="" width="220" height="51" className="brand-title" src="/tema/images/tttc.png" />
                </a>
                <div className="nav-control">
                    <div className="hamburger">
                        <span className="line" />
                        <span className="line" />
                        <span className="line" />
                    </div>
                </div>
            </div>

            <div className="header">
                <div className="header-content">
                    <nav className="navbar navbar-expand">
                        <div className="collapse navbar-collapse justify-content-between">
                            <div className="header-left">
                                <h3 className='pt-2 px-3'>Selamat Datang... <a style={{ fontWeight: 'bold', color: 'red' }}>
                                    {nama}
                                </a>!</h3>
                            </div>
                            <ul className="navbar-nav header-right">
                                <ul className="navbar-nav header-right">

                                    <li className="nav-item dropdown">
                                        <div className="header-profile2">
                                            <a
                                                className="nav-link"
                                                href=""
                                                role="button"
                                                data-bs-toggle="dropdown"
                                            >
                                                <div className="header-info2 d-flex align-items-center">
                                                    <div className="header-media">
                                                        {foto == null ?
                                                            < img
                                                                src="/tema/images/avatar/1.png"
                                                                className="avatar avatar-lg"
                                                                alt=""
                                                            />
                                                            :
                                                            <img
                                                                src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/karyawan/${foto}`}
                                                                className="avatar avatar-lg"
                                                                alt=""
                                                            />
                                                        }
                                                    </div>
                                                    <div className="header-info">
                                                        <h6> {nama}</h6>
                                                        <p> {email}</p>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end">
                                                <div
                                                    id="DZ_W_Notification1"
                                                    className="widget-media dz-scroll p-3 pt-0"
                                                    style={{ width: 200 }}
                                                >
                                                    <ul className="timeline">

                                                        <li>
                                                            <div className="account-setting2">
                                                                <Link href="/profil" className=" ai-icon">
                                                                    <svg
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3154 14.1014 15.6903 13.4763C15.0652 12.8512 14.2173 12.5 13.3333 12.5H6.66658C5.78253 12.5 4.93468 12.8512 4.30956 13.4763C3.68444 14.1014 3.33325 14.9493 3.33325 15.8333V17.5"
                                                                            stroke="black"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M10.0001 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10.0001 2.5C8.15913 2.5 6.66675 3.99238 6.66675 5.83333C6.66675 7.67428 8.15913 9.16667 10.0001 9.16667Z"
                                                                            stroke="black"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <span className="ms-2">Profil</span>
                                                                </Link>
                                                                <Link href="/ubahpassword" className=" ai-icon ">

                                                                    <svg
                                                                        viewBox="0 0 1024 1024"
                                                                        fill="currentColor"
                                                                        width={20}
                                                                        height={20}
                                                                    >
                                                                        <path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z" />
                                                                    </svg>
                                                                    <span className="ms-2">Ubah Password</span>
                                                                </Link>
                                                                <Link href="" className="ai-icon" onClick={tombol}>
                                                                    <svg
                                                                        width={20}
                                                                        height={20}
                                                                        viewBox="0 0 20 20"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
                                                                            stroke="black"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M13.3333 14.1663L17.4999 9.99967L13.3333 5.83301"
                                                                            stroke="black"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                        <path
                                                                            d="M17.5 10H7.5"
                                                                            stroke="black"
                                                                            strokeWidth="1.5"
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                    <span className="ms-2">Logout </span>
                                                                </Link>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}
