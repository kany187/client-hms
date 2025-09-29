import { ModernCalendar } from "./ModernCalendar";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { SimpleCalendar } from "./SimpleCalendar";
import { useState } from "react";
import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export const CalendarComponent = () => {
  const [calendarType, setCalendarType] = useState<'modern' | 'weekly' | 'simple'>('modern');
  const textColor = useColorModeValue("gray.600", "gray.300");

  const renderCalendar = () => {
    switch (calendarType) {
      case 'modern':
        return <ModernCalendar />;
      case 'weekly':
        return <WeeklyCalendar />;
      case 'simple':
        return <SimpleCalendar />;
      default:
        return <ModernCalendar />;
    }
  };

  return (
    <Box>
      {/* Calendar Type Selector */}
      <HStack spacing={2} mb={4} justify="center">
        <Button
          size="sm"
          variant={calendarType === 'modern' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setCalendarType('modern')}
        >
          Month View
        </Button>
        <Button
          size="sm"
          variant={calendarType === 'weekly' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setCalendarType('weekly')}
        >
          Week View
        </Button>
        <Button
          size="sm"
          variant={calendarType === 'simple' ? 'solid' : 'outline'}
          colorScheme="teal"
          onClick={() => setCalendarType('simple')}
        >
          Simple View
        </Button>
      </HStack>

      {/* Selected Calendar */}
      {renderCalendar()}
    </Box>
  );
};
