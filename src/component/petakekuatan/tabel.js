import React, { useEffect, useState } from "react";

const TabelPopUp = ({ data }) => {
  // console.log(data?.data, "ini data");

  return (
    <div>
      <table className="w-full  mx-4 divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Jumlah
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Kabupaten / Kota
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Kecamatan
            </th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
              Desa / Kel
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 ">
          {data.data?.map((res) => (
            <tr key={res._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">{res.id_kabupaten}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{res.name}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{res.id_kecamatan}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">asd </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelPopUp;
