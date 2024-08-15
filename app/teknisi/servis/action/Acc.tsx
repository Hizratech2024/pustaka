"use client"
import { SyntheticEvent, useState } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

function Acc({ servisId, reload }: { servisId: Number, reload: Function }) {
    const [biayaCancel, setBiayaCancel] = useState('')
    const [keterangan, setKeterangan] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => {
        refreshform()
        setShow2(false);
    }
    const handleShow2 = () => setShow2(true);

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
        setBiayaCancel('')
    }

    const handleProses = async (servisId: number) => {
        setIsLoading(true)
        handleClose()
        await axios.patch(`/teknisi/api/accservis/${servisId}`)

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

    const handleBatal = () => {
        handleShow2()
    }

    const handleCancel = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('biayaCancel', biayaCancel)
            formData.append('keterangan', keterangan)

            const xxx = await axios.patch(`/teknisi/api/cancelservis/${servisId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
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
                handleClose()
                handleClose2()

            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handlechangeCancel = (e: any) => {
        let cancel = e.target.value
        if (parseInt(cancel) <= 0) {
            cancel = '';
        }
        setBiayaCancel(cancel);
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-primary shadow btn-xs sharp mx-1"><i className="fa fa-check"></i></span>
            <Modal
                dialogClassName="modal-md"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="font-bold">Akan diproses ?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger light" onClick={handleBatal}>Tidak Jadi</button>
                    <button type="button" className="btn btn-success light" onClick={() => handleProses(Number(servisId))}>Ya, Lanjutkan</button>
                </Modal.Footer>

            </Modal>

            <Modal
                dialogClassName="modal-m"
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 col-md-12">
                            <label className="col-sm-6 col-form-label">Biaya Cancel</label>
                            <input
                                autoFocus
                                required
                                type="number"
                                className="form-control"
                                value={biayaCancel} onChange={handlechangeCancel}
                            />
                        </div>

                        <div className="mb-3 col-md-12">
                            <label className="col-sm-6 col-form-label">Keterangan</label>
                            <textarea
                                required
                                rows={4}
                                className="form-control"
                                value={keterangan} onChange={(e) => setKeterangan(e.target.value)}
                            />
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-danger light" >Simpan</button>
                        <button type="button" className="btn btn-success light" onClick={handleClose2}>Cancel</button>
                    </Modal.Footer>
                </form>
            </Modal>

        </div>
    )
}

export default Acc