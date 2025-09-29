import React from 'react';
import {
  Box,
  Spinner,
  Text,
  VStack,
  Center,
} from '@chakra-ui/react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'xl',
}) => {
  return (
    <Center py={8}>
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size={size}
        />
        <Text color="gray.600" fontSize="sm">
          {message}
        </Text>
      </VStack>
    </Center>
  );
};
