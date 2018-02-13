import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleRecipe } from '../../../actions/recipeActions';
import Ratings from './Ratings.jsx';
import RecipeInfo from './RecipeInfo.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';

class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <Ratings recipe={this.props.recipe} />
            <RecipeInfo recipe={this.props.recipe} />
            <ReviewForm />
            {
              this.props.recipe.reviews &&
              <ReviewsList recipe={this.props.recipe} />
            }
            <h1>the recipe details of {this.props.match.params.id}</h1>
          </div>
          <div className="col-sm-2" />
        </div>
        <br /><br />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipe: state.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => dispatch(getSingleRecipe(id))
});

RecipeDetailsPage.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    views: PropTypes.number,
    favorites: PropTypes.number,
    createdAt: PropTypes.any,
    updatedAt: PropTypes.any,
    userId: PropTypes.number,
    reviews: PropTypes.array,
    User: PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
  }),
  getSingleRecipe: PropTypes.func.isRequired,
};

RecipeDetailsPage.defaultProps = {
  recipe: {}
};


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
