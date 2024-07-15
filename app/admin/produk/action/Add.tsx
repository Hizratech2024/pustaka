/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select'
import { StyleSelect } from "@/app/helper";
import { supabase, supabaseUrl, supabaseBUCKET } from '@/app/helper'

function Add({ reload, daftarkategori }: { reload: Function, daftarkategori: Array<any> }) {
    const [kodeBarang, setKodebarang] = useState("")
    const [namaBarang, setNamabarang] = useState("")
    const [kategoriId, setKategoriId] = useState("")
    const [merek, setMerek] = useState("")
    const [unit, setUnit] = useState("")
    const [hargaModal, setHargamodal] = useState("")
    const [hargaJual, setHargaJual] = useState("")
    const [stok, setStok] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [file, setFile] = useState<File | null>()
    const [preview, setPreview] = useState('')
    const [selected, setSelected] = useState(null)
    const ref = useRef<HTMLInputElement>(null);

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
        clearForm();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    const handlechange = (value: any) => {
        setKategoriId(value.value);
        setSelected(value)
    }

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

    function clearForm() {
        setKodebarang('')
        setNamabarang('')
        setMerek('')
        setKategoriId('')
        setUnit('')
        setHargamodal('')
        setHargaJual('')
        setStok('')
        setSelected(null)
        setFile(null)
        setDeskripsi('')
    }

    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])


    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const fotokosong = !file || file === null ? 'yes' : 'no'
        try {
            const formData = new FormData()
            formData.append('kodeBarang', kodeBarang)
            formData.append('namaBarang', namaBarang)
            formData.append('kategoriId', kategoriId)
            formData.append('merek', merek)
            formData.append('unit', unit)
            formData.append('hargaModal', hargaModal)
            formData.append('hargaJual', hargaJual)
            formData.append('stok', stok)
            formData.append('deskripsi', deskripsi)
            formData.append('fotokosong', fotokosong)
            formData.append('file', file as File)

            if (fotokosong === 'no') {
                const image = formData.get('file') as File;
                const namaunik = Date.now() + '-' + image.name

                await supabase.storage
                    .from(supabaseBUCKET)
                    .upload(`barang/${namaunik}`, image);

                formData.append('namaunik', namaunik)
            }

            const xxx = await axios.post(`/api/barang`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
       
                if (xxx.data.pesan === 'kode barang sudah ada') {
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Data barang sudah ada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

                if (xxx.data.pesan === 'berhasil') {
                    handleClose();
                    clearForm();
                    reload()
                    setIsLoading(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Berhasil disimpan',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditorChange = (content: any, editor: any) => {
        setDeskripsi(content);;
    }

    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah</button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title >Tambah Data Barang</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label" >Kode Barang</label>
                                <input
                                    autoFocus
                                    required
                                    type="text"
                                    className="form-control"
                                    value={kodeBarang} onChange={(e) => setKodebarang(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label" >Nama Barang</label>
                                <input
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
                                <label className="col-sm-3 col-form-label" >Merek</label>
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
                                <label className="col-sm-3 col-form-label" >Unit</label>
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
                                    onChange={handlechangestok}
                                    min='1'
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
                                    className="form-control"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}></label>
                                {file ? <img src={preview} width={300} style={{ maxWidth: 300, maxHeight: 200 }} className="img-fluid " alt="Responsive image" /> : null}
                            </div>
                        </div>


                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Deskripsi</label>
                                <Editor
                                    value={deskripsi}
                                    initialValue=""
                                    init={{
                                        height: 500,
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
        </div>
    )
}

export default Add