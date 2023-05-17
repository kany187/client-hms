import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import employeeService, {
  Employee,
} from "../../services/employee/employee-service";

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  role: z.string().min(5),
  deptName: z.string().min(5),
  status: z.string(),
});

type FormData = z.infer<typeof schema>;

export const ModalAddStaff = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [satff, setStaff] = useState({
    firstname: "",
    lastname: "",
    role: "",
    department: "",
    status: "",
  });

  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmit = async (data: Employee) => {
    try {
      const response = await employeeService.create(data);
      // localStorage.setItem("token", response.headers["token"]);
      window.location.href = "/staff";
    } catch (err) {
      setError((err as AxiosError).message);
    }
  };

  return (
    <div>
      <Box pl="800px">
        <Button
          onClick={onOpen}
          leftIcon={<MdAdd />}
          colorScheme="teal"
          variant="solid"
        >
          Add a new member
        </Button>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Add a member</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  {...register("firstName")}
                  //ref={initialRef}
                  placeholder="First name"
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                {error && <p>firstName must be at least 3 characters</p>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input {...register("lastName")} placeholder="Last name" />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                {error && <p>lastName must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  {...register("role")}
                  //ref={initialRef}
                  placeholder="Role"
                />
                {errors.role && <p>{errors.role.message}</p>}
                {error && <p>role must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Department</FormLabel>
                <Input
                  {...register("deptName")}
                  //ref={initialRef}
                  placeholder="Department"
                />
                {errors.deptName && <p>{errors.deptName.message}</p>}
                {error && <p>deptName must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Input
                  {...register("status")}
                  //ref={initialRef}
                  placeholder="Status"
                />
                {errors.status && <p>{errors.status.message}</p>}
                {error && <p>status must be at least 3 characters</p>}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};
