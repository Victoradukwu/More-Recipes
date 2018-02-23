import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSingleRecipe,
  upvoteRecipe,
  downvoteRecipe,
  favoriteRecipe
} from '../../../actions/recipeActions';
import Ratings from './Ratings.jsx';
import RecipeInfo from './RecipeInfo.jsx';
import ReviewForm from './ReviewForm.jsx';
import ReviewsList from './ReviewsList.jsx';

class RecipeDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
  }
  componentDidMount() {
    this.props.getSingleRecipe(this.props.match.params.id);
  }
  isSignedIn() {
    if (localStorage.token === undefined) {
      this.props.history.push('/signin');
    }
  }
  handleUpvote(id) {
    this.props.upvoteRecipe(id);
  }
  handleDownvote(id) {
    this.props.downvoteRecipe(id);
  }
  handleFavorite(id) {
    this.props.favoriteRecipe(id);
  }

  render() {
    this.isSignedIn();
    return (
      <div>
        <br /><br />
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <Ratings
              recipe={this.props.recipe}
              upvoteRecipe={this.handleUpvote}
              downvoteRecipe={this.handleDownvote}
              favoriteRecipe={this.handleFavorite}
            />
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
  upvoteRecipe: PropTypes.func,
  downvoteRecipe: PropTypes.func,
  favoriteRecipe: PropTypes.func
};

RecipeDetailsPage.defaultProps = {
  recipe: {},
  upvoteRecipe: '',
  downvoteRecipe: '',
  favoriteRecipe: ''
};

const mapStateToProps = state => ({
  recipe: state.singleRecipe
});

const mapDispatchToProps = dispatch => ({
  getSingleRecipe: id => dispatch(getSingleRecipe(id)),
  upvoteRecipe: id => dispatch(upvoteRecipe(id)),
  downvoteRecipe: id => dispatch(downvoteRecipe(id)),
  favoriteRecipe: id => dispatch(favoriteRecipe(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);
