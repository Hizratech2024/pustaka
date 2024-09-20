import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";

const Add = ({ reload }: { reload: Function }) => {
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nope, setNope] = useState("");
  const [email, setEmail] = useState("");
  // const [foto, setFoto] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("VIP 0");

  const [show, setShow] = useState(false);
  const [st, setSt] = useState(false);
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

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nis", nis);
      formData.append("nama", nama);
      formData.append("tempatLahir", tempatLahir);
      formData.append("tanggalLahir", new Date(tanggalLahir).toISOString());
      formData.append("alamat", alamat);
      formData.append("nope", nope);
      formData.append("email", email);
      // formData.append("foto", foto);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("status", status);

      const xxx = await axios.post("/admin/api/member", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (xxx.data.pesan == "usernama ada") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Usernama sudah terdaftar",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (xxx.data.pesan == "Email sudah ada") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Email sudah terdaftar",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (xxx.data.pesan == "No Hp sudah ada") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "No Hp sudah terdaftar",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (xxx.data.pesan === "berhasil") {
        Swal.fire({
          icon: "success",
          title: "Data Berhasil",
          text: "Data Berhasil Di Tambah",
        });
        clearForm();
        handleClose();
        reload();
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Berhasil Simpan",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (xxx.data.pesan === "gagal") {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Gagal Simpan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("Terjadi Kesalahan", error);
    }
  };

  const clearForm = () => {
    setNama("");
    setNis("");
    setTempatLahir("");
    setTanggalLahir("");
    setAlamat("");
    setNope("");
    setEmail("");
    // setFoto("");
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
                  inputMode="numeric"
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
                  type="text"
                  className="form-control"
                  value={nope}
                  onChange={(e) => setNope(e.target.value)}
                  inputMode="numeric"
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

            {/* <div className="row">
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
            </div> */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Username</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-6 col-form-label">Password</label>
                <div className="input-group">
                  <input
                    required
                    type={st ? "text" : "password"}
                    className="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {st ? (
                    <button
                      onClick={() => setSt(!st)}
                      className="btn btn-success"
                      type="button"
                    >
                      <i className="mdi mdi-eye-off" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setSt(!st)}
                      className="btn btn-success"
                      type="button"
                    >
                      <i className="mdi mdi-eye" />
                    </button>
                  )}
                </div>
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
