"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Add from "./action/Add";
import Delete from "./action/Delete";
import Swal from "sweetalert2";
import Update from "./action/Update";
import { Font } from "@/app/helper";

const LetakBuku = () => {
  const [dataletakbuku, setDataLetakBuku] = useState([]);
  const [dataletakbukuterpilih, setDataLetakBukuterpilih] = useState([]);
  const [databuku, setDataBuku] = useState([]);
  const [datalemari, setDatalemari] = useState([]);
  const [datarak, setDatarak] = useState([]);
  const [datarakterpilih, setDatarakterpilih] = useState([]);
  const [lemariId, setLemariId] = useState("");
  const [rakId, setRakId] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [all, setAll] = useState(false);

  const montserrat = Font();

  useEffect(() => {
    reload();
    reloadlemari();
    reloadbuku();
    reloadrak();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/letakbuku`);
      const result = await response.json();
      setDataLetakBuku(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reloadlemari = async () => {
    try {
      const response = await fetch(`/admin/api/lemari`);
      const result = await response.json();
      setDatalemari(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reloadrak = async () => {
    try {
      const response = await fetch(`/admin/api/rak`);
      const result = await response.json();
      setDatarak(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reloadbuku = async () => {
    try {
      const response = await fetch(`/admin/api/buku`);
      const result = await response.json();
      setDataBuku(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reloadtabel = async (rakId: any) => {
    const response = await fetch(`/admin/api/letakbuku`);
    const result = await response.json();
    const xxx = result.filter((item: any) => item.rakId == Number(rakId));
    setDataLetakBukuterpilih(xxx);
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = all
    ? dataletakbuku.filter(
        (item: any) =>
          item.BukuTb.judul &&
          item.BukuTb.judul.toLowerCase().includes(filterText.toLowerCase())
      )
    : dataletakbukuterpilih;

  const handlelemari = (e: any) => {
    const selectedValue = e.target.value;
    setLemariId(selectedValue);
    setRakId("");
    setFilterText("");
    setAll(false);

    const xxx = datarak.filter(
      (item: any) => item.lemariId == Number(selectedValue)
    );
    setDatarakterpilih(xxx);

    setDataLetakBukuterpilih([]);
  };

  const handlerak = (e: any) => {
    const selectedValue = e.target.value;
    setRakId(selectedValue);
    const xxx = dataletakbuku.filter(
      (item: any) => item.rakId == Number(selectedValue)
    );
    setDataLetakBukuterpilih(xxx);
  };

  const handlechange = (e: any) => {
    const selectedValue = e.target.value;
    setFilterText(selectedValue);
    setLemariId("");
    setRakId("");
    setDataLetakBukuterpilih([]);

    if (selectedValue !== "") {
      setAll(true);
    } else {
      setAll(false);
    }
  };

  const columns = !all
    ? [
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
          selector: (row: any) => row.BukuTb.judul,
          sortable: true,
        },
        {
          name: "Penerbit",
          selector: (row: any) => row.BukuTb.penerbit,
          sortable: true,
        },
        {
          name: "Penulis",
          selector: (row: any) => row.BukuTb.penulis,
          sortable: true,
        },
        {
          name: "Jumlah",
          selector: (row: any) => row.qty,
          sortable: true,
        },
        {
          name: "Action",
          cell: (row: any) => (
            <div className="d-flex">
              <Delete
                letakbukuId={row.id}
                reload={reload}
                reloadtabel={reloadtabel}
                qty={row.qty}
                bukuId={row.bukuId}
                rakId={row.rakId}
                reloadbuku={reloadbuku}
              />
            </div>
          ),
        },
      ]
    : [
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
          selector: (row: any) => row.BukuTb.judul,
          sortable: true,
        },
        {
          name: "Penerbit",
          selector: (row: any) => row.BukuTb.penerbit,
          sortable: true,
        },
        {
          name: "Jumlah",
          selector: (row: any) => row.qty,
          sortable: true,
        },
        {
          name: "Lemari",
          selector: (row: any) => row.RakTb.LemariTb.nama,
          sortable: true,
        },
        {
          name: "Rak",
          selector: (row: any) => row.RakTb.nama,
          sortable: true,
        },
        {
          name: "Action",
          cell: (row: any) => (
            <div className="d-flex">
              <Delete
                letakbukuId={row.id}
                reload={reload}
                reloadtabel={reloadtabel}
                qty={row.qty}
                bukuId={row.bukuId}
                rakId={row.rakId}
                reloadbuku={reloadbuku}
              />
            </div>
          ),
        },
      ];

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="card-title col-md-5">
                  {/* <h6 className="card-title" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Data Lemari</h6> */}
                </div>

                <div className="card-title col-md-3">
                  <div className="row">
                    <div className="col-md-12">
                      <h6
                        className={`form-label ${montserrat.className}`}
                        style={{ fontWeight: "600" }}
                      >
                        Lemari
                      </h6>
                      <select
                        required
                        className="form-control"
                        value={lemariId}
                        onChange={handlelemari}
                      >
                        <option value="" disabled={!!lemariId}>
                          Pilih Lemari
                        </option>
                        {datalemari.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {item.nama}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="card-title col-md-3">
                  <div className="row">
                    <div className="col-md-12">
                      <h6
                        className={`form-label ${montserrat.className}`}
                        style={{ fontWeight: "600" }}
                      >
                        Rak
                      </h6>
                      {lemariId === "" ? (
                        <select
                          required
                          className="form-control"
                          value={rakId}
                          onChange={handlerak}
                        >
                          <option value="">Menunggu pilih lemari</option>
                        </select>
                      ) : (
                        <select
                          required
                          className="form-control"
                          value={rakId}
                          onChange={handlerak}
                        >
                          <option value="" disabled={!!rakId}>
                            Pilih Rak
                          </option>
                          {datarakterpilih.map((item: any) => (
                            <option key={item.id} value={item.id}>
                              {item.nama}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text">
                      <i className="mdi mdi-magnify"></i>
                    </span>
                    <input
                      // autoFocus
                      id="search"
                      type="text"
                      placeholder="Search..."
                      aria-label="Search Input"
                      value={filterText}
                      onChange={handlechange}
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
                      // fontSize: 15,
                    },
                  },
                }}
              />
              <Add
                reload={reload}
                rakId={rakId}
                buku={databuku}
                dataAll={dataletakbuku}
                reloadtabel={reloadtabel}
                reloadbuku={reloadbuku}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetakBuku;
