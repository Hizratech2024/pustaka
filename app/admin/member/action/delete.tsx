"use client";
import { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const Delete = ({ id, reload }: { id: Number; reload: Function }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const xxx = await axios.delete(`/admin/api/member/${id}`);

      if (xxx.data.pesan === "berhasil") {
        setIsLoading(false);
        reload();
        setShow(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil dihapus",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (xxx.data.pesan === "gagal") {
        setIsLoading(false);
        setShow(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Gagal menghapus",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-danger sharp mx-1"
          onClick={handleShow}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
      <Modal
        dialogClassName="modal-md modal-dialog modal-dialog-centered"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <h6>Anda yakin menghapus data ini ?</h6>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-warning light"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-danger light"
            onClick={handleDelete}
          >
            Ya, Hapus
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Delete;
