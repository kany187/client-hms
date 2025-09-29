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
  Spacer
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import useAppointment from "../../../hooks/appointments/useAppointment";

export const SimpleCalendar = () => {
  const { data, isLoading, error } = useAppointment();
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const todayBg = useColorModeValue("teal.50", "teal.900");


  // Mock data fallback for demonstration
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

  // Use mock data if API fails or returns no data
  const appointmentData = (data && data.length > 0) ? data : mockAppointments;

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    if (!appointmentData) return [];
    return appointmentData.filter(app => {
      const appDate = new Date(app.date);
      return appDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = getDaysInMonth(currentDate);

  if (isLoading) {
    return (
      <Box p={8} textAlign="center">
        <Text color={textColor}>Loading calendar...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">Error loading calendar data</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" h="350px" minH="350px">
      <HStack justify="space-between" align="center">
        <HStack spacing={2}>
          <FaCalendarAlt color="#319795" />
          <Text fontSize="lg" fontWeight="bold" color={textColor}>
            Appointment Calendar
          </Text>
        </HStack>
        <Badge colorScheme="teal" variant="subtle" fontSize="sm">
          <FaClock style={{ marginRight: '4px' }} />
          {appointmentData?.length || 0} appointments
        </Badge>
      </HStack>

      <Box 
        bg={bgColor} 
        borderRadius="lg" 
        p={4} 
        boxShadow="sm"
        border="1px solid"
        borderColor={borderColor}
        h="250px"
        minH="250px"
        overflow="hidden"
      >
        {/* Calendar Header */}
        <Flex align="center" justify="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            {monthNames[currentMonth]} {currentYear}
          </Text>
          <HStack spacing={2}>
            <IconButton
              aria-label="Previous month"
              icon={<FaChevronLeft />}
              size="sm"
              variant="outline"
              onClick={() => navigateMonth('prev')}
            />
            <Button size="sm" variant="outline" onClick={goToToday}>
              Today
            </Button>
            <IconButton
              aria-label="Next month"
              icon={<FaChevronRight />}
              size="sm"
              variant="outline"
              onClick={() => navigateMonth('next')}
            />
          </HStack>
        </Flex>

        {/* Day Headers */}
        <SimpleGrid columns={7} spacing={1} mb={2}>
          {dayNames.map(day => (
            <Text key={day} textAlign="center" fontSize="sm" fontWeight="bold" color={textColor} py={2}>
              {day}
            </Text>
          ))}
        </SimpleGrid>

        {/* Calendar Grid */}
        <SimpleGrid columns={7} spacing={1} maxH="150px" overflowY="auto">
          {days.map((day, index) => {
            if (!day) {
              return <Box key={index} h="30px" />;
            }

            const isToday = day.toDateString() === today.toDateString();
            const appointments = getAppointmentsForDate(day);
            const isCurrentMonth = day.getMonth() === currentMonth;

            return (
              <Box
                key={day.getDate()}
                h="30px"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                p={1}
                bg={isToday ? todayBg : 'transparent'}
                position="relative"
                cursor="pointer"
                _hover={{ bg: isToday ? todayBg : 'gray.50' }}
              >
                <Text
                  fontSize="sm"
                  fontWeight={isToday ? 'bold' : 'normal'}
                  color={isCurrentMonth ? (isToday ? 'teal.600' : textColor) : 'gray.400'}
                  textAlign="center"
                >
                  {day.getDate()}
                </Text>
                {appointments.length > 0 && (
                  <Box
                    position="absolute"
                    bottom="1px"
                    left="1px"
                    right="1px"
                    h="2px"
                    bg="teal.500"
                    borderRadius="sm"
                  />
                )}
                {appointments.length > 1 && (
                  <Text
                    fontSize="xs"
                    color="teal.500"
                    position="absolute"
                    bottom="1px"
                    right="2px"
                    fontWeight="bold"
                  >
                    +{appointments.length - 1}
                  </Text>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      {appointmentData?.length === 0 && (
        <Box textAlign="center" py={4}>
          <Text color={textColor} fontSize="sm">
            No appointments scheduled
          </Text>
        </Box>
      )}
    </VStack>
  );
};
