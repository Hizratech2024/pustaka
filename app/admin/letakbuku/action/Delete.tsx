import axios from "axios";
import Swal from "sweetalert2";

const Delete = ({
  letakbukuId,
  reload,
  reloadtabel,
  rakId,
  qty,
  bukuId,
}: {
  letakbukuId: Number;
  reload: Function;
  reloadtabel: Function;
  rakId: String;
  qty: Number;
  bukuId: Number;
}) => {
  const handleDelete = async () => {
    try {
      // Konfirmasi penghapusan
      const result = await Swal.fire({
        title: "Yakin ingin menghapus?",
        text: "Data akan dihapus dan jumlah buku akan dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
      });

      if (result.isConfirmed) {
        try {
          // Hapus data dari letakbuku
          await axios.delete(`/admin/api/letakbuku/${letakbukuId}`);

          // Tambahkan qty ke stok buku menggunakan PATCH
          await axios.patch(`/admin/api/buku/${bukuId}/tambah-qty`, { qty });

          // Tampilkan pesan sukses
          Swal.fire(
            "Dihapus!",
            "Data berhasil dihapus dan stok buku diperbarui.",
            "success"
          );
        } catch (error) {
          console.error("Terjadi kesalahan:", error);
          Swal.fire(
            "Error!",
            "Terjadi kesalahan saat menghapus data atau memperbarui stok buku.",
            "error"
          );
        }

        // Reload atau lakukan pembaruan tabel di sini (jika perlu)
        reload();
        reloadtabel(rakId);
      }
    } catch (error) {
      // Tampilkan pesan error jika ada masalah
      Swal.fire("Error!", "Terjadi kesalahan saat menghapus data.", "error");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      <i className="fa fa-trash"></i>
    </button>
  );
};

export default Delete;

// "use client";
// import { useState } from "react";
// import axios from "axios";
// import Modal from "react-bootstrap/Modal";
// import Swal from "sweetalert2";

// function Delete({
//   letakbukuId,
//   reload,
//   reloadtabel,
//   rakId,
//   qty,
// }: {
//   letakbukuId: Number;
//   reload: Function;
//   reloadtabel: Function;
//   rakId: String;
//   qty: Number;
// }) {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [isLoading, setIsLoading] = useState(false);
//   if (isLoading) {
//     Swal.fire({
//       title: "Mohon tunggu!",
//       html: "Sedang mengirim data ke server",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });
//   }

//   const handleDelete = async () => {
//     setIsLoading(true);
//     await axios.delete(`/admin/api/letakbuku/${letakbukuId}`);
//     reload();
//     reloadtabel(rakId);
//     handleClose();
//     setIsLoading(false);
//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: "Berhasil dihapus",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   return (
//     <div>
//       <button
//         onClick={handleShow}
//         type="button"
//         className="btn btn-danger sharp mx-1"
//       >
//         <i className="fa fa-trash"></i>
//       </button>
//       <Modal
//         dialogClassName="modal-md"
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Body>
//           <h6>Anda yakin menghapus data ini ?</h6>
//         </Modal.Body>
//         <Modal.Footer>
//           <button
//             type="button"
//             className="btn btn-warning light"
//             onClick={handleClose}
//           >
//             Close
//           </button>
//           <button
//             type="button"
//             className="btn btn-danger light"
//             onClick={handleDelete}
//           >
//             Ya, Hapus
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default Delete;
