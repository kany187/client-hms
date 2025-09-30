import { 
  Spinner, 
  SimpleGrid, 
  Box, 
  Text, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription,
  useColorModeValue,
  Container
} from "@chakra-ui/react";
import useDoctors from "../../hooks/doctors/useDoctors";
import { DoctorCard } from "./DoctorCard";
import { LoadingSpinner } from "../Common/LoadingSpinner";

export const DoctorList = () => {
  const { data, isLoading, error } = useDoctors();
  const textColor = useColorModeValue("gray.600", "gray.300");

  if (isLoading) {
    return <LoadingSpinner message="Loading doctors..." />;
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Error loading doctors!</AlertTitle>
            <AlertDescription>
              Unable to load doctor information. Please try again later.
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" py={12}>
          <Text color={textColor} fontSize="lg">
            No doctors found
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        spacing={6}
        gap={4}
      >
        {data.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
