import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Show,
  Hide,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavBar } from '../Header/NavBar';
import { Menu } from '../Aside/Menu';
import { User } from '../../types';
import { IconType } from 'react-icons';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  user: User | null;
  menuItems: Array<{
    name: string;
    icon: IconType;
    path?: string;
    elementType?: string;
  }>;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  user,
  menuItems,
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box minH="100vh" bg="gray.50">
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '250px 1fr',
        }}
        minH="100vh"
      >
        <GridItem area="nav">
          <NavBar user={user} />
        </GridItem>
        
        <Show above="lg">
          <GridItem area="aside">
            <Menu data={user} list={menuItems} />
          </GridItem>
        </Show>
        
        <GridItem area="main" p={{ base: '4', md: '6', lg: '8' }}>
          <Box maxW="container.xl" mx="auto">
            {children}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
