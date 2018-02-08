import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/recipeActions';
import validateFields from '../../helpers/validateFields';

class AddRecipePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipeName:'',
      ingredients: '',
      instructions: '',
      category: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.error.status) {
      this.setState({ errors: nextProps.error });
    } else if (typeof nextProps.user.id === 'number') {
      this.props.history.push('/dashboard');
    }
  }
  onChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    const recipeObject = {
      recipeName: event.target.recipeName.value,
      category: event.target.category.value,
      ingredients: event.target.ingredients.value,
      instructions: event.target.instructions.value,
    };
    console.log(recipeObject)
    this.props.addRecipe(recipeObject);
    if (validateFields(recipeObject)) {
      this.props.addRecipe(recipeObject);
    } else {
      this.setState({ errors: { status: true, error: { message: 'Please fill in all required fields and submit again' } } });
    }
  }
  render() {
   // console.log(this.props) 
    return (
      <div className="card mx-auto text-center w-50">
        <div className="card-header" id = "cardHeader">
          <h4>Submit a recipe</h4>
        </div>    
        <div className="card-body">
          <br/><br/>
          <form action="" onSubmit = {this.onSubmit}>                    
            <fieldset className="form-group">
              <label htmlFor="name">Name of recipe:</label>
              <input type="text" onChange = {this.onChange} className="form-control form-input" id="recipeName" name="recipeName"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="name">Category:</label>
              <input type="text" onChange = {this.onChange} className="form-control form-input" id="category" name="category"/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="ingredients">Ingredients:</label><br/>
              <textarea onChange = {this.onChange} name="ingredients" id="ingredients" cols="30" rows="7" className="form-control form-input" />
            </fieldset>                    
            <fieldset className="form-group">
              <label onChange = {this.onChange} htmlFor="steps">Instructions:</label><br/>
              <textarea name="instructions" id="instructions" cols="30" rows="7" className="form-control form-input" />
            </fieldset>                    
            <button type="submit" className="btn" style = {{ backgroundColor: '#336600', color: 'white' }}>Submit Recipe</button>
          </form>
        </div>
        <br/><br/><br/><br/><br/><br/>
      </div>
      
        );
  };
}


const mapDispatchToProps = dispatch => ({
  addRecipe: recipeDetails => dispatch(addRecipe(recipeDetails))
});

export default connect(null, mapDispatchToProps)(AddRecipePage);
