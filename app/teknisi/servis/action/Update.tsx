/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent } from "react"
import { ServisTb } from "@prisma/client"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import moment from "moment"
import Select from 'react-select'
import { cetakrequestservis } from "@/app/helper";
import { useRouter } from "next/navigation"

function Update({ servis, reload }: { servis: ServisTb, reload: Function }) {

    const [nama, setNama] = useState(servis.nama)
    const [teknisi, setTeknisi] = useState(servis.namaTeknisi)
    const [noservis, setNoservis] = useState(servis.kodeServis)
    const [tanggal, setTanggal] = useState(servis.tanggal)
    const [alamat, setAlamat] = useState(servis.alamat)
    const [hp, setHp] = useState(servis.hp)
    const [namaBarang, setNamabarang] = useState(servis.nama)
    const [noseri, setNoseri] = useState(servis.noSeri)
    const [perlengkapan, setPerlengkapan] = useState(servis.perlengkapan)
    const [jenis, setJenis] = useState(servis.jenis)
    const [software, setSoftware] = useState(servis.detailSoftware)
    const [hardware, setHardware] = useState(servis.detailHardware)
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
        setNama(servis.nama)
        setTeknisi(servis.namaTeknisi)
        setNoservis(servis.kodeServis)
        setAlamat(servis.alamat)
        setHp(servis.hp)
        setNamabarang(servis.namaBarang)
        setNoseri(servis.noSeri)
        setPerlengkapan(servis.perlengkapan)
        setJenis(servis.jenis)
        setSoftware(servis.detailSoftware)
        setHardware(servis.detailHardware);
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
        if (jenis == "Software") {
            setHardware('')
        }
        if (jenis == 'Hardware') {
            setSoftware('')
        }
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('namaBarang', namaBarang)
            formData.append('noseri', noseri)
            formData.append('perlengkapan', perlengkapan)
            formData.append('jenis', jenis)
            formData.append('software', software)
            formData.append('hardware', hardware)

            const xxx = await axios.patch(`/teknisi/api/servis/${servis.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (xxx.data.pesan == 'berhasil') {
                setShow(false);
                setIsLoading(false)
                reload()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil diubah',
                    showConfirmButton: false,
                    timer: 1500
                })

                cetakrequestservis(noservis,perlengkapan, software, hardware, nama, alamat, hp, namaBarang, noseri, tanggal, teknisi);
                router.refresh()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Servis</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">Nama Pelanggan</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">Alamat</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">No Telp</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={hp} onChange={(e) => setHp(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">Nama Barang</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={namaBarang} onChange={(e) => setNamabarang(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">No Seri</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={noseri} onChange={(e) => setNoseri(e.target.value)}
                                />
                            </div>
                            {/* <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">No Servis</label>
                                <input
                                    required
                                    disabled
                                    type="text"
                                    className="form-control"
                                    value={noservis} onChange={(e) => setNoservis(e.target.value)}
                                />
                            </div> */}

                        </div>

                        <div className="mb-3 col-md-12">
                            <label className="col-sm-6 col-form-label">Kelengkapan</label>
                            <textarea
                                required
                                rows={4}
                                className="form-control"
                                value={perlengkapan} onChange={(e) => setPerlengkapan(e.target.value)}
                            />
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-sm-6 col-form-label">Jenis Servisan</label>
                                <select
                                    required
                                    style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
                                    className="form-control"
                                    value={jenis} onChange={(e) => setJenis(e.target.value)}>
                                    <option value={''}> Pilih Servis</option>
                                    <option value={'Software'}>Software</option>
                                    <option value={'Hardware'}>Hardware</option>
                                    <option value={'Software & Hardware'}>Software & Hardware</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            {jenis.toLowerCase().includes('software') && (

                                <div className="mb-3 col-md-6">
                                    <label className="col-sm-6 col-form-label">Software</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="form-control"
                                        value={software} onChange={(e) => setSoftware(e.target.value)}
                                    />
                                </div>

                            )}
                            {jenis.toLowerCase().includes('hardware') && (
                                <div className="mb-3 col-md-6">
                                    <label className="col-sm-6 col-form-label">Hardware</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="form-control"
                                        value={hardware} onChange={(e) => setHardware(e.target.value)}
                                    />
                                </div>

                            )}

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