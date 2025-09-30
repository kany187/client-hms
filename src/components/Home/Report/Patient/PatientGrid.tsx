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
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaUsers, FaChartBar } from "react-icons/fa";

export const PatientGrid = () => {
  const [selectedItem, setSelectedItem] = useState("Monthly");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const getStats = () => {
    switch (selectedItem) {
      case "Weekly":
        return { total: 127, average: 18, trend: "+12%" };
      case "Monthly":
        return { total: 485, average: 16, trend: "+8%" };
      case "Yearly":
        return { total: 5840, average: 16, trend: "+15%" };
      default:
        return { total: 485, average: 16, trend: "+8%" };
    }
  };

  const stats = getStats();

  return (
    <VStack spacing={3} align="stretch" minH="200px" maxH="250px">
      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <HStack spacing={2}>
          <FaUsers color="#319795" />
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Patient Analytics
          </Text>
        </HStack>
        <Badge colorScheme="teal" variant="subtle" fontSize="sm">
          <FaChartBar style={{ marginRight: '4px' }} />
          Visit Trends
        </Badge>
      </HStack>

      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <Text fontSize="md" fontWeight="semibold" color={textColor}>
          Average Patient Visits
        </Text>
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

      <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} flex="1">
        <VStack spacing={1} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="teal.500">
            {stats.total}
          </Text>
          <Text fontSize="sm" color={textColor} textAlign="center">
            Total Visits
          </Text>
        </VStack>
        
        <VStack spacing={1} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            {stats.average}
          </Text>
          <Text fontSize="sm" color={textColor} textAlign="center">
            Avg per {selectedItem === "Weekly" ? "week" : selectedItem === "Monthly" ? "month" : "year"}
          </Text>
        </VStack>
        
        <VStack spacing={1} p={3} bg={useColorModeValue("gray.50", "gray.700")} borderRadius="md">
          <Text fontSize="2xl" fontWeight="bold" color="green.500">
            {stats.trend}
          </Text>
          <Text fontSize="sm" color={textColor} textAlign="center">
            Growth Rate
          </Text>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
};
