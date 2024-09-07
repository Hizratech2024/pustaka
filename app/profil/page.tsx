"use client"
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { supabase, supabaseBUCKET, supabaseUrl, tanggalIndo } from '../helper';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';


const Profil = () => {
  const [karyawanId, setKaryawanId] = useState("")
  const [nama, setNama] = useState("")
  const [alamat, setAlamat] = useState("")
  const [tempatlahir, setTempatlahir] = useState("")
  const [tanggallahir, setTanggallahir] = useState("")
  const [hp, setHp] = useState("")
  const [email, setEmail] = useState("")
  const [fotolama, setFotolama] = useState("")
  const [fotobaru, setFotobaru] = useState("")
  const [file, setFile] = useState<File | null>()
  const [preview, setPreview] = useState('')

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

  useEffect(() => {
    if (!file) {
      setPreview('')
      setFotobaru(fotolama)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setFotobaru(objectUrl)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const reload = async () => {
    try {
      const response = await fetch(`/api/karyawan`);
      const result = await response.json();
      setKaryawanId(result.id)
      setNama(result.nama)
      setAlamat(result.alamat)
      setTempatlahir(result.tempatLahir)
      setTanggallahir(moment(result.tanggalLahir).format("YYYY-MM-DD"))
      setHp(result.hp)
      setEmail(result.email)
      setFotolama(result.foto)
      setFotobaru(result.foto)
      // console.log("lihat foto", result.foto)
      // setDatakaryawan(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true)
    e.preventDefault()
    const fotokosong = fotolama === fotobaru ? 'yes' : 'no'
    // const fotokosong = !file || file === null ? 'yes' : 'no'
    console.log("fotokosong", fotokosong)
    try {
      const formData = new FormData()
      formData.append('nama', nama)
      formData.append('tempatlahir', tempatlahir)
      formData.append('tanggallahir', new Date(tanggallahir).toISOString())
      formData.append('alamat', alamat)
      formData.append('hp', hp)
      formData.append('email', email)
      formData.append('fotokosong', fotokosong)
      formData.append('file', file as File)

      if (fotokosong === 'no') {
        const image = formData.get('file') as File;
        const namaunik = Date.now() + '-' + image.name

        await supabase.storage
          .from(supabaseBUCKET)
          .remove([`karyawan/${fotolama}`]);

        await supabase.storage
          .from(supabaseBUCKET)
          .upload(`karyawan/${namaunik}`, image);

        formData.append('namaunik', namaunik)
      }

      const xxx = await axios.patch(`/api/karyawan/${karyawanId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })


      if (xxx.data.pesan == 'sudah ada email') {
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Email ini sudah terdaftar',
          showConfirmButton: false,
          timer: 1500
        })
      }

      if (xxx.data.pesan == 'sudah ada hp') {
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'No Hp ini sudah terdaftar',
          showConfirmButton: false,
          timer: 1500
        })

      }
      if (xxx.data.pesan == 'berhasil') {
        setIsLoading(false)
        setFile(null)
        window.location.reload();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Berhasil diubah',
          showConfirmButton: false,
          timer: 1500
        })
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
          
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="row mb-3">

                </div>
                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">
                    {
                      file ?
                        <div className="">
                          <img
                            src={preview}
                            className="rounded"
                            width={200}
                            height={200}
                            alt=""
                          />
                        </div>
                        :
                        fotolama != null ?
                          <div className="">
                            <img
                              src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/karyawan/${fotolama}`}
                              className="rounded"
                              width={200}
                              height={200}
                              alt=""
                            />
                          </div>
                          :
                          <img className="bg-fotouser" />
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">
                    <div className="mb-3 col-md-4">
                      {/* <label className="form-label" >Foto</label> */}
                      <input
                        // required
                        type="file"
                        className="form-control"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFile(e.target.files?.[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }} >Nama</label>
                    <input
                      required
                      autoFocus
                      type="text"
                      className="form-control"
                      value={nama} onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Alamat</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={alamat} onChange={(e) => setAlamat(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Tempat Lahir</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Tanggal Lahir</label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      value={tanggallahir} onChange={(e) => setTanggallahir(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>No Hp</label>
                    <input
                      required
                      type="number"
                      className="form-control"
                      value={hp} onChange={(e) => setHp(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" style={{ color: 'black' }}>Email</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">

                    <button type="submit" className="btn btn-primary light" style={{ width: 150 }}>Update</button>

                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Profil