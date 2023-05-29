import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import useAddAppointment from "../../../hooks/appointments/useAddAppointment";
import { Appointment } from "../../../hooks/appointments/useAppointment";

const schema = z.object({
  patientName: z
    .string()
    .min(3, { message: "Patient Name should be at leats 3 characters" })
    .max(50),
  title: z.string().min(3).max(50),
  phone: z.string().min(5),
  service: z.string().min(5),
  doctor: z.string().min(5),
  startDate: z.string(),
  startTime: z.string(),
  // endTime: z.string(),
  desc: z.string(),
});

type AppointmentForm = z.infer<typeof schema>;

interface Props {
  dateRange: string;
  isOpen: boolean;
  isClose: () => void;
  deptName: string;
  doctorName: string;
}

export const AddAppointmentForm = ({
  dateRange,
  isOpen,
  isClose,
  deptName,
  doctorName,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentForm>({ resolver: zodResolver(schema) });

  const appointment = useAddAppointment();

  const isError = !isEmpty(errors);

  const onSubmit = (data: Appointment) => {
    appointment.mutate(data);
    reset();
  };

  const toast = useToast();

  return (
    <>
      <Modal isOpen={isOpen} onClose={isClose}>
        <ModalOverlay />

        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create New Appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={isError}>
                <FormLabel>Patient Name</FormLabel>
                <Input
                  {...register("patientName")}
                  type="name"
                  placeholder="Patient Name"
                />
                {errors.patientName && (
                  <FormErrorMessage>
                    {errors.patientName.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isError}>
                <FormLabel>Title</FormLabel>
                <Input {...register("title")} type="name" placeholder="Title" />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isError}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  {...register("phone")}
                  type="name"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Dept</FormLabel>
                <Input
                  {...register("service")}
                  type="name"
                  placeholder="Dept"
                  value={deptName}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Doctor</FormLabel>
                <Input
                  {...register("doctor")}
                  type="name"
                  placeholder="Doctor name"
                  value={doctorName}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  {...register("startDate")}
                  type="name"
                  value={dateRange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input {...register("startTime")} type="time" />
              </FormControl>
              {/* <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input {...register("endTime")} type="time" />
              </FormControl> */}
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("desc")} placeholder="desc"></Textarea>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Create</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {appointment.isSuccess && (
        <Button
          onClick={() =>
            toast({
              title: "Appointment created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            })
          }
        ></Button>
      )}
    </>
  );
};
