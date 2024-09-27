"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { Berita } from "@prisma/client";
import { useRouter } from "next/navigation"
import { Editor } from '@tinymce/tinymce-react';
import moment from "moment";
import { supabase, supabaseBUCKET,supabaseUrl } from "@/app/helper";

function Update({ berita, reload }: { berita: Berita, reload: Function }) {
    const [judul, setJudul] = useState(berita.judul)
    const [tanggal, setTanggal] = useState(moment(berita.tanggal).format("YYYY-MM-DD"))
    const [isi, setIsi] = useState(berita.isi)
    const [foto, setFoto] = useState(berita.foto)
    const [file, setFile] = useState<File | null>()
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false);
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

    useEffect(() => {
        if (!file) {
            setPreview('')
            setFoto(berita.foto)
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setFoto(objectUrl)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setJudul(berita.judul)
        setTanggal(moment(berita.tanggal).format("YYYY-MM-DD"))
        setIsi(berita.isi)
        setFile(null)
    }

    const handleEditorChange = (content: any, editor: any) => {
        setIsi(content);;
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newfoto = foto === berita.foto ? 'no' : 'yes'
        try {
            const formData = new FormData()
            formData.append('judul', judul)
            formData.append('tanggal', new Date(tanggal).toISOString())
            formData.append('isi', isi)
            formData.append('file', file as File)
            formData.append('newfoto', newfoto)
            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            if (newfoto === 'yes') {
                await supabase.storage
                    .from(supabaseBUCKET)
                    .remove([`foto-berita-pustaka/${berita.foto}`]);

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
                setFoto(namaunik)
            }

            const xxx = await axios.patch(`/admin/api/berita/${berita.id}`, formData, {
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
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success  sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-xl"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Berita</Modal.Title>
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
                                    <label className="col-sm-3 col-form-label" >Foto</label>
                                    <div className="col-sm-9">
                                        <input
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
                                            width='100%'
                                            height={150}
                                            alt=""
                                        />
                                    </div>
                                    :
                                    <a href={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/foto-berita-pustaka/${berita.foto}`} target="_blank">
                                        <img
                                            src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/foto-berita-pustaka/${berita.foto}`}
                                            width='100%'
                                            height={150}
                                            alt=""
                                        />
                                    </a>
                                }
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <Editor
                                    value={isi}
                                    init={{
                                        height: 250,
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

export default Update