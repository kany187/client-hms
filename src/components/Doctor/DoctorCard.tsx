import {
  Avatar,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { BiPhone } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Doctors } from "../../hooks/doctors/useDoctors";

interface Props {
  doctor: Doctors;
}

export const DoctorCard = ({ doctor }: Props) => {
  return (
    <Card borderRadius={10} textAlign="center" maxW="sm">
      <Image src={doctor.background_img} />
      <CardBody>
        <Avatar size="md" src="https://bit.ly/broken-link" />
        <Heading size="md">
          {doctor.employeeId.firstName} {doctor.employeeId.lastName}
        </Heading>
        <Text>Deptartment: {doctor.specialty}</Text>
        <Text>{doctor.departmentId.deptName}</Text>
        <Flex flex="1" alignItems="center" gap="1" justifyContent="center">
          <Icon as={BiPhone} />
          <Text>{doctor.employeeId.phone}</Text>
        </Flex>
        <Link to={"/doctor/" + doctor._id}>
          <Button>More details</Button>
        </Link>
      </CardBody>
    </Card>
  );
};
