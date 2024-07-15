"use client"
import { useState, SyntheticEvent, useEffect, useRef } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { tanggalHariIni } from "@/app/helper";
import { Editor } from '@tinymce/tinymce-react';


function Add({ reload }: { reload: Function }) {
    const [noservis, setNoservis] = useState("")
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
            formData.append('namaBarang', namaBarang)
            formData.append('noseri', noseri)
            formData.append('perlengkapan', perlengkapan)
            formData.append('jenis', jenis)
            formData.append('software', software)
            formData.append('hardware', hardware)
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
                printData();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditorChange = (content: any, editor: any) => {
        setPerlengkapan(content);;
    }

    const handleSoftwareChange = (content: any, editor: any) => {
        setSoftware(content);;
    }

    const handleHardwareChange = (content: any, editor: any) => {
        setHardware(content);;
    }

    const printData = () => {
        const printContent = `
            <div>
                <h2>Data Servis</h2>
                <table border="1" style="border-collapse: collapse; width: 100%;">
                <tr>
                    <th>No Servis</th>
                    <td>${noservis}</td>
                </tr>
                <tr>
                    <th>Nama</th>
                    <td>${nama}</td>
                </tr>
                <tr>
                    <th>Alamat</th>
                    <td>${alamat}</td>
                </tr>
                <tr>
                    <th>Telp</th>
                    <td>${hp}</td>
                </tr>
                <tr>
                    <th>Nama Barang</th>
                    <td>${namaBarang}</td>
                </tr>
                <tr>
                    <th>No Seri</th>
                    <td>${noseri}</td>
                </tr>
                <tr>
                    <th>Perlengkapan</th>
                    <td>${perlengkapan}</td>
                </tr>
                <tr>
                    <th>Jenis Servisan</th>
                    <td>${jenis}</td>
                </tr>
                <tr>
                    <th>Software</th>
                    <td>${software}</td>
                </tr>
                <tr>
                    <th>Hardware</th>
                    <td>${hardware}</td>
                </tr>
                <tr>
                    <th>Status</th>
                    <td>${jenis.toLowerCase().includes('hardware') ? 'Menunggu Konfirmasi' : 'Proses'}</td>
                </tr>
            </table>
            </div>
        `;
        const printWindow = window.open('', '', 'height=600,width=800');
    
        if (printWindow) {
            printWindow.document.write('<html><head><title>Print Data Servis</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(printContent);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        } else {
            console.error('Failed to open print window');
        }
    };

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

                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Kelengkapan</label>
                                <Editor
                                    initialValue=""
                                    value={perlengkapan}
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
                                            'removeformat | help |image',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        images_upload_url: '/upload',
                                        images_upload_base_path: '/images',
                                        images_upload_credentials: true,
                                        file_picker_types: 'image',
                                        file_picker_callback: (cb, value, meta) => {

                                        },
                                    }}
                                    onEditorChange={handleEditorChange}
                                />
                            </div>
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
                                    <Editor
                                        initialValue=""
                                        value={software}
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
                                                'removeformat | help |image',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            images_upload_url: '/upload',
                                            images_upload_base_path: '/images',
                                            images_upload_credentials: true,
                                            file_picker_types: 'image',
                                            file_picker_callback: (cb, value, meta) => {

                                            },
                                        }}
                                        onEditorChange={handleSoftwareChange}
                                    />
                                </div>
                            )}
                            {jenis.toLowerCase().includes('hardware') && (
                                <div className="mb-3 col-md-6">
                                    <label className="col-sm-6 col-form-label">Hardware</label>
                                    <Editor
                                        initialValue=""
                                        value={hardware}
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
                                                'removeformat | help |image',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            images_upload_url: '/upload',
                                            images_upload_base_path: '/images',
                                            images_upload_credentials: true,
                                            file_picker_types: 'image',
                                            file_picker_callback: (cb, value, meta) => {

                                            },
                                        }}
                                        onEditorChange={handleHardwareChange}
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