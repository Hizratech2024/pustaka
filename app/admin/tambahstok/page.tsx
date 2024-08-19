/* eslint-disable @next/next/no-async-client-component */
"use client"
import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Minus } from 'react-feather';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import AsyncSelect from 'react-select/async';
import Modal from "react-bootstrap/esm/Modal";
import Select from 'react-select'
import { Editor } from '@tinymce/tinymce-react';
import { Button as Button1 } from 'antd';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Col, Row } from "@themesberg/react-bootstrap";
import { StyleSelect, tanggalHariIni } from "@/app/helper";
import { useSession } from "next-auth/react";

const TambahStok = () => {
  const session = useSession()
  const admin = session.data?.nama
  const [selected, setSelected] = useState(null)
  const [inputFields, setInputFields] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [tanggal, setTanggal] = useState(tanggalHariIni);
  const [total, setTotal] = useState(0);
  const [totalqty, setTotalqty] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const [databarang, setDatabarang] = useState([])
  const [datakategori, setDatakategori] = useState([])
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
  const [selectedkategori, setSelectedkategori] = useState(null)
  const myRef = useRef<HTMLInputElement>(null);
  const refqty = useRef<HTMLInputElement>(null);

  let loadOptions = (inputValue: any, callback: any) => {
    setTimeout(async () => {
      if (inputValue.length < 2) {
        callback([]);
        return;
      }
      const data = databarang.filter(
        (item: any) => item.namaBarang && item.namaBarang.toLowerCase().includes(inputValue.toLowerCase()),
      );
      const options = data.map((item: any) => ({
        value: item.id,
        label: item.namaBarang,
        kodeBarang: item.kodeBarang,
        namaBarang: item.namaBarang,
        hargaModal: item.hargaModal,
        hargaJual: item.hargaJual,
        stok: item.stok,
      }));
      callback(options);
    }, 300);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    clearForm();
    setTimeout(function () {
      setbarcode()
    }, 500);
  }
  const handleShow = () => setShow(true);
  const setbarcode = () => {
    ref.current?.focus();
  }

  useEffect(() => {
    ref.current?.focus();
    getkategori()
    getbarang()
  }, [])

  async function getkategori() {
    const response = await axios.get(`/admin/api/kategori`);
    const data = response.data;
    const options = data.map((item: any) => ({ label: item.nama, value: item.id }))
    setDatakategori(options);
  }

  async function getbarang() {
    const response = await axios.get(`/admin/api/barang`);
    const data = response.data;
    setDatabarang(data);
  }

  const refresh = () => {
    setInputFields([])
    setSelected(null)
    setTanggal(tanggalHariIni)
    setTotal(0)
    setTotalqty(0)
    ref.current?.focus()
  }

  const handlekategori = (value: any) => {
    setKategoriId(value.value);
    setSelected(value)
  }

  const handlechange = (selected: any) => {
    setSelected(selected)
    const a = inputFields.findIndex((element: any) => element.kodeBarang == selected.kodeBarang);
    let x = []
    if (a > -1) {
      const data: any = [...inputFields]
      data[a].qty++
      data[a].hargaModal = selected.hargaModal
      data[a].hargaJual = selected.hargaJual
      data[a].subtotal = selected.hargaModal * data[a].qty
      data[a].stokakhir = selected.stok + data[a].qty
      setInputFields(data);
      ref.current?.focus();
      x = data
    } else {
      const data: any = [...inputFields, {
        id: selected.value,
        kodeBarang: selected.kodeBarang,
        namaBarang: selected.namaBarang,
        hargaModal: selected.hargaModal,
        hargaJual: selected.hargaJual,
        stok: selected.stok,
        qty: 1,
        subtotal: selected.hargaModal * 1,
        stokakhir: selected.stok + 1
      }]
      setInputFields(data)
      x = data
    }
    let totalbayar = 0;
    let totalqty = 0;
    x.forEach((item: any) => {
      totalbayar += item.subtotal;
      totalqty += Number(item.qty);
    })
    setTotal(totalbayar)
    setTotalqty(totalqty)
    setSelected(null)
    ref.current?.focus();
  }

  const handleRemoveFields = (kodeBarang: any) => {
    let x = []
    const values = [...inputFields];
    values.splice(values.findIndex((value: any) => value.kodeBarang === kodeBarang), 1);
    setInputFields(values);
    x = values
    let totalbayar = 0;
    let totalqty = 0;
    x.forEach((item: any) => {
      totalbayar += item.subtotal;
      totalqty += Number(item.qty);
    })
    setTotal(totalbayar)
    setTotalqty(totalqty)
    ref.current?.focus();
  }

  const handleChangeInput = (kodeBarang: any, event: any) => {
    let z = []
    const newInputFields: any = inputFields.map((i: any) => {
      if (kodeBarang === i.kodeBarang) {
        let xxx = event.target.value
        if (parseInt(xxx) <= 0) {
          xxx = '';
        }
        i[event.target.name] = xxx
        i.subtotal = i.qty * i.hargaModal
        i.stokakhir = Number(i.qty) + i.stok
      }
      return i;
    })
    setInputFields(newInputFields);
    z = newInputFields
    let totalbayar = 0;
    let totalqty = 0;
    z.forEach((item: any) => {
      totalbayar += item.subtotal;
      totalqty += Number(item.qty);
    })
    setTotal(totalbayar)
    setTotalqty(totalqty)
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (total == 0) {
      Toast.fire({
        icon: 'warning',
        title: 'Belum ada data'
      })
      ref.current?.focus();
    }
    const cekqty = inputFields.some((item: any) => item.qty <= 0);
    if (cekqty) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Qty tidak boleh kosong',
        showConfirmButton: true,
      })
      return;
    }

    const formData = new FormData()
    formData.append('tanggal', new Date(tanggal).toISOString())
    formData.append('totalItem', String(totalqty))
    formData.append('totalBayar', String(total))
    formData.append('admin', String(admin))
    formData.append('selected', JSON.stringify(inputFields))

    await axios.post(`/admin/api/tambahstok`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Berhasil simpan',
      showConfirmButton: false,
      timer: 1500
    })
    refresh();
    getbarang()
  };

  const scanbarcode = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (barcode == "") {
        return
      }
      const xxx: any = databarang.find((item: any) => item.kodeBarang.toLowerCase() === (barcode.toLowerCase()))
      if (xxx === undefined) {
        Swal.fire({
          title: 'Data Tidak Ada',
          text: "Tambah Data Baru!",
          icon: 'warning',
          showCancelButton: true,
          backdrop: "static",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            handleShow()
            setKodebarang(barcode)
          }
        })
        setBarcode("")
        return
      } else {
        const a = inputFields.findIndex((element: any) => element.kodeBarang == xxx.kodeBarang);
        let x = []
        if (a > -1) {
          const data: any = [...inputFields]
          data[a].qty++
          data[a].hargaModal = xxx.hargaModal
          data[a].hargaJual = xxx.hargaJual
          data[a].subtotal = xxx.hargaModal * data[a].qty
          data[a].stokakhir = xxx.stok + data[a].qty
          setInputFields(data);
          x = data
        } else {
          const data: any = [...inputFields, {
            id: xxx.id,
            kodeBarang: xxx.kodeBarang,
            namaBarang: xxx.namaBarang,
            hargaModal: xxx.hargaModal,
            hargaJual: xxx.hargaJual,
            stok: xxx.stok,
            qty: 1,
            subtotal: xxx.hargaModal * 1,
            stokakhir: xxx.stok + 1
          }]
          setInputFields(data)
          x = data
        }
        let totalbayar = 0;
        let totalqty = 0;
        x.forEach((item: any) => {
          totalbayar += item.subtotal;
          totalqty += Number(item.qty);
        })
        setTotal(totalbayar)
        setTotalqty(totalqty)
        setBarcode("")
      }
    }
  }

  function currencyFormat(num: string) {
    return 'Rp ' + parseFloat(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  const selectallqty = (kodeBarang: any, event: any) => {
    inputFields.map((i: any) => {
      if (kodeBarang === i.kodeBarang) {
        i[event.target.select(refqty.current?.select())] = event.target.value
      }
      return i;
    })
  }

  const qtykey = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value <= 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Qty tidak boleh 0',
          showConfirmButton: true,
        })
        return
      }
      return ref.current?.focus()
    }
  }

  const selectallharmodal = (kodeBarang: any, event: any) => {
    inputFields.map((i: any) => {
      if (kodeBarang === i.kodeBarang) {
        i[event.target.select(refqty.current?.select())] = event.target.value
      }
      return i;
    })
  }

  const harmodalkey = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value <= 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Harga Modal tidak boleh 0',
          showConfirmButton: true,
        })
        return
      }
      return ref.current?.focus()
    }
  }

  const selectallharjul = (kodeBarang: any, event: any) => {
    inputFields.map((i: any) => {
      if (kodeBarang === i.kodeBarang) {
        i[event.target.select(refqty.current?.select())] = event.target.value
      }
      return i;
    })
  }

  const harjulkey = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value <= 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Harga Jual tidak boleh 0',
          showConfirmButton: true,
        })
        return
      }
      return ref.current?.focus()
    }
  }

  // #################################################################################################

  const setfokuskodebarang = () => {
    myRef.current?.focus();
  };

  function clearForm() {
    setKodebarang('')
    setNamabarang('')
    setMerek('')
    setKategoriId('')
    setUnit('')
    setHargamodal('')
    setHargaJual('')
    setStok('0')
    setSelectedkategori(null)
    setFile(null)
    ref.current?.focus();
  }

  const handleEditorChange = (content: any, editor: any) => {
    console.log('Content was updated:', content);
    setDeskripsi(content);
    console.log('deskrip:', deskripsi);
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

  const handleSubmitbarang = async (e: SyntheticEvent) => {
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

      const xxx = await axios.post(`/api/barang`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (xxx.data.pesan === 'kode barang sudah ada') {
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
        getbarang()
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

  const handlechangekategori = (value: any) => {
    setKategoriId(value.value);
    setSelectedkategori(value)
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

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Tambah Stok</h1>
            </div>
            <div className="card-body">
              <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" style={{ fontSize: 15, color: "black" }}>Tanggal</label>
                    <div className="col-sm-3">
                      <input
                        required
                        type="date"
                        className="form-control"
                        style={{ fontSize: 15, color: "black", borderColor: "grey" }}
                        value={tanggal} onChange={(e) => setTanggal(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" style={{ fontSize: 15, color: "black" }}>Scan Barcode</label>
                    <div className="col-sm-3">
                      <div className="input-group mb-3  input-success">
                        <input type="text"
                          autoFocus
                          ref={ref}
                          style={{ fontSize: 15, color: "black", borderColor: "grey" }}
                          className="form-control" placeholder="Scan Barcode" aria-label="Username" aria-describedby="basic-addon1"
                          value={barcode} onChange={(e) => setBarcode(e.target.value)}
                          onKeyPress={scanbarcode}
                        />
                        <span className="input-group-text border-0"><i className="mdi mdi-barcode-scan"></i></span>

                      </div>
                    </div>

                    <div className="col-sm-2"></div>

                    <label className="col-sm-2 col-form-label" style={{ fontSize: 15, color: "black" }}>Nama Barang</label>
                    <div className="col-sm-3">
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        placeholder="Search..."
                        loadOptions={loadOptions}
                        onChange={handlechange}
                        value={selected}
                        styles={StyleSelect}
                      />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table">
                      <thead className="">
                        <tr className="table-header">
                          <th className="" style={{ fontSize: 17, color: "black" }}>Kode barang</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}>Nama barang</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}>Harga Modal</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}>Harga Jual</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}>Qty</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}>SubTotal</th>
                          <th className="" style={{ fontSize: 17, color: "black" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {inputFields.map((inputField: any) => (
                          <tr key={inputField.kodeBarang}>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                disabled={true}
                                value={inputField.kodeBarang}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ fontSize: 15, width: 160, maxWidth: 160, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                disabled={true}
                                value={inputField.namaBarang}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ fontSize: 15, width: 210, maxWidth: 210, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                name='hargaModal'
                                type='number'
                                value={inputField.hargaModal}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                onKeyPress={harmodalkey}
                                onClick={event => selectallharmodal(inputField.kodeBarang, event)}
                                min="1"
                                style={{ backgroundColor: 'white', fontSize: 15, width: 110, maxWidth: 110, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                name='hargaJual'
                                type='number'
                                value={inputField.hargaJual}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                onKeyPress={harjulkey}
                                onClick={event => selectallharjul(inputField.kodeBarang, event)}
                                min="1"
                                style={{ backgroundColor: 'white', fontSize: 15, width: 110, maxWidth: 110, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                name='qty'
                                type='number'
                                onKeyPress={qtykey}
                                onClick={event => selectallqty(inputField.kodeBarang, event)}
                                min="1"
                                value={inputField.qty}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ backgroundColor: 'white', width: 75, maxWidth: 75, fontSize: 15, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                disabled={true}
                                required
                                name='subtotal'
                                type='number'
                                value={inputField.subtotal}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ fontSize: 15, width: 130, maxWidth: 130, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <Button1 disabled={inputFields.length === 0} onClick={() => handleRemoveFields(inputField.kodeBarang)}>
                                <Minus />
                              </Button1>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="">


                      </tfoot>
                    </table>
                    <Row>
                      <Col md={2} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}></h3>
                      </Col>
                      <Col md={2} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Total Item</h3>
                      </Col>
                      <Col md={2} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{totalqty}</h3>
                      </Col>
                      <Col md={3} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Grand Total</h3>
                      </Col>
                      <Col md={3} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> {currencyFormat(String(total))}</h3>
                      </Col>
                    </Row>
                  </div>
                </div>
                <Col md={5} className="mb-1">
                  <span className="p-buttonset">
                    <Button label="Save" type="submit" icon="mdi mdi-content-save" className="px-4" severity="info" />
                    <Button label="Cancel" type="button" onClick={refresh} icon="mdi mdi-close-circle" severity="danger" />
                  </span>
                </Col>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        dialogClassName="modal-lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <form onSubmit={handleSubmitbarang}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Tambah Data Barang</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Kode Barang</label>
                <input
                  required
                  disabled
                  type="text"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={kodeBarang} onChange={(e) => setKodebarang(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Nama Barang</label>
                <input
                  autoFocus
                  required
                  type="text"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={namaBarang} onChange={(e) => setNamabarang(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Kategori</label>
                <Select
                  required
                  placeholder="Search..."
                  options={datakategori}
                  onChange={handlekategori}
                  value={selected}
                  styles={StyleSelect}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Merek</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={merek} onChange={(e) => setMerek(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Unit</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={unit} onChange={(e) => setUnit(e.target.value)}
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Stok</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={stok}
                  onChange={handlechangestok}
                  min='1'
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Harga Modal</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={hargaModal}
                  onChange={handlechangemodal}
                  min='1'
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Harga Jual</label>
                <input
                  required
                  type="number"
                  className="form-control"
                  style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                  value={hargaJual}
                  onChange={handlechangejual}
                  min='1'
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Foto</label>
                <input
                  type="file"
                  id="inputGroupFile01"
                  name="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  style={{ backgroundColor: 'white', color: "black", borderColor: "grey" }}
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
    </div >
  )
}

export default TambahStok
