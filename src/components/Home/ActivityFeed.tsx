import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Avatar,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { 
  FaCalendarAlt, 
  FaUserMd, 
  FaUserNurse, 
  FaBell, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Activity {
  id: number;
  type: "appointment" | "patient" | "notification" | "staff" | "system";
  message: string;
  time: string;
  icon: any;
  status?: "success" | "warning" | "info" | "error";
  priority?: "high" | "medium" | "low";
}

export const ActivityFeed = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const activities: Activity[] = [
    { 
      id: 1, 
      type: "appointment", 
      message: "New appointment scheduled with Dr. Smith for 2:30 PM", 
      time: "2 min ago", 
      icon: FaCalendarAlt,
      status: "success",
      priority: "high"
    },
    { 
      id: 2, 
      type: "patient", 
      message: "Patient John Doe checked in for routine examination", 
      time: "5 min ago", 
      icon: RiUserReceivedFill,
      status: "info"
    },
    { 
      id: 3, 
      type: "system", 
      message: "System maintenance scheduled for tonight at 11 PM", 
      time: "1 hour ago", 
      icon: FaBell,
      status: "warning",
      priority: "medium"
    },
    { 
      id: 4, 
      type: "staff", 
      message: "New nurse Sarah Wilson joined the cardiology team", 
      time: "2 hours ago", 
      icon: FaUserNurse,
      status: "success"
    },
    { 
      id: 5, 
      type: "appointment", 
      message: "Dr. Johnson completed surgery on patient Maria Garcia", 
      time: "3 hours ago", 
      icon: RiStethoscopeFill,
      status: "success"
    },
    { 
      id: 6, 
      type: "patient", 
      message: "Emergency patient admitted to ICU", 
      time: "4 hours ago", 
      icon: FaExclamationTriangle,
      status: "error",
      priority: "high"
    },
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success": return "green.500";
      case "warning": return "yellow.500";
      case "error": return "red.500";
      case "info": return "blue.500";
      default: return "gray.500";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high": return "red";
      case "medium": return "yellow";
      case "low": return "green";
      default: return "gray";
    }
  };

  return (
    <Card bg={bgColor} border="1px solid" borderColor={borderColor}>
      <CardHeader>
        <Flex justify="space-between" align="center">
          <Heading size="md" color={textColor}>
            Recent Activity
          </Heading>
          <IconButton
            aria-label="More options"
            icon={<BsThreeDotsVertical />}
            size="sm"
            variant="ghost"
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch" maxH="400px" overflowY="auto">
          {activities.map((activity, index) => (
            <Box key={activity.id}>
              <Flex align="center" gap={3}>
                <Avatar 
                  size="sm" 
                  bg={getStatusColor(activity.status)}
                  icon={<activity.icon color="white" />}
                />
                <Box flex="1">
                  <HStack spacing={2} mb={1}>
                    <Text fontSize="sm" color={textColor} fontWeight="medium">
                      {activity.message}
                    </Text>
                    {activity.priority && (
                      <Badge 
                        colorScheme={getPriorityColor(activity.priority)} 
                        variant="subtle"
                        fontSize="xs"
                      >
                        {activity.priority}
                      </Badge>
                    )}
                  </HStack>
                  <Text fontSize="xs" color="gray.500">
                    {activity.time}
                  </Text>
                </Box>
                {activity.status && (
                  <Box color={getStatusColor(activity.status)}>
                    {activity.status === "success" && <FaCheckCircle />}
                    {activity.status === "warning" && <FaExclamationTriangle />}
                    {activity.status === "error" && <FaExclamationTriangle />}
                    {activity.status === "info" && <FaInfoCircle />}
                  </Box>
                )}
              </Flex>
              {index < activities.length - 1 && <Divider mt={3} />}
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};
