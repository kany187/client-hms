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
              <Th>Name</Th>
              <Th>Service</Th>
              <Th>Consulting doctor</Th>
              <Th>Condition</Th>
              <Th>Visit Time</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((apt) => (
              <Tr>
                <Td>{apt.title}</Td>
                <Td>{apt.service}</Td>
                <Td>{apt.startDate}</Td>
                <Td>{apt.title}</Td>
                <Td>{apt.startTime}</Td>
                <Td>...</Td>
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
