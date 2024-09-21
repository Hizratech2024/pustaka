"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Add from "./action/Add";
import Delete from "./action/Delete";
import Swal from "sweetalert2";
import Update from "./action/Update";

const Karyawan = () => {
  const [datakaryawan, setDatakaryawan] = useState([]);
  const [filterText, setFilterText] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/karyawan`);
      const result = await response.json();
      console.log("data karyawan", result);
      setDatakaryawan(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datakaryawan.filter(
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
      name: "Nama",
      selector: (row: any) => row.KaryawanTb?.nama,
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row: any) => row.KaryawanTb?.alamat,
    },
    {
      name: "No Hp",
      selector: (row: any) => row.KaryawanTb?.hp,
    },
    {
      name: "Status",
      selector: (row: any) => row.role,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <div className="d-flex">
          <Update user={row} karyawan={row.KaryawanTb} reload={reload} />
          <Delete userId={row.id} reload={reload} />
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
              <h6
                className="card-title"
                style={{ fontFamily: "initial", fontWeight: "bold" }}
              >
                Data Karyawan
              </h6>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} />
                </div>
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text">
                      <i className="mdi mdi-magnify"></i>
                    </span>
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

export default Karyawan;
