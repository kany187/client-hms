import {
  Box,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import useStaffInfo from "../../hooks/staffs/useStaffInfo";
import { StaffQuery } from "../../pages/Staff/Staffs";

interface Props {
  staffQuery: StaffQuery;
}
export const StaffMain = ({ staffQuery }: Props) => {
  const { data, error, isLoading } = useStaffInfo(staffQuery);

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

  if (data?.length === 0)
    return <Text>There are no staff in the database.</Text>;

  return (
    <Box>
      <Text pt="5">Showing {data?.length} staff member in the database</Text>
      <TableContainer pt="35px">
        <Table>
          <Thead>
            <Tr>
              <Th>Full name</Th>
              <Th>Role</Th>
              <Th>Department</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((s) => (
              <Tr key={s._id}>
                <Td>
                  {s.employeeId.firstName} {s.employeeId.lastName}
                </Td>
                <Td>{s.role}</Td>
                <Td>{s.deptName}</Td>
                <Td>{s.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
