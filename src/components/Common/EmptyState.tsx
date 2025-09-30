import React from 'react';
import {
  Box,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  Container,
  Button,
} from '@chakra-ui/react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showAction?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "No data found",
  description = "There's nothing to show here yet.",
  actionLabel = "Add New",
  onAction,
  showAction = false,
}) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container maxW="container.md" py={12}>
      <Box
        bg={bgColor}
        borderRadius="lg"
        p={8}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="sm"
        textAlign="center"
      >
        <VStack spacing={4}>
          {icon && (
            <Icon as={icon} boxSize={12} color="gray.400" />
          )}
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="semibold" color={textColor}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500" maxW="sm">
              {description}
            </Text>
          </VStack>
          {showAction && onAction && (
            <Button
              colorScheme="teal"
              size="sm"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </VStack>
      </Box>
    </Container>
  );
};
