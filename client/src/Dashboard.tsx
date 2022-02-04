import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import DesktopMenu from './components/Sidebar';

export const Main = () => {
  return (
    <Box minH='100vh' bg='aqua'>
      <Text>Main</Text>
    </Box>
  );
};

const Dashboard = ({ children }: { children?: ReactNode } = {}) => {
  return (
    <div>
      <DesktopMenu>
        <Box minH='100vh' flex={1}>
          <Outlet />
        </Box>
      </DesktopMenu>
    </div>
  );
};

export default Dashboard;
