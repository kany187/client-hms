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
  Select,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddDoctor, { Doctor } from "../../hooks/doctors/useAddDoctor";
import useDepartment from "../../hooks/department/useDepartment";

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  departmentId: z.string(),
  specialty: z.string(),
  phone: z.string(),
  email: z.string(),
});

type FormData = z.infer<typeof schema>;

export const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [error, setError] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const addDoctor = useAddDoctor();
  const { data, isError } = useDepartment();
  //const hospitalId = useHospitalId("63f01dd3287907cfc10ea847");

  const onSubmit = (data: Doctor) => {
    addDoctor.mutate(data);
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
          Add a new doctor
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
            <ModalHeader>Add a New Doctor</ModalHeader>
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
                <FormLabel>Last Name</FormLabel>
                <Input {...register("lastName")} placeholder="Last Name" />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                {error && <p>lastName must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Department</FormLabel>
                <Select
                  {...register("departmentId")}
                  placeholder="Department"
                  width="100%"
                  onChange={(e) => setSelectedDept(e.target.value)}
                >
                  {data
                    ?.filter(
                      (item, index, array) =>
                        index ===
                        array.findIndex((i) => i.deptName === item.deptName)
                    )
                    .map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.deptName}
                      </option>
                    ))}
                </Select>
                {/* <Input
                  {...register("departmentId")}
                  //ref={initialRef}
                  placeholder="Department"
                /> */}
              </FormControl>
              <FormControl>
                <FormLabel>Specialty</FormLabel>
                <Input
                  {...register("specialty")}
                  //ref={initialRef}
                  placeholder="Specialty"
                />
                {errors.specialty && <p>{errors.specialty.message}</p>}
                {error && <p>status must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input {...register("phone")} placeholder="Phone" />
                {errors.phone && <p>{errors.phone.message}</p>}
                {error && <p>status must be at least 3 characters</p>}
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}
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
