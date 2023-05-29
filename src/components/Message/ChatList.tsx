import {
  Avatar,
  Box,
  Circle,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import useEmployeeId from "../../hooks/employee/useEmployeeId";

interface Props {
  conversation: any;
  currentUser: string;
}
export const ChatList = ({ conversation, currentUser }: Props) => {
  const friendId = conversation.members.find((m: string) => m !== currentUser);

  const { data } = useEmployeeId(friendId);

  return (
    <div>
      <List spacing={3} pt="5">
        <ListItem>
          <Stack direction="row" spacing={5} pt="2">
            <Avatar src="https://bit.ly/broken-link" />
            <Box w="100%">
              <Flex justifyContent="space-between" mr="5">
                <Text as="b">
                  {data?.firstName} {data?.lastName}
                </Text>
                <Text>15:03</Text>
              </Flex>
              <Flex justifyContent="space-between" pt="2" mr="5">
                <Text>House, my patient needs a new kidney.....!</Text>
                <Circle bg="green.500" size="5" fontSize={12} color="white">
                  2
                </Circle>
              </Flex>
            </Box>
          </Stack>
        </ListItem>
      </List>
    </div>
  );
};
