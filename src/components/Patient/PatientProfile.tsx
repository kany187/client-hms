import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import usePatientId from "../../hooks/patients/usePatientId";
import { PatientTabComponent } from "./PatientTab.tsx/PatientTabComponent";

export const PatientProfile = () => {
  const { id } = useParams();

  const { data: patient, isLoading, error } = usePatientId(id!);
  //if (error) return <p>{error.m}</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <Box ml="20px" pt="20px">
        <Heading>Patient Profile</Heading>
        <Grid
          templateAreas={`"nav main"
        "nav footer"
        `}
          gridTemplateRows={"250px 1fr"}
          gridTemplateColumns={"950px 1fr 10px"}
          h="500px"
          gap="1"
          pt="20px"
        >
          <GridItem area={"nav"}>
            <Stack direction="row" alignItems="center" pt="20px" pb="20px">
              <Avatar bg="teal.500" size="lg" ml="20px" />
              <Box>
                <Text>
                  {patient?.firstName} {patient?.lastName}
                </Text>
                <Text>Ro no. 230-B</Text>
              </Box>
            </Stack>
            <PatientTabComponent data={patient!} id={id!} />
          </GridItem>
          <GridItem area={"main"}>
            <Heading as="h3" size="lg" ml="10px">
              Blood Report
            </Heading>
            <Text ml="10px">No info available</Text>
          </GridItem>
          <GridItem area={"footer"}>
            <Heading as="h3" size="lg" ml="10px">
              Blood Pressure
            </Heading>
            <Text ml="10px">No info available</Text>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};
