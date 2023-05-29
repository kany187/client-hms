import { Show } from "@chakra-ui/react";
import { BiEnvelopeOpen } from "react-icons/bi";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { RiStethoscopeFill } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsBuildingFillAdd } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { NavBar } from "../../components/Header/NavBar";
import { Template } from "../../components/Template/Template";
import { Menu } from "../../components/Aside/Menu";
import { GridItem } from "../Patient/Patient";
import { Chat } from "../../components/Message/Chat";
import { Footer } from "../../components/Footer/Footer";

const list = [
  {
    name: "Home",
    icon: AiFillHome,
    path: "/",
  },
  {
    name: "Appointment",
    icon: RiStethoscopeFill,
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
    path: "/doctor",
    icon: FaUserTie,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
  },
  {
    name: "Department",
    icon: BsBuildingFillAdd,
    path: "/department",
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
    icon: HiUserGroup,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
    path: "/staff",
  },
  {
    name: "Message",
    icon: BiEnvelopeOpen,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
  },
];

interface Props {
  user: any;
}

export const Message = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <MessageSection /> },
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

const MessageSection = () => {
  return (
    <>
      <Chat />
      <Footer />
    </>
  );
};
