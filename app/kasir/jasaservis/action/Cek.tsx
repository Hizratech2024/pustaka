/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import { KaryawanTb, ServisTb } from "@prisma/client"
import Modal from 'react-bootstrap/Modal';
import { supabaseUrl, supabaseBUCKET, tanggalIndo } from "@/app/helper";

function Cek({ servis }: { servis: ServisTb }) {
let softwaredengankoma = servis.detailSoftware.split('\n').join(', ');
let hardwaredengankoma = servis.detailHardware.split('\n').join(', ');
    // const namakaryawan =findkaryawan.nama
    // const namaJob = jobdesk.namaJob
    // const tanggalMulai = tanggalIndo(jobdesk.tanggalMulai)
    // const deadline = tanggalIndo(jobdesk.deadline)
    // const keterangan= jobdesk.keterangan
    // const status = jobdesk.status
    // const alasan = jobdesk?.alasan
    // const tanggalkerjaValue = tanggalIndo(jobdesk?.tanggalPelaksanaan)
    // const fileValue= jobdesk?.file
    // const fileSuratTugasValue = jobdesk.suratTugas
    // const fileBeritaAcaraValue= jobdesk.beritaAcara
    // const fileAnggaranValue = jobdesk.laporanAnggaran
    // const keteranganAkhirValue = useState(jobdesk?.keteranganAkhir)
    // const [namateam, setNamateam] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true)
    }

    useEffect(() => {
        tampilTeam();
    }, [])

    const tampilTeam = async () => {
        // const namaTeam = jobdesk.namaTeam
        // const dataNamaTeam = JSON.parse(namaTeam);
        // const labelArray = dataNamaTeam.map((item: any) => item.label);
        // setNamateam(labelArray.join(', '))
    }

    return (
        <>
            <span onClick={handleShow} className="btn btn-danger shadow btn-xm sharp mx-1"><i className="fa fa-eye"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form>
                    <Modal.Header closeButton>
                        <Modal.Title> Detail Data Servisan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card profile-card card-bx m-b30">
                            <div className="card-body">
                                <div className="row">
                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>No Servis </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.kodeServis}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Nama Pelanggan </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.nama}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Alamat </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.alamat}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>No Hp </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.hp}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Nama Barang </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.namaBarang}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>No Seri </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.noSeri}
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Jenis Servisan </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.jenis}
                                        </div>
                                    </div>

                                    {servis.jenis.toLowerCase().includes('software') && (
                                        <div className="mb-3 row">
                                            <>
                                                <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Software </div>
                                                <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                                <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                                    {softwaredengankoma}
                                                </div>
                                            </>
                                        </div>
                                    )}

                                    {servis.jenis.toLowerCase().includes('hardware') && (
                                        <div className="mb-3 row">

                                            <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Hardware </div>
                                            <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                            <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                                {hardwaredengankoma}
                                            </div>

                                        </div>
                                    )}

                                    <div className="mb-3 row">
                                        <div className="col-sm-4" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>Status </div>
                                        <div className="col-sm-1" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>:</div>
                                        <div className="col-sm-7" style={{ fontFamily: "initial", fontSize: 20, color: "black" }}>
                                            {servis.status}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Cek