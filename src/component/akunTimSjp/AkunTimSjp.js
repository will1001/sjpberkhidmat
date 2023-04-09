import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "../../API/axiosFetch";
import { DeletIcon } from "../../utility/icon/icon";
import EditIcon from "../../utility/icon/edit2.png";
import ButtonPrimary from "../ButtonPrimary";
import { setEditData, showOrHidePopUpDash } from "../../redux/panelReducer";

const AkunTimSjp = () => {
  const customStyles = {
    headCells: {
      style: { backgroundColor: "#374151", color: "white" },
    },
  };
  const dispatch = useDispatch();

  const [akunTim, setAkunTim] = useState([]);
  const token = useSelector((state) => state.user.token);

  const hapusAkunTim = (email) => {
    if (confirm("Hapus Akun Tim ?")) {
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

  const editAkunTim = (data) => {
    delete data.aksi;
    if (data) {
      dispatch(setEditData({ editData: JSON.stringify(data) }));
      dispatch(showOrHidePopUpDash({ type: "Akun Tim" }));
    }
  };

  useEffect(() => {
    axiosFetch("get", `user/akunTim?page=${1}`, {}, token)
      .then((res) => setAkunTim(res.data))
      .catch((err) => console.log(err));
  }, []);

  let data = akunTim.data ? akunTim.data : [];
  let i = 0;
  if (data) {
    for (const res of data) {
      data[i++].aksi = (
        <div className="flex justify-between w-[55px] cursor-pointer">
          <img
            onClick={() => {
              editAkunTim(res);
            }}
            src={EditIcon.src}
          />
          <div
            onClick={() => {
              hapusAkunTim(res.email);
            }}
          >
            <DeletIcon />
          </div>
        </div>
      );
    }
  }

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
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Kabupaten",
      selector: (row) => row.Kabupaten?.name,
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
    },
  ];
  return (
    <>
      <div className="flex justify-between items-center px-[40px] py-[10px]">
        <h1 className="text-4xl font-bold">Akun Tim SJP</h1>
      </div>
      <div className="px-[40px] py-[10px]">
        <ButtonPrimary
          title={"Tambah Akun Tim SJP"}
          action={() => {
            dispatch(showOrHidePopUpDash({ type: "Akun Tim" }));
          }}
        />
      </div>
      <div className="px-[40px] py-[10px]">
        <DataTable columns={columns} data={data} customStyles={customStyles} />
      </div>
    </>
  );
};

export default AkunTimSjp;
