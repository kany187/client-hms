import { Box, Divider, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useConversation from "../../hooks/chats/useConversation";

import { ChatForm } from "./ChatForm";
import { ChatList } from "./ChatList";
import { socket } from "../../services/socket/socket";

export const Chat = () => {
  const { data: conversation } = useConversation("646c24273390b3eced07a725");

  const [chat, setChat] = useState<any>("");
  //const [socket, setSocket] = useState<any>(null);

  //const socket = io("ws://localhost:4000");

  console.log(socket);

  //   useEffect(() => {
  //     setSocket(io("http://localhost:4000"));
  //   }, []);

  //   console.log(socket);

  //   useEffect(() => {
  //     socket?.on("welcome", (message: string) => {
  //       console.log(message);
  //     });
  //   }, [socket]);

  return (
    <div>
      <Text>Chat</Text>
      <SimpleGrid columns={2}>
        <Box>
          <Input placeholder="search" w="30" />
          <Divider pt="5" />
          {conversation?.map((c) => {
            return (
              <div onClick={() => setChat(c)}>
                <ChatList
                  conversation={c}
                  currentUser="646c24273390b3eced07a725"
                />
              </div>
            );
          })}
        </Box>
        <Box>
          <ChatForm currentChat={chat} userId="646c24273390b3eced07a725" />
        </Box>
      </SimpleGrid>
    </div>
  );
};
