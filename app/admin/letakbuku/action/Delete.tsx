import axios from "axios";
import Swal from "sweetalert2";

const Delete = ({
  letakbukuId,
  reload,
  reloadtabel,
  qty,
  bukuId,
  rakId,
  reloadbuku,
}: {
  letakbukuId: Number;
  reload: Function;
  reloadtabel: Function;
  qty: Number;
  bukuId: Number;
  rakId: Number;
  reloadbuku: Function;
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
        const formData = new FormData();
        formData.append("qty", String(qty));
        formData.append("bukuId", String(bukuId));
        // Hapus data dari letakbuku

        const xxx = await axios.post(
          `/admin/api/letakbuku/${letakbukuId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Tampilkan pesan sukses
        if (xxx.data.pesan === "berhasil") {
          reload();
          reloadtabel(rakId);
          reloadbuku();
          Swal.fire({
            icon: "success",
            title: "Berhasil dihapus",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      <i className="fa fa-trash"></i>
    </button>
  );
};

export default Delete;