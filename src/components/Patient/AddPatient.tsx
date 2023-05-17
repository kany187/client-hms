import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useAddPatient from "../../hooks/patients/useAddPatient";
import { Patient } from "../../hooks/patients/usePatient";
import { useNavigate } from "react-router-dom";

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  addressStreet: z.string(),
  addressCity: z.string(),
  phone: z.string(),
  gender: z.string(),
  dob: z.string(),
  occupation: z.string(),
  marital: z.string(),
  desc: z.string(),
});

type FormData = z.infer<typeof schema>;

export const AddPatient = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const addPatient = useAddPatient();

  const onSubmit = (data: Patient) => {
    if (addPatient.error) setTimeout(() => navigate("/patient"), 3000);

    addPatient.mutate(data);
    reset();
  };

  return (
    <div>
      <Box ml="20px">
        {addPatient.error && (
          <Alert status="error">
            <AlertIcon />
            {addPatient.error.message}
          </Alert>
        )}
        <Heading pt="20px"> Add New Patient</Heading>
        <Tabs position="relative" variant="unstyled" pt="20px">
          <TabList>
            <Tab>Personal Information</Tab>
            <Tab>Guardian Information</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />

          <TabPanels>
            <TabPanel>
              <Avatar bg="teal.500" size="2xl" />
              <form onSubmit={handleSubmit(onSubmit)}>
                <SimpleGrid columns={3} spacing={5} mt="20px">
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input {...register("firstName")} placeholder="Name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input {...register("lastName")} placeholder="Name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address Street</FormLabel>
                    <Input
                      {...register("addressStreet")}
                      placeholder="Street"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address City</FormLabel>
                    <Input {...register("addressCity")} placeholder="City" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input {...register("phone")} placeholder="05-111-11-00" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Input {...register("gender")} placeholder="Sex" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input {...register("dob")} placeholder="MM/DY/YR" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Ocupation</FormLabel>
                    <Input {...register("occupation")} placeholder="Etudiant" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Marital Status</FormLabel>
                    <Input {...register("marital")} placeholder="Marital" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Nationality</FormLabel>
                    <Input {...register("marital")} placeholder="Nationality" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Admission Date</FormLabel>
                    <Input
                      {...register("marital")}
                      placeholder="Admission date"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Doctor Assigned</FormLabel>
                    <Input {...register("marital")} placeholder="Doctor" />
                  </FormControl>

                  <Box>
                    <Text>Description</Text>
                    <Textarea {...register("desc")} placeholder="Add more" />
                    <Button colorScheme="teal" mt="15px" type="submit">
                      Save
                    </Button>
                  </Box>
                </SimpleGrid>
              </form>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns={3} spacing={5}>
                <form>
                  <FormControl>
                    <FormLabel>Guardien Name</FormLabel>
                    <Input placeholder="Name" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone number</FormLabel>
                    <Input placeholder="05 222-222-222" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input placeholder="2 Rue Makoua" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input placeholder="56" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Relation</FormLabel>
                    <Input placeholder="Father" />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Occupation</FormLabel>
                    <Input placeholder="Etudiant" />
                  </FormControl>
                  <Box>
                    <Text>Description</Text>
                    <Textarea placeholder="Add more" />
                    <Button colorScheme="teal" mt="15px">
                      Submit
                    </Button>
                  </Box>
                </form>
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
