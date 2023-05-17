import { BiEnvelopeOpen } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { BsBuildingFillAdd } from "react-icons/bs";
import { Show, Heading, HStack, VStack } from "@chakra-ui/react";
import { Footer } from "../../components/Footer/Footer";
import { NavBar } from "../../components/Header/NavBar";
import { Template } from "../../components/Template/Template";
import { Menu } from "../../components/Aside/Menu";
import { AddDoctor } from "../../components/Doctor/AddDoctor";
import { DoctorList } from "../../components/Doctor/DoctorList";

const list = [
  {
    name: "Home",
    icon: AiFillHome,
    path: "/",
  },
  {
    name: "Appointment",
    icon: RiStethoscopeFill,
    path: "/appointment",
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
  },
  {
    name: "Doctor",
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
    icon: RiUserReceivedFill,
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
    subMenu: [
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

export interface GridItem {
  area: string;
  children: React.ReactNode;
}

interface Props {
  user: any;
}

export const Doctor = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <DoctorMainSection /> },
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

const DoctorMainSection = () => {
  return (
    <>
      <VStack spacing={8} align="stretch" minH="100vh">
        <Heading>Doctor List</Heading>
        <HStack spacing="700px">
          <AddDoctor />
        </HStack>
        <DoctorList />
      </VStack>
      <Footer />
    </>
  );
};
