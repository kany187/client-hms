import { Show } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiHomeAlt2, BiEnvelopeOpen } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { NavBar } from "../../components/Header/NavBar";
import { Template } from "../../components/Template/Template";
import { Menu } from "../../components/Aside/Menu";
import { GridItem } from "../Patient/Patient";
import Dashboard from "../../components/Appointment/Dashboard";

const list = [
  {
    name: "Home",
    icon: BiHomeAlt2,
    path: "/",
  },
  {
    name: "Appointment",
    icon: AiOutlineCalendar,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
    subMenu: [
      {
        title: "Schedule Appointment",
        link: "/add-appointment",
      },
    ],
  },
  {
    name: "Doctor",
    icon: BiEnvelopeOpen,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
  },
  {
    name: "Patient",
    icon: TbReportAnalytics,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
    subMenu: [
      {
        title: "Patient Profile",
        link: "/patient-profile",
      },
      {
        title: "Add New Patient",
        link: "/add-patient",
      },
    ],
  },
  {
    name: "Staff",
    icon: GrGroup,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
    path: "/staff",
  },
];

interface Props {
  user: any;
}

export const Appointment = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <AppointmentSection /> },
  ];
  return <Template gridItems={gridItems} />;
};

const MenuSection = ({ user }: Props) => {
  return (
    <>
      <Show above="lg">
        <Menu data={user} list={list} />
      </Show>
    </>
  );
};

const AppointmentSection = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};
