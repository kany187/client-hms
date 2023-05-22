import {
  HStack,
  Avatar,
  AvatarBadge,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeSwitch } from "./ColorModeSwitch";

interface Props {
  user: any;
}

export const NavBar = ({ user }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <Heading size="md" ml="20px">
        Hospital Management Systems
      </Heading>
      <Flex justifyContent="flex-end" gap="5" alignItems="center">
        {!user && <Text align="center">Welcome</Text>}
        {user && <Text>Welcome {user.name}</Text>}
        <Link to={"/profile"}>
          <Avatar>
            <AvatarBadge borderColor="papayawhip" bg="tomato" boxSize="1.1em" />
          </Avatar>
        </Link>
        <ColorModeSwitch />
      </Flex>
    </HStack>
  );
};
