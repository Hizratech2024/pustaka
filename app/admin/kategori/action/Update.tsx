/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import { KategoriTb } from "@prisma/client"
import axios from "axios"
import Swal from "sweetalert2"
import Modal from 'react-bootstrap/Modal';
import moment from "moment"


function Update({ kategori, reload }: { kategori: KategoriTb, reload: Function }) {
    const [nama, setNama] = useState(kategori.nama)
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
        setNama(kategori.nama)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)

            const xxx = await axios.patch(`/admin/api/kategori/${kategori.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'berhasil') {
                setShow(false)
                setIsLoading(false)
                reload()
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
                        <Modal.Title>
                            <h6 className="card-title" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Edit Data</h6>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="col-form-label">Nama Kategori</label>
                            </div>
                            <div className="col-md-8">
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
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