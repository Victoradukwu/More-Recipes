import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-md-spinner';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Recipe from './Recipe';

import fetchAllRecipes from '../../actions/fetchAllRecipes';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes(1);
  }

  /**
   * @description function that executes when a page of pagination is clicked
   *
   * @param {any} data
   *
   * @memberof HomePage
   * @returns {any} null
   */
  handlePageClick(data) {
    const selectedPage = data.selected + 1;
    this.props
      .fetchRecipes(selectedPage);
  }

  render() {
    const { fetchedRecipes } = this.props;
    let displayRecipes = this.props.fetchError;
    if (this.props.fetchedRecipes.length > 0) {
      displayRecipes = this.props.fetchedRecipes.map(recipe => (
        <Recipe
          key={recipe.id}
          recipe={recipe}
        />
      ));
    }
    return (
      <div style={{ padding: '0', margin: '0' }}>

        <div className="jumbotron" id="banner">
          <div id="bannerText">
            <h1>More-Recipes</h1>
            <h4>Satisfy your culinary curiosity</h4>
          </div>
        </div>
        <br /><br />
        <h4>
          <small>Our top picks</small>
        </h4>
        <hr />
        <div className="container">
          <div className="container bg-3 text-center main-content">
            {this.props.isFetching
            ?
              <Spinner size="40" />
            :
              <div className="grid-holder">
                { displayRecipes }
              </div>
            }
          </div>
          <br />

          {fetchedRecipes.length > 0 && <ReactPaginate
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            breakClassName="break-me"
            pageCount={this.props.pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination pagination-lg justify-content-center"
            subContainerClassName="page-item"
            activeClassName="active"
          />}
          <br /><br />
          <br /><br />
        </div>
      </div>
    );
  }
}
HomePage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  fetchedRecipes: PropTypes.array,
  fetchError: PropTypes.string,
  pages: PropTypes.number
};
HomePage.defaultProps = {
  fetchedRecipes: [],
  fetchError: '',
  pages: 1
};

const mapStateToProps = state => ({
  isFetching: state.allRecipes.isFetching,
  fetchedRecipes: state.allRecipes.fetchedAllRecipes,
  fetchError: state.allRecipes.fetchRecipesFailure,
  pages: state.allRecipes.pages
});

const mapDispatchToProps = dispatch => ({
  fetchRecipes: selectedPage => dispatch(fetchAllRecipes(selectedPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
