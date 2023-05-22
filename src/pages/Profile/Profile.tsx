import { Menu } from "../../components/Aside/Menu";
import { BiEnvelopeOpen } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { BsBuildingFillAdd } from "react-icons/bs";
import { NavBar } from "../../components/Header/NavBar";
import { Template } from "../../components/Template/Template";
import { Footer } from "../../components/Footer/Footer";
import { Show, VStack, Heading } from "@chakra-ui/react";
import { ProfileDetails } from "../../components/Profile/ProfileDetails";

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
  },
  {
    name: "Doctor",
    icon: FaUserTie,
  },
  {
    name: "Department",
    icon: BsBuildingFillAdd,
  },
  {
    name: "Patient",
    icon: RiUserReceivedFill,
    path: "/patient",
  },
  {
    name: "Staff",
    icon: HiUserGroup,
    path: "/staff",
  },
  {
    name: "Message",
    icon: BiEnvelopeOpen,
  },
];

export interface GridItem {
  area: string;
  children: React.ReactNode;
}

interface Props {
  user: any;
}

export const Profile = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <ProfileMainSection /> },
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

const ProfileMainSection = () => {
  return (
    <>
      <VStack spacing={8} align="stretch" minH="100vh">
        <Heading>Profile</Heading>
        <ProfileDetails />
      </VStack>
      <Footer />
    </>
  );
};
