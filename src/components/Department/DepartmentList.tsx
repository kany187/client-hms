import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useDepartment from "../../hooks/department/useDepartment";

export const DepartmentList = () => {
  const { data, isLoading, error } = useDepartment();
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
              <Th>Department Name</Th>
              <Th>Hospita Name</Th>
              <Th>DepartmentHead</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((s) => (
              <Tr key={s._id}>
                <Td>{s.deptName}</Td>
                <Td>{s.hospitalId.hospitalName}</Td>
                <Td>{s.deptHead}</Td>
                <Td>{s.phone}</Td>
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
