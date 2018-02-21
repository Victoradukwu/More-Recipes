import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleRecipe } from '../../../actions/recipeActions';
import Ratings from './Ratings.jsx';
import RecipeInfo from './RecipeInfo.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';

class RecipeDetailsPage extends Component {
  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id);
  }
  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }
  render() {
    this.isSignedIn();
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
          </div>
          <div className="col-sm-2" />
        </div>
        <br /><br />
      </div>
    );
  }
}
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

const mapStateToProps = state => ({
  recipe: state.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => dispatch(getSingleRecipe(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
