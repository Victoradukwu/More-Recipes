const errorHandler = (code, err, res) => {
  switch (code) {
    case 401:
      return res.status(401).json({
        status: 'fail',
        message: err
      });
    case 404:
      return res.status(404).json({
        status: 'fail',
        message: err
      });
    case 403:
      return res.status(403).json({
        status: 'fail',
        message: err
      });
    case 406:
      return res.status(406).json({
        status: 'fail',
        message: err
      });
    case 409:
      return res.status(409).json({
        status: 'fail',
        message: err
      });
    case 422:
      return res.status(422).json({
        status: 'fail',
        message: err
      });
    default:
      return res.status(400).json({
        status: 'fail',
        message: err
      });
  }
};

const recipeHandler = (code, body, res) => {
  switch (code) {
    case 201:
      return res.status(201).json({
        status: 'success',
        message: 'Successfully created new recipe',
        id: body.id,
        views: body.views,
        upvote: body.upvote,
        downvote: body.downvote,
        recipeName: body.recipeName,
        category: body.category,
        ingredients: body.ingredients,
        instructions: body.instructions,
      });
    default:
      return res.status(200).json({
        status: 'success',
        message: 'Recipe successfully updated',
        id: body.id,
        views: body.views,
        upvote: body.upvote,
        downvote: body.downvote,
        recipeName: body.recipeName,
        category: body.category,
        ingredients: body.ingredients,
        instructions: body.instructions,
      });
  }
};

export { errorHandler, recipeHandler };

