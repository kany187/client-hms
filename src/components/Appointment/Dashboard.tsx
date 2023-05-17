import { Box, Button, Center, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAppointment from "../../hooks/appointments/useAppointment";
import AppointmentList from "./AppointmentList";

const Dashboard = () => {
  const { data, error } = useAppointment();

  return (
    <div>
      <SimpleGrid columns={4} ml="20" mt="10">
        <Box
          borderRadius="10px"
          border="1px solid rgba(255,255,255,0.25)"
          width="60%"
          height="130px"
          bg="teal.300"
        >
          <Center height="130">Total appointments: {data?.length}</Center>
        </Box>
        <Box
          borderRadius="10px"
          border="1px solid rgba(255,255,255,0.25)"
          width="60%"
          height="130px"
          bg="orange"
          alignItems="center"
        >
          <Center height="130px">Completed appointments: 20</Center>
        </Box>
        <Box
          borderRadius="10px"
          border="1px solid rgba(255,255,255,0.25)"
          width="60%"
          height="130px"
          bg="green.300"
          alignItems="center"
        >
          <Center height="130px">Remaining appointments: 20</Center>
        </Box>
        <Box
          borderRadius="10px"
          border="1px solid rgba(255,255,255,0.25)"
          width="60%"
          height="130px"
          bg="red.100"
          alignItems="center"
        >
          <Center height="130px">Total appointments: 20</Center>
        </Box>
      </SimpleGrid>
      <Link to="/add-appointment">
        <Button mt="5" mr="20" float="right">
          Add Appointment
        </Button>
      </Link>
      <Box mt="20">
        <AppointmentList />
      </Box>
    </div>
  );
};

export default Dashboard;
