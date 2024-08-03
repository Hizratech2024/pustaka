"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { tanggalHariIni, tanggalIndo, cetakrequestservis } from "@/app/helper";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"


function Add({ reload }: { reload: Function }) {
    const session = useSession()
    const teknisi = session.data?.nama
    const [noservis, setNoservis] = useState("")
    const [tanggal, setTanggal] = useState(tanggalHariIni);
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("")
    const [hp, setHp] = useState("")
    const [namaBarang, setNamabarang] = useState("")
    const [noseri, setNoseri] = useState("")
    const [perlengkapan, setPerlengkapan] = useState("")
    const [jenis, setJenis] = useState("")
    const [software, setSoftware] = useState("")
    const [hardware, setHardware] = useState("")
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
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

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
        otomatisnoservis()
    }, [])

    async function otomatisnoservis() {
        const response = await axios.get(`/teknisi/api/noservis`);
        const data = response.data;
        setNoservis(data)
    }

    function clearForm() {
        otomatisnoservis()
        setNama('')
        setAlamat('')
        setHp('')
        setNamabarang('')
        setTanggal(tanggalHariIni)
        setNoseri('')
        setPerlengkapan('')
        setJenis('')
        setSoftware('')
        setHardware('')
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        let status = ''
        if (jenis.toLowerCase().includes('hardware')) {
            status = 'Menunggu Konfirmasi';
        } else {
            status = 'Proses';
        }
        try {
            const formData = new FormData()
            formData.append('noservis', noservis)
            formData.append('nama', nama)
            formData.append('alamat', alamat)
            formData.append('hp', hp)
            formData.append('tanggal', new Date(tanggal).toISOString())
            formData.append('namaBarang', namaBarang)
            formData.append('noseri', noseri)
            formData.append('perlengkapan', perlengkapan)
            formData.append('jenis', jenis)
            formData.append('software', software)
            formData.append('hardware', hardware)
            formData.append('namaTeknisi', String(teknisi))
            formData.append('status', status)

            const xxx = await axios.post(`/teknisi/api/servis/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'berhasil') {
                handleClose();
                clearForm();
                reload()
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Simpan',
                    showConfirmButton: false,
                    timer: 1500
                })

                cetakrequestservis(perlengkapan, software, hardware, nama, alamat, hp, namaBarang, noseri, tanggal, teknisi);
                router.refresh()

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah</button>
            <Modal
                dialogClassName="modal-xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Servisan</Modal.Title>
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
        </div >
    )
}

export default Add