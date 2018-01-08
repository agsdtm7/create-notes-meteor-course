import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// we elaborate the default at line 7 then set the default with the createContainer in line 55
export class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      // count: this.props.count || 0
      error: ''
    };
  }
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    // on line 21, we change 'Meteor' with 'this.props' after we called it in the createContainer line 56
    this.props.loginWithPassword({email}, password, (err) => {
    //Meteor.loginWithPassword({email}, password, (err) => {
      // when there is error, display what the error is (refer to line #34)
      if(err){
        this.setState({error: err.reason});
      }else{
        this.setState({error: ''});
      }
    });
  }
  render(){
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Login</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="email" />
              <input type="password" ref="password" name="password" placeholder="Password" />
              <button className="button">Login Account</button>
          </form>
          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
}

// added at lecture 128
// this props is required
Login.propTypes = {
  loginWithPassword: React.PropTypes.func.isRequired
};
// we set the default here. This function is reactive!!!!
// this is where createContainer helps with the props loginWithPassword
export default createContainer(() => {
    return {
      loginWithPassword: Meteor.loginWithPassword
    };
}, Login); // this means we re-rendering our component
