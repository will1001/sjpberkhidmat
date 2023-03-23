import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosFetch from "../API/axiosFetch";
import useFetch from "../API/useFetch";

const InputDataRealCount = ({
  formInput,
  setFormInput,
  suaraCalon,
  setSuaraCalon,
  mobile,
}) => {
  const getKabupaten = useFetch("get", "user/kabupaten");
  const calon = useFetch("get", "user/real_count/calon");
  // const suaraCalonRecent = useFetch(
  //   "get",
  //   `user/real_count/plano/suara_calon?id_plano=${formInput.id_plano}`
  // );
  const token = useSelector((state) => state.user.token);

  const [kelurahan, setKelurahan] = useState();
  const [kecamatan, setKecamatan] = useState();
  const [suaraCalonRecent, setSuaraCalonRecent] = useState([
    {
      jml_suara: 1,
    },
    {
      jml_suara: 2,
    },
    {
      jml_suara: 3,
    },
  ]);
  useEffect(() => {
    if (formInput.id_kabupaten !== undefined) {
      const res = axiosFetch("get", `user/kecamatan/${formInput.id_kabupaten}`)
        .then((res) => setKecamatan(res.data))
        .catch((err) => console.log(err));
    }
  }, [formInput.id_kabupaten]);
  useEffect(() => {
    if (formInput.id_kecamatan !== undefined) {
      const res = axiosFetch("get", `user/kelurahan/${formInput.id_kecamatan}`)
        .then((res) => setKelurahan(res.data))
        .catch((err) => console.log(err));
    }
    axiosFetch(
      "get",
      `user/real_count/plano/suara_calon?id_plano=${formInput.id_plano}`,
      {},
      token
    )
      .then((res) => {
        setSuaraCalon(res.data.data);
        // setSuaraCalonRecent(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [formInput.id_kecamatan]);

  //   console.log(formInput);
  return (
    <div className="text-[#374151]">
      <p className="text-[21px] font-bold mb-3">Input Data Real Count</p>
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="nomor_tps">
            Nomor TPS
          </label>
          <input
            value={formInput.no_tps}
            onChange={(e) =>
              setFormInput({ ...formInput, no_tps: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="nomor_tps"
            type={"number"}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="kab_kota">
            Kabupaten / Kota
          </label>
          <select
            value={formInput.id_kabupaten}
            onChange={(e) => {
              setFormInput({ ...formInput, id_kabupaten: e.target.value });
            }}
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="kab_kota"
          >
            <option selected="disable">Pilih Kabupaten</option>
            {getKabupaten.data !== null &&
              getKabupaten?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="kecamatan">
            kecamatan
          </label>
          <select
            onChange={(e) =>
              setFormInput({ ...formInput, id_kecamatan: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="kecamatan"
            value={formInput.id_kecamatan}
          >
            <option selected="disable">Pilih Kecamatan</option>
            {kecamatan !== undefined &&
              kecamatan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="kelurahan">
            Kelurahan
          </label>
          <select
            onChange={(e) =>
              setFormInput({ ...formInput, id_kelurahan: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="kelurahan"
            value={formInput.id_kelurahan}
          >
            <option selected="disable">Pilih Desa / Kelurahan</option>
            {kelurahan !== undefined &&
              kelurahan?.data?.map((res) => (
                <option key={res._id} value={res._id}>
                  {res.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="jumlah_DPT">
            Jumlah Pemilih dalam DPT
          </label>
          <input
            onChange={(e) =>
              setFormInput({ ...formInput, jml_pemilih_dpt: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="jumlah_DPT"
            type={"number"}
            value={formInput.jml_pemilih_dpt}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="jumlah_DPTb">
            Jumlah Pemilih dalam DPTb
          </label>
          <input
            onChange={(e) =>
              setFormInput({ ...formInput, jml_pemilih_dptb: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="jumlah_DPTb"
            type={"number"}
            value={formInput.jml_pemilih_dptb}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="jumlah_DPK">
            Jumlah Pemilih dalam DPK
          </label>
          <input
            onChange={(e) =>
              setFormInput({ ...formInput, jml_pemilih_dpk: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="jumlah_DPK"
            type={"number"}
            value={formInput.jml_pemilih_dpk}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="suara_sah">
            Surat Suara Sah
          </label>
          <input
            onChange={(e) =>
              setFormInput({ ...formInput, surat_suara_sah: e.target.value })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="suara_sah"
            type={"number"}
            value={formInput.surat_suara_sah}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="w-full" htmlFor="suara_tidak">
            Surat Suara Tidak Sah
          </label>
          <input
            onChange={(e) =>
              setFormInput({
                ...formInput,
                surat_suara_tidak_sah: e.target.value,
              })
            }
            className="border outline-none w-full text-[14px] rounded-sm px-2 h-[40px]"
            id="suara_tidak"
            type={"number"}
            value={formInput.surat_suara_tidak_sah}
          />
        </div>
        <div className="flex justify-between  items-center mt-12 mb-2 font-medium text-[#9CA3AF]">
          <p className="w-full">NAMA CALON</p>
          <div className="w-full">
            <p className="pl-[100px]">JUMLAH SUARA</p>
          </div>
        </div>
        {calon.data !== null &&
          calon?.data?.map((res, ind) => (
            <div
              className={`${
                mobile === true
                  ? "mb-2"
                  : "flex justify-between items-center mb-2"
              } `}
              key={res._id}
            >
              <div htmlFor={res._id} className="flex items-center gap-3">
                <img
                  className="h-[57px] w-[47px]"
                  src={process.env.NEXT_PUBLIC_BASE_URL_IMAGE + res.logo}
                  alt={res.name}
                />
                <div>
                  <p className="font-bold">{res.name}</p>
                  <p className="text-[14px] text-[#9CA3AF]">{res.id_partai}</p>
                </div>
              </div>

              <input
                onChange={(e) => {
                  // console.log(suaraCalonRecent);
                  console.log(suaraCalonRecent[ind]);
                  const temp = [...suaraCalon];
                  temp[ind] = {
                    id_calon: res._id,
                    id_plano: formInput.id_plano,
                    jml_suara: e.target.value,
                  };
                  setSuaraCalon(temp);
                  // const newitems = [...suaraCalonRecent];
                  // newitems[ind] = e.target.value;
                  // setSuaraCalonRecent(newitems);
                }}
                className={`${
                  mobile === true
                    ? "border outline-none w-full text-[14px] rounded-sm px-2 h-[40px] mt-2"
                    : "border outline-none w-[195px] text-[14px] rounded-sm px-2 h-[40px]"
                } `}
                id={res._id}
                type={"number"}
                value={suaraCalon.length === 0 ? 0 : suaraCalon[ind].jml_suara}
                // value={suaraCalonRecent}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default InputDataRealCount;
