import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Divider,
  Stack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useAppointmentDelete from "../../../hooks/appointments/useAppointmentDelete";
import useAppointmentId from "../../../hooks/appointments/useAppointmentId";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  id: string;
}

export const AppointmentDetail = ({ isOpen, isClose, id }: Props) => {
  const { data: appointment, isLoading, error } = useAppointmentId(id);
  const { mutate, isSuccess } = useAppointmentDelete(id);

  const handleDelete = () => {
    mutate();
  };

  return (
    <>
      {error && <p>Error fetching the appointment</p>}
      {isSuccess && (
        <Alert status="success">
          <AlertIcon />
          The patient has been deleted!
        </Alert>
      )}
      <Modal isOpen={isOpen} onClose={isClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Appointment Detail</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text>Patient Name: {appointment?.patientName}</Text>
            <Divider />
            <Text>Phone number: {appointment?.phone}</Text>
            <Divider />
            <Text>Doctor: {appointment?.doctor}</Text>
            <Divider />
            <Text>Date: {appointment?.startDate}</Text>
            <Divider />
            <Text>Start Time: {appointment?.startTime}</Text>
            <Divider />
            <Text>End Time: {appointment?.endTime}</Text>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row">
              <Button type="submit">Update</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
