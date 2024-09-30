"use client";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import SearchableSelect from "./action/SearchMember";
import SearchKategori from "./action/SearchKategori";
import DataTable from "react-data-table-component";
import axios from "axios";
import { tanggalHariIni, VIP0, VIP1 } from "@/app/helper";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";
import { Col, Row } from "@themesberg/react-bootstrap";
import SearchMember from "./action/SearchMember";
import { StyleSelect } from "@/app/helper";
import { Minus } from "react-feather";
import { Button as Button1 } from "antd";

interface MemberOption {
  value: string;
  label: string;
  status: string;
}

const TransaksiPeminjaman = () => {
  const [selected, setSelected] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [noPeminjaman, setNoPeminjaman] = useState("");
  const [tanggal, setTanggal] = useState(tanggalHariIni);
  const [barcode, setBarcode] = useState("");
  const [totalqty, setTotalqty] = useState(0);
  const [dataBuku, setDataBuku] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [selectMemberStatus, setSelectMemberStatus] = useState("");
  const [tanggalPeminjaman, setTanggalPeminjaman] = useState(tanggalHariIni);
  const [tanggalPengembalian, setTanggalPengembalian] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const refuang = useRef<HTMLInputElement>(null);
  const refqty = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [selectedMember, setSelectedMember] = useState<MemberOption | null>(
    null
  );

  useEffect(() => {
    otomatisnopeminjaman();
    getbuku();
    getMember();
  }, []);

  // const handleSubmit = async (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   if (total === 0) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "warning",
  //       title: "Belum Ada Data",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //     ref.current?.focus();
  //     return;
  //   }

  //   const cekqty = inputFields.some((item: any) => item.qty <= 0);
  //   if (cekqty) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "warning",
  //       title: "Qty tidak boleh kosong",
  //       showConfirmButton: true,
  //     });
  //     return;
  //   }

  //   const cekstok = inputFields.some((item: any) => item.qty > item.stok);
  //   if (cekstok) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "warning",
  //       title: "Stok Tidak Cukup",
  //       showConfirmButton: true,
  //     });
  //     return;
  //   }
  //   handleShow();
  //   setTimeout(function () {
  //     refuang.current?.focus();
  //   }, 400);
  // };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    // refresh2();
    setTimeout(function () {
      ref.current?.focus();
    }, 400);
  };

  async function otomatisnopeminjaman() {
    const response = await axios.get(`/admin/api/transaksiPeminjaman`);
    const data = response.data;
    setNoPeminjaman(data);
  }

  async function getbuku() {
    const response = await axios.get(`/admin/api/buku`);
    const data = response.data;
    setDataBuku(data);
  }

  async function getMember() {
    const response = await axios.get(`/admin/api/member`);
    const data = response.data;
    setDataMember(data);
  }

  const formatTanggal = (tanggal: Date): string => {
    const dd = String(tanggal.getDate()).padStart(2, "0");
    const mm = String(tanggal.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const yyyy = tanggal.getFullYear();
    return `${yyyy}-${mm}-${dd}`; // Format ke YYYY-MM-DD untuk input type="date"
  };

  const maxDate = () => {
    if (selectMemberStatus === "VIP 0") {
      const today = new Date();
      today.setDate(today.getDate() + 3);
      return formatTanggal(today);
    } else if (selectMemberStatus === "VIP 1") {
      const today = new Date();
      today.setDate(today.getDate() + 6);
      return formatTanggal(today);
    }
    return ""; // Tidak ada batasan jika status member bukan 'vip0'
  };

  let loadOptions = (inputValue: any, callback: any) => {
    setTimeout(async () => {
      if (inputValue.length < 2) {
        callback([]);
        return;
      }
      const data = dataBuku.filter(
        (item: any) =>
          item.judul &&
          item.judul.toLowerCase().includes(inputValue.toLowerCase())
      );
      const options = data.map((item: any) => ({
        value: item.id,
        label: item.judul,
        kodeBuku: item.kodeBuku,
        judul: item.judul,
        stok: item.stok,
        penulis: item.penulis,
        penerbit: item.penerbit,
      }));
      callback(options);
    }, 300);
  };

  let loadOptionsMember = (
    inputValue: string,
    callback: (options: MemberOption[]) => void
  ) => {
    setTimeout(() => {
      if (inputValue.length < 2) {
        callback([]); // Jika inputValue kurang dari 2 karakter, tidak ada hasil
        return;
      }

      // Filter data berdasarkan inputValue
      const filteredData = dataMember.filter(
        (item: any) =>
          item.nama &&
          item.nama.toLowerCase().includes(inputValue.toLowerCase())
      );

      // Map data menjadi opsi yang bisa digunakan dalam AsyncSelect
      const options = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama,
        status: item.status || "Status tidak tersedia", // Menambahkan default jika status tidak ada
      }));

      callback(options);
    }, 300);
  };

  const handleChangeMember = (selectedOption: any) => {
    setSelectedMember(selectedOption);
    setSelectMemberStatus(selectedOption.status);
    if (selectedOption.status === "VIP 0") {
      setTanggalPengembalian(VIP0);
    } else if (selectedOption.status === "VIP 1") {
      setTanggalPengembalian(VIP1);
    }
  };

  const handlechange = (selected: any) => {
    setSelected(selected);
    if (selected.stok < 1) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Stok Kosong",
        showConfirmButton: false,
        timer: 1500,
      });
      setBarcode("");
      setSelected(null);
      ref.current?.focus();
      return;
    } else {
      const a = inputFields.findIndex(
        (element: any) => element.kodeBuku == selected.kodeBuku
      );
      let x = [];
      if (a > -1) {
        const data: any = [...inputFields];
        data[a].qty++;
        data[a].stokakhir = selected.stok - data[a].qty;
        setInputFields(data);
        x = data;
      } else {
        const data: any = [
          ...inputFields,
          {
            id: selected.value,
            kodeBuku: selected.kodeBuku,
            judul: selected.judul,
            penulis: selected.penulis,
            penerbit: selected.penerbit,
            stok: selected.stok,
            qty: 1,
            stokakhir: selected.stok - 1,
          },
        ];
        setInputFields(data);
        x = data;
      }
      let totalqty = 0;
      x.forEach((item: any) => {
        totalqty += Number(item.qty);
      });
      setTotalqty(totalqty);
      setSelected(null);
      setBarcode("");
      ref.current?.focus();
    }
  };

  const selectall = (kodeBarang: any, event: any) => {
    inputFields.map((i: any) => {
      if (kodeBarang === i.kodeBarang) {
        i[event.target.select(refqty.current?.select())] = event.target.value;
      }
      return i;
    });
  };

  const handleChangeInput = (kodeBuku: any, event: any) => {
    let z = [];
    const newInputFields: any = inputFields.map((i: any) => {
      if (kodeBuku === i.kodeBuku) {
        let xxx = event.target.value;
        if (parseInt(xxx) <= 0) {
          xxx = "";
        }
        i[event.target.name] = xxx;
        i.subtotal = i.qty * i.hargaJual;
        i.stokakhir = i.stok - Number(i.qty);
      }
      return i;
    });
    setInputFields(newInputFields);
    z = newInputFields;
    let totalbayar = 0;
    let totalqty = 0;
    z.forEach((item: any) => {
      totalbayar += item.subtotal;
      totalqty += Number(item.qty);
    });
    setTotalqty(totalqty);
  };

  const scanbarcode = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (barcode == "") {
        // return handleSubmit(e);
      }
      const xxx: any = dataBuku.find(
        (item: any) => item.kodeBarang.toLowerCase() === barcode.toLowerCase()
      );
      if (xxx === undefined) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Data Barang Tidak Ada",
          showConfirmButton: false,
          timer: 1500,
        });

        setBarcode("");
        return;
      } else {
        if (xxx.stok < 1) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Stok Kosong",
            showConfirmButton: false,
            timer: 1500,
          });
          setBarcode("");
          return;
        } else {
          const a = inputFields.findIndex(
            (element: any) => element.kodeBarang == xxx.kodeBarang
          );

          let x = [];
          if (a > -1) {
            const data: any = [...inputFields];
            data[a].qty++;
            data[a].hargaModal = xxx.hargaModal;
            data[a].hargaJual = xxx.hargaJual;
            data[a].subtotal = xxx.hargaJual * data[a].qty;
            data[a].stokakhir = xxx.stok - data[a].qty;
            setInputFields(data);
            x = data;
          } else {
            const data: any = [
              ...inputFields,
              {
                id: xxx.id,
                kodeBarang: xxx.kodeBarang,
                namaBarang: xxx.namaBarang,
                hargaModal: xxx.hargaModal,
                hargaJual: xxx.hargaJual,
                stok: xxx.stok,
                qty: 1,
                subtotal: xxx.hargaJual * 1,
                stokakhir: xxx.stok - 1,
              },
            ];
            setInputFields(data);
            x = data;
          }

          let totalbayar = 0;
          let totalqty = 0;
          x.forEach((item: any) => {
            totalbayar += item.subtotal;
            totalqty += Number(item.qty);
          });
          setTotalqty(totalqty);
          setBarcode("");
        }
      }
    }
  };

  const qtykey = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value <= 0) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Qty tidak boleh 0",
          showConfirmButton: true,
        });
        return;
      }
      return ref.current?.focus();
    }
  };

  const handleRemoveFields = (kodeBuku: any) => {
    let x = [];
    const values = [...inputFields];
    values.splice(
      values.findIndex((value: any) => value.kodeBuku === kodeBuku),
      1
    );
    setInputFields(values);
    x = values;
    let totalqty = 0;
    x.forEach((item: any) => {
      totalqty += Number(item.qty);
    });
    setTotalqty(totalqty);
    ref.current?.focus();
  };

  return (
    <div>
      <div>
        <div className="pagetitle bg-white p-3 rounded shadow-sm flex items-center mb-3">
          <nav>
            <ol className="breadcrumb flex items-center">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Transaksi</li>
              <li className="breadcrumb-item active">Peminjaman</li>
            </ol>
          </nav>
          <h3>Peminjaman</h3>
        </div>
      </div>
      <div className="bg-white rounded shadow-sm p-3">
        <form className="">
          <div className="mb-3">
            <label className="form-label">Member</label>
            <AsyncSelect
              cacheOptions
              defaultOptions
              placeholder="Cari Member..."
              loadOptions={loadOptionsMember}
              onChange={handleChangeMember}
            />
          </div>

          {selectMemberStatus === "blacklist" ? (
            <div>
              <p>Pengguna Tersebut telah di blacklist.</p>
            </div>
          ) : selectMemberStatus === "" ? (
            <div>
              <p>Silakan pilih member untuk melihat detailnya.</p>
            </div>
          ) : (
            <div>
              {/* Form yang muncul jika member tidak blacklist */}
              <div className="form-group">
                <div className="row mb-3">
                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Nama Member
                  </label>
                  <div className="col-sm-3">
                    <input
                      disabled={true}
                      required
                      type="text"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={selectedMember?.label}
                    />
                  </div>
                  <div className="col-sm-1"></div>
                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Status
                  </label>
                  <div className="col-sm-3">
                    <input
                      disabled={true}
                      required
                      type="text"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={selectedMember?.status}
                    />
                  </div>
                </div>
                <div className="mb-5 row">
                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Tanggal Peminjaman
                  </label>
                  <div className="col-sm-3">
                    <input
                      disabled
                      required
                      type="date"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={tanggalPeminjaman}
                      onChange={(e) => setTanggalPeminjaman(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-1"></div>

                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Tanggal Pengembalian
                  </label>
                  <div className="col-sm-3">
                    <input
                      required
                      type="date"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={tanggalPengembalian}
                      onChange={(e) => setTanggalPengembalian(e.target.value)}
                      max={maxDate()}
                      // readOnly // Menggunakan readOnly agar tidak dapat diubah secara manual
                    />
                  </div>
                </div>
              </div>
              {/* Form lanjutan di sini */}
              <div className="form-group">
                <div className="mb-3 row">
                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    No Faktur
                  </label>
                  <div className="col-sm-3">
                    <input
                      disabled={true}
                      required
                      type="text"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={noPeminjaman}
                      onChange={(e) => setNoPeminjaman(e.target.value)}
                    />
                  </div>

                  <div className="col-sm-1"></div>

                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Tanggal
                  </label>
                  <div className="col-sm-3">
                    <input
                      disabled
                      required
                      type="date"
                      className="form-control"
                      style={{
                        fontSize: 15,
                        color: "black",
                        borderColor: "grey",
                      }}
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Scan Barcode
                  </label>
                  <div className="col-sm-3">
                    <div className="input-group mb-3  input-success">
                      <input
                        type="text"
                        autoFocus
                        ref={ref}
                        style={{
                          backgroundColor: "white",
                          fontSize: 15,
                          color: "black",
                          borderColor: "grey",
                        }}
                        className="form-control"
                        placeholder="Scan Barcode"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        onKeyPress={scanbarcode}
                      />
                      <span className="input-group-text border-0">
                        <i className="mdi mdi-barcode-scan"></i>
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-1"></div>

                  <label
                    className="col-sm-2 col-form-label"
                    style={{ fontSize: 15, color: "black" }}
                  >
                    Nama Buku
                  </label>
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
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Kode buku
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Nama buku
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Qty
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Pengarang
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Penerbit
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        >
                          Aksi
                        </th>
                        <th
                          className=""
                          style={{ fontSize: 17, color: "black" }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputFields.map((inputField: any) => (
                        <tr key={inputField.kodeBuku}>
                          <td className="border-0 fw-bold">
                            <input
                              className="form-control"
                              required
                              disabled={true}
                              value={inputField.kodeBuku}
                              // onChange={(event) =>
                              //   handleChangeInput(inputField.kodeBarang, event)
                              // }
                              style={{
                                fontSize: 15,
                                width: 200,
                                maxWidth: 200,
                                color: "black",
                                borderColor: "grey",
                              }}
                            />
                          </td>
                          <td className="border-0 fw-bold">
                            <input
                              className="form-control"
                              required
                              disabled={true}
                              value={inputField.judul}
                              // onChange={(event) =>
                              //   handleChangeInput(inputField.kodeBarang, event)
                              // }
                              style={{
                                fontSize: 15,
                                width: 250,
                                maxWidth: 250,
                                color: "black",
                                borderColor: "grey",
                              }}
                            />
                          </td>

                          <td className="border-0 fw-bold">
                            <input
                              ref={refqty}
                              className="form-control"
                              required
                              name="qty"
                              type="number"
                              value={inputField.qty}
                              onChange={(event) =>
                                handleChangeInput(inputField.kodeBuku, event)
                              }
                              onKeyPress={qtykey}
                              onClick={(event) =>
                                selectall(inputField.kodeBuku, event)
                              }
                              min="1"
                              style={{
                                backgroundColor: "white",
                                width: 80,
                                maxWidth: 80,
                                fontSize: 15,
                                color: "black",
                                borderColor: "grey",
                              }}
                            />
                          </td>
                          <td className="border-0 fw-bold">
                            <input
                              className="form-control"
                              disabled={true}
                              required
                              type="text"
                              value={inputField.penulis}
                              // onChange={(event) =>
                              //   handleChangeInput(inputField.kodeBarang, event)
                              // }
                              style={{
                                fontSize: 15,
                                width: 160,
                                maxWidth: 160,
                                color: "black",
                                borderColor: "grey",
                              }}
                            />
                          </td>
                          <td className="border-0 fw-bold">
                            <input
                              className="form-control"
                              disabled={true}
                              required
                              type="text"
                              value={inputField.penerbit}
                              // onChange={(event) =>
                              //   handleChangeInput(inputField.kodeBarang, event)
                              // }
                              style={{
                                fontSize: 15,
                                width: 160,
                                maxWidth: 160,
                                color: "black",
                                borderColor: "grey",
                              }}
                            />
                          </td>
                          <td className="border-0 fw-bold">
                            <Button1
                              disabled={inputFields.length === 0}
                              onClick={() =>
                                handleRemoveFields(inputField.kodeBarang)
                              }
                            >
                              <Minus />
                            </Button1>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className=""></tfoot>
                  </table>
                  <Row>
                    <Col md={2} className="mb-2 mt-3">
                      <h3
                        className=""
                        style={{
                          color: "black",
                          fontFamily: "initial",
                          fontSize: 30,
                          fontWeight: "bold",
                        }}
                      ></h3>
                    </Col>
                    <Col md={2} className="mb-2 mt-3">
                      <h3
                        className=""
                        style={{
                          color: "black",
                          fontFamily: "initial",
                          fontSize: 30,
                          fontWeight: "bold",
                        }}
                      ></h3>
                    </Col>
                    <Col md={2} className="mb-2 mt-3">
                      <h3
                        className=""
                        style={{
                          color: "black",
                          fontFamily: "initial",
                          fontSize: 30,
                          fontWeight: "bold",
                        }}
                      ></h3>
                    </Col>
                    <Col md={3} className="mb-2 mt-3">
                      <h3
                        className=""
                        style={{
                          color: "black",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Total Item
                      </h3>
                    </Col>
                    <Col md={3} className="mb-2 mt-3">
                      <h3
                        className=""
                        style={{
                          color: "black",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {/* {currencyFormat(total)} */}
                      </h3>
                    </Col>
                  </Row>
                </div>
              </div>
              <Col md={5} className="mb-1">
                {/* <span className="p-buttonset">
                      <Button
                        label="Save"
                        type="submit"
                        icon="mdi mdi-content-save"
                        className="px-4"
                        severity="info"
                      />
                      <Button
                        label="Cancel"
                        type="button"
                        onClick={refresh}
                        icon="mdi mdi-close-circle"
                        severity="danger"
                      />
                      <Button
                        label="Cetak Ulang Faktur"
                        type="button"
                        onClick={handleShow2}
                        icon="mdi mdi-printer"
                        severity="success"
                      />
                    </span> */}
              </Col>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransaksiPeminjaman;
