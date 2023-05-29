import { Avatar, Flex, Text } from "@chakra-ui/react";
import { format } from "timeago.js";

interface Props {
  own: boolean;
  message: any;
}

export const Conversation = ({ message, own }: Props) => {
  return (
    <div>
      <Flex gap="2" mt="10" justifyContent={own ? "flex-end" : "flex-start"}>
        <Avatar src="https://bit.ly/broken-link" />
        <Text
          p="4"
          borderRadius={20}
          bg={own ? "blue.300" : "gray.300"}
          color={own ? "white" : "black"}
          w="30%"
          mr="5"
        >
          {message.text}
        </Text>
      </Flex>
      <Text ml="5" mr="5" textAlign={own ? "right" : "left"}>
        {format(message.createdAt)}
      </Text>
    </div>
  );
};
