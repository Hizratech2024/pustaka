/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"

import { useRouter } from "next/navigation"
import { ServisTb } from "@prisma/client";
import { rupiah } from "@/app/helper";

function Batal({ servis, reload, jenis }: { servis: ServisTb, reload: Function, jenis: String }) {

    const [biayaCancel, setBiayaCancel] = useState(servis.biayaCancel)
    const [keterangan, setKeterangan] = useState(servis.keterangan)

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
        setBiayaCancel(servis.biayaCancel)
        setKeterangan(servis.keterangan)
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
            const xxx = await axios.patch(`/api/batalservis/${servis.id}`)
            if (xxx.data.pesan == 'berhasil') {
                reload()
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil diproses',
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
            <span onClick={handleShow} className="btn btn-success shadow btn-xm sharp mx-1"><i className="fa fa-money-check-alt"></i></span>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Servis Dibatalkan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="mb-3 row">
                            <div className="col-sm-5" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Biaya Pembatalan </div>
                            <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                            <div className="col-sm-6" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                {rupiah(Number(biayaCancel))}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-sm-5" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Keterangan </div>
                            <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                            <div className="col-sm-6" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                {keterangan}
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

export default Batal