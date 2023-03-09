import React, { useState } from "react";
import Logo from "../../src/utility/Logo";
import alert from "../../src/utility/img/alert_plano.png";
import { SubmitIcon } from "../../src/utility/icon/icon";
import { useRouter } from "next/router";
import InputDataRealCount from "../../src/component/InputDataRealCount";
import { useEffect } from "react";
import axiosFetch from "../../src/API/axiosFetch";
import { useSelector } from "react-redux";
import berhasilImg from "../../src/utility/img/berhasiPost.png";

const InputData = () => {
  const router = useRouter();
  const getToken = useSelector((state) => state.user.token);
  const [berhasil, setBerhasil] = useState(false);
  const [formInput, setFormInput] = useState({
    image: undefined,
    id_plano: undefined,
    id_kabupaten: undefined,
    id_kecamatan: undefined,
    id_kelurahan: undefined,
    no_tps: undefined,
    jml_pemilih_dpt: undefined,
    jml_pemilih_dptb: undefined,
    jml_pemilih_dpk: undefined,
    surat_suara_sah: undefined,
    surat_suara_tidak_sah: undefined,
  });
  const [suaraCalon, setSuaraCalon] = useState([]);
  const roles = useSelector((state) => state.user.roles);

  useEffect(() => {
    router.query.plano &&
      setFormInput({ ...formInput, image: router.query.plano });
  }, [router.query.plano]);
  useEffect(() => {
    router.query.id &&
      setFormInput({ ...formInput, id_plano: router.query.id });
  }, [router.query.id]);

  useEffect(() => {
    suaraCalon.jml_suara !== undefined &&
      suaraCalon.jml_suara.length !== 0 &&
      axiosFetch(
        "post",
        `user/real_count/plano/suara_calon`,
        {
          id_calon: suaraCalon.id_calon,
          id_plano: suaraCalon.id_plano,
          jml_suara: suaraCalon.jml_suara,
        },
        getToken
      );
    axiosFetch(
      "get",
      `user/real_count/plano/detail?id_plano=${router.query.id}`,
      {},
      getToken
    ).then((res) => {
      const {
        id_plano,
        id_kabupaten,
        id_kecamatan,
        id_kelurahan,
        no_tps,
        jml_pemilih_dpt,
        jml_pemilih_dptb,
        jml_pemilih_dpk,
        surat_suara_sah,
        surat_suara_tidak_sah,
      } = res.data?.data[0];
      // console.log(res.data?.data[0]);
      setFormInput({
        id_plano,
        id_kabupaten,
        id_kecamatan,
        id_kelurahan,
        no_tps,
        jml_pemilih_dpt,
        jml_pemilih_dptb,
        jml_pemilih_dpk,
        surat_suara_sah,
        surat_suara_tidak_sah,
      });
      // window.location.reload(false);
    });
  }, [suaraCalon]);

  const postPlano = async () => {
    const a = new FormData();
    // a.append("image", formInput.image);
    a.append("id_plano", formInput.id_plano);
    a.append("id_kabupaten", formInput.id_kabupaten);
    a.append("id_kecamatan", formInput.id_kecamatan);
    a.append("id_kelurahan", formInput.id_kelurahan);
    a.append("no_tps", formInput.no_tps);
    a.append("jml_pemilih_dpt", formInput.jml_pemilih_dpt);
    a.append("jml_pemilih_dptb", formInput.jml_pemilih_dptb);
    a.append("jml_pemilih_dpk", formInput.jml_pemilih_dpk);
    a.append("surat_suara_sah", formInput.surat_suara_sah);
    a.append("surat_suara_tidak_sah", formInput.surat_suara_tidak_sah);

    {
      await axiosFetch("post", `user/real_count/plano/detail`, a, getToken)
        .then((res) => {
          console.log(res);
          setBerhasil(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(suaraCalon);
  return (
    <>
      <div
        style={{ visibility: berhasil === true ? "visible" : "hidden" }}
        className="fixed top-0 left-0 bg-[#37415152] w-screen h-screen z-50"
      >
        <div className="bg-white absolute text-[#374151] flex flex-col items-center p-16 left-[450px] top-[100px]">
          <div
            onClick={() => setBerhasil(false)}
            className="absolute top-0 right-0 pr-2 font-medium text-[18px] cursor-pointer"
          >
            X
          </div>
          <img src={berhasilImg.src} alt="berhasil" />
          <p className="text-[32px] mx-3 font-bold">Submit Berhasil!</p>
          <p className="text-[18px] mb-3">
            Data masuk dan menunggu verifikasi admin
          </p>
          <div
            onClick={() => router.back()}
            className="bg-[#E44700] text-white font-medium px-16 rounded-md py-2 cursor-pointer"
          >
            Ok
          </div>
        </div>
      </div>
      <div className="fixed bg-white w-screen px-8 py-2 border-b-2 z-20">
        <div className="flex justify-between items-center gap-12">
          <Logo />
          {roles === "relawan" && (
            <div className="flex items-center ">
              <img className="" src={alert.src} />
            </div>  
          )}

          <div className="flex gap-3">
            <div
              onClick={postPlano}
              className="flex bg-[#E44700] stroke-white py-2 px-4 gap-3 items-center rounded-sm cursor-pointer"
            >
              <SubmitIcon />{" "}
              <p className="text-white font-semibold">
                {roles === "relawan" ? "Submit" : "Verifikasi"}
              </p>
            </div>
            <div className="py-2 px-4 border rounded-sm border-[#374151] text-[#374151] font-semibold cursor-pointer">
              Lanjutkan Nanti
            </div>
          </div>
        </div>
      </div>

      <div className="text-[#374151] py-6  ">
        <div className="flex mt-[80px] h-screen">
          <div className=" basis-1/2 px-[50px] py-[20px] sticky min-h-screen overflow-scroll  scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
            {router.query.plano && (
              <img
                className="h-screen w-screen"
                src={
                  process.env.NEXT_PUBLIC_BASE_URL_IMAGE + router.query.plano
                }
              />
            )}
          </div>
          <div className="basis-1/2 px-[50px] py-[20px] overflow-scroll scrollbar-thin scrollbar-thumb-[#9CA3AF] scrollbar-track-[#E5E7EB]">
            <InputDataRealCount
              suaraCalon={setSuaraCalon}
              setSuaraCalon={setSuaraCalon}
              formInput={{ ...formInput }}
              setFormInput={setFormInput}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputData;
