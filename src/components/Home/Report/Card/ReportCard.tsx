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
      borderRadius="xl"
      w={{ base: "100%", sm: "200px", md: "220px", lg: "240px" }}
      h={{ base: "140px", sm: "160px", md: "180px" }}
      p={{ base: "4", sm: "5", md: "6" }}
      alignItems="center"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      shadow="md"
      _hover={{ 
        shadow: "lg", 
        transform: "translateY(-2px)",
        transition: "all 0.2s ease-in-out"
      }}
      transition="all 0.2s ease-in-out"
      border="1px solid"
      borderColor="gray.100"
    >
      <Flex gap="3" alignItems="center" mb="4" alignSelf="start">
        <Box>{renderIcon()}</Box>
        <Text as="b" fontSize={{ base: "sm", md: "md" }} color="gray.700">
          {title}
        </Text>
      </Flex>
      <Text 
        as="b" 
        alignSelf="start" 
        fontSize={{ base: "2xl", md: "3xl" }} 
        color="blue.600"
        mb="3"
      >
        {renderCount()}
      </Text>
      <Stack spacing={2} direction="row" align="center" mb="0px">
        <Text as="b" fontSize={{ base: "xs", sm: "sm" }} color="gray.500">
          Last 7 days
        </Text>
        <MdOutlineTrendingUp className="icon-two" />
        <Text fontSize={{ base: "xs", sm: "sm" }} color="green.500" fontWeight="semibold">
          +2.1%
        </Text>
      </Stack>
    </Card>
  );
};
