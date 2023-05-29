import { Avatar, Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useAddMessage from "../../hooks/chats/useAddMessage";

import { Message, useMessageId } from "../../hooks/chats/useMessageId";
import { Conversation } from "./Conversation/Conversation";

interface Props {
  currentChat: any;
  userId: string;
}

export const schema = z.object({
  text: z.string(),
  conversationId: z.string(),
  sender: z.string(),
});

type FormData = z.infer<typeof schema>;

export const ChatForm = ({ currentChat, userId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { data } = useMessageId(currentChat._id);

  const postMessage = useAddMessage();

  const onSubmit = (data: Message) => {
    postMessage.mutate(data);
    reset();
  };
  return (
    <div>
      <Stack>
        <Box h="150" bg="blackAlpha.100">
          <Stack direction="row" spacing={5} pt="20">
            <Avatar src="https://bit.ly/broken-link" />
            <Stack direction="column">
              <Text as="b">James Wilson</Text>
              <Text fontSize={17}>Online</Text>
            </Stack>
          </Stack>
        </Box>
        {currentChat ? (
          <>
            <Box maxHeight="70vh" overflowY="scroll">
              {data?.map((m) => {
                return <Conversation message={m} own={m.sender === userId} />;
              })}
            </Box>

            <Stack direction="row" spacing={2}>
              <Button>+</Button>
              <Button>+</Button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("text")} placeholder="message" />

                <Input
                  display="none"
                  {...register("sender")}
                  value={userId}
                  placeholder="message"
                />

                <Input
                  display="none"
                  {...register("conversationId")}
                  value={currentChat._id}
                  placeholder="message"
                />
                <Button type="submit">Send</Button>
              </form>
            </Stack>
          </>
        ) : (
          <Text pt="20" fontSize={50} color="gray.300">
            Open a conversation to start a chat
          </Text>
        )}
      </Stack>
    </div>
  );
};
