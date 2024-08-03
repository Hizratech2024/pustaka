/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client"
import axios from "axios";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Minus } from 'react-feather';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import AsyncSelect from 'react-select/async';
import Modal from "react-bootstrap/esm/Modal";
import { Col, Row } from "@themesberg/react-bootstrap";
import { Button as Button1 } from 'antd';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useSession } from "next-auth/react";
import { tanggalHariIni, tanggalIndo, cetakfaktur, StyleSelect } from "@/app/helper";
import { ThemeConsumer } from "@themesberg/react-bootstrap/lib/esm/ThemeProvider";

const Kasir = () => {
  const session = useSession()
  const kasir = session.data?.nama
  const [selected, setSelected] = useState(null)
  const [inputFields, setInputFields] = useState([]);
  const [nofaktur, setNofaktur] = useState('');
  const [tanggal, setTanggal] = useState(tanggalHariIni);
  const [barcode, setBarcode] = useState('');
  const [total, setTotal] = useState(0);
  const [totalqty, setTotalqty] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [uang, setUang] = useState("");
  const [databarang, setDatabarang] = useState([])
  const [totalbayar, setTotalbayar] = useState(0);
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null);
  const refuang = useRef<HTMLInputElement>(null);
  const refqty = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    refresh2();
    setTimeout(function () {
      ref.current?.focus();
    }, 400);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    otomatisnofaktur()
    ref.current?.focus();
    getbarang()
  }, [])

  async function otomatisnofaktur() {
    const response = await axios.get(`/api/kasir`);
    const data = response.data;
    setNofaktur(data)
  }

  async function getbarang() {
    const response = await axios.get(`/api/barang`);
    const data = response.data;
    setDatabarang(data);
  }

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

  const refresh = () => {
    setInputFields([])
    setTotal(0)
    setTotalqty(0)
    otomatisnofaktur()
    setBarcode('')
    setTotalbayar(0)
    ref.current?.focus();
  }

  const refresh2 = () => {
    setUang('')
    setKembalian(0)
  }

  const handlechange = (selected: any) => {
    setSelected(selected)
    if (selected.stok < 1) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Stok Kosong',
        showConfirmButton: false,
        timer: 1500
      })
      setBarcode("")
      setSelected(null)
      ref.current?.focus();
      return
    }
    else {
      const a = inputFields.findIndex((element: any) => element.kodeBarang == selected.kodeBarang);
      let x = []
      if (a > -1) {
        const data: any = [...inputFields]
        data[a].qty++
        data[a].hargaModal = selected.hargaModal
        data[a].hargaJual = selected.hargaJual
        data[a].subtotal = selected.hargaJual * data[a].qty
        data[a].stokakhir = selected.stok - data[a].qty
        setInputFields(data);
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
          subtotal: selected.hargaJual * 1,
          stokakhir: selected.stok - 1
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
      setTotalbayar(totalbayar)
      setSelected(null)
      setBarcode("")
      ref.current?.focus();
    }
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
    setTotalbayar(totalbayar)
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
        i.subtotal = i.qty * i.hargaJual
        i.stokakhir = i.stok - Number(i.qty)
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
    setTotalbayar(totalbayar)
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
    if (total === 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Belum Ada Data',
        showConfirmButton: false,
        timer: 2000
      })
      ref.current?.focus();
      return;
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

    const cekstok = inputFields.some((item: any) => item.qty > item.stok);
    if (cekstok) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Stok Tidak Cukup',
        showConfirmButton: true,
      })
      return;
    }
    handleShow()
    setTimeout(function () {
      refuang.current?.focus();
    }, 400);
  };

  const kalkulasi = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (Number(uang) < total) {
        return
      }
      if (Number(kembalian) <= 0) {
        let totalbelanja = 0;
        totalbelanja = (Number(uang) - total)
        setKembalian(totalbelanja)
        return
      }
      selesai()
    }
  }

  const selectall = (kodeBarang: any, event: any) => {
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


  const scanbarcode = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (barcode == "") {
        return handleSubmit(e)
      }

      const xxx: any = databarang.find((item: any) => item.kodeBarang.toLowerCase() === (barcode.toLowerCase()))
      if (xxx === undefined) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Data Barang Tidak Ada',
          showConfirmButton: false,
          timer: 1500
        })

        setBarcode("")
        return
      } else {
        if (xxx.stok < 1) {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Stok Kosong',
            showConfirmButton: false,
            timer: 1500
          })
          setBarcode("")
          return
        }
        else {
          const a = inputFields.findIndex((element: any) => element.kodeBarang == xxx.kodeBarang);

          let x = []
          if (a > -1) {
            const data: any = [...inputFields]
            data[a].qty++
            data[a].hargaModal = xxx.hargaModal
            data[a].hargaJual = xxx.hargaJual
            data[a].subtotal = xxx.hargaJual * data[a].qty
            data[a].stokakhir = xxx.stok - data[a].qty
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
              subtotal: xxx.hargaJual * 1,
              stokakhir: xxx.stok - 1
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
          setTotalbayar(totalbayar)
          setTotalqty(totalqty)
          setBarcode("")
        }
      }
    }
  }

  const currencyFormat = (value: any) => {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  const selesai = async () => {
    handleClose()
    const formData = new FormData()
    formData.append('totalItem', String(totalqty))
    formData.append('totalBayar', String(total))
    formData.append('nofaktur', nofaktur)
    formData.append('tanggal', new Date(tanggal).toISOString())
    formData.append('kasir', String(kasir))
    formData.append('selected', JSON.stringify(inputFields))

    const xxx = await axios.post(`/api/kasir`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (xxx.data.pesan === 'berhasil') {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Berhasil simpan',
        showConfirmButton: false,
        timer: 1500
      })

      cetakfaktur(inputFields, total, nofaktur, kasir, tanggal);


      refresh();
      refresh2();
      getbarang()
      router.refresh()
    }

  }

  const handleUang = (e: any) => {
    let value = e.target.value
    if (parseInt(value) <= 0) {
      value = '';
    }
    setUang(value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title " >Kasir</h1>
            </div>
            <div className="card-body">
              <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label" style={{ fontSize: 15, color: "black" }}>No Faktur</label>
                    <div className="col-sm-3">
                      <input
                        disabled={true}
                        required
                        type="text"
                        className="form-control"
                        style={{ fontSize: 15, color: "black", borderColor: "grey" }}
                        value={nofaktur} onChange={(e) => setNofaktur(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-1"></div>

                    <label className="col-sm-2 col-form-label" style={{ fontSize: 15, color: "black" }}>Tanggal</label>
                    <div className="col-sm-3">
                      <input
                        disabled
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
                          style={{ backgroundColor: 'white', fontSize: 15, color: "black", borderColor: "grey" }}
                          className="form-control" placeholder="Scan Barcode" aria-label="Username" aria-describedby="basic-addon1"
                          value={barcode} onChange={(e) => setBarcode(e.target.value)}
                          onKeyPress={scanbarcode}
                        />
                        <span className="input-group-text border-0"><i className="mdi mdi-barcode-scan"></i></span>
                      </div>
                    </div>

                    <div className="col-sm-1"></div>

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
                                style={{ fontSize: 15, width: 200, maxWidth: 200, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                disabled={true}
                                value={inputField.namaBarang}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ fontSize: 15, width: 250, maxWidth: 250, color: "black", borderColor: "grey" }}
                              />
                            </td>

                            <td className="border-0 fw-bold">
                              <input
                                className="form-control"
                                required
                                disabled={true}
                                name='hargaJual'
                                type='number'
                                value={inputField.hargaJual}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                style={{ fontSize: 15, width: 130, maxWidth: 130, color: "black", borderColor: "grey" }}
                              />
                            </td>
                            <td className="border-0 fw-bold">
                              <input
                                ref={refqty}
                                className="form-control"
                                required
                                name='qty'
                                type='number'
                                value={inputField.qty}
                                onChange={event => handleChangeInput(inputField.kodeBarang, event)}
                                onKeyPress={qtykey}
                                onClick={event => selectall(inputField.kodeBarang, event)}
                                min="1"
                                style={{ backgroundColor: 'white', width: 80, maxWidth: 80, fontSize: 15, color: "black", borderColor: "grey" }}
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
                                style={{ fontSize: 15, width: 160, maxWidth: 160, color: "black", borderColor: "grey" }}
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
                        <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}></h3>
                      </Col>
                      <Col md={2} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}></h3>
                      </Col>
                      <Col md={2} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontFamily: 'initial', fontSize: 30, fontWeight: 'bold' }}></h3>
                      </Col>
                      <Col md={3} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Grand Total</h3>
                      </Col>
                      <Col md={3} className="mb-2 mt-3">
                        <h3 className="" style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}> {currencyFormat(total)}</h3>
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
        <form onSubmit={selesai}>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: 20, color: "black" }}>Detail Belanja</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive">
              <table className="table ">
                <thead className="thead-success">
                  <tr>
                    <th style={{ fontSize: 20, color: "black" }}>No</th>
                    <th style={{ fontSize: 20, color: "black" }}>Nama Barang</th>
                    <th style={{ fontSize: 20, color: "black" }}>Harga</th>
                    <th style={{ fontSize: 20, color: "black" }}>Qty</th>
                    <th style={{ fontSize: 20, color: "black" }}>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  {inputFields.map((x: any, index) => (
                    <tr className="hover" key={x.id}>
                      <td style={{ fontSize: 18, color: "black" }}>{index + 1}</td>
                      <td style={{ fontSize: 18, color: "black" }}>{x.namaBarang}</td>
                      <td style={{ fontSize: 18, color: "black" }}> {x.hargaJual}</td>
                      <td style={{ fontSize: 18, color: "black" }}>{x.qty}</td>
                      <td style={{ fontSize: 18, color: "black" }}>{x.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="">
                  <tr>
                    <th className=""></th>
                    <th className=""></th>
                    <th className="" style={{ fontSize: 25, color: 'black' }}>Total Bayar</th>
                    <th className=""></th>
                    <th className="" style={{ fontSize: 25, color: 'black' }}>
                      {currencyFormat(total)}
                    </th>
                    <th className=""></th>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mb-3 mt-3 row">
              <label className="col-sm-4 col-form-label" style={{ fontSize: 25, color: "black" }}>Jumlah Uang</label>
              <div className="col-sm-8">
                <input
                  required
                  ref={refuang}
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: 'white', fontSize: 30, color: "green", borderColor: "grey", height: 60, fontWeight: 'bold' }}
                  value={uang} onKeyPress={kalkulasi}
                  onChange={handleUang}
                  min='1'
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label className="col-sm-4 col-form-label" style={{ fontSize: 25, color: "black" }}>Kembalian</label>
              <label className="col-sm-8 col-form-label" style={{ fontSize: 30, color: "red", fontWeight: 'bold' }}>{kembalian ? currencyFormat(kembalian) : null}</label>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
            <button type="submit" className="btn btn-primary light" onClick={selesai}>Simpan</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Kasir