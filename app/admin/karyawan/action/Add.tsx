"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import { tanggalHariIni } from "@/app/helper";
import { stat } from "fs";

function Add({ reload }: { reload: Function }) {
    const [nama, setNama] = useState("")
    const [usernama, setUsernama] = useState("")
    const [password, setPassword] = useState('')
    const [tempatLahir, setTempatlahir] = useState("")
    const [tanggalLahir, setTanggallahir] = useState(tanggalHariIni)
    const [alamat, setAlamat] = useState("")
    const [hp, setHp] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const ref = useRef<HTMLInputElement>(null);
    const [st, setSt] = useState(false);
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

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = () => {
        setShow(false);
        clearForm()
    }

    function clearForm() {
        setNama('')
        setUsernama('')
        setPassword('')
        setStatus('')
        setTanggallahir(tanggalHariIni)
        setTempatlahir('')
        setAlamat('')
        setHp('')
        setEmail('')
        setSt(false)
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('usernama', usernama)
            formData.append('password', password)
            formData.append('tempatlahir', tempatLahir)
            formData.append('tanggallahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('email', email)
            formData.append('status', status)

            const xxx = await axios.post(`/admin/api/karyawan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'usernama ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Usernama sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            if (xxx.data.pesan == 'Email sudah ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Email sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (xxx.data.pesan == 'No Hp sudah ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'No Hp sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            if (xxx.data.pesan == 'berhasil') {
                clearForm();
                reload()
                handleClose()
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Simpan',
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
            <button type="button" className="btn btn-primary" onClick={handleShow}>
                Tambah
            </button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Karyawan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Nama Karyawan</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Jabatan</label>
                                <select
                                    required
                                    className="form-control"
                                    value={status} onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value=''>Pilih Jabatan</option>
                                    <option value='Petugas'>Petugas</option>
                                    <option value='Administrasi'>Administrasi</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Tempat Lahir</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={tempatLahir} onChange={(e) => setTempatlahir(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Tanggal Lahir</label>
                                <input
                                    required
                                    type="date"
                                    className="form-control"
                                    value={tanggalLahir} onChange={(e) => setTanggallahir(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">Alamat</label>
                                <textarea
                                    required
                                    className="form-control"
                                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
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
                                    value={hp} onChange={(e) => setHp(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label" >Email</label>
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Usernama</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={usernama} onChange={(e) => setUsernama(e.target.value)}
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
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {st ?
                                        <button onClick={() => setSt(!st)} className="btn btn-success" type="button">
                                            <i className="mdi mdi-eye-off" />
                                        </button>
                                        :
                                        <button onClick={() => setSt(!st)} className="btn btn-success" type="button">
                                            <i className="mdi mdi-eye" />
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary light">Simpan</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div >
    )
}

export default Add