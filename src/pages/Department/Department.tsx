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
import { AddDepartment } from "../../components/Department/AddDepartment";
import { DepartmentList } from "../../components/Department/DepartmentList";

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
    path: "/doctor",
    iconOpen: MdOutlineKeyboardArrowRight,
    iconClosed: MdOutlineKeyboardArrowDown,
  },
  {
    name: "Department",
    icon: BsBuildingFillAdd,
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

export const Department = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <DepartmentMainSection /> },
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

const DepartmentMainSection = () => {
  return (
    <>
      <VStack spacing={8} align="stretch" minH="100vh">
        <Heading>Department List</Heading>
        <HStack spacing="0px">
          <AddDepartment />
        </HStack>
        <DepartmentList />
      </VStack>
      <Footer />
    </>
  );
};
