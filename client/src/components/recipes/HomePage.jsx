import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Recipe from './Recipe';

import { fetchRecipes } from '../../actions/recipeActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = { recipes: [] };
  }

  componentDidMount() {
    this.props.fetchRecipes('/api/v1/recipes?sort=upvotes&order=des');
  }

  handlePageClick(data) {
    const selected = data.selected + 1;

    this.props.fetchRecipes(`/api/v1/recipes?sort=upvotes&order=des&page=${selected}`);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h4>
          <small>RECIPE CATALOG</small>
        </h4>
        <hr />
        <div className="container">
          <div className="container bg-3 text-center main-content">
            <div className="grid-holder">
              {this.props.payload.recipes.map(recipe => (
                <Recipe key={recipe.id} recipe={recipe} />
          ))}
            </div>
          </div>
          <br />

          <ReactPaginate
            previousLabel="prev."
            nextLabel="Next"
            breakLabel={<a href="">...</a>}
            breakClassName="break-me"
            pageCount={this.props.payload.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination pagination-lg justify-content-center"
            subContainerClassName="page-item"
            activeClassName="active"
          />
          <br /><br />
          <br /><br />
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(Recipe)

};

const mapStateToProps = state => ({
  isloading: state.fetchingRecipes,
  hasErrored: state.fetchingRecipesHasErrored,
  payload: state.fetchedRecipes
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: url => dispatch(fetchRecipes(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
