import {
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Grid,
  GridItem,
  Show,
  VStack,
  Heading,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Menu } from "../../components/Aside/Menu";
import { StaffMain } from "../../components/Staff/StaffMain";
import { SearchInput } from "../../components/Staff/SearchInput";
import { StaffFilter } from "../../components/Staff/StaffFilter";
import { Staff } from "../../hooks/staffs/useStaffInfo";

import { BiEnvelopeOpen } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { BsBuildingFillAdd } from "react-icons/bs";
import { NavBar } from "../../components/Header/NavBar";
import { Template } from "../../components/Template/Template";
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

export interface StaffQuery {
  role: Staff | null;
  filter: string | null;
  searchText: string | null;
  dept: string | null;
}

export const Staffs = ({ user }: Props) => {
  const gridItems: GridItem[] = [
    { area: `nav`, children: <NavBar user={user} /> },
    { area: `aside`, children: <MenuSection user={user} /> },
    { area: `main`, children: <StaffMainSection /> },
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

const StaffMainSection = () => {
  const [staffQuery, setStaffQuery] = useState<StaffQuery>({} as StaffQuery);
  return (
    <>
      <VStack spacing={8} align="stretch" minH="100vh">
        <Heading>Staff</Heading>
        <SearchInput
          onSearch={(searchText) =>
            setStaffQuery({ ...staffQuery, searchText })
          }
        />
        <StaffFilter
          onSelectedGenre={(role) => setStaffQuery({ ...staffQuery, role })}
          onSelectedFilter={(filter) =>
            setStaffQuery({ ...staffQuery, filter })
          }
          selectedDept={(dept) => setStaffQuery({ ...staffQuery, dept })}
          selectedFilter={staffQuery.filter}
        />
        <StaffMain staffQuery={staffQuery} />
      </VStack>
      <Footer />
    </>
  );
};
