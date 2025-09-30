import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  Badge,
  Divider,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import usePatientId from "../../hooks/patients/usePatientId";
import { PatientTabComponent } from "./PatientTab.tsx/PatientTabComponent";

export const PatientProfile = () => {
  const { id } = useParams();
  const { data: patient, isLoading, error } = usePatientId(id!);
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Error loading patient!</AlertTitle>
            <AlertDescription>
              Unable to load patient information. Please try again.
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="warning" borderRadius="md">
          <AlertIcon />
          <AlertTitle>Patient not found!</AlertTitle>
          <AlertDescription>
            The requested patient could not be found.
          </AlertDescription>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Patient Header */}
        <Card bg={bgColor} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <HStack spacing={6} align="start">
              <Avatar bg="teal.500" size="2xl" />
              <VStack align="start" spacing={2} flex="1">
                <Heading size="lg" color={textColor}>
                  {patient.firstName} {patient.lastName}
                </Heading>
                <HStack spacing={4} wrap="wrap">
                  <Badge colorScheme="teal" variant="subtle">
                    Patient ID: {patient._id}
                  </Badge>
                  <Badge colorScheme="blue" variant="subtle">
                    Room: 230-B
                  </Badge>
                </HStack>
                <HStack spacing={6} mt={4} wrap="wrap">
                  <HStack spacing={2}>
                    <FaPhone color="#319795" />
                    <Text fontSize="sm" color={textColor}>
                      {patient.phone || "N/A"}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <FaEnvelope color="#319795" />
                    <Text fontSize="sm" color={textColor}>
                      {patient.email || "N/A"}
                    </Text>
                  </HStack>
                  <HStack spacing={2}>
                    <FaCalendar color="#319795" />
                    <Text fontSize="sm" color={textColor}>
                      {patient.dob || "N/A"}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Main Content Grid */}
        <Grid
          templateAreas={{
            base: `"nav" "main" "footer"`,
            lg: `"nav main" "nav footer"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "400px 1fr",
          }}
          gap={6}
        >
          <GridItem area="nav">
            <PatientTabComponent data={patient} id={id!} />
          </GridItem>
          
          <GridItem area="main">
            <Card bg={bgColor} border="1px solid" borderColor={borderColor} h="full">
              <CardHeader>
                <Heading size="md" color={textColor}>
                  Blood Report
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Text color={textColor}>
                    No blood report information available at this time.
                  </Text>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">
                      Last Updated: N/A
                    </Text>
                    <Badge colorScheme="gray" variant="subtle">
                      No Data
                    </Badge>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem area="footer">
            <Card bg={bgColor} border="1px solid" borderColor={borderColor} h="full">
              <CardHeader>
                <Heading size="md" color={textColor}>
                  Blood Pressure
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Text color={textColor}>
                    No blood pressure readings available at this time.
                  </Text>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="gray.500">
                      Last Reading: N/A
                    </Text>
                    <Badge colorScheme="gray" variant="subtle">
                      No Data
                    </Badge>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};
