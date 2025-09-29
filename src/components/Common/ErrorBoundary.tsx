import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box p={8} textAlign="center">
          <VStack spacing={4}>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle>Something went wrong!</AlertTitle>
                <AlertDescription>
                  An unexpected error occurred. Please try refreshing the page.
                </AlertDescription>
              </Box>
            </Alert>
            
            <Button
              colorScheme="teal"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
