import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  ButtonGroup,
  Input,
  Alert,
  AlertIcon,
  Textarea,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Patient } from "../../../hooks/patients/usePatient";
import usePatientDelete from "../../../hooks/patients/usePatientDelete";
import usePutPatient from "../../../hooks/patients/usePutPatient";
import { schema } from "../AddPatient";

interface Props {
  data: Patient;
  id: string;
}

type FormData = z.infer<typeof schema>;

export const PatientTabComponent = ({ data, id }: Props) => {
  const dob = new Date(data.dob);
  const age = Math.floor(
    (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const removeEmptyValues = (obj: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== "") {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading, isSuccess } = usePatientDelete(id!);

  const putPatient = usePutPatient(id!);

  const navigate = useNavigate();

  const handleDelete = () => {
    mutate();

    setTimeout(() => navigate("/patient"), 1000);
  };

  const onSubmit = (data: Patient) => {
    putPatient.mutate(removeEmptyValues(data));

    setTimeout(() => navigate("/patient"), 5000);

    reset();
  };

  return (
    <div>
      {isSuccess && (
        <Alert status="success">
          <AlertIcon />
          The patient has been deleted!
        </Alert>
      )}
      {putPatient.isSuccess && (
        <Alert status="success">
          <AlertIcon />
          The patient has been updated!
        </Alert>
      )}
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Patient Information</Tab>
          <Tab>Visits</Tab>
          <Tab>Lab</Tab>
          <Tab>Prescription</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <TableContainer>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Table variant="unstyled">
                  <Tbody>
                    <Tr>
                      <Td>First Name</Td>
                      <Input
                        {...register("firstName")}
                        placeholder={data.firstName}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Last Name</Td>
                      <Input
                        {...register("lastName")}
                        placeholder={data.lastName}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Date of Birth</Td>
                      <Input
                        {...register("dob")}
                        placeholder={new Date(data.dob).toLocaleDateString()}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Age</Td>
                      <Td>{age} years old</Td>
                    </Tr>
                    <Tr>
                      <Td>Address Street</Td>
                      <Input
                        {...register("addressStreet")}
                        placeholder={data.addressStreet}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Adress City</Td>
                      <Input
                        {...register("addressCity")}
                        placeholder={data.addressCity}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Phone</Td>
                      <Input
                        {...register("phone")}
                        placeholder={data.phone}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Gender</Td>
                      <Input
                        {...register("gender")}
                        placeholder={data.gender}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Marital Status</Td>
                      {data.marital ? (
                        <Input
                          {...register("marital")}
                          placeholder={data.marital}
                          w="35%"
                        />
                      ) : (
                        <Td>Unknow...</Td>
                      )}
                    </Tr>
                    <Tr>
                      <Td>Occupation</Td>
                      <Input
                        {...register("occupation")}
                        placeholder={data.occupation}
                        w="35%"
                      />
                    </Tr>
                    <Tr>
                      <Td>Description</Td>
                      <Textarea {...register("desc")} placeholder={data.desc} />
                    </Tr>
                  </Tbody>
                </Table>
                <ButtonGroup spacing={6} mt="10">
                  <Button colorScheme="teal" type="submit">
                    Update
                  </Button>

                  <Button colorScheme="red" onClick={handleDelete}>
                    {isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </ButtonGroup>
              </form>
            </TableContainer>
          </TabPanel>
          <TabPanel>No info available</TabPanel>
          <TabPanel>No info available</TabPanel>
          <TabPanel>No info available</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
