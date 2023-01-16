import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../src/API/useFetch";
import NewButton from "../src/component/NewButton";
import TabelPopUp from "../src/component/petakekuatan/tabel";
import PetaKekuatanContent from "../src/component/sidebar/PetaKekuatanContent";
import SideBar from "../src/component/sidebar/SideBar";
import { setButton } from "../src/redux/button/popUpReducer";
import { BackIcon } from "../src/utility/icon/icon";
import PetaLombok from "../src/utility/PetaLombok";

function PetaKekuatan() {
  const base_url = "https://api.sjpberkhidmat.id/";
  const kabupaten = useFetch("get", "user/kabupaten");
  const [relawan, setRelawan] = useState([]);

  useEffect(() => {
    axios.get(base_url + "user/relawan").then((res) => setRelawan(res.data));
  }, []);

  const buttonName = useSelector((state) => state.button);
  const HandleClose = () => {
    useDispatch(setButton({ title: "", button: "", name: "", change: "" }));
  };
  // const [buttonTitle, setButtonTitle] = useState({
  //   name: buttonName.button.title,
  //   button: buttonName.button.button,
  // });

  console.log(buttonName.button);
  // console.log(buttonName.button);

  const styleBtn = {
    padding: "9px 20px",
    gap: "8px",
    width: "158px",
    height: "35px",
    border: "1px solid #E44700",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "120%",
    textAlign: "center",
    color: "#E44700",
  };
  return (
    <div className="w-[1350px]">
      <div className="flex w-full">
        <div className="flex basis-3/12 ">
          <SideBar content={<PetaKekuatanContent />} />
        </div>
        <div className="basis-9/12 bg-orange-50 h-screen w-full">
          <BackIcon />
          <p className="text-slate-700 font-bold text-[32px] ml-12">Peta Kekuatan SJP Berkhidmat</p>
          <div className="w-full absolute">
            <PetaLombok />
          </div>

          <div style={buttonName.button.change === false ? { visibility: "hidden" } : { visibility: "visible" }} className="absolute border top-[55%] pl-[20px]  w-[980px]  bg-white ">
            <div className="mt-[39px] ml-[49px]">
              <div className="flex justify-between items-center">
                <p className="text-[26px] text-[#374151] font-bold phone:mr-0 mr-[120px]">{buttonName.button.title}</p>
                <div className="flex items-center gap-8">
                  <div style={buttonName.button.button === undefined ? { visibility: "collapse" } : {}}>
                    <NewButton title={buttonName.button.button} style={styleBtn} />
                  </div>

                  <p className="text-[#E44700] text-[14px] underline cursor-pointer mr-[69px] phone:mr-6">Lihat Detail</p>
                </div>
              </div>
              <TabelPopUp data={relawan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetaKekuatan;
