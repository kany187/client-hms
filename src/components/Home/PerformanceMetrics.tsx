import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FaChartLine, FaUsers, FaClock, FaHeart } from "react-icons/fa";
import { MdTrendingUp, MdTrendingDown } from "react-icons/md";

export const PerformanceMetrics = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  // Define color mode values for different colors
  const greenBg = useColorModeValue("green.50", "green.900");
  const greenProgressBg = useColorModeValue("green.100", "green.800");
  const blueBg = useColorModeValue("blue.50", "blue.900");
  const blueProgressBg = useColorModeValue("blue.100", "blue.800");
  const purpleBg = useColorModeValue("purple.50", "purple.900");
  const purpleProgressBg = useColorModeValue("purple.100", "purple.800");
  const orangeBg = useColorModeValue("orange.50", "orange.900");
  const orangeProgressBg = useColorModeValue("orange.100", "orange.800");

  const metrics = [
    {
      title: "Patient Satisfaction",
      value: 85,
      target: 90,
      trend: "up",
      change: "+5%",
      icon: FaHeart,
      color: "green",
      description: "Based on patient feedback",
      bg: greenBg,
      progressBg: greenProgressBg
    },
    {
      title: "Appointment Efficiency",
      value: 92,
      target: 95,
      trend: "up",
      change: "+3%",
      icon: FaClock,
      color: "blue",
      description: "On-time appointment rate",
      bg: blueBg,
      progressBg: blueProgressBg
    },
    {
      title: "Staff Productivity",
      value: 78,
      target: 85,
      trend: "up",
      change: "+7%",
      icon: FaUsers,
      color: "purple",
      description: "Tasks completed per day",
      bg: purpleBg,
      progressBg: purpleProgressBg
    },
    {
      title: "Revenue Growth",
      value: 88,
      target: 100,
      trend: "up",
      change: "+12%",
      icon: FaChartLine,
      color: "orange",
      description: "Monthly revenue increase",
      bg: orangeBg,
      progressBg: orangeProgressBg
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? MdTrendingUp : MdTrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "green.500" : "red.500";
  };

  return (
    <Card bg={bgColor} border="1px solid" borderColor={borderColor}>
      <CardHeader>
        <Heading size="md" color={textColor}>
          Performance Metrics
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Key performance indicators for this month
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {metrics.map((metric, index) => (
            <Box key={index}>
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Box
                      p={2}
                      borderRadius="lg"
                      bg={metric.bg}
                      color={`${metric.color}.500`}
                    >
                      <metric.icon />
                    </Box>
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      {metric.title}
                    </Text>
                  </HStack>
                  <Badge 
                    colorScheme={metric.trend === "up" ? "green" : "red"} 
                    variant="subtle"
                    fontSize="xs"
                  >
                    {metric.change}
                  </Badge>
                </Flex>
                
                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="lg" fontWeight="bold" color={textColor}>
                      {metric.value}%
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Target: {metric.target}%
                    </Text>
                  </HStack>
                  <Progress 
                    value={metric.value} 
                    colorScheme={metric.color} 
                    size="lg" 
                    borderRadius="md"
                    bg={metric.progressBg}
                  />
                </Box>
                
                <Text fontSize="xs" color="gray.500">
                  {metric.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
