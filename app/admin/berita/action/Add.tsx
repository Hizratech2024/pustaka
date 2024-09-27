"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import { Editor } from '@tinymce/tinymce-react';
import { tanggalHariIni,supabase, supabaseBUCKET } from "@/app/helper";

function Add({ reload }: { reload: Function }) {
    const [judul, setJudul] = useState("")
    const [tanggal, setTanggal] = useState(tanggalHariIni)
    const [isi, setIsi] = useState("")
    const [file, setFile] = useState<File | null>()
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false);
    const router = useRouter()
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

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    function clearForm() {
        setJudul('')
        setIsi('')
        setTanggal(tanggalHariIni)
        setFile(null)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('judul', judul)
            formData.append('tanggal',new Date(tanggal).toISOString() )
            formData.append('isi', isi)
            formData.append('file', file as File)
            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            const uploadResult = await supabase.storage
                .from(supabaseBUCKET)
                .upload(`foto-berita-pustaka/${namaunik}`, image);

            if (uploadResult.error) {
                setIsLoading(false)
                reload()
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Gagal Upload Gambar',
                    showConfirmButton: false,
                    timer: 1500
                })
                throw uploadResult.error
            }

            const xxx = await axios.post(`/admin/api/berita`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (xxx.data.pesan == 'berhasil') {
                handleClose();
                setIsLoading(false)
                clearForm();
                reload()
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

    const handleEditorChange = (content: any, editor: any) => {
        setIsi(content);;
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
                        <Modal.Title>Tambah Berita</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 row">
                            <div className="col-sm-8">
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Tanggal Berita</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="date"
                                            className="form-control"
                                            value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Judul</label>
                                    <div className="col-sm-9">
                                        <input
                                            autoFocus
                                            required
                                            type="text"
                                            className="form-control"
                                            value={judul} onChange={(e) => setJudul(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Foto Berita</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setFile(e.target.files?.[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                {file ?
                                    <div className="">
                                        <img
                                            src={preview}
                                            className="rounded"
                                            width='100%'
                                            height={150}
                                            alt=""
                                        />
                                    </div>
                                    :
                                    <img className="bg-gambarfoto2" />
                                }
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <Editor
                                    value={isi}
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