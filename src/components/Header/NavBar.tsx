import {
  HStack,
  Avatar,
  AvatarBadge,
  Flex,
  Text,
  Heading,
  Box,
  Show,
  Hide,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { HiMenuAlt3 } from "react-icons/hi";
import { User } from "../../types";

interface Props {
  user: User | null;
}

export const NavBar = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack 
        justifyContent="space-between" 
        padding={{ base: "10px", md: "15px", lg: "20px" }}
        bg="white"
        shadow="sm"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Heading 
          size={{ base: "sm", md: "md", lg: "lg" }} 
          ml={{ base: "10px", md: "20px" }}
          color="teal.600"
        >
          Hospital Management System
        </Heading>
        
        <Flex justifyContent="flex-end" gap={{ base: "2", md: "4", lg: "5" }} alignItems="center">
          <Show above="md">
            {!user && <Text align="center" fontSize={{ base: "sm", md: "md" }}>Welcome</Text>}
            {user && (
              <Text fontSize={{ base: "sm", md: "md" }}>
                Welcome {user.name}
              </Text>
            )}
          </Show>
          
          <Link to={"/profile"}>
            <Avatar size={{ base: "sm", md: "md" }}>
              <AvatarBadge 
                borderColor="papayawhip" 
                bg="tomato" 
                boxSize="1.1em" 
              />
            </Avatar>
          </Link>
          
          <ColorModeSwitch />
          
          <Hide above="md">
            <IconButton
              aria-label="Open menu"
              icon={<HiMenuAlt3 />}
              onClick={onOpen}
              variant="ghost"
              size="sm"
            />
          </Hide>
        </Flex>
      </HStack>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {!user && <Text>Welcome</Text>}
              {user && <Text>Welcome {user.name}</Text>}
              <Link to="/profile" onClick={onClose}>
                <Text>Profile</Text>
              </Link>
              <Link to="/patient" onClick={onClose}>
                <Text>Patients</Text>
              </Link>
              <Link to="/doctor" onClick={onClose}>
                <Text>Doctors</Text>
              </Link>
              <Link to="/appointment" onClick={onClose}>
                <Text>Appointments</Text>
              </Link>
              <Link to="/staff" onClick={onClose}>
                <Text>Staff</Text>
              </Link>
              <Link to="/department" onClick={onClose}>
                <Text>Departments</Text>
              </Link>
              <Link to="/message" onClick={onClose}>
                <Text>Messages</Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
