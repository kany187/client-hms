import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Show,
  Stack,
} from "@chakra-ui/react";
import { NavBar } from "../components/Header/NavBar";
import { Menu } from "../components/Aside/Menu";
import { CalendarComponent } from "../components/Home/Calendar/CalendarComponent";
import ReportList from "../components/Home/Report/Card/ReportList";
import { Statistics } from "../components/Home/Statistics/Statistics";
import { PatientGrid } from "../components/Home/Report/Patient/PatientGrid";
import { PatientStats } from "../components/Home/Report/Patient/PatientStats";
import { Staff } from "../components/Home/Report/Staff/Staff";
import { Revenue } from "../components/Home/Report/Revenue/Revenue";

import { BiEnvelopeOpen } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { BsBuildingFillAdd } from "react-icons/bs";
import { Footer } from "../components/Footer/Footer";

const list = [
  {
    name: "Home",
    icon: AiFillHome,
  },
  {
    name: "Appointment",
    icon: RiStethoscopeFill,
    path: "/appointment",
  },
  {
    name: "Doctor",
    icon: FaUserTie,
    path: "/doctor",
  },
  {
    name: "Department",
    icon: BsBuildingFillAdd,
    path: "/department",
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
    elementType: "div",
  },
];

interface Props {
  user: any;
}

export const Home = ({ user }: Props) => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main" `,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar user={user} />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            <Menu data={user} list={list} />
          </GridItem>
        </Show>
        <GridItem area="main">
          <Grid
            templateAreas={`'left right' 'left right'`}
            // templateColumns="repeat(2 1fr)"
            gridTemplateColumns={"900px 655px 1fr"}
            // templateRows={"150px 150px"}
            gap={2}
          >
            <GridItem
              area="left"
              // bg="rgba(10, 30, 100, 0.1)"
              bg="gray.50"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="10px"
            >
              <Stack direction="row" spacing="40px">
                <CalendarComponent />
                <Divider
                  orientation="vertical"
                  height="310px"
                  p="3px"
                  m="3px"
                />
                <ReportList />
              </Stack>
            </GridItem>
            <GridItem
              area="right"
              bg="gray.50"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="10px"
            >
              <Statistics />
            </GridItem>
          </Grid>
          <Flex gap="5" pt="15px">
            <Box
              bg="gray.50"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="10px"
            >
              <PatientGrid />
              <PatientStats />
            </Box>
            <Box
              bg="gray.50"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="10px"
              w="40%"
            >
              <Staff />
            </Box>
            <Box
              bg="gray.50"
              border="1px solid rgba(255,255,255,0.25)"
              borderRadius="10px"
              w="28%"
            >
              <Revenue />
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};
