"use client"
import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Form, Row } from '@themesberg/react-bootstrap';
import { Button } from 'primereact/button';
import { mingguDepan, rupiah, tanggalHariIni, tanggalIndo } from '@/app/helper';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import * as XLSX from 'xlsx';
import moment from 'moment';

const LaporanServis = () => {

  const [dataservis, setDataservis] = useState([])
  const [semuadata, setSemuaData] = useState([])
  const [tanggalawal, setTanggalawal] = useState(tanggalHariIni)
  const [tanggalakhir, setTanggalakhir] = useState(mingguDepan)
  const [grandtotal, setGrandtotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = React.useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/laporanservis`);
      const result = await response.json();
      setDataservis(result)
      setSemuaData(result)
      let x = []
      x = result
      let total = 0;
      x.forEach((item: any) => {

        total += (Number(item.biayaSoftware) + Number(item.biayaHardware));

      })
      setGrandtotal(total)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const showw = async () => {
    const awal = new Date(tanggalawal).toISOString()
    const akhir = new Date(tanggalakhir + 'T23:59:59.999Z').toISOString()
    const xxx: any = semuadata.filter((item: any) => item.tanggal >= awal && item.tanggal <= akhir)
    setDataservis(xxx);
    let x = []
    x = xxx
    let total = 0;
    x.forEach((item: any) => {

      total += (Number(item.biayaSoftware) + Number(item.biayaHardware));

    })
    setGrandtotal(total)
  }

  const reset = () => {
    setDataservis(semuadata)
    let x = []
    x = semuadata
    let total = 0;
    x.forEach((item: any) => {
      total += (Number(item.biayaSoftware) + Number(item.biayaHardware));
    })
    setGrandtotal(total)
    setTanggalawal(tanggalHariIni)
    setTanggalakhir(mingguDepan)
  }

  const filteredItems = dataservis.filter(
    (item: any) => item.kodeServis && item.kodeServis.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'No',
      cell: (row: any, index: number) => <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>,
      sortable: false,
      width: '80px'
    },
    {
      name: 'No Servis',
      selector: (row: any) => row.kodeServis,
      sortable: true,
    },
    {
      name: 'Tanggal',
      selector: (row: any) => tanggalIndo(row.tanggal),
    },
    {
      name: 'Nama Teknisi',
      selector: (row: any) => row.KaryawanTb.nama,
    },
    {
      name: 'Jenis Servis',
      selector: (row: any) => row.jenis,
      cell: (row: any) => (
        <div>
          {row.jenis === 'Software & Hardware' ?
            <>
              <div className="mt-4 mb-4" style={{ fontWeight: 'bold' }}>
                Instal Software
              </div>
              <div className="mt-4 mb-4" style={{ fontWeight: 'bold' }}>
                Servis Hardware
              </div>
            </>
            :
            row.jenis === 'Software' ?
              <>
                <div className="mt-4 mb-4" style={{ fontWeight: 'bold' }}>
                  Instal Software
                </div>
              </>
              :
              <>
                <div className="mt-4 mb-4" style={{ fontWeight: 'bold' }}>
                  Servis Hardware
                </div>
              </>
          }
        </div>
      ),
      width: '200px'
    },
    {
      name: 'Biaya Servis',
      selector: (row: any) => row.jenis,
      cell: (row: any) => (
        <div>
          {row.jenis === 'Software & Hardware' ?
            <>
              <div className="mt-4 mb-4">
                {rupiah(row.biayaSoftware)}
              </div>
              <div className="mt-4 mb-4">
                {rupiah(row.biayaHardware)}
              </div>
            </>
            :
            row.jenis === 'Software' ?
              <>
                <div className="mt-4 mb-4">
                  {rupiah(row.biayaSoftware)}
                </div>
              </>
              :
              <>
                <div className="mt-4 mb-4">
                  {rupiah(row.biayaHardware)}
                </div>
              </>
          }
        </div>
      ),
      width: '200px'
    },

  ];

  const GrandTotalComponent = () => (
    <div style={{ textAlign: 'right', paddingRight: '20px', marginTop: '10px', fontSize: 20, fontWeight: 'bold', color: 'black' }}>
      Grand Total: {rupiah(grandtotal)}
    </div>
  );

  const exportToExcel2 = () => {
    const dataToExport = filteredItems.map((item: any) => ({

      NoServis: item.kodeServis,
      tanggal: moment(item.tanggal).format('DD MMM YYYY'),
      Teknisi: item.namaTeknisi,
      Jenis: item.jenis,
      DetailSoftware: item.detailSoftware,
      DetailHardware: item.detailHardware,
      BiayaSoftware: item.biayaSoftware,
      BiayaHardware: item.biayaHardware,
    }))

    if (dataToExport.length === 0) {
      console.error("No data to export");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Laporan');
    XLSX.writeFile(workbook, 'Laporan.xlsx');
  };


  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Laporan Servis</h1>
            </div>
            <div className="card-body">
              <Row className="mb-4">
                <Col md={2} className="mb-1 mt-3">
                  <div className="flex flex-column gap-2">
                    <label style={{ color: 'black' }} htmlFor="username">Tanggal Awal</label>
                    <Form.Control
                      required
                      value={tanggalawal}
                      onChange={(e) => { setTanggalawal(e.target.value); console.log('tgl', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white' }}
                    />
                  </div>
                </Col>
                <Col md={2} className="mb-1 mt-3">
                  <Form.Group id="lastName">
                    <label style={{ color: 'black' }} htmlFor="username">Tanggal Akhir</label>
                    <Form.Control
                      required
                      value={tanggalakhir}
                      onChange={(e) => { setTanggalakhir(e.target.value); console.log('tgla', e.target.value); }}
                      type="date"
                      style={{ color: 'black', background: 'white' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={5} className="mb-1 mt-5">
                  <span className="p-buttonset">
                    <Button label="Show" onClick={showw} icon="mdi mdi-eye" className="px-4" severity="info" />
                    <Button onClick={reset} icon="mdi mdi-refresh" className="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700" label="Reset" severity="success" />
                    {/* <Button label="Print" onClick={ttt} icon="mdi mdi-printer" severity="danger" /> */}
                    {/* <Add reload={reload} /> */}
                  </span>
                </Col>

              </Row>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                persistTableHead
                responsive
                paginationPerPage={itemsPerPage}
                paginationTotalRows={filteredItems.length}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={handleRowsPerPageChange}
                paginationRowsPerPageOptions={[5, 10, 20]}
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#53d0b2',
                      fontSize: 15,
                    },
                  },
                }}
              />
              <GrandTotalComponent />
              <button type='button' onClick={exportToExcel2} className="btn btn-success btn-icon-text">
                Ekspor ke Excel
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default LaporanServis