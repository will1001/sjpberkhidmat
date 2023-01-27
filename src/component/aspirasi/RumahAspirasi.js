import React, { useEffect, useState } from "react";
import axiosFetch from "../../API/axiosFetch";
import editIcon from "../../utility/icon/edit_icon.png";
import deletIcon from "../../utility/icon/delet_icon.png";

const RumahAspirasi = () => {
  const [page, setPage] = useState();
  const [alertHapus, setAlertHapus] = useState(false);

  useEffect(() => {
    const res = axiosFetch("get", "/user/aspirasi?page=1")
      .then((res) => setPage(res.data))
      .catch((err) => console.log(err));
  }, [alertHapus]);

  const deleteAspirasi = async (id) => {
    console.log(id);

    const res = await axiosFetch("delete", `user/aspirasi/${id}`)
      .then((res) => {
        console.log(res);
        setAlertHapus(false);
      })
      .catch((err) => console.log(err));
    return res;
  };
  console.log(page?.data);
  return (
    <>
      <div className="absolute pr-[50px] h-[1300px] bg-orange-100 bg-opacity-30">
        {" "}
        <div className="ml-[60px] mt-[60px]">
          <p className="text-[#374151] text-[32px] font-bold">Rumah Aspirasi</p>
          <div>
            <table className="">
              <thead className="flex items-center rounded-t-sm  bg-[#374151]">
                <tr className="text-white text-[14px] flex gap-2 items-center px-4 h-[51px]">
                  <th className="w-[178px] flex">Perihal</th>
                  <th className="w-[150px] flex">Kabupaten</th>
                  <th className="w-[150px] flex">Kecamatan</th>
                  <th className="w-[150px] flex">Desa / Kelurahan</th>
                  <th className="w-[200px] flex">Detail Aspirasi</th>
                  <th className="w-[100px] flex justify-center">Action</th>
                </tr>
              </thead>

              {page?.data.map((res, index) => (
                <tbody key={res._id} className="flex items-center" style={(index + 1) % 2 !== 0 ? { background: "#F9FAFB" } : { background: "white" }}>
                  <tr className="px-4 py-2 flex gap-2 text-[#374151]">
                    <td className="w-[178px] break-words ">{res.detail}</td>
                    <td className="w-[150px] break-words">{res.kabupaten.name}</td>
                    <td className="w-[150px] break-words">{res.kecamatan.name}</td>
                    <td className="w-[150px] break-words">{res.kelurahan.name}</td>
                    <td className="w-[200px] break-words">{res.detail}</td>
                    <td className="w-[100px] flex gap-2 items-center justify-center">
                      <img className="h-[24px] w-[24px] cursor-pointer" src={editIcon.src} alt="edit icon" />
                      {alertHapus === false ? (
                        <img onClick={() => setAlertHapus(true)} className="h-[24px] w-[24px] cursor-pointer" src={deletIcon.src} alt="delet icon" />
                      ) : (
                        <div className="flex gap-2 font-medium">
                          <p onClick={() => deleteAspirasi(res._id)} className="cursor-pointer text-red-500">
                            Hapus
                          </p>
                          <p onClick={() => setAlertHapus(false)} className="cursor-pointer">
                            Batal
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RumahAspirasi;
