import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

const Add = () => {
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nope, setNope] = useState("");
  const [email, setEmail] = useState("");
  const [foto, setFoto] = useState("");

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nis", nis);
      formData.append("nama", nama);
      formData.append("tempatLahir", tempatLahir);
      formData.append("tanggalLahir", tanggalLahir);
      formData.append("alamat", alamat);
      formData.append("nope", nope);
      formData.append("email", email);
      formData.append("foto", foto);

      const res = await axios.post("admin/api/member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "berhasil") {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil",
          text: "Data Berhasil",
        });
        clearForm();
        handleClose();
        window.location.reload();
      }
    } catch (error) {}
  };

  const clearForm = () => {
    setNama("");
    setNis("");
    setTempatLahir("");
    setTanggalLahir("");
    setAlamat("");
    setNope("");
    setEmail("");
    setFoto("");
  };
  return (
    <div>
      <button type="button" className="btn btn-tambah" onClick={handleShow}>
        Tambah
      </button>
      <Modal
        dialogClassName="modal-lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Data Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Nama Member</label>
                <input
                  autoFocus
                  required
                  type="text"
                  className="form-control"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">NIS</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Tempat Lahir</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  value={tempatLahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Tanggal Lahir</label>
                <input
                  required
                  type="date"
                  className="form-control"
                  value={tanggalLahir}
                  onChange={(e) => setTanggalLahir(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-12">
                <label className="col-sm-6 col-form-label">Alamat</label>
                <textarea
                  required
                  className="form-control"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">No Hp</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  value={nope}
                  onChange={(e) => setNope(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Email</label>
                <input
                  required
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-12">
                <label htmlFor="formFile" className="form-label">
                  Foto
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  value={foto}
                  onChange={(e) => setFoto(e.target.value)}
                />
                <small className="text-muted">
                  Unggah foto bersifat opsional.
                </small>
              </div>
            </div>
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
};

export default Add;
