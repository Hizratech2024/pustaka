"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const SearchableSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    try {
      const response = await fetch(`/admin/api/member`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = data.map((member: any) => ({
    value: member.id,
    label: member.nama,
  }));

  const handleChange = (option: any) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Cari Member"
        isSearchable={true}
      />
    </div>
  );
};

export default SearchableSelect;
