import React, { useEffect, useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import showIcon from "../../utility/icon/show_password.png";
import deletIcon from "../../utility/icon/delet_icon.png";
import searchIcon from "../../utility/icon/searchIcon.png";
import useFetch from "../../API/useFetch";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ButtonPrimary from "../ButtonPrimary";

const RumahAspirasi = () => {
  const router = useRouter();
  const [page, setPage] = useState();
  const [alertHapus, setAlertHapus] = useState(false);
  const [kecamatan, setKecamatan] = useState();
  const [kelurahan, setKelurahan] = useState();
  const [filterWilayah, setFilterWilayah] = useState();
  const [filterKecamatan, setFilterKecamatan] = useState();
  const [filterKelurahan, setFilterKelurahan] = useState();
  const [typeSearch, setTypeSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [total, setTotal] = useState();

  const kabupaten = useFetch("get", "user/kabupaten?filter=lombok");
  const changeKecamatan = async (id_kabupaten) => {
    const res = await axiosFetch("get", `user/kecamatan/${id_kabupaten}`)
      .then((res) => setKecamatan(res.data))
      .catch((err) => console.log(err));
    return res;
  };
  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);

  const changeKelurahan = async (id_kecamatan) => {
    const res = await axiosFetch("get", `user/kelurahan/${id_kecamatan}`)
      .then((res) => setKelurahan(res.data))
      .catch((err) => console.log(err));
    return res;
  };

  useEffect(() => {
    const res = axiosFetch(
      "get",
      `/user/aspirasi?page=${currentPage}`,
      {},
      token
    )
      .then((res) => setPage(res.data))
      .catch((err) => console.log(err));
  }, [alertHapus, currentPage]);

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

  useEffect(() => {
    if (page === undefined) {
      setCurrentPage();
    } else {
      setCurrentPage(page?.metadata?.currentPage);
      setTotalPage(page?.metadata?.totalPage);
      setTotal(page?.metadata?.total);
    }
  }, [page]);

  let arr = [];

  for (var i = 1; i <= totalPage; i++) {
    var obj = { page: i };

    arr.push(obj);
  }

  // console.log(page);
  return (
    <>
      <div className="absolute pr-[50px] h-[1120px] bg-orange-100 bg-opacity-30">
        <div className="ml-[60px] mt-[60px]">
          <p className="text-[#374151] text-[32px] font-bold">Rumah Aspirasi</p>
          <div className="flex gap-3 items-center mt-[23px] mb-[14px] text-[#374151]">
            {/* <div className="h-[32px] bg-white border border-[#D1D5DB] rounded-sm px-2 flex items-center">
              <input
                onChange={(e) => setTypeSearch(e.target.value)}
                className="outline-none"
                placeholder="Cari Data"
                type={"text"}
              />
              <img src={searchIcon.src} alt="search icon" />
            </div> */}
            {/* <select
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
            <select
              onChange={(e) => setFilterKelurahan(e.target.value)}
              className="outline-0 h-[32px] border border-[#D1D5DB] rounded-sm px-2"
            >
              <option>Pilih Desa / Kelurahan</option>
              {kelurahan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
            </select> */}
          </div>
          <div>
            {roles === "relawan" && (
              <ButtonPrimary
                title={"Tambah Aspirasi"}
                action={() => {
                  router.push("../Aspirasi");
                }}
              />
            )}

            <br />
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
                    const search = res.perihal
                      .toLowerCase()
                      .includes(typeSearch.toLowerCase());
                    return search;
                  } else {
                    return res;
                  }
                })
                .map((res, index) => (
                  <tbody
                    key={res._id}
                    className="flex items-center"
                    style={
                      (index + 1) % 2 !== 0
                        ? { background: "#F9FAFB" }
                        : { background: "white" }
                    }
                  >
                    <tr className="px-4 py-2 flex gap-2 text-[#374151] h-[65px]">
                      <td className="w-[178px] break-words overflow-hidden">
                        {res.perihal}
                      </td>
                      <td className="w-[150px] break-words">
                        {res.kabupaten.name}
                      </td>
                      <td className="w-[150px] break-words">
                        {res.kecamatan.name}
                      </td>
                      <td className="w-[150px] break-words">
                        {res.kelurahan.name}
                      </td>
                      <td className="w-[200px] break-words overflow-hidden">
                        {res.detail}
                      </td>
                      <td className="w-[100px] flex gap-2 items-center justify-center">
                        <img
                          onClick={() => {
                            router.push({
                              pathname: "aspirasi/DetailAspirasi",
                              query: {
                                id: res._id,
                                nama: res.name,
                                phone: res.phone,
                                email: res.email,
                                perihal: res.perihal,
                                detail: res.detail,
                                image: res.image,
                                kabupaten: res.kabupaten.name,
                                kecamatan: res.kecamatan.name,
                                kelurahan: res.kelurahan.name,
                              },
                            });
                          }}
                          className="h-[24px] w-[24px] cursor-pointer"
                          src={showIcon.src}
                          alt="edit icon"
                        />
                        {/* {alertHapus === false ? (
                          <img
                            onClick={() => setAlertHapus(true)}
                            className="h-[24px] w-[24px] cursor-pointer"
                            src={deletIcon.src}
                            alt="delet icon"
                          />
                        ) : (
                          <div className="flex gap-2 font-medium">
                            <p
                              onClick={() => deleteAspirasi(res._id)}
                              className="cursor-pointer text-red-500"
                            >
                              Hapus
                            </p>
                            <p
                              onClick={() => setAlertHapus(false)}
                              className="cursor-pointer"
                            >
                              Batal
                            </p>
                          </div>
                        )} */}
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
          <div className="flex justify-between items-center mt-4  ">
            <div className="flex items-center gap-2">
              <select className="flex justify-center  rounded-md  h-[36px] px-2 border outline-none border-[#D1D5DB] text-[#828282] text-[14px] ">
                <option>10</option>
                <option>10</option>
                <option>10</option>
              </select>
              <p className="text-[#828282] text-[14px]">
                Showing 1 - 10 of {total}
              </p>
            </div>
            <div className="flex items-center mt-4 gap-1">
              {arr?.map((res, i) => (
                <p
                  key={i}
                  onClick={() => setCurrentPage(res.page)}
                  className={`text-[14px] px-3 py-1 rounded-md flex cursor-pointer ${
                    res.page === currentPage
                      ? "text-white bg-[#FF5001]"
                      : "text-[#111827]"
                  }`}
                >
                  {res.page}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RumahAspirasi;
