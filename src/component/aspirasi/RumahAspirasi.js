import React, { useEffect, useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import showIcon from "../../utility/icon/show_password.png";
import deletIcon from "../../utility/icon/delet_icon.png";
import searchIcon from "../../utility/icon/searchIcon.png";
import useFetch from "../../API/useFetch";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ButtonPrimary from "../ButtonPrimary";
import Pagination from "../Pagination";

const RumahAspirasi = ({ popupMobile }) => {
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
    const res = axiosFetch("get", `/user/aspirasi?page=${currentPage}`, {}, token)
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

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {screenSize.width >= 350 && screenSize.width <= 450 ? (
        <div className="px-[16px]">
          <p className="mt-[21px] text-[21px] font-bold text-[#374151]">Rumah Aspirasi</p>
          <div
            onClick={() => {
              router.push("../Aspirasi");
            }}
            className="flex justify-center py-1 rounded-sm bg-[#E44700] font-medium text-white mt-3"
          >
            Tambah Aspirasi
          </div>
          <div className={`${popupMobile === true && "scrollbar-none"} flex w-full overflow-x-auto pb-4 rounded-sm scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]`}>
            <table className="table-auto w-full mt-4">
              <thead className="bg-[#374151]">
                <tr className="h-[40px] text-white">
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Perihal
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Kabupaten
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Kecamatan
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Desa / Kelurahan
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Detail Aspirasi
                  </th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                    Relawan
                  </th>
                  <th scope="col" className="px-2 py-3 sticky bg-[#374151] border-l border-white right-0 text-left text-xs font-medium text-clip">
                    Action
                  </th>
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
                    const search = res.perihal.toLowerCase().includes(typeSearch.toLowerCase());
                    return search;
                  } else {
                    return res;
                  }
                })
                .map((res, index) => (
                  <tbody key={res._id} className="" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                    <tr className=" text-[#374151] h-[42px]">
                      <td className="px-2 py-3 whitespace-nowrap">{res.perihal}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{res.kabupaten.name}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{res.kecamatan.name}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{res.kelurahan.name}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{res.detail}</td>
                      <td className="px-2 py-3 whitespace-nowrap">{res.detail}</td>
                      <td className="px-2 py-3 sticky right-0 border-l whitespace-nowrap text-center" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                        <img
                          onClick={() => {
                            router.push({
                              pathname: "/aspirasi/DetailAspirasi",
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
          <div className="w-full mt-3">
            <Pagination mobile={true} current_page={currentPage} setCurrentPage={setCurrentPage} total={page?.metadata?.total} total_page={page?.metadata?.totalPage} />
          </div>
        </div>
      ) : (
        <div className="pb-[80px]">
          <div className="ml-[60px] mt-[60px]">
            <p className="text-[#374151] text-[32px] font-bold">Rumah Aspirasi</p>
            <div className="flex gap-3 items-center mt-[23px] text-[#374151]">
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
                <div className="mb-3">
                  {" "}
                  <ButtonPrimary
                    title={"Tambah Aspirasi"}
                    action={() => {
                      router.push("../Aspirasi");
                    }}
                  />
                </div>
              )}
              <div className="flex w-[850px] overflow-x-auto pb-4 rounded-sm scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]">
                <table className="table-auto w-[850px]">
                  <thead className="bg-[#374151]">
                    <tr className="h-[40px] text-white">
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Perihal
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Kabupaten
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Kecamatan
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Desa / Kelurahan
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Detail Aspirasi
                      </th>
                      <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-clip">
                        Relawan
                      </th>
                      <th scope="col" className="px-2 py-3 sticky bg-[#374151] border-l border-white right-0 text-left text-xs font-medium text-clip">
                        Action
                      </th>
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
                        const search = res.perihal.toLowerCase().includes(typeSearch.toLowerCase());
                        return search;
                      } else {
                        return res;
                      }
                    })
                    .map((res, index) => (
                      <tbody key={res._id} className="" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                        <tr className=" text-[#374151] h-[42px]">
                          <td className="px-2 py-3 whitespace-nowrap">{res.perihal}</td>
                          <td className="px-2 py-3 whitespace-nowrap">{res.kabupaten.name}</td>
                          <td className="px-2 py-3 whitespace-nowrap">{res.kecamatan.name}</td>
                          <td className="px-2 py-3 whitespace-nowrap">{res.kelurahan.name}</td>
                          <td className="px-2 py-3 whitespace-nowrap">{res.detail}</td>
                          <td className="px-2 py-3 whitespace-nowrap">{res.detail}</td>
                          <td className="px-2 py-3 sticky right-0 border-l whitespace-nowrap text-center" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                            <img
                              onClick={() => {
                                router.push({
                                  pathname: "/aspirasi/DetailAspirasi",
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
            </div>
            <div className="w-[850px] mt-3">
              <Pagination current_page={currentPage} setCurrentPage={setCurrentPage} total={page?.metadata?.total} total_page={page?.metadata?.totalPage} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RumahAspirasi;
