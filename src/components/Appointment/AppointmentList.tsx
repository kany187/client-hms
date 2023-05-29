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
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Date</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((apt) => (
              <Tr>
                <Td>{apt._id}</Td>
                <Td>{apt.patientName}</Td>
                <Td>{apt.phone}</Td>
                <Td>{apt.startDate}</Td>
                <Td>{apt.startTime}</Td>
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
