"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import Select from 'react-select'
import { StyleSelect, tanggalHariIni } from "@/app/helper";

const options = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Kasir', label: 'Kasir' },
    { value: 'Teknisi', label: 'Teknisi' },
];

function Add({ reload }: { reload: Function }) {
    const [nama, setNama] = useState("")
    const [tempatLahir, setTempatlahir] = useState("")
    const [tanggalLahir, setTanggallahir] = useState(tanggalHariIni)
    const [alamat, setAlamat] = useState("")
    const [hp, setHp] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("")
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const refemail = useRef<HTMLInputElement>(null);
    const refhp = useRef<HTMLInputElement>(null);
    const [selectjabatan, setSelectjabatan] = useState(null);
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

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleChange = (selectedOption: any) => {
        setSelectjabatan(selectedOption);
        setStatus(selectedOption.value);
    };

    const setfokusemail = () => {
        refemail.current?.focus();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    function clearForm() {
        setNama('')
        setTempatlahir('')
        setTanggallahir(tanggalHariIni)
        setAlamat('')
        setHp('')
        setPassword('')
        setEmail('')
        setStatus('')
        setSelectjabatan(null)
        setSt(false)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('tempatlahir', tempatLahir)
            formData.append('tanggallahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('status', status)

            const xxx = await axios.post(`/admin/api/karyawan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            setTimeout(function () {

                if (xxx.data.pesan == 'Email sudah ada') {
                    setIsLoading(false)
                    setfokusemail()
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
                    refhp.current?.focus();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No Hp sudah terdaftar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

                if (xxx.data.pesan == 'berhasil') {
                    handleClose();
                    clearForm();
                    reload()
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Berhasil Simpan',
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
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Add Karyawan</button>
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
                                    ref={refhp}
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
                                <label className="col-sm-6 col-form-label" >Email</label>
                                <input
                                    required
                                    ref={refemail}
                                    type="email"
                                    className="form-control"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
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