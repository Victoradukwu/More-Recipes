export default {
  addRecipeReqObj: {
    recipeName: 'Fruitie Froths',
    ingredients: 'guava, pawpaw, mango',
    instructions: 'boil and mash',
    recipePicture: null,
    category: ''
  },
  addRecipeResObj: {
    status: 'success',
    message: 'Successfully created new recipe',
    recipe: {
      category: '',
      upvote: 0,
      downvote: 0,
      views: 0,
      favorites: 0,
      id: 71,
      recipeName: 'Fruitie Froths',
      ingredients: 'guava, pawpaw, mango',
      instructions: 'boil and mash',
      recipePicture: null,
      userId: 1,
      updatedAt: '2018-03-19T14:13:58.345Z',
      createdAt: '2018-03-19T14:13:58.345Z'
    },
  },
  modifyRecipeResObj: {
    message: '',
    status: 200,
  },
  modifyRecipeReqObj: {
    id: 1,
    recipeName: 'Fruitie Froths',
    ingredients: 'guava, pawpaw, mango',
    instructions: 'boil and mash',
    recipePicture: null,
    category: ''
  },
  modifyRecipeFailResObj: {
    status: 'fail',
    message: 'No Token provided'
  },
  singRecipeResObj: {
    status: 'success',
    message: 'recipe successfully retrieved',
    recipe: {
      id: 1,
      recipeName: 'Mohammad Berger',
      category: 'vvmn',
      ingredients: 'delectus itaque',
      instructions: 'voluptatem quia eu',
      upvote: 0,
      downvote: 2,
      views: 20,
      favorites: 1,
      recipePicture: null,
      createdAt: '2018-02-28T18:08:26.855Z',
      updatedAt: '2018-03-19T17:33:16.563Z',
      userId: 1,
      reviews: [],
      User: {
        id: 1,
        name: 'Danielle'
      }
    }
  },
  userRecResObj: {
    status: 'success',
    message: 'recipes successfully retrieved',
    recipes: [
      {
        id: 71,
        recipeName: 'Fruitie Froths',
        category: '',
        ingredients: 'guava, pawpaw, mango',
        instructions: 'boil and mash',
        upvote: 0,
        downvote: 0,
        views: 0,
        favorites: 0,
        recipePicture: null,
        createdAt: '2018-03-19T14:13:58.345Z',
        updatedAt: '2018-03-19T14:13:58.345Z',
        userId: 1
      }
    ]
  }
};
