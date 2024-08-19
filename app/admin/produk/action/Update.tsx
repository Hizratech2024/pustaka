/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import { BarangTb, KategoriTb } from "@prisma/client"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select'
import { StyleSelect, supabase, supabaseUrl, supabaseBUCKET } from "@/app/helper"


function Update({ barang, daftarkategori, kategoritb, reload }: { barang: BarangTb, daftarkategori: Array<any>, kategoritb: KategoriTb, reload: Function }) {

    const [kodeBarang, setKodebarang] = useState(barang.kodeBarang)
    const [namaBarang, setNamabarang] = useState(barang.namaBarang)
    const [kategoriId, setKategoriId] = useState(String(barang.kategoriId))
    const [merek, setMerek] = useState(barang.merek)
    const [unit, setUnit] = useState(barang.unit)
    const [hargaModal, setHargamodal] = useState(String(barang.hargaModal))
    const [hargaJual, setHargaJual] = useState(String(barang.hargaJual))
    const [stok, setStok] = useState(String(barang.stok))
    const [deskripsi, setDeskripsi] = useState(String(barang.deskripsi))
    const [fotolama, setFotolama] = useState(barang?.foto)
    const [previewload, setPreviewload] = useState(barang?.foto)
    const [file, setFile] = useState<File | null>()
    const [preview, setPreview] = useState('')
    const [selected, setSelected] = useState([{ value: kategoritb.id, label: kategoritb.nama }])
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

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        refreshform()
    }
    const handleShow = () => setShow(true);

    const handlechangemodal = (e: any) => {
        let harmodal = e.target.value
        if (parseInt(harmodal) <= 0) {
            harmodal = '';
        }
        setHargamodal(harmodal);
    }
    const handlechangejual = (e: any) => {
        let harjual = e.target.value
        if (parseInt(harjual) <= 0) {
            harjual = '';
        }
        setHargaJual(harjual);
    }
    const handlechangestok = (e: any) => {
        let stok = e.target.value
        if (parseInt(stok) <= 0) {
            stok = '';
        }
        setStok(stok);
    }

    const refreshform = () => {
        setKodebarang(barang.kodeBarang)
        setNamabarang(barang.namaBarang)
        setKategoriId(String(barang.kategoriId))
        setMerek(barang.merek)
        setUnit(barang.unit)
        setHargamodal(String(barang.hargaModal))
        setHargaJual(String(barang.hargaJual))
        setStok(String(barang.stok))
        setSelected([{ value: kategoritb.id, label: kategoritb.nama }])
        setPreviewload(barang?.foto)
        setFotolama(barang?.foto)
        setFile(null)
    }

    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)
        setPreviewload(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handlereset = () => {
        setFile(null)
        setPreviewload(barang?.foto)
    }

    const handlechange = (value: any) => {
        setKategoriId(value.value);
        setSelected(value);
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newfoto = previewload === fotolama ? 'no' : 'yes'

        const formData = new FormData()
        formData.append('file', file as File)
        formData.append('namaBarang', namaBarang)
        formData.append('kategoriId', kategoriId)
        formData.append('merek', merek)
        formData.append('unit', unit)
        formData.append('hargaModal', hargaModal)
        formData.append('hargaJual', hargaJual)
        formData.append('stok', stok)
        formData.append('deskripsi', deskripsi)
        formData.append('newfoto', newfoto)

        if (newfoto === 'yes') {

            await supabase.storage
                .from(supabaseBUCKET)
                .remove([`barang/${fotolama}`]);

            const foto = formData.get('file') as File;
            const namaunik = Date.now() + '-' + foto.name

            await supabase.storage
                .from(supabaseBUCKET)
                .upload(`barang/${namaunik}`, foto);

            formData.append('namaunik', namaunik)
        }

        const xxx = await axios.patch(`/admin/api/barang/${barang.id}`, formData)

            if (xxx.data.pesan === 'berhasil') {
                reload()
                setIsLoading(false)
                setShow(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil diubah',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
    }

    const handleEditorChange = (content: any, editor: any) => {
        setDeskripsi(content);
    }

    return (
        <>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data Barang</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Kode Barang</label>
                                <input
                                    disabled
                                    required
                                    type="text"
                                    className="form-control"
                                    value={kodeBarang} onChange={(e) => setKodebarang(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Nama Barang</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={namaBarang} onChange={(e) => setNamabarang(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Kategori</label>
                                <Select
                                    required
                                    placeholder="Search..."
                                    options={daftarkategori}
                                    onChange={handlechange}
                                    value={selected}
                                    styles={StyleSelect}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Merek</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={merek} onChange={(e) => setMerek(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Unit</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={unit} onChange={(e) => setUnit(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Stok</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={stok}
                                    // onChange={handlechangestok}
                                    onChange={(e=> setStok(e.target.value))}
                                    // min='1'
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Harga Modal</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={hargaModal}
                                    onChange={handlechangemodal}
                                    min='1'
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Harga Jual</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={hargaJual}
                                    onChange={handlechangejual}
                                    min='1'
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label">Foto</label>
                                <input
                                    type="file"
                                    id="inputGroupFile01"
                                    name="file"
                                    className="form-control mb-3"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                                <button
                                    id="reset"
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handlereset}
                                >Reset
                                </button>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label  mb-3"></label>
                                {file ? <img src={preview} width={330} height={220} className="" alt="Responsive image" /> : <img src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/barang/${previewload}`} alt={""} width={330} height={220} />}

                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Deskripsi</label>
                                <Editor
                                    value={deskripsi}
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | blocks | ' +
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
        </>
    )
}

export default Update