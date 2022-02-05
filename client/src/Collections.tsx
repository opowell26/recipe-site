import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import RecipeCard, { recipe } from './components/RecipeCard';

const recipes: recipe[] = [
  {
    imageUrl:
      'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/01/vanilla-cake-600x900.jpg',
    imageAlt: 'Vanilla cake',
    title: 'The Best Vanilla Cake',
    tags: ['Dessert', 'Cake'],
    rating: 4,
  },
  {
    imageUrl:
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Vanilla-Meringue-Cookies_EXPS_FT20_45262_F_0811_1-9.jpg',
    imageAlt: 'Vanilla Meringue Cookies',
    title: 'Vanilla Meringue Cookies',
    tags: ['Dessert', 'Cookies'],
    rating: 3,
  },
];

const Collections = () => {
  return (
    <Box minH='100vh'>
      <Text>Collections page</Text>
      <SimpleGrid minChildWidth='400px' spacing='40px'>
        {recipes.map((recipe, i) => {
          return <RecipeCard recipe={recipe} key={recipe.imageUrl} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Collections;
