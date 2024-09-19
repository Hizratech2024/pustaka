"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Laporan = () => {
  const [peminjaman, setPeminjaman] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const res = await axios.get("admin/api/peminjaman");
      const hasil = res.data;
      setPeminjaman(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan Saat Fetching Data", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = peminjaman.filter(
    (item: any) =>
      item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "No",
      cell: (row: any, index: number) => (
        <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Nama Peminjam",
      selector: (row: any) => row.PeminjamanTb.MemberTb.nama,
      sortable: true,
    },
    {
      name: "Kode Buku",
      selector: (row: any) => row.BukuTb.kodeBuku,
      sortable: true,
    },
    {
      name: "Judul Buku",
      selector: (row: any) => row.row.BukuTb.judul,
      sortable: true,
    },
    {
      name: "Jumlah Buku",
      selector: (row: any) => row.PeminjamanTb.totalItem,
      sortable: true,
    },
    {
      name: "Tanggal Peminjaman",
      selector: (row: any) => row.PeminjamanTb.tanggalPeminjaman,
      sortable: true,
    },
    {
      name: "Tanggal Pengembalian",
      selector: (row: any) => row.PeminjamanTb.tanggalPengembalian,
      sortable: true,
    },
    {
      name: "Batas Waktu",
      selector: (row: any) => row.PeminjamanTb.batasWaktu,
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: (row: any) => row.PeminjamanTb.keterangan,
      sortable: true,
    },
    {
      name: "Denda",
      cell: (row: any) => {
        const batasWaktu = new Date(row.PeminjamanTb.batasWaktu);
        const tanggalPengembalian = row.PeminjamanTb.tanggalPengembalian
          ? new Date(row.PeminjamanTb.tanggalPengembalian)
          : new Date(); // Jika belum dikembalikan, gunakan tanggal hari ini
        const dendaPerHari = row.PeminjamanTb.denda;
        let denda = 0;

        // Hitung jumlah hari keterlambatan
        if (tanggalPengembalian > batasWaktu) {
          const selisihWaktu =
            tanggalPengembalian.getTime() - batasWaktu.getTime();
          const hariTerlambat = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24)); // Konversi milidetik ke hari
          denda = hariTerlambat * dendaPerHari;
        }

        return denda > 0 ? `Rp ${denda.toLocaleString()}` : "Tidak Ada Denda";
      },
      sortable: false,
    },
    {
      name: "Action",
      cell: (row: any) => <div className="d-flex"></div>,
      width: "150px",
    },
  ];
  return (
    <>
      <div>
        <div className="pagetitle bg-white p-3 rounded shadow-sm flex items-center">
          <nav>
            <ol className="breadcrumb flex items-center">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Laporan</li>
              <li className="breadcrumb-item active">Peminjaman</li>
            </ol>
          </nav>
          <h3>Peminjaman</h3>
        </div>
      </div>
      <div className="bg-white p-3 rounded shadow-sm mt-3">
        <div className="row mb-3">
          <div className="col-md-3 ms-auto">
            <div className="input-group mb-3 input-success">
              <span className="input-group-text">
                <i className="mdi mdi-magnify"></i>
              </span>
              <input
                id="search"
                type="text"
                placeholder="Search..."
                aria-label="Search Input"
                // value={filterText}
                // onChange={(e: any) => setFilterText(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          persistTableHead
          responsive
          paginationPerPage={itemsPerPage}
          paginationTotalRows={filteredItems.length}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationRowsPerPageOptions={[5, 10, 20]}
          customStyles={{
            headRow: {
              style: {
                backgroundColor: "#53d0b2",
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Laporan;
