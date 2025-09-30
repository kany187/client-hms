import { Box, Text, VStack, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import { FaChartLine, FaDollarSign } from "react-icons/fa";
import { RevenueChart } from "./RevenueChart";

export const Revenue = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <VStack spacing={3} align="stretch" minH="300px" maxH="400px">
      <HStack justify="space-between" align="center" wrap="wrap" gap={2}>
        <HStack spacing={2}>
          <FaChartLine color="#319795" />
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Revenue Analytics
          </Text>
        </HStack>
        <Badge colorScheme="teal" variant="subtle" fontSize="sm">
          <FaDollarSign style={{ marginRight: '4px' }} />
          Financial Overview
        </Badge>
      </HStack>
      
      <Box flex="1" minH="220px" maxH="280px" overflow="hidden">
        <RevenueChart />
      </Box>
    </VStack>
  );
};
