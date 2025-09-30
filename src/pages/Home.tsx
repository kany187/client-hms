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
  Button,
  Icon,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Avatar,
  Progress,
  IconButton,
  Tooltip,
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
import { WelcomeSection } from "../components/Home/WelcomeSection";
import { ActivityFeed } from "../components/Home/ActivityFeed";
import { QuickActions } from "../components/Home/QuickActions";
import { PerformanceMetrics } from "../components/Home/PerformanceMetrics";

import { BiEnvelopeOpen } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie, FaBell, FaCalendarAlt, FaUserMd, FaUserNurse, FaChartLine, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill, RiDashboardFill } from "react-icons/ri";
import { BsBuildingFillAdd, BsThreeDotsVertical } from "react-icons/bs";
import { MdNotifications, MdTrendingUp, MdTrendingDown, MdAccessTime } from "react-icons/md";
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
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bg={bgColor}>
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
            {/* Welcome Section with Stats */}
            <WelcomeSection user={user} />

            {/* Main Dashboard Grid */}
            <Grid
              templateColumns={{
                base: "1fr",
                lg: "2fr 1fr",
              }}
              gap={6}
              mb={6}
            >
              {/* Left Column - Calendar and Analytics */}
              <VStack spacing={4} align="stretch">
                {/* Calendar Section */}
                <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                  <CardHeader>
                    <Flex justify="space-between" align="center">
                      <Heading size="md" color={textColor}>
                        <Icon as={FaCalendarAlt} mr={2} />
                        Today's Schedule
                      </Heading>
                      <Button size="sm" variant="outline" colorScheme="teal">
                        View All
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <CalendarComponent />
                  </CardBody>
                </Card>

                {/* Performance Metrics */}
                <PerformanceMetrics />
              </VStack>

              {/* Right Column - Quick Actions and Recent Activity */}
              <VStack spacing={4} align="stretch">
                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Activity */}
                <ActivityFeed />
              </VStack>
            </Grid>

            {/* Bottom Analytics Grid */}
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              }}
              gap={4}
              mb={6}
            >
              {/* Patient Analytics */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} _hover={{ shadow: "lg" }}>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <PatientGrid />
                    <Divider />
                    <PatientStats />
                  </VStack>
                </CardBody>
              </Card>

              {/* Staff Analytics */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} _hover={{ shadow: "lg" }}>
                <CardBody>
                  <Staff />
                </CardBody>
              </Card>

              {/* Revenue Analytics */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} _hover={{ shadow: "lg" }}>
                <CardBody>
                  <Revenue />
                </CardBody>
              </Card>
            </Grid>
          </Container>
        </GridItem>
      </Grid>
      <Footer />
    </Box>
  );
};
