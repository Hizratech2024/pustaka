"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Add from "./action/Add";
import Delete from "./action/Delete";
import Swal from "sweetalert2";
import Update from "./action/Update";
import AddAll from "./action/AddAll";
import { Font } from "@/app/helper";
import Modal from 'react-bootstrap/esm/Modal';
import * as XLSX from 'xlsx';
import axios from "axios";

const Buku = () => {
  const [datakategori, setDatakategori] = useState([]);
  const [databuku, setDatabuku] = useState([]);
  const [kategoriId, setKategoriId] = useState("");
  const [namaKategori, setNamakategori] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [excelData, setExcelData] = useState<string[]>([]);
  const [files, setFiles] = useState(true)
  const [all, setAll] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    clearForm();
  }
  const handleShow = () => setShow(true);

  function clearForm() {
    setFiles(true)
    setExcelData([])
  }

  const [isLoading, setIsLoading] = useState(false)
  if (isLoading) {
    Swal.fire({
      title: "Mohon tunggu!",
      html: "Sedang mengirim data ke server",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

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

  const downloadtemplate = () => {
    const fileName = 'templatebuku.xlsx';
    const fileUrl = `/${fileName}`;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(importedData as string[])
    };
    setFiles(false)
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('selected', JSON.stringify(excelData))

      const xxx = await axios.post(`/admin/api/importbuku`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (xxx.data.pesan === 'berhasil') {
        handleClose();
        reload()
        clearForm()
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Berhasil disimpan',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Buku');
    XLSX.writeFile(workbook, 'Data Buku.xlsx');
  };

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
             {databuku.length > 0 ?
                <div className="row mb-3">
                  <div className="col-md-3">
                    <button type='button' onClick={exportToExcel} className="btn btn-success btn-icon-text">
                      Ekspor ke Excel
                    </button>
                  </div>
                  <div className="col-md-9 d-flex justify-content-end">
                    <li>
                      <button type='button' onClick={downloadtemplate} className="btn btn-primary btn-icon-text mx-2">
                        Download Template
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={handleShow} className="btn btn-info btn-icon-text">
                        Import dari Excel
                      </button>
                    </li>
                  </div>

                </div>
                :
                <div className="row mb-3">
                  <div className="col-md-3">

                  </div>
                  <div className="col-md-9 d-flex justify-content-end">
                    <li>
                      <button type='button' onClick={downloadtemplate} className="btn btn-primary btn-icon-text mx-2">
                        Download Template
                      </button>
                    </li>
                    <li>
                      <button type='button' onClick={handleShow} className="btn btn-info btn-icon-text">
                        Import dari Excel
                      </button>
                    </li>
                  </div>

                </div>
              }
              <Modal
                dialogClassName="modal-xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form
                  onSubmit={handleSubmit}
                >
                  <Modal.Header closeButton>
                    <Modal.Title >Import Data Buku</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="mb-3 row">
                      <div className="col-sm-12">
                        {files ?
                          <div>
                            <input
                              type="file"
                              className="form-control"
                              onChange={handleFileUpload}
                              accept=".xlsx, .xls"
                            />
                          </div>
                          :
                          null
                        }
                      </div>
                      {excelData.length > 0 && (
                        <div className="table-responsive">
                          <table className="table primary-table-bordered">
                            <thead className="thead-success">
                              <tr>
                                <th style={{ fontSize: 17, color: "black" }}>Kode Buku</th>
                                <th style={{ fontSize: 17, color: "black" }}>Judul </th>
                                <th style={{ fontSize: 17, color: "black" }}>Bahasa</th>
                                <th style={{ fontSize: 17, color: "black" }}>Penerbit</th>
                                <th style={{ fontSize: 17, color: "black" }}>Tahun</th>
                                <th style={{ fontSize: 17, color: "black" }}>Penulis</th>
                                <th style={{ fontSize: 17, color: "black" }}>Jumlah</th>
                                <th style={{ fontSize: 17, color: "black" }}>Kategori</th>
                              </tr>
                            </thead>
                            <tbody>
                              {excelData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {Object.values(row).map((cell: any, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                    <button type="submit" className="btn btn-primary light">Simpan</button>
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buku;
