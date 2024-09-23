"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Add from "./action/Add";
import Delete from "./action/Delete";
import Swal from "sweetalert2";
import Update from "./action/Update";
import AddAll from "./action/AddAll";
import { Font } from "@/app/helper";

const Rak = () => {
  const [datarak, setDatarak] = useState([]);
  const [datalemari, setDatalemari] = useState([]);
  const [lemariId, setLemariId] = useState("");
  const [namalemari, setNamalemari] = useState("");
  const [filterText, setFilterText] = React.useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [all, setAll] = useState(false);

  const montserrat = Font();

  useEffect(() => {
    reload();
    reloadlemari();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/rak`);
      const result = await response.json();
      setDatarak(result);
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

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = all
    ? datarak
    : datarak.filter((item: any) => item.lemariId == Number(lemariId));

  const handlelemari = (e: any) => {
    const selectedValue = e.target.value;
    const selectedIndex = e.target.selectedIndex;
    const selectedText = e.target.options[selectedIndex].text;
    console.log(selectedText);
    setLemariId(selectedValue);
    setNamalemari(selectedText);
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
      name: "Nama Rak",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    ...(lemariId === "Semua Data"
      ? [
          {
            name: "Lemari",
            selector: (row: any) => row.LemariTb?.nama,
            sortable: true,
          },
        ]
      : []),
    {
      name: "Action",
      cell: (row: any) => (
        <div className="d-flex">
          <Update rak={row} reload={reload} />
          <Delete rakId={row.id} reload={reload} />
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
                      style={{
                        fontSize: "20px",
                        color: "#333",
                        fontWeight: "600",
                      }}
                    >
                      Rak
                    </h6>
                  </div>
                  <div className="col-md-6">
                    <select
                      autoFocus
                      required
                      className="form-control"
                      value={lemariId}
                      onChange={handlelemari}
                    >
                      <option value="" disabled={!!lemariId}>
                        Pilih Lemari
                      </option>
                      <option value="Semua Data" style={{ fontWeight: "bold" }}>
                        Semua Lemari
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
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <AddAll
                    reload={reload}
                    lemari={datalemari}
                    pilihlemariId={lemariId}
                  />
                  <Add
                    reload={reload}
                    lemariId={lemariId}
                    namalemari={namalemari}
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

export default Rak;
