import React, { useEffect, useState } from "react";
import Logo from "../src/utility/Logo";
import DataTable from "react-data-table-component";
import axiosFetch from "../src/API/axiosFetch";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../src/utility/icon/edit2.png";
import ProgressBar from "../src/utility/ProgresBar";
import CloseIcon from "../src/utility/icon/close.png";
import ButtonPrimary from "../src/component/ButtonPrimary";
import Button from "../src/component/Button";

import { KembaliIcon } from "../src/utility/icon/icon";
import { useRouter, withRouter } from "next/router";
import { setTabPanelRelawanDash } from "../src/redux/panelReducer";
import { setIdKabupaten } from "../src/redux/userReducer";

function DetailTargetDesa({ routes }) {
  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };
  const router = useRouter();

  const dispatch = useDispatch();

  const [popUp, setPopUp] = useState(false);
  const [detailTarget, setDetailTarget] = useState([]);
  const [dataTarget, setDataTarget] = useState(null);
  const [inputTarget, setInputTarget] = useState(null);
  const [inputJmlPenduduk, setInputJmlPenduduk] = useState(null);
  const [inputJmlTps, setInputJmlTps] = useState(null);
  const [suaraPeriodeLalu, setSuaraPeriodeLalu] = useState(null);

  const token = useSelector((state) => state.user.token);
  const id_kabupaten = useSelector((state) => state.user.id_kabupaten);

  const editTarget = async (data) => {
    await axiosFetch(
      "get",
      `user/details/target_desa/current_input?id_kelurahan=${data._id}`,
      {},
      token
    )
      .then((res) => {
        const data = res.data.data;
        setInputTarget(data.jml_target);
        setInputJmlPenduduk(data.jml_penduduk);
        setInputJmlTps(data.jml_tps);
        setSuaraPeriodeLalu(data.suara_periode_lalu);
        // setPopUp(false);
      })
      .catch((error) => {
        // setHandelError(true);
        // setErrorMessage(error.response.data.message);
      });

    setDataTarget(data);
    setPopUp(true);
  };
  const idPeriode = useSelector((state) => state.panel.idPeriode);

  const updateTarget = async (id) => {
    let formData;
    let formDataDPTDPS;

    if (inputTarget && inputJmlPenduduk && inputJmlTps && suaraPeriodeLalu) {
      formData = {
        id_periode: idPeriode,
        id_kelurahan: id,
        target: inputTarget,
        suara_periode_lalu: suaraPeriodeLalu,
      };
      formDataDPTDPS = {
        id_periode: idPeriode,
        id_kelurahan: id,
        jml_penduduk: inputJmlPenduduk,
        jml_tps: inputJmlTps,
      };
    } else {
      alert("Isi Inputan Target, jumlah penduduk dan jumlah TPS");
    }

    await axiosFetch("post", `user/target`, formData, token)
      .then(() => {
        // alert("Update Target Berhasil");
        setPopUp(false);
      })
      .catch((error) => {
        // setHandelError(true);
        // setErrorMessage(error.response.data.message);
      });

    await axiosFetch("post", `user/dpt_dps/statistik`, formDataDPTDPS, token)
      .then(() => {
        // alert("Update Target Berhasil");
        setPopUp(false);
      })
      .catch((error) => {
        // setHandelError(true);
        // setErrorMessage(error.response.data.message);
      });

    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (router.query.id_kabupaten) {
      dispatch(setIdKabupaten({ id_kabupaten: router.query.id_kabupaten }));
    }

    axiosFetch(
      "get",
      `user/target/details?page=${1}&limit=50&id_kabupaten=${
        router.query.id_kabupaten ? router.query.id_kabupaten : id_kabupaten
      }`,
      {},
      token
    )
      .then((res) => setDetailTarget(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "Desa / Kelurahan",
      selector: (row) => row.name,
    },
    {
      name: "Kecamatan",
      selector: (row) => row.kecamatan.name,
    },
    // {
    //   name: "Jml DPT/DPS",
    //   selector: (row) => row.email,
    // },
    {
      name: "Simpatisan",
      selector: (row) => row.jumlah_simpatisans,
    },
    {
      name: "Target",
      selector: (row) => row.targets?.target,
    },
    {
      name: "Status",
      selector: (row) => (
        <ProgressBar
          progress={
            row.targets ? row.jumlah_simpatisans / row.targets.target : 0
          }
          bgcolor={"#FF5001"}
          height={"24px"}
        />
      ),
    },
    {
      name: "Edit",
      selector: (row) => row.aksi,
    },
  ];

  let data = detailTarget.data ? detailTarget.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              editTarget(res);
            }}
            src={EditIcon.src}
          />
        </div>
      );
    }
  }
  return (
    <>
      <div className="flex items-center">
        <Logo />
        <span className="ml-[50px] text-3xl font-bold">
          Detail Target Simpatisan Per Desa
        </span>
      </div>
      <hr />
      <div
        className="px-[40px] py-[10px]"
        onClick={() => {
          router.back();
          dispatch(
            setTabPanelRelawanDash({ tabPanelRelawanDash: "target_per_desa" })
          );
        }}
      >
        <Button
          title={"Kembali"}
          icon={<KembaliIcon />}
          text={"white"}
          w={"149px"}
          h={"53px"}
          bgColor={"rgb(51, 65, 85)"}
        />
      </div>
      <div className="px-[40px] py-[10px]">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
      {popUp && (
        <div className="w-full h-[200vh] absolute top-0">
          <div className="bg-black opacity-50 w-full h-[200vh] absolute top-0"></div>
          <div className="bg-white h-[550px] w-[500px] absolute top-[10%] left-[33%] p-7">
            <div className="flex justify-end cursor-pointer">
              <img
                onClick={() => {
                  setPopUp(false);
                }}
                src={CloseIcon.src}
              />
            </div>
            <h1>Target Simpatisan Per Desa</h1>
            <div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[100px]">Nama Desa</span>
                <span>{dataTarget.name}</span>
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[100px]">Kecamatan</span>
                <span>{dataTarget.kecamatan.name}</span>
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[100px]">Kabupaten</span>
                <span>{dataTarget.kecamatan.kabupaten.name}</span>
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[80px]">Jumlah Target</span>
                <input
                  className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                  type="number"
                  onChange={(e) => {
                    setInputTarget(e.target.value);
                  }}
                  value={inputTarget}
                />
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[53px]">Jumlah Penduduk</span>
                <input
                  className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                  type="number"
                  onChange={(e) => {
                    setInputJmlPenduduk(e.target.value);
                  }}
                  value={inputJmlPenduduk}
                />
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[100px]">Jumlah TPS</span>
                <input
                  className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                  type="number"
                  onChange={(e) => {
                    setInputJmlTps(e.target.value);
                  }}
                  value={inputJmlTps}
                />
              </div>
              <div className="flex items-center justify-start w-[400px] mt-[20px]">
                <span className="mr-[50px]">Suara Periode Lalu</span>
                <input
                  className="h-[40px] w-[50%] border text-[#374151] px-2 outline-0"
                  type="number"
                  onChange={(e) => {
                    setSuaraPeriodeLalu(e.target.value);
                  }}
                  value={suaraPeriodeLalu}
                />
              </div>
              <ButtonPrimary
                title={"Edit Target"}
                action={() => {
                  updateTarget(dataTarget._id);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(DetailTargetDesa);
