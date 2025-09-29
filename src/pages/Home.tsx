import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Show,
  Stack,
  Container,
  VStack,
  HStack,
  Text,
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
import { User } from "../types";

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
  user: User | null;
}

export const Home = ({ user }: Props) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main" `,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
        minH="100vh"
      >
        <GridItem area="nav">
          <NavBar user={user} />
        </GridItem>
        <Show above="lg">
          <GridItem area="aside">
            <Menu data={user} list={list} />
          </GridItem>
        </Show>
        <GridItem area="main" p={{ base: "4", md: "6", lg: "8" }}>
          <Container maxW="container.xl">
            {/* Top Section - Calendar and Statistics */}
            <Grid
              templateAreas={{
                base: `"left" "right"`,
                lg: `"left right"`,
              }}
              templateColumns={{
                base: "1fr",
                lg: "1fr 1fr",
              }}
              gap={{ base: "6", lg: "8" }}
              mb={{ base: "8", lg: "10" }}
            >
              <GridItem area="left">
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  p={{ base: "6", md: "8" }}
                  shadow="md"
                  minH="520px"
                >
                  <Stack 
                    direction={{ base: "column", lg: "row" }} 
                    spacing={{ base: "8", lg: "10" }}
                    align="stretch"
                    h="full"
                  >
                    <Box flex="1" p={4} minH="420px">
                      <CalendarComponent />
                    </Box>
                    <Show above="lg">
                      <Divider orientation="vertical" />
                    </Show>
                    <Box flex="1" p={4} minH="420px" overflow="hidden">
                      <Box maxH="380px" overflowY="auto">
                        <ReportList />
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </GridItem>
              
              <GridItem area="right">
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="lg"
                  p={{ base: "4", md: "6" }}
                  shadow="sm"
                >
                  <Statistics />
                </Box>
              </GridItem>
            </Grid>

            {/* Bottom Section - Patient, Staff, and Revenue */}
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              }}
              gap={{ base: "6", md: "8" }}
            >
              <GridItem>
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  p={{ base: "6", md: "8" }}
                  shadow="md"
                  _hover={{ 
                    shadow: "lg",
                    transition: "all 0.2s ease-in-out"
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <PatientGrid />
                  <PatientStats />
                </Box>
              </GridItem>
              
              <GridItem>
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  p={{ base: "6", md: "8" }}
                  shadow="md"
                  _hover={{ 
                    shadow: "lg",
                    transition: "all 0.2s ease-in-out"
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Staff />
                </Box>
              </GridItem>
              
              <GridItem>
                <Box
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="xl"
                  p={{ base: "6", md: "8" }}
                  shadow="md"
                  _hover={{ 
                    shadow: "lg",
                    transition: "all 0.2s ease-in-out"
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Revenue />
                </Box>
              </GridItem>
            </Grid>
          </Container>
        </GridItem>
      </Grid>
      <Footer />
    </Box>
  );
};
