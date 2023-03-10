import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { DeletIcon } from "../../utility/icon/icon";
import EditIcon from "../../utility/icon/edit2.png";
import PeopleIcon from "../../utility/icon/people.png";
import SearchInput from "../SearchInput";
import useFetch from "../../API/useFetch";
import ButtonPrimary from "../ButtonPrimary";
import axiosFetch from "../../API/axiosFetch";
import RoundedBorderButton from "../RoundedBorderButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditData,
  setTabPanelRelawanDash,
  showOrHidePopUpDash,
} from "../../redux/panelReducer";
import ListTargetDesa from "../ListTargetDesa";
import { useRouter } from "next/router";

const RelawanDash = () => {
  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [pekerjaanFilter, setPekerjaanFilter] = useState(null);
  const [sorting, setSorting] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [relawan, setRelawan] = useState([]);
  const token = useSelector((state) => state.user.token);
  const tabPanelRelawanDash = useSelector(
    (state) => state.panel.tabPanelRelawanDash
  );
  const [relawanSub, setRelawanSub] = useState(tabPanelRelawanDash);

  const editRelawan = (data) => {
    delete data.aksi;
    if (data) {
      dispatch(setEditData({ editData: JSON.stringify(data) }));
      dispatch(showOrHidePopUpDash({ type: "Relawan" }));
    }
  };
  const hapusRelawan = (email) => {
    if (confirm("Hapus Relawan ?")) {
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

  useEffect(() => {
    dispatch(setTabPanelRelawanDash({ tabPanelRelawanDash: "relawan" }));
    axiosFetch(
      "get",
      `user/relawan?page=${1}&limit=100${
        pekerjaanFilter !== null ? "&pekerjaan=" + pekerjaanFilter : ""
      }${sorting !== null ? "&sort=" + sorting : ""}${
        keyword !== null ? "&keyword=" + keyword : ""
      }${
        router.query.id_kabupaten !== undefined
          ? "&id_kabupaten=" + router.query.id_kabupaten
          : ""
      }${
        router.query.id_kecamatan !== undefined
          ? "&id_kecamatan=" + router.query.id_kecamatan
          : ""
      }`
    )
      .then((res) => setRelawan(res.data))
      .catch((err) => console.log(err));
  }, [pekerjaanFilter, sorting, keyword, relawanSub]);

  const pekerjaan = useFetch("get", "user/jobs");
  const kabupaten = useFetch("get", "user/target/details/kabupaten");

  const columns = [
    {
      name: "Nomor",
      selector: (row, i) => ++i,
    },
    {
      name: "Nama Relawan",
      selector: (row) => row.name,
    },
    {
      name: "Jumlah Rekrut",
      selector: (row) => (
        <button
          onClick={() => {
            router.push({
              pathname: "Admin",
              query: {
                component: "Simpatisan",
                id_relawan: row._id,
              },
            });
          }}
        >
          {row.jumlah_simpatisans}
        </button>
      ),
      button: true,
    },
    {
      name: "NIK",
      selector: (row) => row.nik,
    },
    {
      name: "email",
      selector: (row) => row.email,
    },
    {
      name: "No Hp",
      selector: (row) => row.phone,
    },
    {
      name: "pekerjaan",
      selector: (row) => row.pekerjaans.name,
    },  
    {
      name: "Target Desa",
      selector: (row) => row.target_desa.name,
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];
  let data = relawan.data ? relawan.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              editRelawan(res);
            }}
            src={EditIcon.src}
          />
          <div
            onClick={() => {
              hapusRelawan(res.email);
            }}
          >
            <DeletIcon />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <h1 className="text-4xl font-bold">Relawan</h1>
        <div className="flex items-center border border-orange-400 p-[5px] rounded-lg">
          <img src={PeopleIcon.src} className="h-[36px] m-[5px]" />
          <div>
            <p className="text-orange-500 text-2xl">
              {relawan.metadata?.total}
            </p>
            <p className="text-xl">Relawan</p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center px-[40px] py-[10px]">
        <RoundedBorderButton
          onClick={() => {
            setRelawanSub("relawan");
          }}
          title={"Relawan"}
          status={relawanSub === "relawan" ? "active" : "inactive"}
        />
        <RoundedBorderButton
          onClick={() => {
            setRelawanSub("target_per_desa");
          }}
          title={"Target Per Desa"}
          status={relawanSub === "target_per_desa" ? "active" : "inactive"}
        />
      </div>
      {relawanSub === "relawan" ? (
        <>
          <div className="px-[40px] py-[10px]">
            <ButtonPrimary
              title={"Tambah Akun Relawan"}
              action={() => {
                dispatch(showOrHidePopUpDash({ type: "Relawan" }));
              }}
            />
          </div>
          <div className="flex justify-between items-center px-[40px] py-[10px]">
            <SearchInput
              placeholder={"Cari Data"}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              onChange={(e) => {
                setTimeout(() => {
                  setPekerjaanFilter(e.target.value);
                }, 3000);
              }}
              id="pekerjaan"
              className="h-[40px] w-[363px] border text-[#374151]"
            >
              <option value="" disabled selected>
                Pilih Pekerjaan
              </option>
              {pekerjaan.data?.map((res, i) => {
                return (
                  <option key={i} value={res._id}>
                    {res.name}
                  </option>
                );
              })}
            </select>
            <div>
              <span>Urutkan </span>
              <select
                onChange={(e) => setSorting(e.target.value)}
                id="sorting"
                className="h-[40px] w-[363px] border text-[#374151] p-[5px] border-gray-400 rounded-md"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terbanyak">Terbanyak Rekrut</option>
              </select>
            </div>
          </div>
          <div className="px-[40px] py-[10px]">
            <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
            />
          </div>
        </>
      ) : (
        <div className="px-[40px] py-[10px]">
          {kabupaten.data?.map((res, i) => {
            return (
              <ListTargetDesa
                label={res.name}
                simpatisan={res.jumlah_simpatisans}
                target={res.total_target}
                id_kabupaten={res._id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RelawanDash;
