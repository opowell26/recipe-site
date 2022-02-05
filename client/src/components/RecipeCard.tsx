// Sample card from Airbnb

import { Badge, Box, HStack, Image } from '@chakra-ui/react';
import { MdOutlineStar, MdStarBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';

export type recipe = {
  imageUrl: string;
  imageAlt: string;
  title: string;
  tags: string[];
  rating: number;
};

const RecipeCard = ({ recipe, key }: { recipe: recipe; key: string }) => {
  return (
    <Box
      maxW='lg'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='md'
      _hover={{ boxShadow: '0 0 50px #ccc', cursor: 'pointer' }}>
      <Image src={recipe.imageUrl} alt={recipe.imageAlt} />

      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated>
          {recipe.title}
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <MdOutlineStar key={i} color='#CAA5C5' />
            ))}
        </Box>

        <HStack display='flex' alignItems='baseline' mt='2'>
          {recipe.tags.map((tag: string, i) => {
            return (
              <Link to={`/tag/${tag.toLowerCase()}`}>
                <Badge borderRadius='full' px='2' colorScheme='teal' key={i}>
                  {tag}
                </Badge>
              </Link>
            );
          })}
        </HStack>
      </Box>
    </Box>
  );
};

export default RecipeCard;
