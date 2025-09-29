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
            <Text>Patient ID: {appointment?.patientId}</Text>
            <Divider />
            <Text>Doctor ID: {appointment?.doctorId}</Text>
            <Divider />
            <Text>Department ID: {appointment?.departmentId}</Text>
            <Divider />
            <Text>Type: {appointment?.type}</Text>
            <Divider />
            <Text>Status: {appointment?.status}</Text>
            <Divider />
            <Text>Date: {appointment?.date}</Text>
            <Divider />
            <Text>Time: {appointment?.time}</Text>
            <Divider />
            <Text>Notes: {appointment?.notes || 'No notes'}</Text>
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
