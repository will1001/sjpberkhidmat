import React, { useEffect, useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import editIcon from "../../utility/icon/edit_icon.png";
import deletIcon from "../../utility/icon/delet_icon.png";
import searchIcon from "../../utility/icon/searchIcon.png";
import useFetch from "../../API/useFetch";

const RumahAspirasi = () => {
  const [page, setPage] = useState();
  const [alertHapus, setAlertHapus] = useState(false);
  const [kecamatan, setKecamatan] = useState();
  const [kelurahan, setKelurahan] = useState();
  const [filterWilayah, setFilterWilayah] = useState();
  const [filterKecamatan, setFilterKecamatan] = useState();
  const [filterKelurahan, setFilterKelurahan] = useState();
  const [typeSearch, setTypeSearch] = useState();

  const kabupaten = useFetch("get", "user/kabupaten?filter=lombok");
  const changeKecamatan = async (id_kabupaten) => {
    const res = await axiosFetch("get", `user/kecamatan/${id_kabupaten}`)
      .then((res) => setKecamatan(res.data))
      .catch((err) => console.log(err));
    return res;
  };
  const changeKelurahan = async (id_kecamatan) => {
    const res = await axiosFetch("get", `user/kelurahan/${id_kecamatan}`)
      .then((res) => setKelurahan(res.data))
      .catch((err) => console.log(err));
    return res;
  };

  useEffect(() => {
    const res = axiosFetch("get", "/user/aspirasi?page=1")
      .then((res) => setPage(res.data))
      .catch((err) => console.log(err));
  }, [alertHapus]);

  const deleteAspirasi = async (id) => {
    console.log(id);

    const res = await axiosFetch("delete", `user/aspirasi/${id}`)
      .then((res) => {
        console.log(res);
        setAlertHapus(false);
      })
      .catch((err) => console.log(err));
    return res;
  };
  // console.log(filterKelurahan);
  // console.log(page?.data);
  return (
    <>
      <div className="absolute pr-[50px] h-[1120px] bg-orange-100 bg-opacity-30">
        <div className="ml-[60px] mt-[60px]">
          <p className="text-[#374151] text-[32px] font-bold">Rumah Aspirasi</p>
          <div className="flex gap-3 items-center mt-[23px] mb-[14px] text-[#374151]">
            <div className="h-[32px]  border border-[#D1D5DB] rounded-sm px-2 flex items-center">
              <input onChange={(e) => setTypeSearch(e.target.value)} className="outline-none" placeholder="Cari Data" type={"text"} />
              <img src={searchIcon.src} alt="search icon" />
            </div>
            <select
              className="outline-0 h-[32px] border border-[#D1D5DB] rounded-sm px-2"
              onChange={(e) => {
                changeKecamatan(e.target.value);
                setFilterWilayah(e.target.value);
              }}
            >
              <option>Pilih Kabupaten</option>
              {kabupaten?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
            <select
              className="outline-0 h-[32px] border border-[#D1D5DB] rounded-sm px-2"
              onChange={(e) => {
                changeKelurahan(e.target.value);
                setFilterKecamatan(e.target.value);
              }}
            >
              <option>Pilih Kecamatan</option>
              {kecamatan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
            <select onChange={(e) => setFilterKelurahan(e.target.value)} className="outline-0 h-[32px] border border-[#D1D5DB] rounded-sm px-2">
              <option>Pilih Desa / Kelurahan</option>
              {kelurahan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <table className="">
              <thead className="flex items-center rounded-t-sm  bg-[#374151]">
                <tr className="text-white text-[14px] flex gap-2 items-center px-4 h-[51px]">
                  <th className="w-[178px] flex">Perihal</th>
                  <th className="w-[150px] flex">Kabupaten</th>
                  <th className="w-[150px] flex">Kecamatan</th>
                  <th className="w-[150px] flex">Desa / Kelurahan</th>
                  <th className="w-[200px] flex">Detail Aspirasi</th>
                  <th className="w-[100px] flex justify-center">Action</th>
                </tr>
              </thead>

              {page?.data
                ?.filter((res) => {
                  if (filterKelurahan) {
                    if (filterKelurahan === "Pilih Desa / Kelurahan") {
                      setFilterKelurahan();
                    } else {
                      const search = res.id_kelurahan.includes(filterKelurahan);
                      return search;
                    }
                  } else if (filterKecamatan) {
                    if (filterKecamatan === "Pilih Kecamatan") {
                      setFilterKecamatan();
                    } else {
                      const search = res.id_kecamatan.includes(filterKecamatan);
                      return search;
                    }
                  } else if (filterWilayah) {
                    if (filterWilayah === "Pilih Kabupaten") {
                      setFilterWilayah();
                    } else {
                      const search = res.id_kabupaten.includes(filterWilayah);
                      return search;
                    }
                  } else {
                    return res;
                  }
                })
                .filter((res) => {
                  if (typeSearch) {
                    const search = res.perihal.includes(typeSearch);
                    return search;
                  } else {
                    return res;
                  }
                })
                .map((res, index) => (
                  <tbody key={res._id} className="flex items-center" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                    <tr className="px-4 py-2 flex gap-2 text-[#374151] h-[65px]">
                      <td className="w-[178px] break-words overflow-hidden">{res.detail}</td>
                      <td className="w-[150px] break-words">{res.kabupaten.name}</td>
                      <td className="w-[150px] break-words">{res.kecamatan.name}</td>
                      <td className="w-[150px] break-words">{res.kelurahan.name}</td>
                      <td className="w-[200px] break-words overflow-hidden">{res.detail}</td>
                      <td className="w-[100px] flex gap-2 items-center justify-center">
                        <img className="h-[24px] w-[24px] cursor-pointer" src={editIcon.src} alt="edit icon" />
                        {alertHapus === false ? (
                          <img onClick={() => setAlertHapus(true)} className="h-[24px] w-[24px] cursor-pointer" src={deletIcon.src} alt="delet icon" />
                        ) : (
                          <div className="flex gap-2 font-medium">
                            <p onClick={() => deleteAspirasi(res._id)} className="cursor-pointer text-red-500">
                              Hapus
                            </p>
                            <p onClick={() => setAlertHapus(false)} className="cursor-pointer">
                              Batal
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RumahAspirasi;
