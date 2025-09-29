import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaCircle, FaChartPie, FaUsers } from "react-icons/fa";
import useDepartment from "../../../hooks/department/useDepartment";
import { StatisticsChart } from "./StatisticsChart";

export const Statistics = () => {
  const { data, isLoading } = useDepartment();
  const [selectedItem, setSelectedItem] = useState("Monthly");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("gray.50", "gray.700");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const departmentStats = useMemo(() => {
    if (!data) return { total: 0, unique: 0, percentages: [] };
    
    const uniqueDepts = data.filter(
      (item, index, array) =>
        index === array.findIndex((i) => i.deptName === item.deptName)
    );
    
    const percentages = uniqueDepts.map((dept, index) => ({
      name: dept.deptName,
      percentage: Math.floor(Math.random() * 20) + 5, // Mock percentage
      color: ["gold.500", "red.500", "teal.400", "blue.500", "purple.500"][index % 5]
    }));
    
    return {
      total: data.length,
      unique: uniqueDepts.length,
      percentages
    };
  }, [data]);

  const getMockStats = () => {
    switch (selectedItem) {
      case "Weekly":
        return { visits: 127, growth: 12, trend: "up" };
      case "Monthly":
        return { visits: 485, growth: 8, trend: "up" };
      case "Yearly":
        return { visits: 5840, growth: 15, trend: "up" };
      default:
        return { visits: 485, growth: 8, trend: "up" };
    }
  };

  const stats = getMockStats();

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Text color={textColor}>Loading statistics...</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch" p={4}>
      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <HStack spacing={2}>
          <FaChartPie color="#319795" />
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Department Analytics
          </Text>
        </HStack>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<BsChevronDown />}
            colorScheme="teal"
            variant="outline"
            size="sm"
            borderRadius="md"
          >
            {selectedItem}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleItemClick("Weekly")}>
              Weekly
            </MenuItem>
            <MenuItem onClick={() => handleItemClick("Monthly")}>
              Monthly
            </MenuItem>
            <MenuItem onClick={() => handleItemClick("Yearly")}>
              Yearly
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Box bg={cardBg} p={4} borderRadius="lg">
          <Stat>
            <StatLabel color={textColor}>Total Visits</StatLabel>
            <StatNumber color="teal.500">{stats.visits}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {stats.growth}% from last {selectedItem.toLowerCase()}
            </StatHelpText>
          </Stat>
        </Box>
        
        <Box bg={cardBg} p={4} borderRadius="lg">
          <Stat>
            <StatLabel color={textColor}>Departments</StatLabel>
            <StatNumber color="blue.500">{departmentStats.unique}</StatNumber>
            <StatHelpText>Active departments</StatHelpText>
          </Stat>
        </Box>
        
        <Box bg={cardBg} p={4} borderRadius="lg">
          <Stat>
            <StatLabel color={textColor}>Avg per Dept</StatLabel>
            <StatNumber color="purple.500">
              {Math.round(stats.visits / departmentStats.unique)}
            </StatNumber>
            <StatHelpText>Visits per department</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Chart and Legend */}
      <HStack align="start" spacing={6} wrap="wrap">
        <Box flex="1" minW="300px">
          <StatisticsChart />
        </Box>
        
        <Box bg={cardBg} borderRadius="lg" p={4} minW="250px">
          <VStack spacing={3} align="stretch">
            <HStack>
              <FaUsers color="#319795" />
              <Text fontWeight="bold" color={textColor}>
                Department Breakdown
              </Text>
            </HStack>
            
            <List spacing={3}>
              {departmentStats.percentages.map((dept, index) => (
                <ListItem key={index}>
                  <HStack justify="space-between">
                    <HStack spacing={2}>
                      <ListIcon as={FaCircle} color={dept.color} boxSize={3} />
                      <Text fontSize="sm" color={textColor}>
                        {dept.name}
                      </Text>
                    </HStack>
                    <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                      {dept.percentage}%
                    </Badge>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};
