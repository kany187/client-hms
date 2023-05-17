import { Box, Card, Flex, Stack, Text } from "@chakra-ui/react";
import { MdOutlineTrendingUp } from "react-icons/md";

import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";

import "./ReportCard.css";
import usePatient from "../../../../hooks/patients/usePatient";
import useAppointment from "../../../../hooks/appointments/useAppointment";
import useRole from "../../../../hooks/useRole";

interface Props {
  title: string;
}

export const ReportCard = ({ title }: Props) => {
  const { data: patient } = usePatient();
  const { data: appointment } = useAppointment();
  const { data: staff } = useRole();

  const renderCount = () => {
    switch (title) {
      case "Patient":
        return patient?.length;
      case "Appointment":
        return appointment?.length;
      case "Staff":
        return staff?.length;
      case "Doctor":
        return 19;
    }
  };

  const renderIcon = () => {
    switch (title) {
      case "Patient":
        return <RiUserReceivedFill className="icon-one" />;
      case "Appointment":
        return <RiStethoscopeFill className="icon-one" />;
      case "Staff":
        return <HiUserGroup className="icon-one" />;
      case "Doctor":
        return <FaUserTie className="icon-one" />;
    }
  };

  return (
    <Card
      borderRadius={10}
      w="150px"
      h="130px"
      pt="15px"
      alignItems="center"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex gap="1" alignItems="center" mb="2" ml="1" alignSelf="start">
        <Box>{renderIcon()}</Box>
        <Text as="b">{title}</Text>
      </Flex>
      <Text as="b" alignSelf="start" ml="15px" mb="10px">
        {renderCount()}
      </Text>
      <Stack spacing={3} direction="row" align="center" mb="0px">
        <Text as="b" fontSize="10px">
          Last 7 days
        </Text>
        <MdOutlineTrendingUp className="icon-two" />
        <Text fontSize="10px" color="teal">
          2.1%
        </Text>
      </Stack>
    </Card>
  );
};
