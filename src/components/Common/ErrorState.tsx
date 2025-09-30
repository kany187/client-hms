import React from 'react';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  VStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaRedo } from 'react-icons/fa';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  showRetry = true,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg={bgColor}
        borderRadius="lg"
        p={6}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Alert status="error" borderRadius="md" flexDirection="column" alignItems="center" textAlign="center">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            {title}
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            {description}
          </AlertDescription>
          {showRetry && onRetry && (
            <Button
              leftIcon={<FaRedo />}
              colorScheme="red"
              variant="outline"
              size="sm"
              mt={4}
              onClick={onRetry}
            >
              Try Again
            </Button>
          )}
        </Alert>
      </Box>
    </Container>
  );
};
