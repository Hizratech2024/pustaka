/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import { UserTb } from "@prisma/client"
import axios from "axios"
import Swal from "sweetalert2"
import Modal from 'react-bootstrap/Modal';


function Update({ user, reload }: { user: UserTb, reload: Function }) {

    const [nama, setNama] = useState(user.nama)
    const [usernama, setUsernama] = useState(user.usernama)
    const [password, setPassword] = useState('')
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
        refreshform()
    }

    function refreshform() {
        setNama(user.nama)
        setUsernama(user.usernama)
        setPassword('')
        setSt(false)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newpass = password === '' ? 'no' : 'yes'
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('usernama', usernama)
            formData.append('password', password)
            formData.append('newpass', newpass)

            const xxx = await axios.patch(`/superadmin/api/admin/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'usernama sudah ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Usernama ini sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            if (xxx.data.pesan == 'berhasil') {
                setShow(false)
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
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success sharp mx-1" >
                <i className="fa fa-edit"></i>
            </button>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="modal-body">
                            <div className="row">
                                <div className="mb-3 col-md-12">
                                    <label className="col-sm-6 col-form-label">Nama</label>
                                    <input
                                        autoFocus
                                        required
                                        type="text"
                                        className="form-control"
                                        value={nama} onChange={(e) => setNama(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="col-sm-6 col-form-label">Usernama</label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        value={usernama} onChange={(e) => setUsernama(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 col-md-12">
                                    <label className="col-sm-6 col-form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
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