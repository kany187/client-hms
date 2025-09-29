import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  useColorModeValue,
  Tab,
  TabList,
  Tabs,
  Button,
  IconButton
} from "@chakra-ui/react";
import { StaffChart } from "./StaffChart";
import { BsChevronRight } from "react-icons/bs";
import { FaUsers, FaUserMd, FaUserNurse, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Staff = () => {
  const [title, setTitle] = useState("Doctor");
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const handleTitleClick = (newTitle: string) => {
    setTitle(newTitle);
  };

  const getIcon = (role: string) => {
    switch (role) {
      case "Doctor": return FaUserMd;
      case "Nurse": return FaUserNurse;
      case "Receptionist": return FaUserTie;
      default: return FaUsers;
    }
  };

  const IconComponent = getIcon(title);

  return (
    <Box bg={bgColor} borderRadius="lg" p={6} boxShadow="sm" h="full">
      <VStack spacing={4} align="stretch" h="full">
        <HStack justify="space-between" align="center">
          <HStack spacing={2}>
            <IconComponent color="#319795" />
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Staff by Department
            </Text>
          </HStack>
          <Link to="/staff">
            <Button
              rightIcon={<BsChevronRight />}
              colorScheme="teal"
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </Link>
        </HStack>

        <Tabs variant="soft-rounded" colorScheme="teal" size="sm">
          <TabList>
            <Tab onClick={() => handleTitleClick("Doctor")}>
              <HStack spacing={1}>
                <FaUserMd />
                <Text>Doctors</Text>
              </HStack>
            </Tab>
            <Tab onClick={() => handleTitleClick("Nurse")}>
              <HStack spacing={1}>
                <FaUserNurse />
                <Text>Nurses</Text>
              </HStack>
            </Tab>
            <Tab onClick={() => handleTitleClick("Receptionist")}>
              <HStack spacing={1}>
                <FaUserTie />
                <Text>Receptionists</Text>
              </HStack>
            </Tab>
          </TabList>
        </Tabs>
        
        <Box flex="1">
          <StaffChart title={title} />
        </Box>
      </VStack>
    </Box>
  );
};
