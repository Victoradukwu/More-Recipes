import { Link } from 'react-router-dom';
import React from 'react';

const Recipe = ({ recipe }) => (
  <div className="card-holder">
    <div className="card bg-light text-black">
      <img className="card-img" src={require('../../assets/img/hd8.jpg')} alt="Sample recipe" style={{ height: '250px' }} />
      <p className="card-text mt-0" style={{ backgroundColor: 'white',padding:'10px' }}>
        <span className="fa fa-thumbs-up fa-lg " style={{ float: 'left' }}>{recipe.upvote}</span>
        <span className="fa fa-star fa-lg" style={{ float: 'none' }}>{recipe.favorites}</span>
        <span className="fa fa-thumbs-down fa-lg" style={{ float: 'right' }}>{recipe.downvote}</span>
      </p>

      <div className="card-body">
        <h4 className="card-title">{recipe.recipeName}</h4>

        <Link to={`/recipeDetail/${recipe.id}`} className="btn search">Check Details</Link>
      </div>
    </div>
  </div>
);

export default Recipe;
