"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';
import { rupiah } from '@/app/helper';
import * as XLSX from 'xlsx';
import Modal from 'react-bootstrap/esm/Modal';
import axios from 'axios';
import Swal from 'sweetalert2';

const Produk = () => {

  const [databarang, setDatabarang] = useState([])
  const [datakategori, setDatakategori] = useState([])
  const [filterText, setFilterText] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [excelData, setExcelData] = useState<string[]>([]);
  const [files, setFiles] = useState(true)
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    clearForm();
  }
  const handleShow = () => setShow(true);
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

  function clearForm() {
    setFiles(true)
    setExcelData([])
  }


  useEffect(() => {
    reload()
    getkategori()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/barang`);
      const result = await response.json();
      setDatabarang(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getkategori = async () => {
    try {
      const response = await fetch(`/admin/api/kategori`);
      const result = await response.json();
      const options = result.map((item: any) => ({ label: item.nama, value: item.id }))
      setDatakategori(options);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = databarang.filter(
    (item: any) => item.namaBarang && item.namaBarang.toLowerCase().includes(filterText.toLowerCase()) ,
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'Nama Barang',
      selector: (row: any) => row.namaBarang,
      sortable: true,
    },
    {
      name: 'Merek',
      selector: (row: any) => row.merek,
    },
    {
      name: 'Harga Jual',
      selector: (row: any) => rupiah(row.hargaJual),
    },
    {
      name: 'Stok',
      selector: (row: any) => row.stok,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update barang={row} daftarkategori={datakategori} kategoritb={row.KategoriTb} reload={reload} />
          <Delete foto={row.foto} barangid={row.id} reload={reload} />
        </div>
      ),
      width: '150px'
    },

  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DataBarang');
    XLSX.writeFile(workbook, 'Data Barang.xlsx');
  };

  const downloadtemplate=()=>{
    const fileName = 'template.xlsx';
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

      const xxx = await axios.post(`/admin/api/importbarang`, formData, {
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

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Data Barang</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} daftarkategori={datakategori} />
                </div>
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text border-0"><i className="mdi mdi-magnify"></i></span>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search..."
                      aria-label="Search Input"
                      value={filterText}
                      onChange={(e: any) => setFilterText(e.target.value)}
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
                      backgroundColor: '#53d0b2',
                      fontSize: 15,
                    },
                  },
                }}
              />
              {databarang.length > 0 ?
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
            </div>
          </div>
        </div>
      </div >
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
            <Modal.Title >Import Data Barang</Modal.Title>
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
                        <th style={{ fontSize: 17, color: "black" }}>Kode Barang</th>
                        <th style={{ fontSize: 17, color: "black" }}>Nama Barang </th>
                        <th style={{ fontSize: 17, color: "black" }}>Merek</th>
                        <th style={{ fontSize: 17, color: "black" }}>Unit</th>
                        <th style={{ fontSize: 17, color: "black" }}>Harga Modal</th>
                        <th style={{ fontSize: 17, color: "black" }}>Harga Jual</th>
                        <th style={{ fontSize: 17, color: "black" }}>Stok</th>
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
    </div >
  )
}

export default Produk