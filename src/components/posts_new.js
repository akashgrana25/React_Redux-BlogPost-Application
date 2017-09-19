import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

  renderField(field) {
    const {meta: {touched,error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
      <div className = {className}>
        <lable>{field.lable}</lable>
        <input
          className = "form-control"
          type = "text"
          {...field.input}
        />
        <div className =" text-help">
          {touched ?  error: ' '}
        </div>
      </div>
    );

  }

  onSubmit(values) {

    this.props.createPost(values, () => {
    this.props.history.push('/');  
    });

  }

  render() {

    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
          <Field
            lable = "TITLE"
            name = "title"
            component = {this.renderField}
          />
          <Field
            lable = "Categories"
            name = "categories"
            component = {this.renderField}
          />
          <Field
            lable = "POST CONTENT"
            name = "content"
            component = {this.renderField}
          />
          <button type = "submit" className = "btn btn-primary" >Submit</button>
          <Link to ="/" className = "btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};

  if(!values.title){
    errors.title = "Enter the title!!"
  }
  if(!values.categories){
    errors.categories = "Enter a Category!!"
  }
  if(!values.content){
    errors.content = "Enter the Content!!"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
