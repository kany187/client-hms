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
  AlertIcon
} from "@chakra-ui/react";
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import useAppointment from "../../../hooks/appointments/useAppointment";

export const ModernCalendar = () => {
  const { data, isLoading, error } = useAppointment();
  const [currentDate, setCurrentDate] = useState(new Date());
  
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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
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
    <VStack spacing={6} align="stretch" h="full">
      {/* Header */}
      <Box bg={headerBg} borderRadius="lg" p={4}>
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <FaCalendarAlt color="#319795" size="20" />
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color={textColor}>
                Appointment Calendar
              </Text>
              <Text fontSize="sm" color="gray.500">
                {appointmentData?.length || 0} appointments scheduled
              </Text>
            </VStack>
          </HStack>
          <Badge colorScheme="teal" variant="solid" fontSize="sm" px={3} py={1}>
            <FaClock style={{ marginRight: '4px' }} />
            {getAppointmentsForDate(today).length} today
          </Badge>
        </HStack>
      </Box>

      {/* Calendar Navigation */}
      <Flex align="center" justify="space-between">
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
            colorScheme="teal"
          />
          <Button size="sm" variant="outline" onClick={goToToday} colorScheme="teal">
            Today
          </Button>
          <IconButton
            aria-label="Next month"
            icon={<FaChevronRight />}
            size="sm"
            variant="outline"
            onClick={() => navigateMonth('next')}
            colorScheme="teal"
          />
        </HStack>
      </Flex>

      {/* Calendar Grid */}
      <Box 
        bg={bgColor} 
        borderRadius="lg" 
        p={4} 
        boxShadow="sm"
        border="1px solid"
        borderColor={borderColor}
        minH="400px"
      >
        {/* Day Headers */}
        <SimpleGrid columns={7} spacing={2} mb={4}>
          {dayNames.map(day => (
            <Text 
              key={day} 
              textAlign="center" 
              fontSize="sm" 
              fontWeight="bold" 
              color={textColor} 
              py={2}
              bg={headerBg}
              borderRadius="md"
            >
              {day}
            </Text>
          ))}
        </SimpleGrid>

        {/* Calendar Days */}
        <SimpleGrid columns={7} spacing={2}>
          {days.map((day, index) => {
            if (!day) {
              return <Box key={index} h="60px" />;
            }

            const isToday = day.toDateString() === today.toDateString();
            const appointments = getAppointmentsForDate(day);
            const isCurrentMonth = day.getMonth() === currentMonth;

            return (
              <Box
                key={day.getDate()}
                h="60px"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                p={2}
                bg={isToday ? todayBg : 'transparent'}
                position="relative"
                cursor="pointer"
                _hover={{ 
                  bg: isToday ? todayBg : 'gray.50',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out'
                }}
                transition="all 0.2s ease-in-out"
              >
                <VStack spacing={1} h="full" justify="start">
                  <Text
                    fontSize="sm"
                    fontWeight={isToday ? 'bold' : 'normal'}
                    color={isCurrentMonth ? (isToday ? 'teal.600' : textColor) : 'gray.400'}
                    textAlign="center"
                  >
                    {day.getDate()}
                  </Text>
                  
                  {appointments.length > 0 && (
                    <VStack spacing={0.5} w="full">
                      {appointments.slice(0, 2).map((app, idx) => (
                        <Box
                          key={idx}
                          w="full"
                          h="2px"
                          bg="teal.500"
                          borderRadius="sm"
                          title={`${app.type} - ${app.time}`}
                        />
                      ))}
                      {appointments.length > 2 && (
                        <Text fontSize="xs" color="teal.500" fontWeight="bold">
                          +{appointments.length - 2}
                        </Text>
                      )}
                    </VStack>
                  )}
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      {/* Today's Appointments */}
      {getAppointmentsForDate(today).length > 0 && (
        <Box bg={todayBg} borderRadius="lg" p={4}>
          <HStack mb={3}>
            <FaClock color="#319795" />
            <Text fontWeight="bold" color={textColor}>
              Today's Appointments ({getAppointmentsForDate(today).length})
            </Text>
          </HStack>
          <VStack spacing={2} align="stretch">
            {getAppointmentsForDate(today).map((app, idx) => (
              <HStack key={idx} justify="space-between" p={2} bg="white" borderRadius="md" boxShadow="sm">
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>
                    {app.type} - {app.time}
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
