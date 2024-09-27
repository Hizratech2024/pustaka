"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';
import { Font, supabaseBUCKET, supabaseUrl, tanggalIndo } from "@/app/helper";

const Berita = () => {
  const [databerita, setDataberita] = useState([])
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const montserrat = Font();

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/berita`);
      const result = await response.json();
      setDataberita(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = databerita.filter(
    (item: any) => item.judul && item.judul.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'Gambar Berita',
      cell: (row: any) => (
        <div className="d-flex mb-3 mt-3">
          <img
            src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/foto-berita-pustaka/${row.foto}`}
            width={150}
            height={100}
            alt=""
          />
        </div>
      ),
      width: '200px'
    },
    {
      name: 'Berita',
      selector: (row: any) => row.judul,
      cell: (row: any) => (
        <div>
          <div className="mb-3">
            {tanggalIndo(row.tanggal)}
          </div>
          <div className="" style={{ fontWeight: 'bold' }}>
            {row.judul}
          </div>
        </div>

      ),
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update reload={reload} berita={row} />
          <Delete reload={reload} beritaId={row.id} beritafoto={row.foto} />
        </div>
      ),
      width: '150px'
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h6
                className={`card-title ${montserrat.className}`}
                style={{ fontSize: "17px", color: "#333", fontWeight: "600" }}
              >Data Berita</h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} />
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

export default Berita