import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

const SearchKategori = ({
  onCategoryChange,
}: {
  onCategoryChange: (id: string) => void;
}) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await axios.get(`/admin/api/kategori`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchKategori();
  }, []);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    onCategoryChange(option ? option.value : ""); // Kirim ID kategori yang dipilih
  };

  // Menambahkan opsi "Pilih Semua"
  const allOptions = [
    { value: "", label: "Pilih Semua" },
    ...data.map((kategori: any) => ({
      value: kategori.id, // Ganti dengan ID yang sesuai
      label: kategori.nama, // Ganti dengan nama yang sesuai
    })),
  ];

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={allOptions}
      placeholder="Pilih Kategori"
    />
  );
};

export default SearchKategori;
