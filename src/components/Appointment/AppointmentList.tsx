import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
} from "@chakra-ui/react";
import useAppointment from "../../hooks/appointments/useAppointment";

const AppointmentList = () => {
  const { data, error, isLoading } = useAppointment();

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Patient ID</Th>
              <Th>Doctor ID</Th>
              <Th>Type</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((apt) => (
              <Tr key={apt._id}>
                <Td>{apt._id}</Td>
                <Td>{apt.patientId}</Td>
                <Td>{apt.doctorId}</Td>
                <Td>{apt.type}</Td>
                <Td>{apt.status}</Td>
                <Td>{apt.date}</Td>
                <Td>{apt.time}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Text mt="10">
              Showing now {data?.length} / {data?.length} entries
            </Text>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppointmentList;
