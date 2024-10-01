"use client";
import { useState, SyntheticEvent } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

function Add({
  reload,
  reloadtabel,
  rakId,
  buku,
  dataAll,
  reloadbuku,
}: {
  reload: Function;
  reloadtabel: Function;
  rakId: String;
  buku: Array<any>;
  dataAll: Array<any>;
  reloadbuku: Function;
}) {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [qty, setQty] = useState("");
  const [bukuId, setBukuId] = useState("");
  const [IdLain, setIdLain] = useState("");

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleShow = () => setShow(true);
  const handleShow2 = (row: any) => {
    setBukuId(row.id); // Store the selected book when adding
    setShow2(true);
  };

  const handleShow3 = (row: any) => {
    setBukuId(row.id); // Store the selected book when adding
    setShow3(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClose2 = () => {
    setShow2(false);
    setQty(""); // Clear quantity input when closing modal
  };

  const handleClose3 = () => {
    setShow3(false);
    setIdLain("");
    setQty(""); // Clear quantity input when closing modal
  };

  const [isLoading, setIsLoading] = useState(false);
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

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = buku.filter(
    (item) =>
      item.judul && item.judul.toLowerCase().includes(filterText.toLowerCase())
  );

  const CariDataBuku = dataAll.filter(
    (item) =>
      item.bukuId === Number(bukuId) &&
      item.rakId !== Number(rakId) &&
      item.qty !== 0
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
      name: "Judul",
      selector: (row: any) => row.judul,
      sortable: true,
    },
    {
      name: "Penerbit",
      selector: (row: any) => row.penerbit,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row: any) => row.KategoriTb.nama,
      sortable: true,
    },
    {
      name: "Jumlah Buku",
      selector: (row: any) => row.stoklemari,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) =>
        dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId === Number(rakId) &&
            data.qty === data.BukuTb.stokinput
        ) ? null : dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId === Number(rakId) &&
            data.BukuTb.stoklemari !== 0 &&
            data.qty !== data.BukuTb.stokinput
        ) ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-success light"
              onClick={() => handleShow2(row)}
            >
              Tambah
            </button>
          </div>
        ) : dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId === Number(rakId) &&
            data.BukuTb.stoklemari === 0 &&
            data.qty !== data.BukuTb.stokinput
        ) ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning light"
              onClick={() => handleShow3(row)}
            >
              Pindah
            </button>
          </div>
        ) : dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId !== Number(rakId) &&
            data.BukuTb.stoklemari !== 0
        ) ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-success light"
              onClick={() => handleShow2(row)}
            >
              Tambah
            </button>
          </div>
        ) : dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId !== Number(rakId) &&
            data.BukuTb.stoklemari === 0
        ) ? (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning light"
              onClick={() => handleShow3(row)}
            >
              Pindah
            </button>
          </div>
        ) : (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-success light"
              onClick={() => handleShow2(row)}
            >
              Tambah
            </button>
          </div>
        ),
      width: "150px",
    },
  ];

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("bukuId", bukuId);
      formData.append("rakId", String(rakId));
      formData.append("qty", qty);

      const response = await axios.post(`/admin/api/letakbuku`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.pesan === "tidak bisa") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Qty melebihi stok",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (response.data.pesan === "berhasil") {
        setShow2(false);
        reload();
        reloadtabel(rakId);
        reloadbuku();
        setQty("");
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil Simpan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("bukuId", bukuId);
      formData.append("rakId", String(rakId));
      formData.append("IdLain", IdLain);
      formData.append("qty", qty);

      const response = await axios.patch(
        `/admin/api/letakbuku/${IdLain}`, // Perbaiki penggunaan backticks
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.pesan === "melebihi") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Qty melebihi stok",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (response.data.pesan === "berhasil") {
        setShow3(false);
        reload();
        reloadtabel(rakId);
        reloadbuku();
        setQty("");
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil Simpan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {rakId === "" ? null : (
        <button type="button" className="btn btn-tambah" onClick={handleShow}>
          Tambah
        </button>
      )}
      <Modal
        dialogClassName="modal-xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Daftar Buku </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-md-9"></div>
            <div className="col-md-3">
              <div className="input-group mb-3 input-success">
                <span className="input-group-text">
                  <i className="mdi mdi-magnify"></i>
                </span>
                <input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  aria-label="Search Input"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
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
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger light"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        dialogClassName="modal-m modal-dialog-centered"
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Jumlah Buku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              autoFocus
              type="text"
              placeholder="Jumlah Buku"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger light"
              onClick={handleClose2}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary light">
              Simpan
            </button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        dialogClassName="modal-m modal-dialog-centered"
        show={show3}
        onHide={handleClose3}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Jumlah Buku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select
              className="form-select"
              value={IdLain}
              onChange={(e) => setIdLain(e.target.value)}
            >
              <option value="">Pilih Rak</option>
              {CariDataBuku.map((item) => (
                <option key={item.id} value={item.id}>
                  Lemari {item.RakTb.LemariTb.nama} - Rak {item.RakTb.nama} -
                  Jumlah {item.qty}
                </option>
              ))}
            </select>
            <br />
            <input
              required
              type="text"
              placeholder="Jumlah Buku"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-danger light"
              onClick={handleClose3}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary light">
              Simpan
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Add;
