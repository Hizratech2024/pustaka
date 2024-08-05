"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import { tanggalIndo, warnastatus } from '@/app/helper';
import Acc from './action/Acc';
import Delete from './action/Delete';
import Update from './action/Update';
import Done from './action/Done';
import { Button } from 'antd';
// import Update from './action/Update';
// import Delete from './action/Delete';

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
      const response = await fetch(`/teknisi/api/servis`);
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
      name: 'Nama Pelanggan',
      selector: (row: any) => row.nama,
      sortable: true,
      width: '180px'
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
          {/* <Update servis={row} reload={reload} /> */}
          {row.status !== "Selesai" || row.status !== "Done"  ?  (
            <Update servis={row} reload={reload} />
          ) : (
            <button disabled className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></button>
          )}

          {/* <Delete servisId={row.id} reload={reload} /> */}
          {row.status !== "Selesai" || row.status !== "Done"  ? (
            <Delete servisId={row.id} reload={reload} />
          ) : (
            <button disabled className="btn btn-danger shadow btn-xs sharp mx-1"><i className="fa fa-trash"></i></button>
          )}

          {row.status === "Proses" ? (
            <Done servisId={row.id} reload={reload} jenis={row.jenis} />
          ) : (
            <button disabled className="btn btn-info shadow btn-xs sharp mx-1"><i className="fa fa-user-cog"></i></button>
          )}

          {row.status === "Menunggu Konfirmasi" || row.status === "Dibatalkan / Barang dikembalikan" ? (
            <Acc servisId={row.id} reload={reload} />
          ) : (
            <button disabled className="btn btn-primary shadow btn-xs sharp mx-1"><i className="fa fa-check"></i></button>
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

            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Servisan