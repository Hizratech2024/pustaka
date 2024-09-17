import Link from "next/link";

export default function Menu() {

    return (
        <div className="deznav">
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-heading">Home</li>
                    <li className="nav-item">
                        <Link className="nav-link " href="/">
                            <i className="bi bi-grid" />
                            <span>Dashboard</span>
                        </Link>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#produk-nav" data-bs-toggle="collapse" href="#">
                            <i className="bx bx-planet" />
                            <span>Master</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul id="produk-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/admin/kategori">
                                    <i className="bi bi-circle" />
                                    <span>Kategori</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/buku">
                                    <i className="bi bi-circle" />
                                    <span>Buku</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/lemari">
                                    <i className="bi bi-circle" />
                                    <span>Lemari</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/rak">
                                    <i className="bi bi-circle" />
                                    <span>Rak</span>
                                </Link>
                            </li>



                            <li>
                                <Link href="/admin/letakbuku">
                                    <i className="bi bi-circle" />
                                    <span>Letak Buku</span>
                                </Link>
                            </li>
                            

                        </ul>
                    </li>
                    {/* End Components Nav */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            data-bs-target="#forms-nav"
                            data-bs-toggle="collapse"
                            href="#"
                        >
                            <i className="bx bxs-user" />
                            <span>User</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul
                            id="forms-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <Link href="/admin/karyawan">
                                    <i className="bi bi-circle" />
                                    <span>Karyawan</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/member">
                                    <i className="bi bi-circle" />
                                    <span>Member</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-heading">Transaksi</li>
                    {/* End Forms Nav */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            data-bs-target="#tables-nav"
                            data-bs-toggle="collapse"
                            href="#"
                        >
                            <i className="bi bi-layout-text-window-reverse" />
                            <span>Tables</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul
                            id="tables-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <a href="tables-general.html">
                                    <i className="bi bi-circle" />
                                    <span>General Tables</span>
                                </a>
                            </li>
                            <li>
                                <a href="tables-data.html">
                                    <i className="bi bi-circle" />
                                    <span>Data Tables</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* End Tables Nav */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            data-bs-target="#charts-nav"
                            data-bs-toggle="collapse"
                            href="#"
                        >
                            <i className="bi bi-bar-chart" />
                            <span>Charts</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul
                            id="charts-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <a href="charts-chartjs.html">
                                    <i className="bi bi-circle" />
                                    <span>Chart.js</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-apexcharts.html">
                                    <i className="bi bi-circle" />
                                    <span>ApexCharts</span>
                                </a>
                            </li>
                            <li>
                                <a href="charts-echarts.html">
                                    <i className="bi bi-circle" />
                                    <span>ECharts</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* End Charts Nav */}
                    <li className="nav-item">
                        <a
                            className="nav-link collapsed"
                            data-bs-target="#icons-nav"
                            data-bs-toggle="collapse"
                            href="#"
                        >
                            <i className="bi bi-gem" />
                            <span>Icons</span>
                            <i className="bi bi-chevron-down ms-auto" />
                        </a>
                        <ul
                            id="icons-nav"
                            className="nav-content collapse "
                            data-bs-parent="#sidebar-nav"
                        >
                            <li>
                                <a href="icons-bootstrap.html">
                                    <i className="bi bi-circle" />
                                    <span>Bootstrap Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-remix.html">
                                    <i className="bi bi-circle" />
                                    <span>Remix Icons</span>
                                </a>
                            </li>
                            <li>
                                <a href="icons-boxicons.html">
                                    <i className="bi bi-circle" />
                                    <span>Boxicons</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* End Icons Nav */}
                    <li className="nav-heading">Laporan</li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="users-profile.html">
                            <i className="bi bi-bar-chart" />
                            <span>Laporan</span>
                        </a>
                    </li>
                    {/* End Profile Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-faq.html">
                            <i className="bi bi-question-circle" />
                            <span>F.A.Q</span>
                        </a>
                    </li>
                    {/* End F.A.Q Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-contact.html">
                            <i className="bi bi-envelope" />
                            <span>Contact</span>
                        </a>
                    </li>
                    {/* End Contact Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-register.html">
                            <i className="bi bi-card-list" />
                            <span>Register</span>
                        </a>
                    </li>
                    {/* End Register Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-login.html">
                            <i className="bi bi-box-arrow-in-right" />
                            <span>Login</span>
                        </a>
                    </li>
                    {/* End Login Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-error-404.html">
                            <i className="bi bi-dash-circle" />
                            <span>Error 404</span>
                        </a>
                    </li>
                    {/* End Error 404 Page Nav */}
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="pages-blank.html">
                            <i className="bi bi-file-earmark" />
                            <span>Blank</span>
                        </a>
                    </li>
                    {/* End Blank Page Nav */}
                </ul>
            </aside>

        </div>
    )
}
