import { createClient } from "@supabase/supabase-js";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const currentTime = new Date();

const formatTanggal = (tanggal: Date): string => {
  const dd = String(tanggal.getDate()).padStart(2, "0");
  const mm = String(tanggal.getMonth() + 1).padStart(2, "0");
  const yyyy = tanggal.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export let supabaseUrl = "https://harkcrbmtskvtiboutxl.supabase.co";
export let supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhcmtjcmJtdHNrdnRpYm91dHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczODY4MTgsImV4cCI6MjAzMjk2MjgxOH0.Oa2dnHnpsJbQviB4fNdIdwSxJgYR8BUS-Nd1VQWg7LY";
export let supabaseBUCKET = "uploadfile";
export const supabase = createClient(supabaseUrl, supabaseKey);

export function Font() {
  return montserrat;
}

export function SelectTahun() {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 70; i <= currentYear + 1; i++) {
    years.push(i);
  }

  return years;
}

export function Bahasa() {
  const bahasa = [
    "Inggris",
    "Spanyol",
    "Mandarin",
    "Hindi",
    "Arab",
    "Portugis",
    "Bengali",
    "Rusia",
    "Jepang",
    "Punjabi",
    "Jerman",
    "Jawa",
    "Perancis",
    "Korea",
    "Vietnam",
    "Tamil",
    "Urdu",
    "Italia",
    "Turki",
    "Belanda",
    "Persia",
    "Swahili",
    "Yunani",
    "Ibrani",
    "Thai",
    "Polandia",
    "Melayu",
    "Ukraina",
    "Rumania",
    "Hongaria",
    "Ceko",
    "Finlandia",
    "Norwegia",
    "Swedia",
    "Denmark",
    "Indonesia",
  ];

  const sortedBahasa = bahasa.sort((a, b) => a.localeCompare(b));

  return sortedBahasa;
}

export function kalkulasiWaktu(newsTime: any) {
  const timeDifference = currentTime.getTime() - new Date(newsTime).getTime();
  const Hari = Math.floor(timeDifference / (24 * 1000 * 60 * 60));
  const Jam = Math.floor(timeDifference / (1000 * 60 * 60));
  const Menit = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const Detik = Math.floor((timeDifference % (1000 * 60)) / 1000);

  if (Hari <= 0 && Jam <= 0 && Menit <= 0) {
    return ` Baru saja`;
  }
  if (Hari <= 0 && Jam <= 0) {
    return ` ${Menit} menit yang lalu`;
  }
  if (Hari <= 0 && Jam > 0) {
    return ` ${Jam} jam yang lalu`;
  }
  if (Hari > 0 && Hari <= 30) {
    return `${Hari} hari yang lalu`;
  }

  if (Hari > 30 && Hari <= 360) {
    const bulan = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 30);
    return `${bulan} bulan yang lalu`;
  }

  if (Hari > 360) {
    const tahun = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 360);
    return `${tahun} tahun yang lalu`;
  }
}

export const StyleSelect = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: 15,
    boxShadow: state.isFocused ? "0 0 0 2px #007bff" : null,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontSize: 15,
    color: "black",
  }),
  menu: (provided: any) => ({
    ...provided,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  }),
  menuList: (provided: any) => ({
    ...provided,
    maxHeight: "180px",
    overflowY: "auto",
  }),
};

export const warnastatus = (status: any) => {
  switch (status) {
    case "Proses":
      return "lightblue";

    case "Selesai":
      return "lime";

    case "Tolak":
      return "red";

    case "Dibatalkan / Barang dikembalikan":
      return "red";

    case "Sudah dikembalikan":
      return "teal";

    case "Dibatalkan":
      return "red";

    case "Verifikasi":
      return "yellow";

    case "Dalam Proses":
      return "lightblue";

    case "Menunggu Konfirmasi":
      return "yellow";

    case "Final":
      return "springgreen";

    case "Done":
      return "springgreen";
  }
};

export function tanggalIndo(tanggal: any) {
  const tanggalFormatIndonesia = moment(tanggal).format("DD MMMM YYYY");
  return tanggalFormatIndonesia;
}

export function tanggalHariIni() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export function VIP0() {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export function VIP1() {
  const today = new Date();
  today.setDate(today.getDate() + 6);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export function mingguDepan() {
  const today = new Date();
  today.setDate(today.getDate() + 7);
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export function maxDate(select: any) {

  if (select === "VIP 0") {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return formatTanggal(today);
  } else if (select === "VIP 1") {
    const today = new Date();
    today.setDate(today.getDate() + 6);
    return formatTanggal(today);
  }
  return "";

}

export const rupiah = (value: any) => {
  return value.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
};

export function cetakfaktur(
  items: any,
  total: any,
  nofaktur: any,
  kasir: any,
  tanggal: any,
  uangDiterima: any
) {
  let tableHTML = `
        <style>
            @media print {
                @page {
                    margin: 0;
                }
                body {
                    margin: 1.6cm;
                    padding-top: 0;
                }
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #72D7B2;
            }
            .total {
                font-weight: bold;
            }
            .header-section {
                margin-bottom: 20px;
            }
            .header-section div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .header-section div span:first-child {
                flex-basis: 20%;
            }
            .header-section div span:last-child {
                flex-basis: 80%;
                text-align: left;
            }
            .nama-column {
                width: 40%; /* Lebar kolom nama dilebarkan */
            }
            .qty-column {
                width: 10%; /* Lebar kolom qty dikecilkan */
            }
             hr {
                border: 1px solid black;
                margin: 20px 0;
            }
            .header-logo {
                float: left;
                margin-right: 10px;
            }
            .header-logo img {
                max-width: 100px;
                height: auto;
            }
            .header-info {
                overflow: hidden; 
            }
            .footer div p:first-child {
                margin-bottom: 10px;
            }
        </style>
        <div class="header-info">
           <div class="header-logo">
               <img src="/tema/images/logoatas.png"  alt="Logo">
           </div>
           <div>
               <h1>TOKO I-TECH KOMPUTER</h1>
               <p>Jl. Rambutan No. 20D Sidomulyo Timur, Kec. Marpoyan Damai, Pekanbaru, Riau</p>
               <p>Telp/WA: +6282288073065 / +6282317375495</p>
           </div>
        </div>
        <hr>
          <div class="header-section">
            <div><span><b>No. Faktur</b></span><span>: ${nofaktur} </span></div>
            <div><span><b>Kasir</b></span><span>: ${kasir}</span></div>
            <div><span><b>Tanggal</b></span><span>: ${tanggalIndo(
    tanggal
  )}</span></div>
            <div><span><b>Pembayaran</b></span><span>: Tunai / Transfer</span></div>
          </div>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Qty</th>
                    <th>Satuan</th>
                    <th>Harga</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
    `;

  items.forEach((item: any, index: any) => {
    tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td class="nama-column" style="text-align:left;">${item.namaBarang
      }</td>
                <td class="qty-column">${item.qty}</td>
                <td class="qty-column">unit</td>
                <td style="text-align:right; width: 19%">Rp ${item.hargaJual.toLocaleString(
        "id-ID",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}</td>
                <td style="text-align:right; width: 20%">Rp ${(
        item.qty * item.hargaJual
      ).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
            </tr>
        `;
  });

  tableHTML += `
            </tbody>
             <tfoot>
                
                <tr>
                    <td colspan="5" class="total">Grand Total</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${total.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>
                <tr>
                    <td colspan="5" class="total">Jumlah Uang</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${uangDiterima.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>
                <tr>
                    <td colspan="5" class="total">Kembalian</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${(
      uangDiterima - total
    ).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</td>
                </tr>
            </tfoot>
        </table>
        

        <div class="footer" >
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 50px;">Customer</p>
                    <p>...................................</p>
                </div>
                <div  style="text-align: center;">
                    <p style="margin-bottom: 50px;">I-Tech Komputer</p>
                    <p>...................................</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px;">Terimakasih atas kunjungannya</p>
        </div>
    `;

  const printDiv = document.createElement("div");
  printDiv.innerHTML = tableHTML;
  document.body.appendChild(printDiv);

  const originalContent = Array.from(document.body.children) as HTMLElement[];
  originalContent.forEach((element) => {
    if (element !== printDiv) {
      element.style.display = "none";
    }
  });

  printDiv.style.display = "block";

  window.onafterprint = () => {
    printDiv.style.display = "none";
    originalContent.forEach((element) => {
      element.style.display = "";
    });
    document.body.removeChild(printDiv);
  };

  window.print();
}

export function cetakulangfaktur(
  items: any,
  total: any,
  nofaktur: any,
  kasir: any,
  tanggal: any,
  uangDiterima: any
) {
  let tableHTML = `
        <style>
            @media print {
                @page {
                    margin: 0;
                }
                body {
                    margin: 1.6cm;
                    padding-top: 0;
                }
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #72D7B2;
            }
            .total {
                font-weight: bold;
            }
            .header-section {
                margin-bottom: 20px;
            }
            .header-section div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .header-section div span:first-child {
                flex-basis: 20%;
            }
            .header-section div span:last-child {
                flex-basis: 80%;
                text-align: left;
            }
            .nama-column {
                width: 40%; /* Lebar kolom nama dilebarkan */
            }
            .qty-column {
                width: 10%; /* Lebar kolom qty dikecilkan */
            }
             hr {
                border: 1px solid black;
                margin: 20px 0;
            }
            .header-logo {
                float: left;
                margin-right: 10px;
            }
            .header-logo img {
                max-width: 100px;
                height: auto;
            }
            .header-info {
                overflow: hidden; 
            }
            .footer div p:first-child {
                margin-bottom: 10px;
            }
        </style>
        <div class="header-info">
           <div class="header-logo">
               <img src="/tema/images/logoatas.png"  alt="Logo">
           </div>
           <div>
               <h1>TOKO I-TECH KOMPUTER</h1>
               <p>Jl. Rambutan No. 20D Sidomulyo Timur, Kec. Marpoyan Damai, Pekanbaru, Riau</p>
               <p>Telp/WA: +6282288073065 / +6282317375495</p>
           </div>
        </div>
        <hr>
          <div class="header-section">
            <div><span><b>No. Faktur</b></span><span>: ${nofaktur} </span></div>
            <div><span><b>Kasir</b></span><span>: ${kasir}</span></div>
            <div><span><b>Tanggal</b></span><span>: ${tanggalIndo(
    tanggal
  )}</span></div>
            <div><span><b>Pembayaran</b></span><span>: Tunai / Transfer</span></div>
          </div>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Qty</th>
                    <th>Satuan</th>
                    <th>Harga</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
    `;

  items.forEach((item: any, index: any) => {
    tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td class="nama-column" style="text-align:left;">${item.BarangTb.namaBarang
      }</td>
                <td class="qty-column">${item.qty}</td>
                <td class="qty-column">unit</td>
                <td style="text-align:right; width: 19%">Rp ${item.hargaJual.toLocaleString(
        "id-ID",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}</td>
                <td style="text-align:right; width: 20%">Rp ${(
        item.qty * item.hargaJual
      ).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
            </tr>
        `;
  });

  tableHTML += `
            </tbody>
             <tfoot>
                
                <tr>
                    <td colspan="5" class="total">Grand Total</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${total.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>
                <tr>
                    <td colspan="5" class="total">Jumlah Uang</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${uangDiterima.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>
                <tr>
                    <td colspan="5" class="total">Kembalian</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${(
      uangDiterima - total
    ).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</td>
                </tr>
            </tfoot>
        </table>
        

        <div class="footer" >
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 50px;">Customer</p>
                    <p>...................................</p>
                </div>
                <div  style="text-align: center;">
                    <p style="margin-bottom: 50px;">I-Tech Komputer</p>
                    <p>...................................</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px;">Terimakasih atas kunjungannya</p>
        </div>
    `;

  const printDiv = document.createElement("div");
  printDiv.innerHTML = tableHTML;
  document.body.appendChild(printDiv);

  const originalContent = Array.from(document.body.children) as HTMLElement[];
  originalContent.forEach((element) => {
    if (element !== printDiv) {
      element.style.display = "none";
    }
  });

  printDiv.style.display = "block";

  window.onafterprint = () => {
    printDiv.style.display = "none";
    originalContent.forEach((element) => {
      element.style.display = "";
    });
    document.body.removeChild(printDiv);
  };

  window.print();
}

export function cetakfakturservis(
  items: any,
  items2: any,
  total: any,
  nofaktur: any,
  kasir: any,
  tanggal: any,
  uangDiterima: any
) {
  let counter = 1;
  let tableHTML = `
        <style>
            @media print {
                @page {
                    margin: 0;
                }
                body {
                    margin: 1.6cm;
                    padding-top: 0;
                }
            }

            table {
                width: 100%;
                border-collapse: collapse;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #72D7B2;
            }
            .total {
                font-weight: bold;
            }
            .header-section {
                margin-bottom: 20px;
            }
            .header-section div {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .header-section div span:first-child {
                flex-basis: 20%;
            }
            .header-section div span:last-child {
                flex-basis: 80%;
                text-align: left;
            }
            .nama-column {
                width: 40%; /* Lebar kolom nama dilebarkan */
            }
            .qty-column {
                width: 10%; /* Lebar kolom qty dikecilkan */
            }
             hr {
                border: 1px solid black;
                margin: 20px 0;
            }
            .header-logo {
                float: left;
                margin-right: 10px;
            }
            .header-logo img {
                max-width: 100px;
                height: auto;
            }
            .header-info {
                overflow: hidden; 
            }
            .footer div p:first-child {
                margin-bottom: 10px;
            }
        </style>
        <div class="header-info">
           <div class="header-logo">
               <img src="/tema/images/logoatas.png"  alt="Logo">
           </div>
           <div>
               <h1>TOKO I-TECH KOMPUTER</h1>
               <p>Jl. Rambutan No. 20D Sidomulyo Timur, Kec. Marpoyan Damai, Pekanbaru, Riau</p>
               <p>Telp/WA: +6282288073065 / +6282317375495</p>
           </div>
        </div>
        <hr>
          <div class="header-section">
            <div><span><b>No. Faktur</b></span><span>: ${nofaktur} </span></div>
            <div><span><b>Kasir</b></span><span>: ${kasir}</span></div>
            <div><span><b>Tanggal</b></span><span>: ${tanggalIndo(
    tanggal
  )}</span></div>
            <div><span><b>Pembayaran</b></span><span>: Tunai / Transfer</span></div>
          </div>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Qty</th>
                    <th>Satuan</th>
                    <th>Harga</th>
                    <th>Sub Total</th>
                </tr>
            </thead>
            <tbody>
    `;
  items2.forEach((item: any, index: any) => {
    tableHTML += `
            <tr>
                <td>${counter++}</td>
                <td class="nama-column" style="text-align:left;">${item.jenisServis
      }</td>
                <td class="qty-column">${item.qty}</td>
                <td class="qty-column">jasa</td>
                <td style="text-align:right; width: 19%">Rp ${item.biaya.toLocaleString(
        "id-ID",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}</td>
                <td style="text-align:right; width: 20%">Rp ${(
        item.qty * item.biaya
      ).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
            </tr>
        `;
  });
  items.forEach((item: any, index: any) => {
    tableHTML += `
            <tr>
                <td>${counter++}</td>
                <td class="nama-column" style="text-align:left;">${item.namaBarang
      }</td>
                <td class="qty-column">${item.qty}</td>
                <td class="qty-column">unit</td>
                <td style="text-align:right; width: 19%">Rp ${item.hargaJual.toLocaleString(
        "id-ID",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}</td>
                <td style="text-align:right; width: 20%">Rp ${(
        item.qty * item.hargaJual
      ).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}</td>
            </tr>
        `;
  });

  tableHTML += `
            </tbody>
             <tfoot>
                
                <tr>
                    <td colspan="5" class="total">Grand Total</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${total.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>

                  <tr>
                    <td colspan="5" class="total">Jumlah Uang</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${uangDiterima.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  )}</td>
                </tr>
                <tr>
                    <td colspan="5" class="total">Kembalian</td>
                    <td class="total" style="text-align:right; width: 20%">Rp ${(
      uangDiterima - total
    ).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}</td>
                </tr>

            </tfoot>
        </table>

        <div class="footer" >
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                <div style="text-align: center;">
                    <p style="margin-bottom: 50px;">Customer</p>
                    <p>...................................</p>
                </div>
                <div  style="text-align: center;">
                    <p style="margin-bottom: 50px;">I-Tech Komputer</p>
                    <p>...................................</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 20px;">Terimakasih atas kunjungannya</p>
        </div>
    `;

  const printDiv = document.createElement("div");
  printDiv.innerHTML = tableHTML;
  document.body.appendChild(printDiv);

  // Sembunyikan semua elemen kecuali elemen yang dicetak
  const originalContent = Array.from(document.body.children) as HTMLElement[];
  originalContent.forEach((element) => {
    if (element !== printDiv) {
      element.style.display = "none";
    }
  });

  printDiv.style.display = "block";

  // Setelah pencetakan selesai
  window.onafterprint = () => {
    printDiv.style.display = "none";
    originalContent.forEach((element) => {
      element.style.display = "";
    });
    document.body.removeChild(printDiv);
  };

  // Mulai pencetakan
  window.print();

  // const printDiv = document.createElement('div');
  // printDiv.innerHTML = tableHTML;
  // document.body.appendChild(printDiv);

  // const originalContent = Array.from(document.body.children) as HTMLElement[];
  // for (let i = 0; i < originalContent.length; i++) {
  //     originalContent[i].style.display = 'none';
  // }

  // printDiv.style.display = 'block';

  // window.onafterprint = () => {

  //     printDiv.style.display = 'none';

  //     for (let i = 0; i < originalContent.length; i++) {
  //         originalContent[i].style.display = 'block';
  //     }

  //     document.body.removeChild(printDiv);
  // };
  // window.print();
}

export function cetakrequestservis(
  noservis: any,
  perlengkapan: any,
  software: any,
  hardware: any,
  nama: any,
  alamat: any,
  hp: any,
  namaBarang: any,
  noseri: any,
  tanggal: any,
  teknisi: any
) {
  let perlengkapandengankoma = "";
  let softwaredengankoma = "";
  let hardwaredengankoma = "";
  if (perlengkapan == "") {
    perlengkapandengankoma = "-";
  } else {
    perlengkapandengankoma = perlengkapan.split("\n").join(", ");
  }

  if (software == "") {
    softwaredengankoma = "-";
  } else {
    softwaredengankoma = software.split("\n").join(", ");
  }

  if (hardware == "") {
    hardwaredengankoma = "-";
  } else {
    hardwaredengankoma = hardware.split("\n").join(", ");
  }

  const masalah =
    "Software :" + softwaredengankoma + "," + "Hardware :" + hardwaredengankoma;

  let formHTML = `
        <style>
            @media print {
                @page {
                    margin: 0;
                }
                body {
                    margin: 1.6cm;
                    padding-top: 0;
                }
            }
            body {
                font-family: Arial, sans-serif;
                font-size: 12px;
            }
            .header {
                text-align: center;
                margin-bottom: 10px;
            }
            .header img {
                float: right;
                max-width: 80px;
            }
            .table, .table th, .table td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 4px;
                margin-bottom: 10px;
            }
            .table {
                width: 100%;
            }
            .signature {
                margin-top: 20px;
                display: flex;
                justify-content: space-between;
            }
            .signature div {
                width: 45%;
                text-align: center;
            }
            .terms {
                margin-top: 10px;
            }
            .terms ol {
                padding-left: 20px;
            }

            .header-logo {
            float: right;
            margin-right: 10px;
            }
             .header-logo img {
            max-width: 80px;
            height: auto;
             }
             .header-info {
            overflow: hidden; 
            }
             .footer div p:first-child {
            margin-bottom: 10px;
        }
        </style>

     <div class="header-info">
       <div class="header-logo">
           <img src="/tema/images/logoatas.png"  alt="Logo">
       </div>
       <div>
           <h1>Servis Request</h1>
           <p>082317375495</p>
       </div>
    </div>
        
        <div class="table">
            <table style="width: 100%;">
            <tr>
                    <th>No Servis:</th>
                    <td colspan="3">${noservis}</td>
                </tr>
                <tr>
                    <th style="width: 20%;">Nama:</th>
                    <td style="width: 30%;">${nama}</td>
                    <th style="width: 20%;">No Hp:</th>
                    <td style="width: 30%;">${hp}</td>
                </tr>
                <tr>
                    <th>Alamat:</th>
                    <td colspan="3">${alamat}</td>
                </tr>
               
            </table>
        </div>

        <div class="table">
            <table style="width: 100%;">
                <tr>
                    <th style="width: 20%;">Type:</th>
                    <td style="width: 30%;">${namaBarang}</td>
                    <th style="width: 20%;">No. Seri/SN:</th>
                    <td style="width: 30%;">${noseri}</td>
                </tr>
                <tr>
                    <th>Kelengkapan:</th>
                    <td colspan="3">${perlengkapandengankoma}</td>
                </tr>
                <tr>
                    <th>Masalah:</th>
                    <td colspan="3">${masalah}</td>
                </tr>
            </table>
        </div>

        <div class="table">
            <table style="width: 100%;">
                <tr>
                    <th style="width: 50%;">Teknisi</th>
                    <th style="width: 50%;">Administrasi</th>
                </tr>
                <tr>
                    <td style="height: 60px;"></td>
                    <td style="height: 60px;"></td>
                </tr>
                <tr>
                    <td>Nama: ${teknisi}</td>
                    <td>Nama: Indah Sekar Pratiwi</td>
                </tr>
                <tr>
                    <td>Tanggal: ${tanggalIndo(tanggal)}</td>
                    <td>Tanggal: ${tanggalIndo(tanggal)}</td>
                </tr>
            </table>
        </div>

        <p>Pelanggan yang terhormat, harap membaca Syarat dan ketentuan dibawah ini sebelum menanda tangani tanda terima ini,</p>
        
        <div class="terms">
            <h4>SYARAT-SYARAT PERBAIKAN:</h4>
            <ol>
                 <li>1. Tanda terima ini harus dibawa saat pengambilan barang/unit</li>
                 <li>2. Pihak I-Tech Komputer akan menghubungi pelanggan saat unit yang akan di perbaiki telah ditemukan kerusakan/masalah oleh teknisi, sebagai kelanjutan proses perbaikan unit tersebut, proses penawaran, tindakan, kesepakatan kelanjutan perbaikan unit atau melakukan Cancel.</li>
                 <li>3. Untuk proses Cancel Pelanggan dikenakan biaya Cancel sebesar 50% dari harga service.</li>
                 <li>4. Untuk proses Cancel setelah kesepakatan dari kelanjutan perbaikan unit(untuk penggantian Part), setelah Part di ganti dan unit telah selesai dalam perbaikan ,Pelanggan dikenakan biaya Cancel 50% dari total biaya keseluruhan pada kesepakatan, dan pihak I-Tech Komputer Berhak menarik/Mengambil Kembali Part yang telah diganti.</li>
                 <li>5. Pihak I-Tech Komputer akan menghubungi Pelanggan pada saat unit telah selesai di perbaiki. Pelanggan wajib mengambil unit tersebut selambat-lambatnya dalam waktu 7 (tujuh) hari saat unit selesai di perbaiki,dalam proses kelanjutan yang sudah di setujui.</li>
                <li>6. Pihak I-Tech Komputer berhak memusnahkan unit tersebut yang tidak di ambil oleh pelanggan jika sudah melewati 60 (enam puluh) hari kalender sejak pemberitahuan unit selesai di perbaiki.</li>
                <li>7. Pelanggan diharapkan memeriksa kelengkapan dan fungsi unit yang telah selesai di perbaiki sebelum meninggalkan Toko dan melakukan transaksi pembayaran biaya perbaikan.</li>
                 <li>8. I-Tech Komputer tidak bertanggungjawab untuk kehilangan/kerusakan unit pelanggan yang diakibatkan oleh Force Majure (Kebakaran,Kecurian,Gempa Bumi, dan Bencana alam lainnya).</li>
                </ol>
        </div>
        <div class="footer" >
        <div style="display: flex; justify-content: space-between; ">
            <div style="text-align: center;">
                <p style="margin-bottom: 50px;">I-Tech Komputer</p>
                <p>MANAJEMEN</p>
            </div>
            <div  style="text-align: center;">
                <p style="margin-bottom: 50px;">Disetujui Pelanggan</p>
                <p>Nama : ${nama}</p>
            </div>
        </div>
       
    </div>
    `;

  const printDiv = document.createElement("div");
  printDiv.innerHTML = formHTML;
  document.body.appendChild(printDiv);

  // Sembunyikan semua elemen kecuali elemen yang dicetak
  const originalContent = Array.from(document.body.children) as HTMLElement[];
  originalContent.forEach((element) => {
    if (element !== printDiv) {
      element.style.display = "none";
    }
  });

  printDiv.style.display = "block";

  // Setelah pencetakan selesai
  window.onafterprint = () => {
    printDiv.style.display = "none";
    originalContent.forEach((element) => {
      element.style.display = "";
    });
    document.body.removeChild(printDiv);
  };

  // Mulai pencetakan
  window.print();
}
