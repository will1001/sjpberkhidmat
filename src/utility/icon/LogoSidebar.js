import Dashboard from "../../component/admin/Dashboard";
import DptDps from "../../component/admin/dpt_dps/DptDps";
import EksportDataDpt from "../../component/admin/dpt_dps/EksportData";
import RealCount from "../../component/admin/RealCount";
import Relawan from "../../component/admin/RelawanDash";
import Simpatisan from "../../component/admin/SimpatisanDash";
import AkunTimSjp from "../../component/akunTimSjp/AkunTimSjp";
import RumahAspirasi from "../../component/aspirasi/RumahAspirasi";

import { DashboardIcon, RealCountIcon, DPTDPSIcon, ProgramIcon, Logistic, Publikasi, SetingSliderIcon, DaftarAkunIcon, SimpatisanIcon, RelawanIcon, AspirasiIcon, TambahAkunIcon } from "./icon";
export const logoSidebar = [
  {
    name: "Dashboard",
    path: "Dashboard",
    icon: <DashboardIcon />,
    component: <Dashboard />,
  },
  {
    name: "Real Count",
    path: "RealCount",
    icon: <RealCountIcon />,
    component: <RealCount />,
    role: "relawan",
  },
  { name: "DPT/DPS", path: "DptDps", icon: <DPTDPSIcon />, component: <DptDps /> },
  { name: "Program", path: "/program", icon: <ProgramIcon /> },
  { name: "Logistic", path: "/logistic", icon: <Logistic />, role: "relawan" },
  { name: "Publikasi", path: "/publikasi", icon: <Publikasi /> },
  { name: "Daftar Akun", path: "/daftar-akun", icon: <DaftarAkunIcon /> },
  { name: "Relawan", path: "Relawan", icon: <RelawanIcon />, component: <Relawan /> },
  { name: "Simpatisan", path: "Simpatisan", icon: <SimpatisanIcon />, component: <Simpatisan />, role: "relawan" },
  { name: "Aspirasi", path: "RumahAspirasi", icon: <AspirasiIcon />, component: <RumahAspirasi />, role: "relawan" },

  { name: "Seting Slider", path: "/seting-slider", icon: <SetingSliderIcon /> },
  { name: "Akun Tim SJP", path: "AkunTimSJP", icon: <TambahAkunIcon />, component: <AkunTimSjp /> },
  { path: "EksportDataDpt", component: <EksportDataDpt /> },
];
