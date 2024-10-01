"use client";
import Link from "next/link";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import SearchableSelect from "./action/SearchMember";
import SearchKategori from "./action/SearchKategori";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Font, maxDate, tanggalHariIni, VIP0, VIP1 } from "@/app/helper";
import Swal from "sweetalert2";
import AsyncSelect from "react-select/async";
import { Col, Row } from "@themesberg/react-bootstrap";
import SearchMember from "./action/SearchMember";
import { StyleSelect } from "@/app/helper";
import { Minus } from "react-feather";
import { Button as Button1 } from 'antd';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const TransaksiPeminjaman = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [selected, setSelected] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [noPeminjaman, setNoPeminjaman] = useState("");
  const [memberId, setMemberId] = useState("");
  const [tanggal, setTanggal] = useState(tanggalHariIni);
  const [barcode, setBarcode] = useState("");
  const [totalqty, setTotalqty] = useState(0);
  const [dataBuku, setDataBuku] = useState([]);
  const [dataMember, setDataMember] = useState([]);
  const [selectMemberStatus, setSelectMemberStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const refuang = useRef<HTMLInputElement>(null);
  const refqty = useRef<HTMLInputElement>(null);
  const montserrat = Font();

  const [isLoading, setIsLoading] = useState(false);
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
    otomatisnopeminjaman();
    getbuku();
    getMember();
  }, []);

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

  const refresh = () => {
    setInputFields([])
    setTotalqty(0)
    setMemberId('')
    setSelectMemberStatus('')
    setSelectedMember(null)
    setBarcode('')
    setDeadline('')
    setTanggal(tanggalHariIni)
    ref.current?.focus();
  }

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

  let loadOptionsMember = (inputValue: any, callback: any) => {
    setTimeout(() => {
      if (inputValue.length < 2) {
        callback([]);
        return;
      }

      const filteredData = dataMember.filter(
        (item: any) =>
          item.nama &&
          item.nama.toLowerCase().includes(inputValue.toLowerCase())
      );

      const options = filteredData.map((item: any) => ({
        value: item.id,
        label: item.nama,
        status: item.status || "Status tidak tersedia",
      }));

      callback(options);
    }, 300);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (totalqty === 0) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Belum Ada Data",
        showConfirmButton: false,
        timer: 2000,
      });
      ref.current?.focus();
      return;
    }

    const cekqty = inputFields.some((item: any) => item.qty <= 0);
    if (cekqty) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Qty tidak boleh kosong",
        showConfirmButton: true,
      });
      return;
    }

    const cekstok = inputFields.some((item: any) => item.qty > item.stok);
    if (cekstok) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Stok Tidak Cukup",
        showConfirmButton: true,
      });
      return;
    }
    selesai();
    setTimeout(function () {
      refuang.current?.focus();
    }, 400);
  };

  const selesai = async () => {
    setIsLoading(true);
    const formData = new FormData()
    formData.append('totalqty', String(totalqty))
    formData.append('noPeminjaman', noPeminjaman)
    formData.append('memberId', memberId)
    formData.append('tanggal', new Date(tanggal).toISOString())
    formData.append('deadline',  new Date(deadline).toISOString())
    formData.append('selected', JSON.stringify(inputFields))

    const xxx = await axios.post(`/admin/api/peminjaman`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (xxx.data.pesan === 'berhasil') {
      setIsLoading(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Berhasil simpan',
        showConfirmButton: false,
        timer: 1500
      })

      // cetakfaktur(inputFields, total, nofaktur, kasir, tanggal, Number(uang));

      otomatisnopeminjaman()
      refresh();
      getbuku()
    }
  }

  const handleChangeMember = (selectedOption: any) => {
    setSelectedMember(selectedOption);
    setMemberId(selectedOption.value)
    setSelectMemberStatus(selectedOption.status);
    if (selectedOption.status === "VIP 0") {
      setDeadline(VIP0);
    } else if (selectedOption.status === "VIP 1") {
      setDeadline(VIP1);
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

  const selectall = (kodeBuku: any, event: any) => {
    inputFields.map((i: any) => {
      if (kodeBuku === i.kodeBuku) {
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
        i.stokakhir = i.stok - Number(i.qty);
      }
      return i;
    });
    setInputFields(newInputFields);
    z = newInputFields;
    let totalqty = 0;
    z.forEach((item: any) => {
      totalqty += Number(item.qty);
    });
    setTotalqty(totalqty);
  };

  const scanbarcode = async (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (barcode == "") {
        return handleSubmit(e);
      }
      const xxx: any = dataBuku.find(
        (item: any) => item.kodeBuku.toLowerCase() === barcode.toLowerCase()
      );
      if (xxx === undefined) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Data Buku Tidak Ada",
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
            (element: any) => element.kodeBuku == xxx.kodeBuku
          );

          let x = [];
          if (a > -1) {
            const data: any = [...inputFields];
            data[a].qty++;
            data[a].stokakhir = xxx.stok - data[a].qty;
            setInputFields(data);
            x = data;
          } else {
            const data: any = [
              ...inputFields,
              {
                id: xxx.id,
                kodeBuku: xxx.kodeBuku,
                judul: xxx.judul,
                penerbit: xxx.penerbit,
                penulis: xxx.penulis,
                stok: xxx.stok,
                qty: 1,
                stokakhir: xxx.stok - 1,
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
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title col-md-12 mt-2">
                <div className="row">
                  <div className="col-md-2">
                    <label
                      className={`col-form-label ${montserrat.className}`}
                      style={{ fontSize: "17px", color: "#333", fontWeight: "600" }}
                    >
                      Member
                    </label>
                  </div>
                  <div className="col-md-4">
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      placeholder="Cari Member..."
                      loadOptions={loadOptionsMember}
                      onChange={handleChangeMember}
                    />
                  </div>
                  {selectMemberStatus === "" ?
                    null
                    :
                    <>
                      <div className="col-md-3">
                        <label
                          className={`col-form-label ${montserrat.className}`}
                          style={{ fontSize: "17px", color: "#333", fontWeight: "600" }}
                        >
                          Status Member
                        </label>
                      </div>
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
                          value={selectMemberStatus}
                        />
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
            <div className="bg-white rounded shadow-sm p-3">
              <form className="" onSubmit={handleSubmit}>
                {selectMemberStatus.toLowerCase().includes('blacklist') ? (
                  <div>
                    <p>Pengguna Tersebut telah di blacklist.</p>
                  </div>
                ) : selectMemberStatus === "" ? (
                  <div>
                    <p>Silakan pilih member untuk melihat detailnya.</p>
                  </div>
                ) : (
                  <div>
                    <div className="form-group">
                      <div className="mb-3 row">
                        <label
                          className="col-sm-2 col-form-label"
                          style={{ fontSize: 15, color: "black" }}
                        >
                          Tanggal
                        </label>
                        <div className="col-sm-3">
                          <input
                            disabled={true}
                            required
                            type="date"
                            className="form-control"
                            style={{
                              fontSize: 15,
                              color: "black",
                              borderColor: "grey",
                            }}
                            value={tanggal}
                          />
                        </div>

                        <div className="col-sm-1"></div>

                        <label
                          className="col-sm-3 col-form-label"
                          style={{ fontSize: 15, color: "black" }}
                        >
                          Deadline Pengembalian
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
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            max={maxDate(selectMemberStatus)}
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
                          className="col-sm-3 col-form-label"
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
                    </div>
                    {/* Form lanjutan di sini */}
                    <div className="form-group">
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
                                      width: 120,
                                      maxWidth: 120,
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
                                      width: 60,
                                      maxWidth: 60,
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
                              {totalqty}
                            </h3>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <Col md={5} className="mb-1">
                      <span className="p-buttonset">
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
                        {/* <Button
                        label="Cetak Ulang Faktur"
                        type="button"
                        onClick={handleShow2}
                        icon="mdi mdi-printer"
                        severity="success"
                      /> */}
                      </span>
                    </Col>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransaksiPeminjaman;
