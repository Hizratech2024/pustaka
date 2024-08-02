"use client"
import { useState } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";

function Acc({ servisId, reload }: { servisId: Number, reload: Function }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    return (
        <div>
            <span onClick={handleShow} className="btn btn-primary shadow btn-xs sharp mx-1"><i className="fa fa-check"></i></span>
            <Modal
                dialogClassName="modal-md"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Body>
                    <h6 className="font-bold">Akan diproses ?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-warning light" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-danger light" onClick={() => handleProses(Number(servisId))}>Ya, Lanjutkan</button>
                </Modal.Footer>

            </Modal>

        </div>
    )
}

export default Acc