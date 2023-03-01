import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useFetch from "../../API/useFetch";
import NewButton from "../NewButton";
import icon from "../../utility/icon/centerIcon.png";
import edit from "../../utility/icon/edit_icon.png";
import delet from "../../utility/icon/delet_icon.png";
import hapusImg from "../../utility/img/hapusData.png";
import axiosFetch from "../../API/axiosFetch";
import { useSelector } from "react-redux";

const Publikasi = () => {
  const router = useRouter();
  const style = {
    padding: "9px 21px",
    gap: "8px",
    width: "192px",
    height: "42px",
    background: "#E44700",
    borderRadius: "4px",
    fontFamily: "Work Sans",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    color: "#FFFFFF",
  };

  const handleTambah = () => {
    router.push("/publikasi/TambahData");
  };
  const token = useSelector((state) => state.user.token);
  const [editData, setEditData] = useState();
  const [alertHapus, setAlertHapus] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const editFalse = () => setEditActive(false);
  const [program, setProgram] = useState();
  const [idArtikel, setIdArtikel] = useState();
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // const getProgram = useFetch("get", "user/articles?type=artikel");
  const [totalPage, setTotalPage] = useState();
  const editHandler = (id) => {
    const res = axiosFetch("get", `user/articles/${id}`).then((res) => {
      setEditData(res?.data?.data);
      setEditActive(true);
      //   console.log(res.data.data);
    });
    console.log(editData);
    // router.push("/artikel/UbahProgram");
    // console.log(id);
  };
  const handleDelet = async (id) => {
    console.log(id);

    const res = axiosFetch("delete", `user/articles/${id}`, {}, token)
      .then((res) => {
        console.log(res);
        setAlertHapus(false);
      })
      .catch((err) => console.log(err));
  };
  const changePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const res = axiosFetch("get", `user/articles?type=artikel&page=${currentPage ? currentPage : "1"}`, {}, token)
      .then((res) => {
        setProgram(res);
        // console.log(res.data.metadata.totalPage);
        setPages(res.data.metadata);
      })
      .catch((err) => console.log(err));
  }, [editActive, alertHapus, currentPage]);

  let test = [];
  for (let index = 0; index < pages?.totalPage; index++) {
    const element = test.push(index);
  }

  console.log(router.query);
  return (
    <>
      {editActive === true ? (
        <>
          {
            //  <div className=" bg-white">
            //   <EditProgram close={editFalse} data={editData} />
            // </div>
          }
        </>
      ) : (
        <>
          <div className="ml-[59px] mr-[20px] mt-[67px]">
            <p className="text-[32px] font-bold text-[#374151]  font-serif mb-4">Publikasi</p>
            <div className="mb-[20px]">
              <NewButton title={"Tambah Data"} style={style} action={() => handleTambah()} />
            </div>

            <div className="flex justify-between  py-4 px-4 text-white bg-[#374151] w-full px-4]">
              <p className="w-[280px]">Judul</p>
              <p className="w-[50px]">Jenis</p>
              <p className="w-[130px]">Kategori</p>
              <p className="w-[80px]">Tgl Dibuat</p>
              <p className="w-[80px]">Status</p>
              <p className="w-[50px]">Aksi</p>
            </div>
            {program?.data?.data?.map((res, index) => (
              // console.log(res)
              <div key={index} className={`flex items-center justify-between py-4 px-4 text-[#374151] ${(index + 1) % 2 == 0 ? "bg-[#fff]" : "bg-[#F9FAFB]"}  w-full`}>
                <p className="w-[280px] break-words">{res?.title}</p>
                <p className="w-[50px]">{["jpg", "jpeg", "png"].includes(res?.image?.split(".").pop().toLowerCase()) ? "Artikel" : "Video"}</p>
                <p className="w-[130px]">{res?.category}</p>
                <p className="w-[80px]">{res?.createdAt?.split("T").shift().split("-").reverse().join("/")}</p>
                <div className="w-[80px] flex justify-center">
                  {res?.publication === true ? (
                    <div className="bg-[#FFECE4] text-[#FF5001] font-medium flex justify-center py-2 px-2 rounded-md">Published</div>
                  ) : (
                    <div className="flex justify-center items-center bg-[#F3F4F6] font-medium p-2 rounded-md">Draft</div>
                  )}
                </div>
                <div className="flex gap-2 justify-center items-center w-[50px]">
                  <img
                    onClick={() =>
                      router.push({
                        pathname: "/publikasi/EditData",
                        query: {
                          id: res._id,
                          file: res.image,
                          title: res.title,
                          description: res.description,
                          category: res.category,
                          page: res.video ? "video" : "artikel",
                          video: res.video && res.video,
                        },
                      })
                    }
                    className="cursor-pointer "
                    src={edit.src}
                  />
                  {alertHapus !== res._id ? (
                    <img onClick={() => setAlertHapus(res._id)} className="cursor-pointer" src={delet.src} />
                  ) : (
                    <p className="flex gap-2 font-medium">
                      <span className="cursor-pointer text-red-500" onClick={() => handleDelet(res?._id)}>
                        Hapus
                      </span>
                      <span className="cursor-pointer text-[#374151]" onClick={() => setAlertHapus()}>
                        Batal
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-3">
              <div className="flex items-center gap-2">
                <div className="border px-2 py-1 rounded-md text-[#828282]">10</div>
                <p className="text-[#828282]">Showing 1 - 10 of {pages?.total}</p>
              </div>
              <div className="flex items-center gap-2">
                {test?.map((i) => (
                  <div onClick={() => changePage(i + 1)} className={`cursor-pointer ${currentPage === i + 1 ? "bg-[#FF5001] text-[white]" : ""}  px-3 rounded-md  py-1`} key={i}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Publikasi;
