"use client"
import { rupiah } from '@/app/helper';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from "sweetalert2";

const Produk = () => {
  const [databarang, setDatabarang] = useState([])
  const [kodeBarang, setKodebarang] = useState("")
  const [namaBarang, setNamabarang] = useState("")
  const [kategoriId, setKategoriId] = useState("")
  const [merek, setMerek] = useState("")
  const [unit, setUnit] = useState("")
  const [hargaModal, setHargamodal] = useState("")
  const [hargaJual, setHargaJual] = useState("")
  const [stok, setStok] = useState("")
  const [barcode, setBarcode] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/kasir/api/barang`);
      const result = await response.json();
      setDatabarang(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const hanndlechange = (e: any) => {
    setBarcode(e.target.value)
    if (e.target.value === "") {

      setKodebarang('')
      setNamabarang('')
      setMerek('')
      setKategoriId('')
      setUnit('')
      setStok('')
      setHargaJual('')
    }
  }

  const hapus = () => {
    setBarcode('')
    setKodebarang('')
    setNamabarang('')
    setMerek('')
    setKategoriId('')
    setUnit('')
    setStok('')
    setHargaJual('')
    ref.current?.focus();
  }

  const scanbarcode = async (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (barcode == "") {
        return
      }

      const yyy:any = databarang.find((item: any) => item.kodeBarang.toLowerCase() === (barcode.toLowerCase()))
      if (yyy === undefined) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Data Barang Tidak Ada',
          showConfirmButton: false,
          timer: 2000
        })

        setBarcode("")
        return
      }
      else {
        setKodebarang(yyy.kodeBarang)
        setNamabarang(yyy.namaBarang)
        setMerek(yyy.merek)
        setKategoriId(yyy.KategoriTb.nama)
        setUnit(yyy.unit)
        setStok(yyy.stok)
        setHargaJual(yyy.hargaJual)
      }
    }

  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title" style={{ fontFamily: "initial", fontSize: 25 }}>Cek Harga Barang</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 25, color: "black" }}>Scan Barcode</label>
                <div className="col-sm-3">
                  <div className="input-group mb-3  input-success">
                    <input type="text"
                      autoFocus
                      ref={ref}
                      style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                      className="form-control" placeholder="Scan Barcode" aria-label="Username" aria-describedby="basic-addon1"
                      value={barcode} onChange={hanndlechange}
                      onKeyPress={scanbarcode}
                    />
                    <span className="input-group-text border-0" onClick={hapus}><i className="mdi mdi-barcode-scan"></i></span>
                  </div>
                </div>
              </div>

              {kodeBarang !== '' ?
                <div>
                  <div className="row">

                    <div className="mb-3 col-md-12">
                      <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Nama Barang</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                        value={namaBarang} onChange={(e) => setNamabarang(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-4">
                      <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Merek</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                        value={merek} onChange={(e) => setMerek(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Unit</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                        value={unit} onChange={(e) => setUnit(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 col-md-4">
                      <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 15, fontWeight: 'bold', color: "black" }}>Stok</label>
                      <input
                        disabled
                        type="number"
                        className="form-control"
                        style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 20, color: "black", borderColor: "grey" }}
                        value={stok}
                        min='1'
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="col-sm-3 col-form-label" style={{ fontFamily: "initial", fontSize: 30, fontWeight: 'bold', color: "black" }}>Harga</label>
                      {/* <input
                        disabled
                        type="number"
                        className="form-control"
                        style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 80, color: "black", borderColor: "grey" }}
                        value={hargaJual}
                      /> */}
                      <span style={{ fontFamily: "initial", backgroundColor: 'white', fontSize: 80, color: "green", borderColor: "grey" }} >
                        {rupiah(hargaJual)}
                      </span>
                    </div>

                  </div>
                </div>
                :
                null}





            </div>


          </div>
        </div>
      </div >
    </div >
  )
}

export default Produk