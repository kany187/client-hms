import { 
  Box, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  useColorModeValue,
  SimpleGrid,
  Button,
  IconButton,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  CardHeader
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useState } from "react";
import useAppointment from "../../../hooks/appointments/useAppointment";

export const WeeklyCalendar = () => {
  const { data, isLoading, error } = useAppointment();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const todayBg = useColorModeValue("teal.50", "teal.900");
  const headerBg = useColorModeValue("teal.50", "teal.900");

  // Mock data fallback
  const mockAppointments = [
    {
      _id: '1',
      patientId: 'p1',
      doctorId: 'd1',
      departmentId: 'dept1',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      status: 'scheduled' as const,
      type: 'consultation' as const,
      notes: 'Regular checkup',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      patientId: 'p2',
      doctorId: 'd2',
      departmentId: 'dept2',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '14:00',
      status: 'scheduled' as const,
      type: 'follow-up' as const,
      notes: 'Follow-up appointment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      patientId: 'p3',
      doctorId: 'd3',
      departmentId: 'dept1',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '10:30',
      status: 'scheduled' as const,
      type: 'emergency' as const,
      notes: 'Emergency consultation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const appointmentData = (data && data.length > 0) ? data : mockAppointments;

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getAppointmentsForDate = (date: Date) => {
    if (!appointmentData) return [];
    return appointmentData.filter(app => {
      const appDate = new Date(app.date);
      return appDate.toDateString() === date.toDateString();
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    if (direction === 'prev') {
      newDate.setDate(currentWeek.getDate() - 7);
    } else {
      newDate.setDate(currentWeek.getDate() + 7);
    }
    setCurrentWeek(newDate);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const weekDays = getWeekDays(currentWeek);
  const today = new Date();

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner color="teal.500" size="lg" />
        <Text mt={4} color={textColor}>Loading calendar...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text>Error loading calendar data</Text>
        </Alert>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" h="full">
      {/* Header */}
      <Box bg={headerBg} borderRadius="lg" p={4}>
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <FaCalendarAlt color="#319795" size="20" />
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Weekly View
              </Text>
              <Text fontSize="sm" color="gray.500">
                {appointmentData?.length || 0} appointments this week
              </Text>
            </VStack>
          </HStack>
          <Badge colorScheme="teal" variant="solid" fontSize="sm" px={3} py={1}>
            <FaClock style={{ marginRight: '4px' }} />
            {getAppointmentsForDate(today).length} today
          </Badge>
        </HStack>
      </Box>

      {/* Week Navigation */}
      <Flex align="center" justify="space-between">
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          Week of {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </Text>
        <HStack spacing={2}>
          <IconButton
            aria-label="Previous week"
            icon={<FaChevronLeft />}
            size="sm"
            variant="outline"
            onClick={() => navigateWeek('prev')}
            colorScheme="teal"
          />
          <Button size="sm" variant="outline" onClick={goToToday} colorScheme="teal">
            Today
          </Button>
          <IconButton
            aria-label="Next week"
            icon={<FaChevronRight />}
            size="sm"
            variant="outline"
            onClick={() => navigateWeek('next')}
            colorScheme="teal"
          />
        </HStack>
      </Flex>

      {/* Weekly Grid */}
      <SimpleGrid columns={7} spacing={3}>
        {weekDays.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          const appointments = getAppointmentsForDate(day);
          const isCurrentMonth = day.getMonth() === currentWeek.getMonth();

          return (
            <Card 
              key={index}
              bg={isToday ? todayBg : bgColor}
              border="1px solid"
              borderColor={isToday ? "teal.300" : borderColor}
              borderRadius="lg"
              overflow="hidden"
              _hover={{ 
                transform: 'translateY(-2px)',
                shadow: 'md',
                transition: 'all 0.2s ease-in-out'
              }}
              transition="all 0.2s ease-in-out"
            >
              <CardHeader pb={2}>
                <VStack spacing={1}>
                  <Text 
                    fontSize="sm" 
                    fontWeight="bold" 
                    color={isCurrentMonth ? (isToday ? 'teal.600' : textColor) : 'gray.400'}
                  >
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text 
                    fontSize="lg" 
                    fontWeight={isToday ? 'bold' : 'normal'}
                    color={isCurrentMonth ? (isToday ? 'teal.600' : textColor) : 'gray.400'}
                  >
                    {day.getDate()}
                  </Text>
                </VStack>
              </CardHeader>
              
              <CardBody pt={0}>
                <VStack spacing={1} align="stretch">
                  {appointments.length > 0 ? (
                    appointments.slice(0, 3).map((app, idx) => (
                      <Box
                        key={idx}
                        bg="teal.100"
                        borderRadius="sm"
                        p={1}
                        borderLeft="3px solid"
                        borderLeftColor="teal.500"
                      >
                        <Text fontSize="xs" fontWeight="medium" color="teal.700">
                          {app.time}
                        </Text>
                        <Text fontSize="xs" color="teal.600">
                          {app.type}
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text fontSize="xs" color="gray.400" textAlign="center" py={2}>
                      No appointments
                    </Text>
                  )}
                  
                  {appointments.length > 3 && (
                    <Text fontSize="xs" color="teal.500" textAlign="center" fontWeight="bold">
                      +{appointments.length - 3} more
                    </Text>
                  )}
                </VStack>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>

      {/* Today's Summary */}
      {getAppointmentsForDate(today).length > 0 && (
        <Box bg={todayBg} borderRadius="lg" p={4}>
          <HStack mb={3}>
            <FaClock color="#319795" />
            <Text fontWeight="bold" color={textColor}>
              Today's Schedule
            </Text>
          </HStack>
          <VStack spacing={2} align="stretch">
            {getAppointmentsForDate(today).map((app, idx) => (
              <HStack key={idx} justify="space-between" p={2} bg="white" borderRadius="md" boxShadow="sm">
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>
                    {app.time} - {app.type}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    Patient: {app.patientId}
                  </Text>
                </VStack>
                <Badge colorScheme="teal" variant="subtle" fontSize="xs">
                  {app.status}
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}

      {appointmentData?.length === 0 && (
        <Box textAlign="center" py={8}>
          <Text color={textColor} fontSize="sm">
            No appointments scheduled
          </Text>
        </Box>
      )}
    </VStack>
  );
};
