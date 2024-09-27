"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Add from "./action/Add";
import Delete from "./action/Delete";
import Swal from "sweetalert2";
import Update from "./action/Update";
import AddAll from "./action/AddAll";
import { Font } from "@/app/helper";

const Buku = () => {
  const [datakategori, setDatakategori] = useState([]);
  const [databuku, setDatabuku] = useState([]);
  const [kategoriId, setKategoriId] = useState("");
  const [namaKategori, setNamakategori] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [all, setAll] = useState(false);

  const montserrat = Font();

  useEffect(() => {
    reload();
    reloadkategori();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/buku`);
      const result = await response.json();
      setDatabuku(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reloadkategori = async () => {
    try {
      const response = await fetch(`/admin/api/kategori`);
      const result = await response.json();
      setDatakategori(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = all
    ? databuku
    : databuku.filter((item: any) => item.kategoriId == Number(kategoriId));

  const handlekategori = (e: any) => {
    const selectedValue = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const selectedText = e.target.options[selectedIndex].text;

    setKategoriId(selectedValue);
    setNamakategori(selectedText);
    if (selectedValue === "Semua Data") {
      setAll(true);
    } else {
      setAll(false);
    }
  };

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
      name: "Judul Buku",
      selector: (row: any) => row.judul,
      sortable: true,
    },
    {
      name: "Penerbit",
      selector: (row: any) => row.penerbit,
      sortable: true,
    },
    {
      name: "Tahun Terbit",
      selector: (row: any) => row.tahunTerbit,
      sortable: true,
    },
    {
      name: "Penulis",
      selector: (row: any) => row.penulis,
      sortable: true,
    },
    ...(kategoriId === "Semua Data"
      ? [
          {
            name: "Kategori",
            selector: (row: any) => row.KategoriTb?.nama,
            sortable: true,
          },
        ]
      : []),
    {
      name: "Action",
      cell: (row: any) => (
        <div className="d-flex">
          <Update buku={row} reload={reload} />
          <Delete bukuId={row.id} reload={reload} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title col-md-6 mt-2">
                <div className="row">
                  <div className="col-md-3">
                  <h6
                className={`card-title ${montserrat.className}`}
                style={{ fontSize: "17px", color: "#333", fontWeight: "600" }}
              >
                      Kategori
                    </h6>
                  </div>
                  <div className="col-md-6">
                    <select
                      autoFocus
                      required
                      className="form-control"
                      value={kategoriId}
                      onChange={handlekategori}
                    >
                      <option value="" disabled={!!kategoriId}>
                        Pilih Kategori
                      </option>
                      <option value="Semua Data" style={{ fontWeight: "bold" }}>
                        Semua Kategori
                      </option>
                      {datakategori.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                {/* <div className="col-md-3">
                                    <select
                                        autoFocus
                                        required
                                        className="form-control"
                                        value={kategoriId} onChange={handlekategori}
                                    >
                                        <option value="" disabled={!!kategoriId}>Pilih Kategori</option>
                                        <option value="Semua Data" style={{ fontWeight: 'bold' }}>Semua Kategori</option>
                                        {datakategori.map((item: any) => (
                                            <option key={item.id} value={item.id} >
                                                {item.nama}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}
                <div className="col-md-3">
                  <AddAll
                    reload={reload}
                    kategori={datakategori}
                    pilihkategoriId={kategoriId}
                  />
                  <Add
                    reload={reload}
                    kategoriId={kategoriId}
                    namakategori={namaKategori}
                  />
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
                      // fontSize: 15,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buku;
