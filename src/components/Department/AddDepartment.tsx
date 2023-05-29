import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddDepartment from "../../hooks/department/useAddDepartment";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useRef, useState } from "react";
import { Department } from "../../hooks/department/useDepartment";
import useHospitalId from "../../hooks/hospital/useHospitalById";

export const schema = z.object({
  deptName: z.string(),
  phone: z.string(),
  deptHead: z.string(),
  hospitalId: z.string(),
});

type FormData = z.infer<typeof schema>;

export const AddDepartment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const addDept = useAddDepartment();
  //const hospitalId = useHospitalId("63f01dd3287907cfc10ea847");

  const onSubmit = (data: Department) => {
    addDept.mutate(data);
    reset();
  };

  return (
    <div>
      <Box pl="8px">
        <Button
          onClick={onOpen}
          leftIcon={<MdAdd />}
          colorScheme="teal"
          variant="solid"
        >
          Add a new department
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
            <ModalHeader>Add a New Department</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Department name</FormLabel>
                <Input
                  {...register("deptName")}
                  //ref={initialRef}
                  placeholder="Dept name"
                />
                {errors.deptName && <p>{errors.deptName.message}</p>}
                {error && <p>firstName must be at least 3 characters</p>}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone number</FormLabel>
                <Input {...register("phone")} placeholder="Phone number" />
                {errors.phone && <p>{errors.phone.message}</p>}
                {error && <p>lastName must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Department Head</FormLabel>
                <Input
                  {...register("deptHead")}
                  //ref={initialRef}
                  placeholder="Department Head"
                />
                {errors.deptHead && <p>{errors.deptHead.message}</p>}
                {error && <p>role must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Hospital</FormLabel>
                <Input
                  {...register("hospitalId")}
                  //ref={initialRef}
                  display="none"
                  value="63f0082ea526022014a5b323"
                  placeholder="Hospital ID"
                />
                {errors.hospitalId && <p>{errors.hospitalId.message}</p>}
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
