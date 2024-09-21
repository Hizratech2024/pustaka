"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Font } from "@/app/helper";
import Add from "./action/add";
import Delete from "./action/delete";
import Update from "./action/update";

const Zona = () => {
  const [member, setMember] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const montserrat = Font();

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/member`);
      const result = await response.json();
      setMember(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = member.filter(
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
      name: "Nomor Identitas",
      selector: (row: any) => row.nis,
      sortable: true,
    },
    {
      name: "Nama",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "No HP",
      selector: (row: any) => row.hp,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <div className="d-flex">
          <Update member={row} user={row} reload={reload} />
          <Delete id={row.id} reload={reload} />
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
                className={`card-title ${montserrat.className}`}
                style={{ fontWeight: "bold" }}
              >
                Data Member
              </h6>
            </div>

            <div className="card-body">
              <div className="row mb-3 flex items-center">
                <div className="col-md-9">
                  {" "}
                  <Add reload={reload} />
                </div>
                <div className="col-md-3">
                  <div className="input-group mb-3  input-success">
                    <span className="input-group-text border-0">
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

export default Zona;
