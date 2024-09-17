"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';

function AddAll({ reload, lemari, pilihlemariId }: { reload: Function, lemari: Array<any>, pilihlemariId: String }) {
    const [nama, setNama] = useState("")
    const [lemariId, setLemariId] = useState("")
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
        setLemariId('')
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('lemariId', lemariId)

            const xxx = await axios.post(`/admin/api/rak`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'Limit Rak') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Melebihi Jumlah Rak',
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
            {pilihlemariId === 'Semua Data' ?

                <button type="button" className="btn btn-tambah" onClick={handleShow}>
                    Tambah
                </button>
                : null
            }
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Rak</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-form-label">Pilih Lemari</label>
                            </div>
                            <div className="mb-3 col-md-8">
                                <select
                                    autoFocus
                                    required
                                    className="form-control"
                                    value={lemariId} onChange={(e) => setLemariId(e.target.value)}
                                >
                                    <option value="" disabled={!!lemariId}>Pilihan</option>
                                    {lemari.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-form-label">Nama Rak</label>
                            </div>
                            <div className="mb-3 col-md-8">
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
        </div >
    )
}

export default AddAll