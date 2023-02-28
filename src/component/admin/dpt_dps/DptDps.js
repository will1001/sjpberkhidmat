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
import {
  customStyles,
  conditionalRowStyles,
} from "../../../utility/tabelstyle";
import { useRouter } from "next/router";
import EksportDataDpt from "./EksportData";
import RealCount from "../RealCount";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../../../API/axiosFetch";
import EditIcon from "../../../utility/icon/edit2.png";
import { DeletIcon } from "../../../utility/icon/icon";
import { showOrHidePopUpDptDps } from "../../../redux/panelReducer";

const DptDps = () => {
  const router = useRouter();
  const base_url = "https://api.sjpberkhidmat.id/";
  const token = useSelector((state) => state.user.token);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  // const [kelurahan, setKelurahan] = useState([]);
  const [dptdps, setDptdps] = useState([]);
  const dispatch = useDispatch();

  const idPeriode = useSelector((state) => state.panel.idPeriode);
  const [formData, setFormData] = useState({
    file: "",
    id_periode: idPeriode,
  });

  useEffect(() => {
    axios
      .get(base_url + "user/kabupaten")
      .then((res) => setKabupaten(res.data));
    axiosFetch("get", `user/dpt_dps?page=${1}`, {}, token)
      .then((res) => setDptdps(res.data))
      .catch((err) => console.log(err));
  }, []);

  let data = dptdps.data ? dptdps.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              // editRelawan(res);
            }}
            src={EditIcon.src}
          />
          <div
            onClick={() => {
              // hapusRelawan(res.email);
            }}
          >
            <DeletIcon />
          </div>
        </div>
      );
    }
  }

  const changeKabupaten = (idKabupaten) => {
    // setFormData({ ...formData, id_kabupaten: idKabupaten });
    axios.get(base_url + `user/kecamatan/${idKabupaten}`).then((res) => {
      setKecamatan(res.data);
    });
  };

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
      width: "150px ",
    },
    {
      name: "Nama",
      selector: (row) => row.name,
      width: "160px ",
    },
    // {
    //   name: "Tempat Lahir",
    //   selector: (row) => row.place_of_birth,
    //   width: "110px ",
    // },
    // {
    //   name: "Tanggal Lahir",
    //   selector: (row) => row.birthDay,
    //   width: "90px ",
    // },
    {
      name: "Kabupaten",
      selector: (row) => row.kabupaten?.name,
      width: "120px ",
    },
    {
      name: "Kecamatan",
      selector: (row) => row.kecamatan?.name,
      width: "100px ",
    },
    {
      name: "Desa / Kel",
      selector: (row) => row.kelurahan?.name,
      width: "90px ",
    },
    // {
    //   name: "Status Perkawinan",
    //   selector: (row) => row.status,
    //   width: "120px ",
    // },
    {
      name: "Jenis Kelamin",
      selector: (row) => row.gender,
      width: "100px ",
    },
    {
      name: "Alamat",
      selector: (row) => row.address,
      width: "220px ",
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

  return (
    <div className="pl-[40px] pt-[45px] ">
      <div className="flex items-center justify-between">
        <p className="font-bold text-[#374151] text-[32px]">
          DPT / DPS Dapil II Prov. NTB
        </p>
        <div className="pr-[20px]">
          <JumlahDptDps />
        </div>
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
      <div className="mt-[20px] flex">
        {/* cari data berdasarkan input */}
        <form>
          <div className="flex">
            <label htmlFor="search"></label>
            <input
              className="h-[40px] w-[239px]  rounded-md border text-[#374151] px-2 outline-0 pr-8"
              placeholder="Cari Data"
              type={"text"}
              id="search"
            />
            <img
              className="absolute ml-[210px] mt-3 cursor-pointer"
              src={cariIcon.src}
              alt="searchIcon.png"
            />
          </div>
        </form>
        {/*filter  drop down kab / kota */}
        <form>
          <label
            htmlFor="kabupaten"
            className="text-[14px] text-[#374151] mx-3"
          >
            Filter
          </label>
          <select
            onChange={(e) => changeKabupaten(e.target.value)}
            id="kabupaten"
            className="h-[40px] w-[214px] rounded-md border text-[#374151]"
          >
            <option value="kabupaten" disabled selected>
              Pilih Kabupaten
            </option>
            {kabupaten.data?.map((res, i) => {
              return (
                <option key={i} value={res._id}>
                  {res.name}
                </option>
              );
            })}
          </select>
          {/* dropdown kecamatan */}
          <select
            onChange={(e) => e.target.value}
            id="kecamatan"
            className="h-[40px] w-[169px] rounded-md border text-[#374151] ml-[19px]"
          >
            <option value="kecamatan" disabled selected>
              Pilih Kecamatan
            </option>
            {kecamatan.data?.map((res, i) => {
              return (
                <option key={i} value={res._id}>
                  {res.name}
                </option>
              );
            })}
          </select>
        </form>
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
              router.push({
                pathname: "/Admin",
                query: { component: "EksportDataDpt" },
              });
            }}
            style={exportButton}
            icon={Icon1}
          />
        </div>
      </div>
      <div className="w-[955px] mt-4 flex">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
        />
        {/* <div className="w-[88px]">
          <p className="h-[51px] flex items-center justify-center bg-[#374151] text-white">
            {" "}
            Aksi
          </p>
          <div key={1} className="h-[57px] border-b-2 border-l-2">
            <div className="flex justify-center pt-4 gap-2">
              <img className="cursor-pointer" src={edit.src} alt="edit" />
              <img className="cursor-pointer" src={deletIcon.src} alt="edit" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DptDps;
