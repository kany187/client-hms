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
  Box,
  Text,
  Badge,
  Stack,
  Show,
  Hide,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Flex,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUser, FaPhone, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import usePatient from "../../hooks/patients/usePatient";
import { Patient } from "../../types";

export const PatientList = () => {
  const { data, isLoading, error } = usePatient();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (error) {
    return (
      <Box textAlign="center" py="8">
        <Text color="red.500">Error loading patients</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box textAlign="center" py="8">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box textAlign="center" py="8">
        <Text color="gray.500">No patients found</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Show above="md">
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Patient Name</Th>
                <Th>Gender</Th>
                <Th>Phone</Th>
                <Th>Date of Birth</Th>
                <Th>Room No</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((patient: Patient) => (
                <Tr key={patient._id}>
                  <Td>
                    <Stack direction="row" align="center" spacing={2}>
                      <Icon as={FaUser} color="teal.500" />
                      <Text fontWeight="medium">
                        {patient.firstName} {patient.lastName}
                      </Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Badge 
                      colorScheme={patient.gender === 'male' ? 'blue' : 'pink'}
                      variant="subtle"
                    >
                      {patient.gender}
                    </Badge>
                  </Td>
                  <Td>
                    <Stack direction="row" align="center" spacing={2}>
                      <Icon as={FaPhone} color="gray.500" />
                      <Text fontSize="sm">{patient.phone}</Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Stack direction="row" align="center" spacing={2}>
                      <Icon as={FaCalendar} color="gray.500" />
                      <Text fontSize="sm">{patient.dob}</Text>
                    </Stack>
                  </Td>
                  <Td>
                    <Text fontSize="sm">{patient.roomNumber || 'N/A'}</Text>
                  </Td>
                  <Td>
                    <Badge colorScheme="green" variant="subtle">
                      Active
                    </Badge>
                  </Td>
                  <Td>
                    <Link to={`/patient/${patient._id}`}>
                      <Button size="sm" colorScheme="teal" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Show>

      <Hide above="md">
        <Stack spacing={4}>
          {data.map((patient: Patient) => (
            <Card key={patient._id} variant="outline">
              <CardHeader pb={2}>
                <Flex justify="space-between" align="center">
                  <Heading size="sm">
                    {patient.firstName} {patient.lastName}
                  </Heading>
                  <Badge colorScheme="green" variant="subtle">
                    Active
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <Stack spacing={2}>
                  <Flex align="center" gap={2}>
                    <Icon as={FaUser} color="teal.500" />
                    <Text fontSize="sm" color="gray.600">
                      {patient.gender}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <Icon as={FaPhone} color="gray.500" />
                    <Text fontSize="sm">{patient.phone}</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <Icon as={FaCalendar} color="gray.500" />
                    <Text fontSize="sm">{patient.dob}</Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <Icon as={FaMapMarkerAlt} color="gray.500" />
                    <Text fontSize="sm">{patient.roomNumber || 'No room assigned'}</Text>
                  </Flex>
                  <Flex justify="flex-end" mt={2}>
                    <Link to={`/patient/${patient._id}`}>
                      <Button size="sm" colorScheme="teal" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Hide>
    </Box>
  );
};
