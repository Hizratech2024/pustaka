"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { tanggalIndo, warnastatus } from '@/app/helper';
import Pembayaran from './action/Pembayaran';
import Cek from './action/Cek';

const Servisan = () => {

  const [dataservis, setDataservis] = useState([])
  const [filterText, setFilterText] = React.useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/api/servis`);
      const result = await response.json();
      setDataservis(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = dataservis.filter(
    (item: any) => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()) ||
      item.kodeServis && item.kodeServis.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'No Servis',
      selector: (row: any) => row.kodeServis,
      sortable: true,
    },
    {
      name: 'Nama Pelanggan',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: (row: any) => tanggalIndo(row.tanggal),
      sortable: true,
    },
    {
      name: 'No Hp',
      selector: (row: any) => row.hp,
      width: '130px'
    },
    {
      name: 'Nama Barang',
      selector: (row: any) => row.namaBarang,
      // width: '200px'
    },
    {
      name: 'Status',
      selector: (row: any) => row.status,
      cell: (row: any) => (
        <div
          style={{
            backgroundColor: warnastatus(row.status),
            padding: '8px',
            borderRadius: '4px',
            color: 'black',
          }}
        >
          {row.status}
        </div>
      ),
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          
          {row.status === "Selesai" ? (
            <Pembayaran servis={row}  reload={reload}  />
          ) : (
            <button disabled  className="btn btn-success shadow btn-xm sharp mx-1"><i className="fa fa-money-check-alt"></i></button>
          )}

          {/* <Cek servis={row} /> */}
          {row.status === "Final" ? (
            <Cek servis={row} />
          ) : (
            <button disabled  className="btn btn-danger shadow btn-xm sharp mx-1"><i className="fa fa-eye"></i></button>
          )}
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
              <h1 className="card-title">Data Servisan</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
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

            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Servisan