import {
  Button,
  ButtonGroup,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePutUsers from "../../hooks/users/usePutUsers";
import useUser, { User } from "../../services/user/useUser";

export const schema = z.object({
  name: z.string(),
  email: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Avatar {
  user: User;
  id: string;
}

export const ProfileDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const removeEmptyValues = (obj: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  const { data } = useUser();

  const useArr = Object.values(data || {});

  //console.log(typeof useArr[0]);
  const updateUser = usePutUsers("644b3377ff36b1efb6f6656f");

  const onSubmit = (data: User) => {
    updateUser.mutate(removeEmptyValues(data));
    reset();
  };

  return (
    <div>
      <TableContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table variant="unstyled">
            <Tbody>
              <Tr>
                <Td>Name</Td>
                <Input
                  {...register("name")}
                  placeholder={`${useArr[1]}`}
                  w="35%"
                />
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Input
                  {...register("email")}
                  placeholder={`${useArr[2]}`}
                  w="35%"
                />
              </Tr>
            </Tbody>
          </Table>
          <ButtonGroup spacing={6} mt="10">
            <Button colorScheme="teal" type="submit">
              Update
            </Button>
            <Button colorScheme="red">Delete</Button>
          </ButtonGroup>
        </form>
      </TableContainer>
    </div>
  );
};
