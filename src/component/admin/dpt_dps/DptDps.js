import React, { useEffect, useState } from "react";
import JumlahDptDps from "./JumlahDptDps";
import cariIcon from "../../../utility/img/IconSearch.png";
import axios from "axios";
import NewButton from "../../NewButton";
import Icon2 from "../../../utility/icon/Icon_import.png";
import Icon1 from "../../../utility/icon/Icon_export.png";
import edit from "../../../utility/icon/edit_icon.png";
import deletIcon from "../../../utility/icon/delet_icon.png";
import DataTable from "react-data-table-component";
import { customStyles, conditionalRowStyles } from "../../../utility/tabelstyle";
import { useRouter } from "next/router";
import EksportDataDpt from "./EksportData";
import RealCount from "../RealCount";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../../../API/axiosFetch";
import EditIcon from "../../../utility/icon/edit2.png";
import { DeletIcon } from "../../../utility/icon/icon";
import { showOrHidePopUpDptDps } from "../../../redux/panelReducer";
import FilterData from "../../FilterData";
import Pagination from "../../Pagination";
import useFetch from "../../../API/useFetch";

const DptDps = () => {
  const router = useRouter();
  const base_url = "https://api.sjpberkhidmat.id/";
  const token = useSelector((state) => state.user.token);
  const [currenPage, setCurrentPage] = useState(1);
  const [filterKabupaten, setFilterKabupaten] = useState("semua");
  const [kecamatan, setKecamatan] = useState();
  const [filterKecamatan, setFilterKecamatan] = useState("semua");
  const [keyword, setKeyword] = useState(" ");
  const [exportExcel, setExportExcel] = useState([]);
  // const [kelurahan, setKelurahan] = useState([]);
  const [dptdps, setDptdps] = useState([]);
  const dispatch = useDispatch();

  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const username = useSelector((state) => state.panel.name);
  const roles = useSelector((state) => state.panel.roles);
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);
  const [formData, setFormData] = useState({
    file: "",
    id_periode: idPeriode,
  });

  useEffect(() => {
    axiosFetch("get", `user/dpt_dps/export`, {}, token)
      .then((res) => setExportExcel(res.data))
      .catch((err) => console.log(err));
    roles === "koordinator"
      ? axiosFetch("get", `user/dpt_dps?page=${currenPage}&idKabupaten=${id_kabupaten}`, {}, token)
          .then((res) => setDptdps(res.data))
          .catch((err) => console.log(err))
      : axiosFetch(
          "get",
          `user/dpt_dps?page=${currenPage}${filterKabupaten !== "semua" ? `&idKabupaten=${filterKabupaten}` : ``}${filterKecamatan !== "semua" ? `&idKecamatan=${filterKecamatan}` : ``}${
            keyword !== " " && keyword.length >= 3 ? `&keyword=${keyword}` : ``
          }`,
          {},
          token
        )
          .then((res) => setDptdps(res.data))
          .catch((err) => console.log(err));
  }, [currenPage, filterKabupaten, filterKecamatan, keyword, username]);

  // let data = dptdps.data ? dptdps.data : [];
  // let i = 0;
  // if (data) {
  //   for (const res of data) {
  //     data[i++].aksi = (
  //       <div className="flex justify-between w-[55px] cursor-pointer">
  //         <img
  //           onClick={() => {
  //             // editRelawan(res);
  //           }}
  //           src={EditIcon.src}
  //         />
  //         <div
  //           onClick={() => {
  //             // hapusRelawan(res.email);
  //           }}
  //         >
  //           <DeletIcon />
  //         </div>
  //       </div>
  //     );
  //   }
  // }

  useEffect(() => {
    roles === "admin" &&
      axiosFetch("get", `user/kecamatan/${filterKabupaten}`)
        .then((res) => setKecamatan(res.data))
        .catch((err) => console.log(err));
    username === "koordinator mataram" &&
      axiosFetch("get", `user/kecamatan/5271`)
        .then((res) => setKecamatan(res.data))
        .catch((err) => console.log(err));
  }, [filterKabupaten, username]);

  //   style
  const ImportButton = {
    width: "127px",
    height: "40px",
    background: "#374151",
    borderRadius: "4px",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "18px",
    lineHeight: "120%",
    color: "white",
  };

  const exportButton = {
    width: "42px",
    height: "42px",
    background: "#FFECE4",
    border: "1px solid #FF9666",
    borderRadius: "4px",
  };

  // data tabel

  const columns = [
    {
      name: "NIK",
      selector: (row) => row.nik,
    },
    {
      name: "Nama",
      selector: (row) => row.name,
    },
    {
      name: "Tempat Lahir",
      selector: (row) => row.place_birth,
    },
    {
      name: "Tanggal Lahir",
      selector: (row) => row.date_birth.split("T").shift().split("-").reverse().join("/"),
    },
    {
      name: "Kabupaten",
      selector: (row) => row.kabupaten?.name,
      width: "200px",
    },
    {
      name: "Kecamatan",
      selector: (row) => row.kecamatan?.name,
    },
    {
      name: "Desa / Kel",
      selector: (row) => row.kelurahan?.name,
    },
    // {
    //   name: "Status Perkawinan",
    //   selector: (row) => row.status,
    //   width: "120px ",
    // },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.gender,
    },
    {
      name: "Alamat",
      selector: (row) => row.address,
      width: "500px",
    },
    // {
    //   name: "Aksi",
    //   selector: (row) => row.aksi,
    // },
  ];

  //   const data = simpatisan.data;
  // const data = [
  //   {
  //     id: 1,
  //     nik: "5444 4540 0608 2434",
  //     name: "1988",
  //     temaptLahir: "1988",
  //     birthDay: "1988",
  //     kabupaten: "1988",
  //     kecamatan: "1988",
  //     desa: "1988",
  //     status: "1988",
  //     gender: "1988",
  //     alamat: "1988",
  //   },
  //   {
  //     id: 2,
  //     nik: "Beetlejuice",
  //     name: "1988",
  //     temaptLahir: "1988",
  //     birthDay: "1988",
  //     kabupaten: "1988",
  //     kecamatan: "1988",
  //     desa: "1988",
  //     status: "1988",
  //     gender: "1988",
  //     alamat: "1988",
  //   },
  // ];

  const getKabupaten = useFetch("get", "user/kabupaten");
  console.log(id_kabupaten);
  return (
    <div className="pl-[40px] pt-[45px] pb-[100px]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[#374151] text-[32px]">DPT / DPS Dapil II Prov. NTB</p>
        {/* <div className="pr-[20px]">
          <JumlahDptDps />
        </div> */}
      </div>
      <div className="flex gap-3 mt-2">
        {/* <div className="w-[209px] h-[42px] bg-[#E44700] rounded-md items-center flex justify-center cursor-pointer">
          <p className="font-semibold text-white text-[18px]">
            Tambah DPT / DPS
          </p>
        </div> */}
        {/* <div
          onClick={() => {
            dispatch(showOrHidePopUpDptDps({ type: "input_penduduk" }));
          }}
          className="w-[255px] h-[42px] bg-white border border-[#E44700] rounded-md items-center flex justify-center cursor-pointer"
        >
          <p className="font-semibold text-[#E44700] text-[18px]">
            Input Jumlah Penduduk
          </p>
        </div> */}
      </div>
      {roles === "admin" && (
        <div className="mt-[20px] flex mr-[50px]">
          {/* cari data berdasarkan input */}
          <div className="w-screen">
            <FilterData
              kabupaten={roles === "admin" && getKabupaten}
              setFilterKabupaten={roles === "admin" && setFilterKabupaten}
              setFilterKecamatan={setFilterKecamatan}
              kecamatan={kecamatan}
              display={"hide"}
              keyword={setKeyword}
              filterKabupaten={filterKabupaten}
            />
          </div>

          <div className="ml-[60px] flex gap-3">
            {/* <label
            className="flex items-center justify-center gap-2 cursor-pointer"
            htmlFor="file_upload"
            style={ImportButton}
          >
            Impor
            <img src={Icon2.src} alt={`Impor`} />
            <input
              onChange={(e) => {
                importDPT(e.target.files[0]);
              }}
              id="file_upload"
              type="file"
              className="hidden"
            />
          </label> */}
            <NewButton
              style={ImportButton}
              title={"Impor"}
              icon={Icon2}
              action={() => {
                dispatch(showOrHidePopUpDptDps({ type: "import" }));
              }}
            />
            <NewButton
              action={() => {
                console.log(exportExcel);
                // alert(exportExcel.link);
                window.open(process.env.NEXT_PUBLIC_BASE_URL_IMAGE + exportExcel.link, "_blank");
                // router.push({
                //   pathname: "/Admin",
                //   query: { component: "EksportDataDpt" },
                // });
              }}
              style={exportButton}
              icon={Icon1}
            />
          </div>
        </div>
      )}
      {/* <div className="mt-4">
        <DataTable className="" columns={columns} data={data} customStyles={customStyles} conditionalRowStyles={conditionalRowStyles} />
        
        <div className="flex"></div>
      </div> */}
      <div className="flex overflow-x-auto pb-4 rounded-sm mt-[24px] mr-[50px] scrollbar-thin scrollbar-track-[#D1D5DB] scrollbar-thumb-[#374151]">
        <table className="table-auto">
          <thead className="">
            <tr className="bg-[#374151] text-white h-[51px]">
              <th className="px-4 py-2 text-left font-normal">No</th>
              <th className="px-4 py-2 text-left font-normal">NIK</th>
              <th className="px-4 py-2 text-left font-normal">Nama</th>
              <th className="px-4 py-2 text-left font-normal">Tempat Lahir</th>
              <th className="px-4 py-2 text-left font-normal whitespace-nowrap">Tanggal Lahir</th>
              <th className="px-4 py-2 text-left font-normal">Kabupaten</th>
              <th className="px-4 py-2 text-left font-normal">Kecamatan</th>
              <th className="px-4 py-2 text-left font-normal">Desa / Kel</th>
              <th className="px-4 py-2 text-left font-normal whitespace-nowrap">Jenis Kelamin</th>
              <th className="px-4 py-2 text-left font-normal">Alamat</th>
              {/* <th className=" font-normal sticky right-0  bg-[#374151] border-l-2 w-[100px] dpy-4">Aksi</th> */}
            </tr>
          </thead>
          <tbody>
            {dptdps?.data?.map((res, i) => (
              <tr key={i} className={`${(i + 1) % 2 !== 0 ? "bg-[#F9FAFB]" : "bg-white"} h-[51px] text-[#374151]`}>
                <td className=" px-4 py-2 whitespace-nowrap">{++i + (currenPage - 1) * 10}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.nik}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.name}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.place_birth}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.date_birth?.split("T").shift().split("-").reverse().join("/")}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.kabupaten?.name}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.kecamatan?.name}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.kelurahan?.name}</td>
                <td className=" px-4 py-2 text-center">{res?.gender}</td>
                <td className=" px-4 py-2 whitespace-nowrap">{res?.address}</td>
                {/* <td className=" px-4 py-2">Indonesia</td> */}
                <td
                  style={{
                    backgroundColor: (i + 1) % 2 !== 0 ? "#F9FAFB" : "white",
                  }}
                  className="sticky right-0 border-l-2 bg-slate-300 flex px-6 py-4  gap-3 w-[100px] justify-center items-center"
                >
                  {/* <img className="cursor-pointer" src={edit.src} /> */}
                  {/* <img className="cursor-pointer" src={deletIcon.src} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mr-[50px] mt-[24px]">
        <Pagination current_page={currenPage} setCurrentPage={setCurrentPage} total_page={dptdps?.metadata?.totalPage} total={dptdps?.metadata?.total} />
      </div>
    </div>
  );
};

export default DptDps;
