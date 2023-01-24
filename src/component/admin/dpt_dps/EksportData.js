import axios from "axios";
import React, { useEffect, useState } from "react";
import NewButton from "../../NewButton";

const EksportDataDpt = () => {
  const buttonStyle = {
    width: "196px",
    height: "48px",
    background: "#E44700",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "18px",
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: "20px",
  };

  const base_url = "https://api.sjpberkhidmat.id/";

  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kelurahan, setKelurahan] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    id_kabupaten: "",
    id_kecamatan: "",
    desa: "",
  });

  useEffect(() => {
    axios
      .get(base_url + "user/kabupaten")
      .then((res) => setKabupaten(res.data));
  }, []);

  const changeKabupaten = (idKabupaten, name) => {
    setFormData({ ...formData, id_kabupaten: idKabupaten, name: name });
    axios.get(base_url + `user/kecamatan/${idKabupaten}`).then((res) => {
      setKecamatan(res.data);
    }, []);
  };
  console.log(formData);

  return (
    // checkbox Kab / kota
    <div className="pt-[40px] pl-[60px] w-[980px]">
      <p className="text-[#374151] text-[32px] font-bold">
        Ekspor Data DPT / DPS
      </p>
      <div className="flex mt-[59px]">
        <p className="text-[16px] text-[#374151] font-semibold">
          Kabupaten /Kota
        </p>
        <div className="grid grid-rows-5 grid-flow-col-dense gap-4 ml-[42px]">
          {kabupaten.data?.map((res, i) => {
            return (
              <div key={i} className="flex gap-2 ml-[32px] items-center">
                <input
                  onClick={(e) =>
                    changeKabupaten(e.target.value, e.target.name)
                  }
                  type="checkbox"
                  id={res._id}
                  name={res.name}
                  value={res._id}
                  className="w-[30px] h-[30px] border-[#374151] outline-0 accent-[#FF5001]"
                />
                <label className="text-[#374151]" htmlFor="lobar">
                  {res.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-b-2 my-[42px]" />

      {/* ceheckbox kecamatan */}
      <div className="flex mt-[59px]">
        <p className="text-[16px] text-[#374151] w-[160px]  mr-[8px] font-semibold">
          {formData.name}
        </p>
        <div className="grid grid-rows-6 grid-flow-col-dense gap-4">
          {kecamatan.data?.map((res, i) => {
            return (
              <div key={i} className="flex gap-2 ml-[32px] items-center">
                <input
                  className="w-[30px] h-[30px] border-[#374151] outline-0 accent-[#FF5001]"
                  type="checkbox"
                  id="kabupaten"
                  name="kabupaten"
                  value="kabupaten"
                />
                <label className="text-[#374151]" htmlFor="kabupaten">
                  {res.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className=" border-b-2 my-[42px]" />

      {/* checkbox desa belum tampil */}
      <div className="flex">
        <p className="text-[16px] text-[#374151] w-[160px]  mr-[16px] font-semibold">
          desa
        </p>
        <div className="flex  gap-2 ml-[32px] items-center">
          <input
            className="w-[30px] h-[30px] border-[#374151] outline-0 accent-[#FF5001]"
            type="checkbox"
            id="kabupaten"
            name="kabupaten"
            value="kabupaten"
          />
          <label className="text-[#374151]" htmlFor="kabupaten">
            Semua Desa / Kelurahan
          </label>
        </div>
      </div>
      {/* input manual belum berfungsi */}
      <div className="flex mt-[59px] mb-[100px]">
        <p className="text-[16px] text-[#374151] w-[160px]  mr-[12px] font-semibold">
          Input Manual
        </p>
        <div className="">
          <div className="flex gap-2 ml-[32px] items-center">
            <label className="text-[#374151]" htmlFor="kabupaten"></label>
            <input
              className="w-[363px] h-[40px] px-2 border rounded-md border-[#374151] focus:border-[#E44700]  outline-0"
              type="type "
              id="kabupaten"
              name="kabupaten"
            />
          </div>
        </div>
      </div>
      {/* tombol submit belum berfungsi */}
      <NewButton title={"Impor Sekarang"} style={buttonStyle} />
    </div>
  );
};

export default EksportDataDpt;
