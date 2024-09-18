"use client";
import { useState, SyntheticEvent, useEffect, useRef } from "react";
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
}: {
  reload: Function;
  reloadtabel: Function;
  rakId: String;
  buku: Array<any>;
  dataAll: Array<any>;
}) {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState("");

  const [bukuId, setBukuId] = useState("");

  if (isLoading) {
    Swal.fire({
      title: "Mohon tunggu!",
      html: "Sedang mengirim data ke server",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleShow = () => setShow(true);
  const handleShow2 = (row: any) => {
    setBukuId(row.id); // Store the selected book when adding
    setShow2(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleClose2 = () => {
    setShow2(false);
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = buku.filter(
    (item) =>
      item.judul && item.judul.toLowerCase().includes(filterText.toLowerCase())
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
      selector: (row: any) => row.qty,
      sortable: true,
    },
    // {
    //   name: "Action",
    //   cell: (row: any) => {
    //     // Cek apakah buku ini ada di rak saat ini
    //     const bukuDiRakSaatIni = dataAll.some(
    //       (data: any) =>
    //         data.bukuId === Number(row.id) && data.rakId === Number(rakId)
    //     );

    //     // Dapatkan jumlah stok buku di rak saat ini
    //     const qtyDiRakSaatIni =
    //       dataAll.find(
    //         (data: any) =>
    //           data.bukuId === Number(row.id) && data.rakId === Number(rakId)
    //       )?.qty || 0;

    //     // Dapatkan stok total buku
    //     const stokBuku =
    //       dataAll.find((data: any) => data.bukuId === Number(row.id))?.BukuTb
    //         .stok || 0;

    //     // Cek apakah stok buku masih ada di rak lain
    //     const stokDiRakLain = dataAll
    //       .filter(
    //         (data: any) =>
    //           data.bukuId === Number(row.id) && data.rakId !== Number(rakId)
    //       )
    //       .reduce((acc, data: any) => acc + data.qty, 0);

    //     const totalStokDiRakLain = stokBuku - stokDiRakLain;

    //     if (!bukuDiRakSaatIni && totalStokDiRakLain > 0) {
    //       // Buku belum ada di rak saat ini dan stok buku masih ada
    //       return (
    //         <div className="d-flex">
    //           <button
    //             type="button"
    //             className="btn btn-success light"
    //             onClick={() => handleShow2(row)}
    //           >
    //             Tambah
    //           </button>
    //         </div>
    //       );
    //     } else if (
    //       bukuDiRakSaatIni &&
    //       qtyDiRakSaatIni === 0 &&
    //       totalStokDiRakLain === 0
    //     ) {
    //       // Buku ada di rak saat ini, stok di rak sudah habis dan stok buku sudah habis di rak lain
    //       return (
    //         <div className="d-flex">
    //           <button
    //             type="button"
    //             className="btn btn-warning light"
    //             onClick={() => tombolUpdate(row)}
    //           >
    //             Pindah
    //           </button>
    //         </div>
    //       );
    //     } else if (bukuDiRakSaatIni && qtyDiRakSaatIni > 0) {
    //       // Buku ada di rak saat ini dan stok buku masih ada
    //       return (
    //         <div className="d-flex">
    //           <button
    //             type="button"
    //             className="btn btn-warning light"
    //             onClick={() => tombolUpdate(row)}
    //           >
    //             Pindah
    //           </button>
    //         </div>
    //       );
    //     } else {
    //       // Kondisi default (rak kosong, stok ada atau tidak)
    //       return (
    //         <div className="d-flex">
    //           <button
    //             type="button"
    //             className="btn btn-success light"
    //             onClick={() => handleShow2(row)}
    //           >
    //             Tambah
    //           </button>
    //         </div>
    //       );
    //     }
    //   },
    //   width: "150px",
    // },
    {
      name: "Action",
      cell: (row: any) =>
        dataAll.some(
          (data: any) =>
            data.bukuId === Number(row.id) &&
            data.rakId === Number(rakId) &&
            data.qty === data.BukuTb.stok
        ) ? null : dataAll.some(
            (data: any) =>
              data.bukuId === Number(row.id) &&
              data.rakId === Number(rakId) &&
              data.qty !== data.BukuTb.stok
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
              data.BukuTb.qty !== 0
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
              data.BukuTb.qty === 0
          ) ? (
          //   null
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning light"
              onClick={() => tombolUpdate(row)}
            >
              Pindah
            </button>
          </div>
        ) : (
          //   null
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

  const tombolUpdate = (row: any) => {
    Swal.fire({
      title: `${row.judul}`,
      text: "Pindahkan buku ke rak ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, pindahkan sekarang!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate(row);
      }
    });
  };

  // const tombolTambah = (row: any) => {
  //   Swal.fire({
  //     title: "Jumlah Buku",
  //     input: "number",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Tambah",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleSubmit(row);
  //     }
  //   });
  // };

  const handleSubmit = async (row: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("bukuId", bukuId);
      formData.append("rakId", String(rakId));
      formData.append("qty", qty);

      const xxx = await axios.post(`/admin/api/letakbuku`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (xxx.data.pesan == "tidak bisa") {
        // handleClose()
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Qty melebihi stok",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (xxx.data.pesan == "berhasil") {
        reload();
        reloadtabel(rakId);
        // handleClose()
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

  const handleUpdate = async (row: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("bukuId", row.id);
      formData.append("rakId", String(rakId));

      const xxx = await axios.patch(
        `/admin/api/letakbuku/${row.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (xxx.data.pesan == "berhasil") {
        // setShow(false)
        setIsLoading(false);
        reload();
        reloadtabel(rakId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil Dipindahkan",
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
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Daftar Buku </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-3">
              <div className="col-md-9"></div>
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
            <button type="submit" className="btn btn-primary light">
              Simpan
            </button>
          </Modal.Footer>
        </form>
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
              type="text"
              placeholder="Jumlah Buku"
              className="form-control"
              value={qty}
              onChange={(e: any) => setQty(e.target.value)}
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
