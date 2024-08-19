/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import { KategoriTb } from "@prisma/client"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"


function Update({ kategori, reload }: { kategori: KategoriTb, reload: Function }) {

    const [nama, setNama] = useState(kategori.nama)
    const [show, setShow] = useState(false);
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
        refreshform()
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setNama(kategori.nama)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        await axios.patch(`/admin/api/kategori/${kategori.id}`, {
            nama: nama,
        })
        setTimeout(function () {
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
        }, 1500);
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Kategori</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className=" row">
                            <label className="col-sm-4 col-form-label">Nama Kategori</label>
                            <div className="col-sm-8">
                                <input
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