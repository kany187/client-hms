import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
  SimpleGrid,
  Avatar,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { FaBell, FaPlus, FaCalendarAlt, FaUserMd, FaChartLine, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { MdNotifications, MdTrendingUp, MdTrendingDown } from "react-icons/md";

interface WelcomeSectionProps {
  user: any;
}

export const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const quickStats = [
    { 
      label: "Total Patients", 
      value: "2,847", 
      change: "+12%", 
      trend: "up", 
      icon: RiUserReceivedFill, 
      color: "blue.500",
      bg: useColorModeValue("blue.50", "blue.900")
    },
    { 
      label: "Appointments", 
      value: "156", 
      change: "+8%", 
      trend: "up", 
      icon: RiStethoscopeFill, 
      color: "green.500",
      bg: useColorModeValue("green.50", "green.900")
    },
    { 
      label: "Active Doctors", 
      value: "24", 
      change: "+2", 
      trend: "up", 
      icon: FaUserMd, 
      color: "purple.500",
      bg: useColorModeValue("purple.50", "purple.900")
    },
    { 
      label: "Revenue", 
      value: "$45.2K", 
      change: "+15%", 
      trend: "up", 
      icon: FaChartLine, 
      color: "orange.500",
      bg: useColorModeValue("orange.50", "orange.900")
    },
  ];

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box mb={8}>
      {/* Welcome Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <VStack align="start" spacing={2}>
          <Heading size="xl" color={textColor}>
            {getCurrentTime()}, {user?.firstName || "Admin"}! 👋
          </Heading>
          <Text color={textColor} fontSize="lg">
            Here's what's happening at your hospital today
          </Text>
        </VStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<FaBell />}
            variant="outline"
            colorScheme="teal"
            size="sm"
          >
            Notifications
          </Button>
          <Button leftIcon={<FaPlus />} colorScheme="teal" size="sm">
            Quick Add
          </Button>
        </HStack>
      </Flex>

      {/* Quick Stats Grid */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={8}>
        {quickStats.map((stat, index) => (
          <Card 
            key={index} 
            bg={bgColor} 
            border="1px solid" 
            borderColor={borderColor}
            _hover={{ 
              shadow: "lg",
              transform: "translateY(-2px)",
              transition: "all 0.2s ease-in-out"
            }}
            transition="all 0.2s ease-in-out"
          >
            <CardBody>
              <Flex justify="space-between" align="start" mb={3}>
                <Box
                  p={2}
                  borderRadius="lg"
                  bg={stat.bg}
                  color={stat.color}
                >
                  <Icon as={stat.icon} boxSize={5} />
                </Box>
                <Badge 
                  colorScheme={stat.trend === "up" ? "green" : "red"} 
                  variant="subtle"
                  fontSize="xs"
                >
                  {stat.change}
                </Badge>
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {stat.value}
              </Text>
              <Text fontSize="sm" color={textColor}>
                {stat.label}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Performance Overview */}
      <Card bg={bgColor} border="1px solid" borderColor={borderColor} mb={6}>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="md" color={textColor}>
                Performance Overview
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Last 30 days
              </Text>
            </Flex>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  Patient Satisfaction
                </Text>
                <Progress 
                  value={85} 
                  colorScheme="green" 
                  size="lg" 
                  borderRadius="md" 
                  bg={useColorModeValue("green.100", "green.800")}
                />
                <Text fontSize="xs" color="green.500" mt={1}>
                  +5% from last month
                </Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  Appointment Efficiency
                </Text>
                <Progress 
                  value={92} 
                  colorScheme="blue" 
                  size="lg" 
                  borderRadius="md" 
                  bg={useColorModeValue("blue.100", "blue.800")}
                />
                <Text fontSize="xs" color="blue.500" mt={1}>
                  +3% from last month
                </Text>
              </Box>
              
              <Box>
                <Text fontSize="sm" color={textColor} mb={2}>
                  Staff Productivity
                </Text>
                <Progress 
                  value={78} 
                  colorScheme="purple" 
                  size="lg" 
                  borderRadius="md" 
                  bg={useColorModeValue("purple.100", "purple.800")}
                />
                <Text fontSize="xs" color="purple.500" mt={1}>
                  +7% from last month
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};
