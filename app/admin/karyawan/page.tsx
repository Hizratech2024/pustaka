"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';
import * as XLSX from 'xlsx';
import Modal from 'react-bootstrap/esm/Modal';
import Swal from 'sweetalert2';
import axios from 'axios';

const Karyawan = () => {

  const [datakaryawan, setDatakaryawan] = useState([])
  const [selectdivisi, setSelectdivisi] = useState([])
  const [filterText, setFilterText] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [excelData, setExcelData] = useState<string[]>([]);
  const [files, setFiles] = useState(true)
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    clearForm();
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

  function clearForm() {
    setFiles(true)
    setExcelData([])
  }

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/karyawan`);
      const result = await response.json();
      setDatakaryawan(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datakaryawan.filter(
    (item: any) => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'Nama Karyawan',
      selector: (row: any) => row.nama,
      sortable: true,
      width: '420px'
    },
    {
      name: 'No Hp',
      selector: (row: any) => row.hp,
      width: '150px'
    },
    {
      name: 'Status',
      selector: (row: any) => row.UserTb.status,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update karyawan={row} user={row.UserTb} reload={reload} />
          <Delete karyawanid={row.id} reload={reload} />
        </div>
      ),
    },

  ];

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredItems);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'datakaryawan');
    XLSX.writeFile(workbook, 'Data Karyawan.xlsx');
  };

  const exportToExcel2 = () => {
    const dataToExport = filteredItems.map((item: any) => ({

      nama: item.nama,
      tanggalLahir: item.tanggalLahir,
      tempatLahir: item.tempatLahir,
      alamat: item.alamat,
      hp: item.hp,
      email: item.email,
      password: "123",
      status: item.UserTb.status,

    })).flat();

    if (dataToExport.length === 0) {
      console.error("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'datakaryawan');
    XLSX.writeFile(workbook, 'datakaryawan.xlsx');
  };

  const downloadtemplate = () => {
    const fileName = 'templatekaryawan.xlsx';
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

      const xxx = await axios.post(`/admin/api/importkaryawan`, formData, {
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
              <h1 className="card-title">Data Karyawan</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} />
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

              {datakaryawan.length > 0 ?
                <div className="row mb-3">
                  <div className="col-md-3">
                    <button type='button' onClick={exportToExcel2} className="btn btn-success btn-icon-text">
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
                        <th style={{ fontSize: 17, color: "black" }}>Nama</th>
                        <th style={{ fontSize: 17, color: "black" }}>Tanggal Lahir </th>
                        <th style={{ fontSize: 17, color: "black" }}>Tempat Lahir</th>
                        <th style={{ fontSize: 17, color: "black" }}>Alamat</th>
                        <th style={{ fontSize: 17, color: "black" }}>No Hp</th>
                        <th style={{ fontSize: 17, color: "black" }}>Email</th>
                        <th style={{ fontSize: 17, color: "black" }}>Password</th>
                        <th style={{ fontSize: 17, color: "black" }}>Status</th>
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

export default Karyawan