import Dashboard from "../../component/admin/Dashboard";
import RealCount from "../../component/admin/RealCount";
import Relawan from "../../component/admin/RelawanDash";
import Simpatisan from "../../component/admin/SimpatisanDash";

import {
  DashboardIcon,
  RealCountIcon,
  DPTDPSIcon,
  ProgramIcon,
  Logistic,
  Publikasi,
  SetingSliderIcon,
  DaftarAkunIcon,
  SimpatisanIcon,
  RelawanIcon,
} from "./icon";
export const logoSidebar = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },
  {
    name: "Real Count",
    path: "/real-count",
    icon: <RealCountIcon />,
    component: <RealCount />,
  },
  { name: "DPT/DPS", path: "/dpt-dps", icon: <DPTDPSIcon /> },
  { name: "Program", path: "/program", icon: <ProgramIcon /> },
  { name: "Logistic", path: "/logistic", icon: <Logistic /> },
  { name: "Publikasi", path: "/publikasi", icon: <Publikasi /> },
  { name: "Seting Slider", path: "/seting-slider", icon: <SetingSliderIcon /> },
  { name: "Daftar Akun", path: "/daftar-akun", icon: <DaftarAkunIcon /> },
  { name: "Relawan", icon: <RelawanIcon />, component: <Relawan /> },
  { name: "Simpatisan", icon: <SimpatisanIcon />, component: <Simpatisan /> },
];
