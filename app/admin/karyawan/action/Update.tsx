/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import { KaryawanTb, UserTb } from "@prisma/client"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import moment from "moment"
import Select from 'react-select'
import { StyleSelect } from "@/app/helper";

const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Kasir', label: 'Kasir' },
    { value: 'Teknisi', label: 'Teknisi' },
];

function Update({ karyawan, user, reload }: { karyawan: KaryawanTb, user: UserTb, reload: Function }) {

    const [nama, setNama] = useState(karyawan.nama)
    const [tempatLahir, setTempatlahir] = useState(karyawan.tempatLahir)
    const [tanggalLahir, setTanggallahir] = useState(moment(karyawan.tanggalLahir).format("YYYY-MM-DD"))
    const [alamat, setAlamat] = useState(karyawan.alamat)
    const [hp, setHp] = useState(karyawan.hp)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(karyawan.email)
    const [status, setStatus] = useState(user.status)
    const [selectjabatan, setSelectjabatan] = useState([
        { value: user.status, label: user.status },
    ]);
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

    const refreshform = () => {
        setNama(karyawan.nama)
        setTempatlahir(karyawan.tempatLahir)
        setTanggallahir(moment(karyawan.tanggalLahir).format("YYYY-MM-DD"))
        setAlamat(karyawan.alamat)
        setHp(karyawan.hp)
        setEmail(karyawan.email)
        setStatus(user.status)
        setPassword('')
        setSelectjabatan([
            { value: user.status, label: user.status },
        ]);
    }

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true)

    const handleChange = (selectedOption: any) => {
        setSelectjabatan(selectedOption);
        setStatus(selectedOption.value);
    };

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newpass = password === '' ? 'no' : 'yes'
        console.log('pas', newpass)
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('tempatlahir', tempatLahir)
            formData.append('tanggallahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('newpass', newpass)
            formData.append('status', status)

            const xxx = await axios.patch(`/admin/api/karyawan/${karyawan.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            setTimeout(function () {

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
                    setShow(false);
                    setIsLoading(false)
                    reload()
                    setPassword('')
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Berhasil diubah',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }, 1500);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Karyawan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-6 col-form-label">Nama Karyawan</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
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
                                <label className="col-sm-6 col-form-label">Jabatan</label>
                                <Select
                                    required
                                    placeholder="Search..."
                                    options={options}
                                    onChange={handleChange}
                                    value={selectjabatan}
                                    styles={StyleSelect}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Email</label>
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-6 col-form-label">Password</label>
                                <div className="input-group">
                                    <input
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
        </div>
    )
}

export default Update