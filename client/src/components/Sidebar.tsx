import {
  keyframes,
  VStack,
  Button,
  Interpolation,
  Flex,
} from '@chakra-ui/react';
import {
  MdChevronLeft,
  MdMenu,
  MdOutlineCollectionsBookmark,
  MdOutlineHome,
  MdOutlineSettings,
  MdStarOutline,
} from 'react-icons/md';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

const forwardAnimation = keyframes`
  from {
    width: 68px;
  }
  to {
    width: 200px;
  }
`;

const reverseAnimation = keyframes`
  from {
    width: 200px;
  }
  to {
    width: 68px;
  }
`;

const DesktopMenu = ({ children }: { children?: ReactNode } = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonCss: Interpolation<any> = {
    overflowX: 'hidden',
    animation: isOpen
      ? `${forwardAnimation} 0.2s linear forwards`
      : `${reverseAnimation} 0.2s linear forwards`,
  };

  const sharedButtonProps = {
    size: 'lg',
    variant: 'ghost',
    borderRadius: 0,
    justifyContent: 'right',
    iconSpacing: 8,
    css: buttonCss,
  };

  return (
    <>
      <Flex
        {...{
          h: '100vh',
          backgroundColor: '#E9ECEF',
        }}>
        <VStack
          {...{
            position: 'sticky',
            top: 0,
            align: 'top',
            spacing: 3,
          }}>
          <Button
            {...{
              ...sharedButtonProps,
              _focus: { boxShadow: 'none' },
              'aria-label': 'Item 1',
              rightIcon: isOpen ? (
                <MdChevronLeft size={24} />
              ) : (
                <MdMenu size={24} />
              ),
              onClick: () => setIsOpen(!isOpen),
            }}>
            Recipes
          </Button>
          <Link to='/'>
            <Button
              {...{
                ...sharedButtonProps,
                rightIcon: <MdOutlineHome size={24} />,
                'aria-label': 'Home',
              }}>
              Home
            </Button>
          </Link>
          <Link to='/collections'>
            <Button
              {...{
                ...sharedButtonProps,
                rightIcon: <MdOutlineCollectionsBookmark size={24} />,
                'aria-label': 'button 2',
              }}>
              Collections
            </Button>
          </Link>
          <Link to='/favorites'>
            <Button
              {...{
                ...sharedButtonProps,
                'aria-label': 'Item 2',
                rightIcon: <MdStarOutline size={24} />,
              }}>
              Favorites
            </Button>
          </Link>
          <Link to='/preferences'>
            <Button
              {...{
                ...sharedButtonProps,
                'aria-label': 'Item 2',
                rightIcon: <MdOutlineSettings size={24} />,
              }}>
              Options
            </Button>
          </Link>
        </VStack>
        {children}
      </Flex>
    </>
  );
};

export default DesktopMenu;
