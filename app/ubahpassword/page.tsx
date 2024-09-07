"use client"
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { supabase, supabaseBUCKET, supabaseUrl, tanggalIndo } from '../helper';
import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';


const UbahPassword = () => {
  const [karyawanId, setKaryawanId] = useState("")
  const [email, setEmail] = useState("")
  const [passwordlama, setPasswordlama] = useState("")
  const [passwordbaru, setPasswordBaru] = useState("")
  const [ulangpassword, setUlangPassword] = useState("")
  const [error, setError] = useState('');

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
      const response = await fetch(`/api/karyawan`);
      const result = await response.json();
      setKaryawanId(result.id)
      setEmail(result.email)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const bersih = () => {
    setPasswordlama('')
    setPasswordBaru('')
    setUlangPassword('')
  }

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (passwordbaru !== ulangpassword) {
      setError('Validasi Ulang Password Salah');
    } else {
      setError('');
      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append('passwordbaru', passwordbaru)
        formData.append('passwordlama', passwordlama)

        const xxx = await axios.patch(`/api/ubahpassword/${email}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (xxx.data.pesan == 'Password salah') {
          setIsLoading(false)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Password Lama Salah',
            showConfirmButton: false,
            timer: 1500
          })
        }

        if (xxx.data.pesan == 'berhasil') {
          setIsLoading(false)
          bersih()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password Berhasil diubah',
            text: "Harap Login Ulang!",
            showConfirmButton: true,
            // timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
                signOut()
            }
        });
          
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }

  }


  return (
    <div>
      <div className="row">
        <div className="col-md-9 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="row mb-3">

                </div>
                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">

                  </div>
                </div>
                <div className="row">
                  <div className="mb-5 col-md-12 d-flex justify-content-center">

                    <h1 className="form-label" >Ganti Password</h1>

                  </div>
                </div>

                <div className=" row mb-3">
                  <h3 className="col-sm-4 col-form-label">Masukkan Password Lama</h3>
                  <div className="col-sm-4">
                    <input
                      required
                      autoFocus
                      type="password"
                      className="form-control"
                      value={passwordlama} onChange={(e) => setPasswordlama(e.target.value)}
                    />
                  </div>
                </div>

                <div className=" row mb-3">
                  <h3 className="col-sm-4 col-form-label">Masukkan Password Baru</h3>
                  <div className="col-sm-4">
                    <input
                      required
                      type="password"
                      className="form-control"
                      value={passwordbaru} onChange={(e) => setPasswordBaru(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    {error && (
                      <div className="row mb-3">
                        <div className="col-md-12 d-flex justify-content-center">
                          <span style={{ color: 'red' }}>{error}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" row mb-5">
                  <h3 className="col-sm-4 col-form-label">Ulang Password Baru</h3>
                  <div className="col-sm-4">
                    <input
                      required
                      type="password"
                      className="form-control"
                      value={ulangpassword} onChange={(e) => setUlangPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    {error && (
                      <div className="row mb-3">
                        <div className="col-md-12 d-flex justify-content-center">
                          <span style={{ color: 'red' }}>{error}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-12 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary light" onClick={handleUpdate} style={{ width: 150 }}>Update</button>
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

export default UbahPassword