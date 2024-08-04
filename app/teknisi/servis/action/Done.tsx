/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"

import { useRouter } from "next/navigation"

function Done({ servisId, reload, jenis }: { servisId: Number, reload: Function, jenis: String }) {

    const [biayaSoftware, setBiayaSoftware] = useState('')
    const [biayaHardware, setBiayaHardware] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const router = useRouter()

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
        setKeterangan('')
        setBiayaSoftware('')
        setBiayaHardware('')
    }

    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true)

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('biayaHardware', biayaHardware)
            formData.append('biayaSoftware', biayaSoftware)
            formData.append('keterangan', keterangan)

            const xxx = await axios.patch(`/teknisi/api/servisdone/${servisId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (xxx.data.pesan == 'berhasil') {
                setShow(false);
                setIsLoading(false)
                reload()
                refreshform()
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

    const handlechangeSoftware = (e: any) => {
        let software = e.target.value
        if (parseInt(software) <= 0) {
            software = '';
        }
        setBiayaSoftware(software);
    }

    const handlechangeHardware = (e: any) => {
        let hardware = e.target.value
        if (parseInt(hardware) <= 0) {
            hardware = '';
        }
        setBiayaHardware(hardware);
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-info shadow btn-xs sharp mx-1"><i className="fa fa-user-cog"></i></span>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Servis Selesai</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            {jenis.toLowerCase().includes('software') && (
                                <div className="mb-3 col-md-12">
                                    <label className="col-sm-6 col-form-label">Biaya Software</label>
                                    <input
                                        autoFocus
                                        required
                                        type="number"
                                        className="form-control"
                                        value={biayaSoftware} onChange={handlechangeSoftware}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="row">
                            {jenis.toLowerCase().includes('hardware') && (
                                <div className="mb-3 col-md-12">
                                    <label className="col-sm-6 col-form-label">Biaya Hardware</label>
                                    <input
                                        required

                                        type="number"
                                        className="form-control"
                                        value={biayaHardware} onChange={handlechangeHardware}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mb-3 col-md-12">
                            <label className="col-sm-6 col-form-label">Keterangan</label>
                            <textarea

                                rows={4}
                                className="form-control"
                                value={keterangan} onChange={(e) => setKeterangan(e.target.value)}
                            />
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

export default Done