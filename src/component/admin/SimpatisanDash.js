import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { DeletIcon, DetailIcon, SearchIcon } from "../../utility/icon/icon";
import useFetch from "../../API/useFetch";
import SearchInput from "../SearchInput";
import ButtonPrimary from "../ButtonPrimary";
import EditIcon from "../../utility/icon/edit2.png";

import { setEditData, showOrHidePopUpDash } from "../../redux/panelReducer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import axiosFetch from "../../API/axiosFetch";
import Pagination from "../Pagination";
const customStyles = {
  headCells: {
    style: { backgroundColor: "#374151", color: "white" },
  },
};

const SimpatisanDash = ({ register, popupMobile }) => {
  const token = useSelector((state) => state.user.token);
  const roles = useSelector((state) => state.user.roles);
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);
  const router = useRouter();
  const [keyword, setKeyword] = useState(null);
  const [simpatisan, setSimpatisan] = useState();

  // const simpatisan =
  //   roles === "koordinator"
  //     ? useFetch("get", `user/simpatisan?page=1&limit=10&id_kabupaten=${id_kabupaten}`, token)
  //     : useFetch(
  //         "get",
  //         `user/simpatisan?page=1&limit=10${router.query.id_kabupaten !== undefined ? "&id_kabupaten=" + router.query.id_kabupaten : ""}${router.query.id_kecamatan !== undefined ? "&id_kecamatan=" + router.query.id_kecamatan : ""}${
  //           router.query.id_relawan !== undefined ? "&id_relawan=" + router.query.id_relawan : ""
  //         }${keyword !== null ? "&keyword=" + keyword : ""}`,
  //         token
  //       );
  const dispatch = useDispatch();

  const editSimpatisan = (data) => {
    delete data.aksi;
    if (data) {
      dispatch(setEditData({ editData: JSON.stringify(data) }));
      dispatch(showOrHidePopUpDash({ type: "Simpatisan" }));
    }
  };
  const hapusSimpatisan = (email) => {
    if (confirm("Hapus Simpatisan ?")) {
      axiosFetch("delete", "user/users", { email }, token);
      // Save it!
      // console.log('Thing was saved to the database.');
      setTimeout(function () {
        //your code to be executed after 1 second
        location.reload();
      }, 1);
    } else {
      // Do nothing!
      // console.log('Thing was not saved to the database.');
    }
  };

  const [currentPage, setCurrentPage] = useState("1");

  useEffect(() => {
    roles === "koordinator"
      ? axiosFetch("get", `user/simpatisan?page=${currentPage}&limit=10&id_kabupaten=${id_kabupaten}${router.query.id_kecamatan !== undefined ? "&id_kecamatan=" + router.query.id_kecamatan : ""}`, {}, token).then((res) =>
          setSimpatisan(res.data)
        )
      : axiosFetch(
          "get",
          `user/simpatisan?page=${currentPage}&limit=10${router.query.id_kabupaten !== undefined ? "&id_kabupaten=" + router.query.id_kabupaten : ""}${
            router.query.id_kecamatan !== undefined ? "&id_kecamatan=" + router.query.id_kecamatan : ""
          }${router.query.id_relawan !== undefined ? "&id_relawan=" + router.query.id_relawan : ""}${keyword !== null && keyword?.length >= 3 ? "&keyword=" + keyword : ""}`,
          {},
          token
        ).then((res) => setSimpatisan(res.data));
  }, [register, currentPage, keyword]);

  const columns = [
    {
      name: "No",
      selector: (row, i) => ++i + (currentPage - 1) * 10,
      width: "50px",
    },
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    // {
    //   name: "Relawan",
    //   selector: (row) => row.relawan,
    // },
    {
      name: "NIK",
      selector: (row) => row.nik,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "No Hp",
      selector: (row) => row.phone,
    },
    {
      name: "pekerjaan",
      selector: (row) => row.pekerjaan?.name,
    },
    {
      name: "Jenis Kelamin",
      selector: (row) => (row.gender === "L" ? "Laki-Laki" : "Perempuan"),
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];

  const data = simpatisan?.data ? simpatisan?.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              editSimpatisan(res);
            }}
            src={EditIcon.src}
          />
          {roles === "admin" && (
            <div
              onClick={() => {
                hapusSimpatisan(res.email);
              }}
            >
              <DeletIcon />
            </div>
          )}
        </div>
      );
    }
  }

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
          <p className="text-[24px] text-[#374151] font-bold mt-2">Simpatisan</p>
          <div
            onClick={() => {
              dispatch(showOrHidePopUpDash({ type: "Simpatisan" }));
            }}
            className={`${roles === "ketua_tim" && "hidden"} flex justify-center mt-3 bg-[#E44700] py-2 rounded-sm`}
          >
            <p className="font-semibold text-white text-[14px]">Tambah Simpatisan</p>
          </div>
          <div className="flex mt-3">
            <div className="flex stroke-[#374151] border px-2 py-1 w-full">
              <input className="w-full outline-none" type={"text"} placeholder={"Cari Data"} onChange={(e) => setKeyword(e.target.value)} />
              <SearchIcon />
            </div>
          </div>
          <div className={`${popupMobile === true && "scrollbar-none"} flex overflow-x-auto pb-4 rounded-sm mt-[24px] scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]`}>
            <table className="tabel-auto">
              <thead className="bg-[#374151]  ">
                <tr className="h-[51px] text-white ">
                  <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-clip">
                    No
                  </th>
                  <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-clip">
                    Nama
                  </th>
                  <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-clip">
                    Nik
                  </th>
                  <th scope="col" className=" px-2 py-3 text-left text-xs font-medium text-clip">
                    Email
                  </th>
                  <th scope="col" className=" px-2 py-3 text-left text-xs font-medium">
                    No.Hp
                  </th>
                  <th scope="col" className=" px-2 py-3 text-xs font-medium">
                    Pekerjaan
                  </th>
                  <th scope="col" className=" px-2 py-3 text-xs font-medium">
                    Jenis Kelamin
                  </th>
                  <th scope="col" className={`${roles === "ketua_tim" && "hidden"} border-l-2 bg-[#374151] px-2 py-3 sticky right-0 text-white  text-xs font-medium`}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {simpatisan !== undefined &&
                  simpatisan.data?.map((res, i) => {
                    return (
                      <tr key={res._id} className={`${(i + 1) % 2 !== 0 ? "bg-[#F9FAFB]" : "bg-white"}`}>
                        <td className="px-2 py-3">{++i}</td>
                        <td className=" px-2 py-3 whitespace-nowrap">{res.name}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{res.nik}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{res.email}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{res.phone}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{res.pekerjaan?.name}</td>
                        <td className="px-2 py-3 whitespace-nowrap">{res.gender}</td>
                        <td className={`${roles === "ketua_tim" && "hidden"} px-2 py-3 border-l-2  ${(i + 1) % 2 === 0 ? "bg-[#F9FAFB]" : "bg-white"} sticky right-0`}>
                          <div className="flex items-center justify-center gap-3 px-2">
                            <img
                              onClick={() => {
                                editSimpatisan(res);
                              }}
                              src={EditIcon.src}
                            />
                            <div
                              onClick={() => {
                                hapusSimpatisan(res.email);
                              }}
                            >
                              <DeletIcon />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="px-[16px]">
            <Pagination mobile={true} total={simpatisan?.metadata?.total} current_page={currentPage} setCurrentPage={setCurrentPage} total_page={simpatisan?.metadata?.totalPage} />
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex justify-between items-center px-[40px] py-[10px]">
            <h1 className="text-4xl font-bold">Simpatisan</h1>
          </div>
          <div className={`${roles === "koordinator" ? "hidden" : "visible"} px-[40px] py-[10px]`}>
            <ButtonPrimary
              title={"Tambah Simpatisan"}
              action={() => {
                dispatch(showOrHidePopUpDash({ type: "Simpatisan" }));
              }}
            />
          </div>
          <div className="flex justify-between items-center px-[40px] py-[10px]">
            <SearchInput placeholder={"Cari Data"} onChange={(e) => setKeyword(e.target.value)} />

            <div>
              <span>Urutkan </span>
              <select onChange={(e) => setSorting(e.target.value)} id="sorting" className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md">
                <option value="terbaru">Terbaru</option>
                <option value="terbanyak">Terbanyak Rekrut</option>
              </select>
            </div>
          </div>
          <div className="px-[40px] py-[10px]">
            <DataTable columns={columns} data={data} customStyles={customStyles} />
            <Pagination total={simpatisan?.metadata?.total} current_page={currentPage} setCurrentPage={setCurrentPage} total_page={simpatisan?.metadata?.totalPage} />
          </div>
        </div>
      )}
    </>
  );
};

export default SimpatisanDash;
