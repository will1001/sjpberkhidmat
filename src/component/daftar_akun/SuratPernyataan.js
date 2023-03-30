import React, { useEffect, useState } from "react";
import Logo from "../../utility/Logo";
import Moment from "moment";
import "moment/locale/id";
Moment.locale("id");

const SuratPernyataan = ({ close, nama, tanggalLahir, alamat, phone, tempat, mobile }) => {
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember"];
  const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const date = new Date();
  const [tanggal, setTanggal] = useState();
  function reformatDate(dateStr) {
    var dArr = dateStr.split("-"); // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/10"
  }
  useEffect(() => {
    if (tanggalLahir) {
      // const res = reformatDate(tanggalLahir);
      setTanggal(Moment(tanggalLahir).format("d-MM-yyyy"));
    }
  }, [tanggalLahir]);

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

  //   console.log(tanggal);
  return (
    <>
      {mobile === true ? (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152] z-50">
          <div className="flex justify-center px-[16px]">
            <div onClick={close} className="absolute top-0 right-0 px-2 font-semibold cursor-pointer">
              X
            </div>
            <div className="bg-white mt-[80px] w-full px-[21px] pb-[50px]">
              <div className="flex items-center justify-between border-b-2 mt-[21px] border-[#374151]">
                <Logo mobile={screenSize} />
                <p className="text-[#374151] text-[12px] font-semibold">
                  TIM PEMENANGAN PEMILU 2024 <br />
                  DPR RI H.SURYADI JAYA PURNAMA, ST{" "}
                </p>
              </div>
              <div className="border-b-[1px] mt-[1px] border-[#374151]" />
              <div className="flex justify-center mt-[28px]">
                <p className="text-[#374151] text-[14px] font-bold">SURAT PERNYATAAN</p>
              </div>
              <div className="text-[#374151] text-[12px]">
                <p className="mb-4">Bismillahirrahmaanirrahiim,</p>
                <p className="mb-2">Saya yang bertanda tangan di bawah ini :</p>
                <div className="flex gap-2 items-center mb-1">
                  <p className="w-[180px] flex justify-between">
                    Nama <span>:</span>
                  </p>
                  <p className="border-b-[1px] border-[#374151] w-full">{nama}</p>
                </div>
                <div className="flex gap-2 items-center mb-1">
                  <p className="w-[180px] flex justify-between">
                    Tempat Tanggal Lahir <span>:</span>
                  </p>
                  <p className="border-b-[1px] border-[#374151] w-full">
                    {tempat} {tanggal}
                  </p>
                </div>
                <div className="flex gap-2 items-center mb-1">
                  <p className="w-[180px] flex justify-between">
                    Alamat <span>:</span>
                  </p>
                  <p className="border-b-[1px] border-[#374151] w-full">{alamat}</p>
                </div>
                <div className="flex gap-2 items-center mb-1">
                  <p className="w-[180px] flex justify-between">
                    No. HP <span>:</span>
                  </p>
                  <p className="border-b-[1px] border-[#374151] w-full">{phone}</p>
                </div>
                <p className="mb-2 mt-4">Dengan kesadaran sendiri, menyatakan bersedia secara sukarela menjadi tim pemenangan H.Suryadi Jaya Purnama dalam pemilihan anggota DPR-RI pada pemilihan umum tahun 2024.</p>
                <p className="mb-4">Sebagai tindak lanjut atas pemyataan saya tersebut diatas, saya akan melakukan hal-hal sebagai berikut : </p>
                <p className="flex gap-1 mb-1">
                  <span>1.</span>Memilih H.Suryadi Jaya Purnama dalam pemilihan anggota DPR-RI pada pemilihan umum tahun 2024.
                </p>
                <p className="flex gap-1 mb-1">
                  <span>2.</span>Mengajak seluruh keluarga, tetangga dan kerabat, untuk ikut memillh H. Suryadi Jaya Purnama sesuai dengan kemampuan saya.
                </p>
                <p className="flex gap-1 mb-4">
                  <span>3.</span>Sekuat tenaga, aktif melaksanakan kegiatan pemenangan yang dilaksanakan secara bersama-sama dan atau sendiri-sendiri sesuai dengan program dan kegiatan tim pemenangan.
                </p>
                <p>Demikian pernyataan saya buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
                <div className="flex justify-end items-center mt-[38px]">
                  {namaHari[date.getDay()]} / {date.getDate()} / {monthNames[date.getMonth()]} / {date.getFullYear()}
                </div>
                <div className="flex justify-end items-center mt-[38px] gap-3 mb-1">
                  <p className="">TTD</p>
                  {nama}
                </div>
                {/* <p className="flex justify-end border-t-[1px] border-[#374151]">{nama}</p> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 left-0 bg-[#374151] w-screen h-[1400px] bg-opacity-30">
          <div className="absolute left-[350px] top-0 bg-white w-[650px] pb-[50px] px-[53px] pt-[43px] mt-[45px] rounded-sm shadow-lg">
            <div onClick={close} className="absolute top-0 right-0 px-2 font-semibold cursor-pointer">
              X
            </div>
            <div className="flex items-center justify-between border-b-2 border-[#374151]">
              <Logo />
              <p className="text-[#374151] text-[18px] font-semibold">
                TIM PEMENANGAN PEMILU 2024 <br />
                DPR RI H.SURYADI JAYA PURNAMA, ST{" "}
              </p>
            </div>
            <div className="border-b-[1px] mt-[1px] border-[#374151]" />
            <div className="flex justify-center mt-[28px]">
              <p className="text-[#374151] text-[14px] font-bold">SURAT PERNYATAAN</p>
            </div>
            <div className="text-[#374151] text-[12px]">
              <p className="mb-4">Bismillahirrahmaanirrahiim,</p>
              <p className="mb-2">Saya yang bertanda tangan di bawah ini :</p>
              <div className="flex gap-2 items-center mb-1">
                <p className="w-[180px] flex justify-between">
                  Nama <span>:</span>
                </p>
                <p className="border-b-[1px] border-[#374151] w-full">{nama}</p>
              </div>
              <div className="flex gap-2 items-center mb-1">
                <p className="w-[180px] flex justify-between">
                  Tempat Tanggal Lahir <span>:</span>
                </p>
                <p className="border-b-[1px] border-[#374151] w-full">
                  {tempat} {tanggal}
                </p>
              </div>
              <div className="flex gap-2 items-center mb-1">
                <p className="w-[180px] flex justify-between">
                  Alamat <span>:</span>
                </p>
                <p className="border-b-[1px] border-[#374151] w-full">{alamat}</p>
              </div>
              <div className="flex gap-2 items-center mb-1">
                <p className="w-[180px] flex justify-between">
                  No. HP <span>:</span>
                </p>
                <p className="border-b-[1px] border-[#374151] w-full">{phone}</p>
              </div>
              <p className="mb-2 mt-4">Dengan kesadaran sendiri, menyatakan bersedia secara sukarela menjadi tim pemenangan H.Suryadi Jaya Purnama dalam pemilihan anggota DPR-RI pada pemilihan umum tahun 2024.</p>
              <p className="mb-4">Sebagai tindak lanjut atas pemyataan saya tersebut diatas, saya akan melakukan hal-hal sebagai berikut : </p>
              <p className="flex gap-1 mb-1">
                <span>1.</span>Memilih H.Suryadi Jaya Purnama dalam pemilihan anggota DPR-RI pada pemilihan umum tahun 2024.
              </p>
              <p className="flex gap-1 mb-1">
                <span>2.</span>Mengajak seluruh keluarga, tetangga dan kerabat, untuk ikut memillh H. Suryadi Jaya Purnama sesuai dengan kemampuan saya.
              </p>
              <p className="flex gap-1 mb-4">
                <span>3.</span>Sekuat tenaga, aktif melaksanakan kegiatan pemenangan yang dilaksanakan secara bersama-sama dan atau sendiri-sendiri sesuai dengan program dan kegiatan tim pemenangan.
              </p>
              <p>Demikian pernyataan saya buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
              <div className="flex justify-end items-center mt-[38px]">
                {namaHari[date.getDay()]} / {date.getDate()} / {monthNames[date.getMonth()]} / {date.getFullYear()}
              </div>
              <div className="flex justify-end items-center mt-[38px] pr-[110px] mb-1">
                <p className="">TTD</p>
              </div>
              <p className="flex ml-[410px] border-t-[1px] border-[#374151]">{nama}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuratPernyataan;
