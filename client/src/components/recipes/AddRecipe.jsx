import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddRecipe extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props) 
    return (
      <div className="card mx-auto text-center w-50">
        <div className="card-header" id = "cardHeader">
          <h4>Add a recipe</h4>
        </div>
    
        <div className="card-body">
          <div className = "forminfo" style = {{color: 'blue'}}>
            To submit a recipe to the catalog, fill out the form below and submit.
          </div>
          <br/><br/>
          <form action="">                    
            <fieldset className="form-group">
              <label htmlFor="name">Name of recipe:</label>
              <input type="text" className="form-control form-input" id="name" name="name"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="name">Category:</label>
              <input type="text" className="form-control form-input" id="Category" name="Category"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="ingredients">Ingredients:</label><br/>>
              <textarea nameName="ingredients" id="ingredients" cols="30" rows="7" className="form-control form-input" />
            </fieldset>                    
            <fieldset className="form-group">
              <label htmlFor="steps">Instructions:</label><br/>>
              <textarea nameName="instructions" id="instructions" cols="30" rows="7" className="form-control form-input" />
            </fieldset>                    =
            <button type="submit" className="btn" style = {{ backgroundColor: '#336600', color: 'white' }}>Submit Recipe</button>
          </form>
        </div>
      </div>
        );
  };
}


export default AddRecipe;