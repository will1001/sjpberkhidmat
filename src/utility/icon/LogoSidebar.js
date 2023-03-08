import Dashboard from "../../component/admin/Dashboard";
import DptDps from "../../component/admin/dpt_dps/DptDps";
import EksportDataDpt from "../../component/admin/dpt_dps/EksportData";
import Logistik from "../../component/admin/Logistik";
import RealCount from "../../component/admin/RealCount";
import Relawan from "../../component/admin/RelawanDash";
import SetingSlider from "../../component/admin/seting_slider/SetingSlider";
import Simpatisan from "../../component/admin/SimpatisanDash";
import AkunTimSjp from "../../component/akunTimSjp/AkunTimSjp";
import RumahAspirasi from "../../component/aspirasi/RumahAspirasi";
import Program from "../../component/program/IndexProgram";
import Publikasi from "../../component/publikasi/Publikasi";

import {
  DashboardIcon,
  RealCountIcon,
  DPTDPSIcon,
  ProgramIcon,
  Logistic,
  PublikasiIcon,
  SetingSliderIcon,
  DaftarAkunIcon,
  SimpatisanIcon,
  RelawanIcon,
  AspirasiIcon,
  TambahAkunIcon,
  ForumIcon,
} from "./icon";
export const logoSidebar = [
  {
    name: "Dashboard",
    path: "Dashboard",
    icon: <DashboardIcon />,
    component: <Dashboard />,
    koordinator: true,
  },
  {
    name: "Real Count",
    path: "RealCount",
    icon: <RealCountIcon />,
    component: <RealCount />,
    role: "relawan",
    koordinator: true,
  },
  {
    name: "DPT/DPS",
    path: "DptDps",
    icon: <DPTDPSIcon />,
    component: <DptDps />,
    koordinator: true,
  },
  {
    name: "Program",
    path: "/program",
    icon: <ProgramIcon />,
    component: <Program />,
  },
  {
    name: "Logistik",
    path: "/logistik",
    icon: <Logistic />,
    role: "relawan",
    component: <Logistik />,
    koordinator: true,
  },
  {
    name: "Publikasi",
    path: "/publikasi",
    icon: <PublikasiIcon />,
    component: <Publikasi />,
  },

  {
    name: "Relawan",
    path: "Relawan",
    icon: <RelawanIcon />,
    component: <Relawan />,
    koordinator: true,
  },
  {
    name: "Simpatisan",
    path: "Simpatisan",
    icon: <SimpatisanIcon />,
    component: <Simpatisan />,
    role: "relawan",
    koordinator: true,
  },
  {
    name: "Aspirasi",
    path: "RumahAspirasi",
    icon: <AspirasiIcon />,
    component: <RumahAspirasi />,
    role: "relawan",
  },

  {
    name: "Seting Slider",
    path: "SetingSlider",
    icon: <SetingSliderIcon />,
    component: <SetingSlider />,
  },
  {
    name: "Akun Tim SJP",
    path: "AkunTimSJP",
    icon: <TambahAkunIcon />,
    component: <AkunTimSjp />,
  },
  {
    name: "Forum",
    path: "Forum",
    icon: <ForumIcon />,
    // component: <AkunTimSjp />,
    role: "relawan",
    koordinator: true,
  },
  { path: "EksportDataDpt", component: <EksportDataDpt /> },
];
