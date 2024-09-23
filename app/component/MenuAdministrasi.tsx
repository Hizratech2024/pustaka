import Link from "next/link";

export default function MenuAdministrasi() {
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
          {/* <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#produk-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bx bx-planet" />
              <span>Master</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="produk-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
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
          </li> */}
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
              className="nav-content collapse"
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
          <li className="nav-item">
            <Link
              href="/admin/transaksi/peminjaman"
              className="nav-link collapsed"
            >
              <i className="fa-solid fa-book"></i>
              <span>Peminjaman</span>
            </Link>
          </li>
          <li className="nav-heading">Laporan</li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav-laporan"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="fa-solid fa-chart-simple"></i>
              <span>Laporan</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="forms-nav-laporan"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link href="/admin/peminjaman">
                  <i className="bi bi-circle" />
                  <span>Peminjaman</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/pemesanan">
                  <i className="bi bi-circle" />
                  <span>Pemesanan</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
}
