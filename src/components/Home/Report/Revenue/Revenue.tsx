import { Box, Text, VStack, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import { FaChartLine, FaDollarSign } from "react-icons/fa";
import { RevenueChart } from "./RevenueChart";

export const Revenue = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" h="full">
      <VStack spacing={4} align="stretch" h="full">
        <HStack justify="space-between" align="center">
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
        
        <Box flex="1">
          <RevenueChart />
        </Box>
      </VStack>
    </Box>
  );
};
