import React, { useEffect } from "react";
import { APKIcon, DeletIcon, SearchIcon, UbahIcon } from "../utility/icon/icon";
import { useState } from "react";
import useFetch from "../API/useFetch";
import axiosFetch from "../API/axiosFetch";
import { useSelector } from "react-redux";
import success from "../utility/img/berhasiPost.png";
import deleteData from "../utility/img/hapusData.png";
import Pagination from "./Pagination";

const APK = () => {
  const [popupTambah, setPopupTambah] = useState(false);
  const [popupBerhasil, setPopupBerhasil] = useState(false);
  const [popupDelete, setPopupDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState(false);
  const token = useSelector((state) => state.user.token);
  const periode = useSelector((state) => state.panel.idPeriode);
  const relawan = useFetch("get", "user/relawan?page=1&limit=100");
  const [idAPK, setIdAPK] = useState();
  const [data, setData] = useState();
  const [formAPK, setFormAPK] = useState({
    id_periode: periode,
  });
  const postAPK = () =>
    axiosFetch("post", "user/apk", formAPK, token)
      .then((res) => {
        setPopupTambah(false);
        setPopupBerhasil(true);
        setFormAPK({
          id_periode: periode,
        });
      })
      .catch((err) => console.log(err));

  const deleteAPK = (id) =>
    axiosFetch("delete", `user/apk/${id}`, {}, token)
      .then((res) => {
        setIdAPK();
        setPopupDelete(false);
      })
      .catch((err) => console.log(err));
  const editAPK = (id) =>
    axiosFetch("put", `user/apk/${id}`, formAPK, token)
      .then((res) => {
        setIdAPK();
        setPopupTambah(false);
        setFormAPK({ id_periode: periode });
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    const res = axiosFetch("get", `user/apk?page=${currentPage}`, {}, token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(res));
  }, [popupBerhasil, popupDelete, popupTambah, currentPage]);
  console.log(data);
  return (
    <>
      {popupDelete === true && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152]">
          <div className="flex justify-center mt-[80px]">
            <div className="bg-white">
              <div onClick={() => setPopupDelete(false)} className="flex justify-end pr-2 font-medium text-[#9CA3AF] cursor-pointer">
                x
              </div>
              <div className="pl-[50px] pr-[81px] pb-[50px] flex flex-col gap-3 items-center">
                <div>
                  <img src={deleteData.src} />
                </div>
                <p className="text-[32px] text-[#374151] font-bold">Hapus Data ?</p>
                <p className="text-[#374151]">Anda akan menghapus data APK </p>
                <div className="flex gap-3">
                  {" "}
                  <div onClick={() => setPopupDelete(false)} className="w-[184px] bg-[#E44700] text-white font-medium cursor-pointer py-1 rounded-sm text-center">
                    Batalkan
                  </div>
                  <div onClick={() => deleteAPK(idAPK)} className="border cursor-pointer px-4 text-[#374151] py-1 font-medium">
                    Hapus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {popupBerhasil === true && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152]">
          <div className="flex justify-center mt-[80px]">
            <div className="bg-white">
              <div onClick={() => setPopupBerhasil(false)} className="flex justify-end pr-2 font-medium text-[#9CA3AF] cursor-pointer">
                x
              </div>
              <div className="pl-[50px] pr-[81px] pb-[50px] flex flex-col gap-3 items-center">
                <div>
                  <img src={success.src} />
                </div>
                <p className="text-[32px] text-[#374151] font-bold">Berhasil Input Data</p>
                <p className="text-[#374151]">Data APK telah berhasil ditambahkan</p>
                <div onClick={() => setPopupBerhasil(false)} className="w-[184px] bg-[#E44700] text-white font-medium cursor-pointer py-1 rounded-sm text-center">
                  Ok
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {popupTambah === true && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#37415152]">
          <div className="flex justify-center mt-[80px]">
            <div className="bg-white">
              <div onClick={() => setPopupTambah(false)} className="flex justify-end pr-2 font-medium text-[#9CA3AF] cursor-pointer">
                x
              </div>
              <div className="pl-[50px] pr-[81px] pb-[50px]">
                <p className="text-[32px] text-[#374151] font-bold">Tambah Data Alat Peraga Kampanye</p>
                <div className="flex justify-between items-center text-[#374151] ">
                  <p>Nama APK</p>
                  <input value={formAPK.nama} onChange={(e) => setFormAPK({ ...formAPK, nama: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="text" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Tgl Masuk</p>
                  <input value={formAPK.tgl_masuk} onChange={(e) => setFormAPK({ ...formAPK, tgl_masuk: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="date" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Tgl Keluar</p>
                  <input value={formAPK.tgl_keluar} onChange={(e) => setFormAPK({ ...formAPK, tgl_keluar: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="date" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Jumlah APK Masuk</p>
                  <input value={formAPK.jml_masuk} onChange={(e) => setFormAPK({ ...formAPK, jml_masuk: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="number" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Jumlah APK Keluar</p>
                  <input value={formAPK.jml_keluar} onChange={(e) => setFormAPK({ ...formAPK, jml_keluar: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="number" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Tujuan Distribusi</p>
                  <input value={formAPK.tujuan} onChange={(e) => setFormAPK({ ...formAPK, tujuan: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="text" />
                </div>
                <div className="flex justify-between items-center text-[#374151] mt-3">
                  <p>Penanggung Jawab</p>
                  <select value={formAPK.id_relawan} onChange={(e) => setFormAPK({ ...formAPK, id_relawan: e.target.value })} className="border p-2 w-[363px] rounded-md outline-none" type="text">
                    {relawan?.data?.map((res) => (
                      <option key={res._id} value={res._id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-3 justify-end mt-3">
                  <div
                    onClick={() => {
                      setPopupTambah(false);
                      setFormAPK({
                        id_periode: periode,
                      });
                    }}
                    className="border px-3 py-1 text-[#9CA3AF] rounded-sm cursor-pointer"
                  >
                    Batalkan
                  </div>
                  {edit === false ? (
                    <div onClick={postAPK} className="flex gap-2 bg-[#E44700] stroke-white px-4 py-1 rounded-sm items-center cursor-pointer">
                      <p className="font-medium text-white">Buat APK</p>
                      <APKIcon />
                    </div>
                  ) : (
                    <div onClick={() => editAPK(idAPK)} className="px-6 py-1 border rounded-sm">
                      Edit
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-[60px] pt-[42px] pb-[200px]">
        <p className="text-[32px] text-[#374151] font-bold">APK</p>
        <div
          onClick={() => {
            setPopupTambah(true);
            setEdit(false);
          }}
          className="w-[159px] text-center bg-[#E44700] py-2 font-medium text-white mt-3 rounded-sm cursor-pointer"
        >
          Tambah Data
        </div>
        <div className="flex stroke-[#374151] text-[#374151] w-[239px] border justify-between p-2 rounded-sm mt-4">
          <input className="w-full outline-none" type="text" placeholder="Cari Data" />
          <SearchIcon />
        </div>
        <div className="overflow-x-scroll w-full scrollbar-thin scrollbar-thumb-[#374151] mt-6">
          <table className=" divide-y divide-gray-200 w-screen rounded-sm">
            <thead className="bg-[#374151] text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Nama APK
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Tgl Masuk
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Tgl Keluar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  APK Masuk
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  APK Keluar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium">
                  Tujuan Distribusi
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-mediumrder">
                  Penanggung Jawab
                </th>
                <th scope="col" className={`${popupBerhasil === true && "-z-50"} ${popupTambah === true && "-z-50"} ${popupDelete === true && "-z-50"} sticky right-0 bg-[#374151] border px-6 py-3 text-center text-xs font-medium`}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data?.data?.map((res, i) => (
                <tr className={`${(i + 1) % 2 !== 0 && "bg-[#F9FAFB]"}`} key={res._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm w-[5px]">{i + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.tgl_masuk?.split("T").shift().split("-").reverse().join("/")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.tgl_keluar?.split("T").shift().split("-").reverse().join("/")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.jml_masuk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.jml_keluar}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.tujuan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{res.nama_relawan}</td>
                  <td
                    className={`${popupBerhasil === true && "-z-50"} ${popupDelete === true && "-z-50"} ${(i + 1) % 2 !== 0 && "bg-[#F9FAFB]"} ${popupTambah === true && "-z-50"} px-2 sticky right-0 bg-white py-4 whitespace-nowrap text-sm`}
                  >
                    <div className="flex gap-3 justify-center">
                      <div
                        onClick={() => {
                          setFormAPK({
                            nama: res.nama,
                            tgl_masuk: res.tgl_masuk.split("T").shift(),
                            tgl_keluar: res.tgl_keluar.split("T").shift(),
                            jml_masuk: res?.jml_masuk,
                            jml_keluar: res?.jml_keluar,
                            tujuan: res.tujuan,
                            id_relawan: res.relawan._id,
                          });
                          setEdit(true);
                          setPopupTambah(true);
                          setIdAPK(res._id);
                        }}
                        className="border-2 border-[#374151] p-1 rounded-sm cursor-pointer"
                      >
                        <UbahIcon />
                      </div>
                      <div
                        onClick={() => {
                          setIdAPK(res._id);
                          setPopupDelete(true);
                        }}
                        className="border-2 border-[#B91C1C] p-1 rounded-sm cursor-pointer"
                      >
                        <DeletIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <Pagination total={data?.metadata?.total} current_page={currentPage} setCurrentPage={setCurrentPage} total_page={data?.metadata?.totalPage} />
        </div>
      </div>
    </>
  );
};

export default APK;
