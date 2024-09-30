"use client"
import { Font, supabase, supabaseBUCKET, supabaseUrl } from '@/app/helper';
import axios from 'axios';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import AvatarEditor from 'react-avatar-editor';
import { signOut } from 'next-auth/react';

const Profil = () => {
  const [id, setId] = useState("")
  const [nama, setNama] = useState("")
  const [npsn, setNpsn] = useState("")
  const [alamat, setAlamat] = useState("")
  const [email, setEmail] = useState("")
  const [telp, setTelp] = useState("")
  const [hp, setHp] = useState("")
  const [file, setFile] = useState<File | null>()
  const [fotolama, setFotoLama] = useState("")
  const [preview, setPreview] = useState("")

  const editorRef = useRef<AvatarEditor>(null);
  const montserrat = Font();

  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await axios.get(`/admin/api/profil`);
      const result = await response.data;
      setId(result.id);
      console.log("id na", result.id)
      console.log("id kedua", result.userId)
      setNama(result?.nama);
      setNpsn(result?.npsn);
      setAlamat(result?.alamat);
      setEmail(result?.email);
      setTelp(result?.telp);
      setHp(result?.hp);
      setFotoLama(result?.logo)
      setPreview(result?.logo)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    clearForm()
  }

  async function clearForm() {
    const response = await axios.get(`/admin/api/profil`);
    const data = response.data;
    setFile(null)
    setPreview(fotolama)
  }

  const handleFileChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const fileSizeInMB = selectedImage.size / (1024 * 1024);

      if (fileSizeInMB > 1) {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Ukuran Maksimal 1 Mb',
          showConfirmButton: true,
        })
        setFile(null);
        setPreview(fotolama);
      } else {
        setFile(selectedImage);
        const objectUrl = URL.createObjectURL(selectedImage);
        setPreview(objectUrl);
        handleShow();
      }
    }
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob((blob: any) => {
        setFile(blob)
      });
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      const croppedData = canvasScaled.toDataURL();
      setPreview(croppedData)
      setShow(false)
    }
  };

  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true)
    e.preventDefault()
    const newfoto = preview === fotolama ? 'no' : 'yes'
    try {
      const formData = new FormData()
      formData.append('nama', nama)
      formData.append('npsn', npsn)
      formData.append('alamat', alamat)
      formData.append('email', email)
      formData.append('telp', telp)
      formData.append('hp', hp)
      formData.append('newfoto', newfoto)
      formData.append('file', file as File)

      if (newfoto === 'yes') {

        await supabase.storage
          .from(supabaseBUCKET)
          .remove([`foto-profil-pustaka/${fotolama}`]);

        const foto = formData.get('file') as File;
        const namaunik = nama + '-' + Date.now() + '-' + foto.name

        await supabase.storage
          .from(supabaseBUCKET)
          .upload(`foto-profil-pustaka/${namaunik}`, foto);

        formData.append('namaunik', namaunik)
        setFotoLama(namaunik)
      }

      const xxx = await axios.patch(`/admin/api/profil/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })


      if (xxx.data.pesan == 'sudah ada nspn') {
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'NSPN ini sudah terdaftar',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if (xxx.data.pesan == 'berhasil') {
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Berhasil Simpan',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        setIsLoading(false)
        tombollogout()
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function tombollogout() {
    Swal.fire({
      title: "Berhasil Diubah",
      text: "Silahkan Login Kembali",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK!"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut()
      }
    });
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-7 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h6
                className={`card-title ${montserrat.className}`}
                style={{ fontSize: "17px", color: "#333", fontWeight: "600" }}
              >Profil Sekolah</h6>
            </div>
            <div className="card-body">
              <div className="">
                <div className="author-profile">
                  <div className="author-media">
                    {file ? <img src={preview} width={200} className="mb-3 " alt="Responsive image" />
                      :
                      <img src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/foto-profil-pustaka/${preview}`} alt={""} className="mb-3 " width={200} height={200} />}
                    <div
                      className="upload-link"
                      title=""
                      data-toggle="tooltip"
                      data-placement="right"
                      data-original-title="update"
                    >
                      <input type="file" className="update-flie" accept="image/png, image/jpeg" onChange={handleFileChange} />
                      <i className="fa fa-camera" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>NPSN</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={npsn} onChange={(e) => setNpsn(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>Nama</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={nama} onChange={(e) => setNama(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>Alamat</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>Email</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>Telp</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={telp} onChange={(e) => setTelp(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}>No Hp</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={hp} onChange={(e) => setHp(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label" style={{ color: "black" }}></label>
                <div className="col-sm-9">
                  <button type="button" onClick={handleUpdate} className="btn btn-primary light">Simpan</button>
                </div>
              </div>
              <Modal
                dialogClassName="modal-s"
                show={show}
                onHide={handleClose}
                backdrop="static"

                keyboard={false}>


                <Modal.Header closeButton>
                  {/* <Modal.Title style={{ fontFamily: "initial", fontSize: 30, color: "black" }}>Tambah Data Divisi</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                  {file && (
                    <div>
                      <div>
                        <AvatarEditor
                          ref={editorRef}
                          image={file}
                          width={200}
                          height={200}
                          border={50}
                          color={[255, 255, 255, 0.6]}
                        />
                      </div>
                      <span onClick={handleCrop} className="btn btn-primary shadow btn-xl sharp mt-0">Selesai <i className="fa fa-check"> </i></span>
                    </div>
                  )}

                </Modal.Body>


              </Modal>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
};

export default Profil;
