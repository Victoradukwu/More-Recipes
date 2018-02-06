import React from 'react';

const Recipe = ({recipe}) => {
  return (
      <div className = "card-holder">
        <div className="card bg-light text-black">
          <img className="card-img" src={require("../../assets/img/hd8.jpg")} alt="Sample recipe" style ={{height: '250px'}}/>
          <p className="card-text mt-0" style = {{backgroundColor: 'white'}}>
            <span className="fa fa-thumbs-up fa-lg " style = {{color: 'green', float: 'left'}}>{recipe.upvote}</span>
            <span className="fa fa-star fa-lg" style = {{color: 'purple', float: 'none'}}>{recipe.favorites}</span>            
            <span className="fa fa-thumbs-down fa-lg" style = {{color: 'red', float: 'right'}}>{recipe.downvote}</span>          
          </p>
    
          <div className="card-body">
            <h4 className="card-title">{recipe.recipeName}</h4>
            
            <button href="" className="btn search">Check Details</button>
          </div>
        </div>
      </div>
  )
}

export default Recipe