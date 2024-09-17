"use client"
import { useState, SyntheticEvent } from "react"
import axios from "axios"
import Swal from "sweetalert2";
import Modal from 'react-bootstrap/Modal';
import { Bahasa, SelectTahun } from "@/app/helper";
import { Editor } from '@tinymce/tinymce-react';

function Add({ reload, kategoriId, namakategori }: { reload: Function, kategoriId: String, namakategori: String }) {
    const years = SelectTahun();
    const jenisbahasa = Bahasa();
    const [judul, setJudul] = useState("")
    const [kodeBuku, setKodeBuku] = useState("")
    const [bahasa, setBahasa] = useState("")
    const [jumlah, setJumlah] = useState("")
    const [penerbit, setPenerbit] = useState("")
    const [tahun, setTahun] = useState("")
    const [penulis, setPenulis] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
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
        setJudul('')
        setKodeBuku('')
        setBahasa('')
        setJumlah('')
        setPenerbit('')
        setTahun('')
        setPenulis('')
        setDeskripsi('')
    }

    const handleEditorChange = (content: any, editor: any) => {
        setDeskripsi(content);;
    }

    const handlechangejumlah = (e: any) => {
        let jumlah = e.target.value
        if (parseInt(jumlah) <= 0) {
            jumlah = '';
        }
        setJumlah(jumlah);
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('judul', judul)
            formData.append('kodeBuku', kodeBuku)
            formData.append('bahasa', bahasa)
            formData.append('jumlah', jumlah)
            formData.append('penerbit', penerbit)
            formData.append('tahun', tahun)
            formData.append('penulis', penulis)
            formData.append('deskripsi', deskripsi)
            formData.append('kategoriId', String(kategoriId))

            const xxx = await axios.post(`/admin/api/buku`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'kode buku sudah ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Kode Buku Sudah Ada',
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
            {kategoriId === '' || kategoriId === 'Semua Data' ?
                null :
                <button type="button" className="btn btn-tambah" onClick={handleShow}>
                    Tambah
                </button>
            }
            <Modal
                dialogClassName="modal-xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5 className="card-title" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Kategori {namakategori}</h5>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Kode Buku</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={kodeBuku} onChange={(e) => setKodeBuku(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Bahasa</label>
                                <select
                                    required
                                    className="form-control"
                                    value={bahasa} onChange={(e) => setBahasa(e.target.value)}
                                >
                                    <option value='' disabled={!!bahasa}>Pilih Bahasa</option>
                                    {jenisbahasa.map((item: any) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Jumlah Buku</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={jumlah} onChange={handlechangejumlah}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Judul Buku</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={judul} onChange={(e) => setJudul(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Penerbit</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={penerbit} onChange={(e) => setPenerbit(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Tahun Terbit</label>
                                <select
                                    required
                                    className="form-control"
                                    value={tahun} onChange={(e) => setTahun(e.target.value)}
                                >
                                    <option value='' disabled={!!tahun}>Pilih Tahun</option>
                                    {years.map((item: any) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 col-md-4">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Penulis</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={penulis} onChange={(e) => setPenulis(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-md-6 col-form-label" style={{ fontFamily: 'initial', fontWeight: 'bold' }}>Deskripsi</label>
                                <Editor
                                    value={deskripsi}
                                    // initialValue=""
                                    apiKey='e6x7uc1szg0c9mjyoh315prq24tm54yyyvyudgcfr197mw96'
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | blocks |formatselect | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={handleEditorChange}
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

export default Add