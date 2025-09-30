import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container,
  useColorModeValue,
  Icon
} from "@chakra-ui/react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Container maxW="container.md" py={20}>
      <Box
        bg={bgColor}
        borderRadius="xl"
        p={12}
        textAlign="center"
        boxShadow="lg"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <VStack spacing={6}>
          <Icon as={FaExclamationTriangle} boxSize={16} color="red.500" />
          <Heading size="xl" color={textColor}>
            Oops! Something went wrong
          </Heading>
          <Text color={textColor} fontSize="lg">
            Sorry, an unexpected error has occurred. Please try again or go back to the home page.
          </Text>
          <VStack spacing={3}>
            <Button
              leftIcon={<FaHome />}
              colorScheme="teal"
              size="lg"
              onClick={() => navigate("/")}
            >
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};
