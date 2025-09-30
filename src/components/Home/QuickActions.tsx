import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import { 
  FaPlus, 
  FaCalendarAlt, 
  FaUserMd, 
  FaChartLine,
  FaUserNurse,
  FaBuilding,
  FaFileMedical,
  FaCog
} from "react-icons/fa";
import { RiUserReceivedFill, RiStethoscopeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

interface QuickAction {
  label: string;
  icon: any;
  color: string;
  path: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

export const QuickActions = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const quickActions: QuickAction[] = [
    { 
      label: "New Patient", 
      icon: RiUserReceivedFill, 
      color: "blue", 
      path: "/patient",
      description: "Register a new patient",
      badge: "Popular",
      badgeColor: "blue"
    },
    { 
      label: "Schedule Appointment", 
      icon: FaCalendarAlt, 
      color: "green", 
      path: "/appointment",
      description: "Book a new appointment"
    },
    { 
      label: "Add Doctor", 
      icon: FaUserMd, 
      color: "purple", 
      path: "/doctor",
      description: "Register new doctor"
    },
    { 
      label: "View Reports", 
      icon: FaChartLine, 
      color: "orange", 
      path: "/reports",
      description: "Analytics and insights"
    },
    { 
      label: "Add Staff", 
      icon: FaUserNurse, 
      color: "teal", 
      path: "/staff",
      description: "Register new staff member"
    },
    { 
      label: "Department", 
      icon: FaBuilding, 
      color: "pink", 
      path: "/department",
      description: "Manage departments"
    },
    { 
      label: "Medical Records", 
      icon: FaFileMedical, 
      color: "cyan", 
      path: "/records",
      description: "Patient medical history"
    },
    { 
      label: "Settings", 
      icon: FaCog, 
      color: "gray", 
      path: "/settings",
      description: "System configuration"
    },
  ];

  return (
    <Card bg={bgColor} border="1px solid" borderColor={borderColor}>
      <CardHeader>
        <Heading size="md" color={textColor}>
          Quick Actions
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Common tasks and shortcuts
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={2} spacing={4}>
          {quickActions.map((action, index) => (
            <Tooltip 
              key={index}
              label={action.description}
              placement="top"
              hasArrow
            >
              <Link to={action.path}>
                <Button
                  leftIcon={<Icon as={action.icon} />}
                  colorScheme={action.color}
                  variant="outline"
                  size="sm"
                  h="70px"
                  flexDirection="column"
                  gap={2}
                  w="100%"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "md",
                    transition: "all 0.2s ease-in-out"
                  }}
                  transition="all 0.2s ease-in-out"
                  position="relative"
                >
                  <VStack spacing={1}>
                    <Text fontSize="xs" fontWeight="medium">
                      {action.label}
                    </Text>
                    {action.badge && (
                      <Badge 
                        colorScheme={action.badgeColor} 
                        variant="subtle"
                        fontSize="xs"
                        position="absolute"
                        top="-8px"
                        right="-8px"
                      >
                        {action.badge}
                      </Badge>
                    )}
                  </VStack>
                </Button>
              </Link>
            </Tooltip>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};
