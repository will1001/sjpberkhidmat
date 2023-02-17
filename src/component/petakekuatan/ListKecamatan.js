import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosFetch from "../../API/axiosFetch";
import relawan from "../../utility/peta/relawan.png";
import logistik from "../../utility/peta/logistik.png";
import simpatisan from "../../utility/peta/simpatisan.png";
import program from "../../utility/peta/program.png";
import targetSuara from "../../utility/peta/target_suara.png";
import suaraPeriodeLalu from "../../utility/peta/suara_periode_lalu.png";
import TPS from "../../utility/peta/TPS.png";
import DPTDPS from "../../utility/peta/DPT_DPS.png";

const ListKecamatan = ({ id, icon, setHover, kabupaten }) => {
  const [lombokBarat, setLombokBarat] = useState();
  const [selectIcon, setSelectIcon] = useState();
  if (id !== undefined) {
    useEffect(() => {
      axiosFetch("get", `user/kecamatan/${id}`)
        .then((res) => setLombokBarat(res))
        .catch((err) => console.log(err));
    }, [id]);
  }

  useEffect(() => {
    icon === "Jumlah Relawan" && setSelectIcon(relawan);
    icon === "Target Suara" && setSelectIcon(targetSuara);
    icon === "Suara Periode Lalu" && setSelectIcon(suaraPeriodeLalu);
    icon === "Jumlah TPS" && setSelectIcon(TPS);
    icon === "Jumlah DPT/DPS" && setSelectIcon(DPTDPS);
    icon === "Jumlah Simpatisan" && setSelectIcon(simpatisan);
    icon === "Logistik" && setSelectIcon(logistik);
    icon === "Program" && setSelectIcon(program);
    icon === undefined && setSelectIcon();
  }, [icon]);

  const hoverhandler = (nama) => {
    setHover(nama);
  };

  return (
    <>
      {kabupaten === "lombok barat" && (
        <>
          {/* kab lombok barat */}
          <div className="text-[#374151]">
            <div className="fixed left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
              <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Barat</p>
            </div>
            {/* Batu Layar */}
            <div onMouseEnter={() => hoverhandler("Batu Layar")} onMouseLeave={() => hoverhandler()} className="fixed top-[60px] left-[700px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Batu Layar</p>
                </div>
              </div>
            </div>
            {/* Gunung Sari */}
            <div onMouseEnter={() => hoverhandler("Gunung Sari")} onMouseLeave={() => hoverhandler()} className="fixed top-[65px] left-[880px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Gunung Sari</p>
                </div>
              </div>
            </div>
            {/* Lingsar */}
            <div onMouseEnter={() => hoverhandler("Lingsar")} onMouseLeave={() => hoverhandler()} className="fixed top-[150px] left-[940px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Lingsar</p>
                </div>
              </div>
            </div>
            {/* Narmada */}
            <div onMouseEnter={() => hoverhandler("Narmada")} onMouseLeave={() => hoverhandler()} className="fixed top-[150px] left-[1100px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Narmada</p>
                </div>
              </div>
            </div>
            {/* Labu Api */}
            <div onMouseEnter={() => hoverhandler("Labu Api")} onMouseLeave={() => hoverhandler()} className="fixed top-[250px] left-[780px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Labu Api</p>
                </div>
              </div>
            </div>
            {/* Kediri */}
            <div onMouseEnter={() => hoverhandler("Kediri")} onMouseLeave={() => hoverhandler()} className="fixed top-[260px] left-[960px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Kediri</p>
                </div>
              </div>
            </div>
            {/* Kuripan */}
            <div onMouseEnter={() => hoverhandler("Kuripan")} onMouseLeave={() => hoverhandler()} className="fixed top-[350px] left-[980px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Kuripan</p>
                </div>
              </div>
            </div>
            {/* Gerung */}
            <div onMouseEnter={() => hoverhandler("Gerung")} onMouseLeave={() => hoverhandler()} className="fixed top-[340px] left-[780px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Gerung</p>
                </div>
              </div>
            </div>
            {/* Lembar */}
            <div onMouseEnter={() => hoverhandler("Lembar")} onMouseLeave={() => hoverhandler()} className="fixed top-[440px] left-[900px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Lembar</p>
                </div>
              </div>
            </div>
            {/* Sekotong */}
            <div onMouseEnter={() => hoverhandler("Sekotong")} onMouseLeave={() => hoverhandler()} className="fixed top-[460px] left-[600px]">
              <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
                {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
                <div className="">
                  {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                  <p className="font-medium">Kec. Sekotong</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {kabupaten === "lombok utara" && (
        <div className="text-[#374151]">
          <div className="fixed left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Utara</p>
          </div>
          {/* Pemenang */}
          <div onMouseEnter={() => hoverhandler("Pemenang")} onMouseLeave={() => hoverhandler()} className="fixed top-[400px] left-[580px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Pemenang</p>
              </div>
            </div>
          </div>
          {/* Tanjung */}
          <div onMouseEnter={() => hoverhandler("Tanjung")} onMouseLeave={() => hoverhandler()} className="fixed top-[420px] left-[760px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Tanjung</p>
              </div>
            </div>
          </div>
          {/* Gangga */}
          <div onMouseEnter={() => hoverhandler("Gangga")} onMouseLeave={() => hoverhandler()} className="fixed top-[320px] left-[860px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Gangga</p>
              </div>
            </div>
          </div>
          {/* Kayangan */}
          <div onMouseEnter={() => hoverhandler("Kayangan")} onMouseLeave={() => hoverhandler()} className="fixed top-[220px] left-[960px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Kayangan</p>
              </div>
            </div>
          </div>
          {/* Bayan */}
          <div onMouseEnter={() => hoverhandler("Bayan")} onMouseLeave={() => hoverhandler()} className="fixed top-[320px] left-[1100px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Bayan</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {kabupaten === "lombok tengah" && (
        <div className="text-[#374151] fixed">
          <div className="fixed bg-white left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Tengah</p>
          </div>
          {/* Batukliang Utara */}
          <div onMouseEnter={() => hoverhandler("Batukliang Utara")} onMouseLeave={() => hoverhandler()} className="fixed top-[80px] left-[880px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Batukliang Utara</p>
              </div>
            </div>
          </div>
          {/* Kopang */}
          <div onMouseEnter={() => hoverhandler("Kopang")} onMouseLeave={() => hoverhandler()} className="fixed top-[250px] left-[1030px]">
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Kopang</p>
              </div>
            </div>
          </div>
          {/* Batukliang */}
          <div onMouseEnter={() => hoverhandler("Batukliang")} onMouseLeave={() => hoverhandler()} className="fixed top-[190px] left-[850px] bg-white shadow-md border-[#FFCFB9] border rounded-md p-2">
            <div className={`cursor-pointer items-center flex ${icon === undefined && "justify-center"} `}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Batukliang</p>
              </div>
            </div>
          </div>
          {/* Pringgarata */}
          <div
            onMouseEnter={() => hoverhandler("Pringgarata")}
            onMouseLeave={() => hoverhandler()}
            className={` fixed top-[220px] ${icon === undefined ? "left-[700px]" : "left-[660px]"}  bg-white shadow-md border-[#FFCFB9] border rounded-md p-2`}
          >
            <div className={`cursor-pointer items-center flex ${icon === undefined && "justify-center"} `}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Pringgarata</p>
              </div>
            </div>
          </div>
          {/* Praya */}
          <div onMouseEnter={() => hoverhandler("Praya")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[270px] left-[900px]" : "top-[280px] left-[860px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Praya</p>
              </div>
            </div>
          </div>
          {/* Jonggat */}
          <div onMouseEnter={() => hoverhandler("Jonggat")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[280px] left-[750px]" : "top-[310px] left-[700px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Jonggat</p>
              </div>
            </div>
          </div>
          {/* Janapria */}
          <div onMouseEnter={() => hoverhandler("Janapria")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[320px] left-[1050px]" : "top-[340px] left-[1050px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Janapria</p>
              </div>
            </div>
          </div>
          {/* Praya Timur */}
          <div onMouseEnter={() => hoverhandler("Praya Timur")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[420px] left-[1050px]" : "top-[430px] left-[1050px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Praya Timur</p>
              </div>
            </div>
          </div>
          {/* Praya Tengah */}
          <div onMouseEnter={() => hoverhandler("Praya Tengah")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[370px] left-[960px]" : "top-[370px] left-[860px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Praya Tengah</p>
              </div>
            </div>
          </div>
          {/* Pujut */}
          <div onMouseEnter={() => hoverhandler("Pujut")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[470px] left-[900px]" : "top-[470px] left-[890px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Pujut</p>
              </div>
            </div>
          </div>
          {/* Praya Barat */}
          <div onMouseEnter={() => hoverhandler("Praya Barat")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[480px] left-[700px]" : "top-[500px] left-[700px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Praya Barat </p>
              </div>
            </div>
          </div>
          {/* Praya Barat Daya */}
          <div onMouseEnter={() => hoverhandler("Praya Barat Daya")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[370px] left-[670px]" : "top-[400px] left-[640px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Praya Barat Daya </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {kabupaten === "lombok timur" && (
        <div className="text-[#374151] fixed">
          <div className="fixed bg-white left-[750px] flex gap-2 mt-2 border-2 text-[#374151] py-2 px-4 rounded-full">
            <p>{icon !== undefined ? `${icon}:` : "Peta Kekuatan:"}</p> <p className="font-semibold">Kab. Lombok Timur</p>
          </div>
          {/* Sambelia */}
          <div onMouseEnter={() => hoverhandler("Sambelia")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[80px] left-[1000px]" : "top-[80px] left-[1000px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sambelia</p>
              </div>
            </div>
          </div>
          {/* Suralaga */}
          <div onMouseEnter={() => hoverhandler("Suralaga")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[320px] left-[920px]" : "top-[430px] left-[1080px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Suralaga</p>
              </div>
            </div>
          </div>
          {/* Sembalun */}
          <div onMouseEnter={() => hoverhandler("Sembalun")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[80px] left-[780px]" : "top-[80px] left-[780px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sembalun</p>
              </div>
            </div>
          </div>
          {/* Pringgabaya */}
          <div onMouseEnter={() => hoverhandler("Pringgabaya")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[160px] left-[1000px]" : "top-[170px] left-[1040px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Pringgabaya</p>
              </div>
            </div>
          </div>
          {/* Suela */}
          <div onMouseEnter={() => hoverhandler("Suela")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[160px] left-[900px]" : "top-[170px] left-[880px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Suela</p>
              </div>
            </div>
          </div>
          {/* Wanasaba */}
          <div onMouseEnter={() => hoverhandler("Wanasaba")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[220px] left-[910px]" : "top-[255px] left-[1050px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Wanasaba</p>
              </div>
            </div>
          </div>
          {/* Aikmel */}
          <div onMouseEnter={() => hoverhandler("Aikmel")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[180px] left-[760px]" : "top-[165px] left-[720px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Aikmel</p>
              </div>
            </div>
          </div>
          {/* Pringgasela */}
          <div onMouseEnter={() => hoverhandler("Pringgasela")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[230px] left-[700px]" : "top-[170px] left-[540px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Pringgasela</p>
              </div>
            </div>
          </div>
          {/* Sikur */}
          <div onMouseEnter={() => hoverhandler("Sikur")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[280px] left-[710px]" : "top-[250px] left-[720px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sikur</p>
              </div>
            </div>
          </div>
          {/* Montong Gading */}
          <div onMouseEnter={() => hoverhandler("Montong Gading")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[325px] left-[590px]" : "top-[255px] left-[500px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Montong Gading</p>
              </div>
            </div>
          </div>
          {/* Lenek */}
          <div onMouseEnter={() => hoverhandler("Lenek")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[270px] left-[890px]" : "top-[255px] left-[890px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Lenek</p>
              </div>
            </div>
          </div>
          {/* Masbagik */}
          <div onMouseEnter={() => hoverhandler("Masbagik")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[325px] left-[770px]" : "top-[340px] left-[630px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Masbagik</p>
              </div>
            </div>
          </div>
          {/* Terara */}
          <div onMouseEnter={() => hoverhandler("Terara")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[370px] left-[670px]" : "top-[340px] left-[470px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Terara</p>
              </div>
            </div>
          </div>
          {/* Labuhan Haji */}
          <div onMouseEnter={() => hoverhandler("Labuhan Haji")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[370px] left-[970px]" : "top-[340px] left-[1150px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Labuhan Haji</p>
              </div>
            </div>
          </div>
          {/* Selong */}
          <div onMouseEnter={() => hoverhandler("Selong")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[410px] left-[860px]" : "top-[340px] left-[980px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Selong</p>
              </div>
            </div>
          </div>
          {/* Sukamulia */}
          <div onMouseEnter={() => hoverhandler("Sukamulia")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[367px] left-[800px]" : "top-[340px] left-[800px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sukamulia</p>
              </div>
            </div>
          </div>
          {/* Sakra */}
          <div onMouseEnter={() => hoverhandler("Sakra")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[500px] left-[870px]" : "top-[425px] left-[730px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sakra</p>
              </div>
            </div>
          </div>
          {/* Sakra Timur*/}
          <div onMouseEnter={() => hoverhandler("Sakra Timur")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[455px] left-[890px]" : "top-[425px] left-[890px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sakra Timur</p>
              </div>
            </div>
          </div>
          {/* Sakra Barat */}
          <div onMouseEnter={() => hoverhandler("Sakra Barat")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[440px] left-[700px]" : "top-[425px] left-[550px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Sakra Barat</p>
              </div>
            </div>
          </div>
          {/* Keruak */}
          <div onMouseEnter={() => hoverhandler("Keruak")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[485px] left-[740px]" : "top-[510px] left-[720px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Keruak</p>
              </div>
            </div>
          </div>
          {/* Jerowaru */}
          <div onMouseEnter={() => hoverhandler("Jerowaru")} onMouseLeave={() => hoverhandler()} className={`fixed ${icon === undefined ? "top-[550px] left-[790px]" : "top-[550px] left-[890px]"} `}>
            <div className={`border p-2 cursor-pointer items-center mb-2 bg-white shadow-md border-[#FFCFB9] flex ${icon === undefined && "justify-center"} p-2 rounded-md`}>
              {selectIcon !== undefined && <img className="mr-3" src={selectIcon.src} alt={icon} />}
              <div className="">
                {icon !== undefined && <p className="text-[#FF5001] font-bold text-[26px]">123.123</p>}
                <p className="font-medium">Kec. Jerowaru</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListKecamatan;
