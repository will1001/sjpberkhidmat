import Dashboard from "../../component/admin/Dashboard";
import DptDps from "../../component/admin/dpt_dps/DptDps";
import EksportDataDpt from "../../component/admin/dpt_dps/EksportData";
import RealCount from "../../component/admin/RealCount";
import Relawan from "../../component/admin/RelawanDash";
import Simpatisan from "../../component/admin/SimpatisanDash";

import { DashboardIcon, RealCountIcon, DPTDPSIcon, ProgramIcon, Logistic, Publikasi, SetingSliderIcon, DaftarAkunIcon, SimpatisanIcon, RelawanIcon } from "./icon";
export const logoSidebar = [
  {
    name: "Dashboard",
    path: "Dashboard",
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },
  {
    name: "Real Count",
    path: "Real Count",
    icon: <RealCountIcon />,
    component: <RealCount />,
  },
  { name: "DPT/DPS", path: "DPT/DPS", icon: <DPTDPSIcon />, component: <DptDps /> },
  { name: "Program", path: "/program", icon: <ProgramIcon /> },
  { name: "Logistic", path: "/logistic", icon: <Logistic /> },
  { name: "Publikasi", path: "/publikasi", icon: <Publikasi /> },
  { name: "Seting Slider", path: "/seting-slider", icon: <SetingSliderIcon /> },
  { name: "Daftar Akun", path: "/daftar-akun", icon: <DaftarAkunIcon /> },
  { name: "Relawan", path: "Relawan", icon: <RelawanIcon />, component: <Relawan /> },
  { name: "Simpatisan", path: "Simpatisan", icon: <SimpatisanIcon />, component: <Simpatisan /> },
  { path: "EksportDataDpt", component: <EksportDataDpt /> },
];
