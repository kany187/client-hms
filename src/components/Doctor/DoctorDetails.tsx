import { Box, Button, Heading, Image, Stack, Text } from "@chakra-ui/react";
import doctor from "../../assets/doctor.jpg";

export const DoctorDetails = () => {
  return (
    <div>
      <Stack direction="row" spacing={8} pt="10">
        <Box ml="15px" m="5">
          <Image
            boxSize="500px"
            objectFit="cover"
            borderRadius={10}
            src={doctor}
          />
          <Box m="5">
            <Heading></Heading>
            <Text>Department</Text>
            <Text>Gender</Text>
            <Text>Primary Location</Text>
            <Text>Contact Information</Text>
          </Box>
        </Box>
        <Box>
          <Text>Medical Education</Text>
        </Box>
      </Stack>
      <Button>Edit</Button>
    </div>
  );
};
