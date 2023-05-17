import {
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import usePatient from "../../hooks/patients/usePatient";

export const PatientList = () => {
  const { data, isLoading, error } = usePatient();

  if (error) return null;

  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );

  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Patient Name</Th>
              <Th>Gender</Th>
              <Th>Doctor Assigned</Th>
              <Th>Condition</Th>
              <Th>Room No</Th>
              <Th>Date Checked In</Th>
              <Th>Patient Profile</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((s) => (
              <Tr key={s._id}>
                <Td>
                  {s.firstName} {s.lastName}
                </Td>
                <Td>{s.gender}</Td>
                <Td>{s.phone}</Td>
                <Td>{s.gender}</Td>
                <Td>{s.dob}</Td>
                <Td></Td>
                <Td>
                  <Link to={"/patient/" + s._id}>
                    <Button>More details</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
