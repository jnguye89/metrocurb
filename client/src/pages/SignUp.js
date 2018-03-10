import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Card from "./../components/Card";
import axios from "axios";
// import googleButton from '../images/btn_google_signin_dark_normal_web.png'


function validate(username, password, passwordVal){
  
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username))
  {
    const emailTest = false;
    return {
      username: emailTest,
      password: password.length === 0 || password !== passwordVal,
    };
  } else {
    const emailTest = true;
    return {
      username: emailTest,
      password: password.length === 0 || password !== passwordVal,
    };
  }
  // true means invalid, so our conditions got reversed
}

class SignUp extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
      password: '',
      touched: {
        username: false,
        password: false,
      },
			redirectTo: "null"
		}
	}



handleBlur = (field) => (evt) => {
  this.setState({
    touched: { ...this.state.touched, [field]: true },
  });
}

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleSubmit = event => {
  event.preventDefault()
  console.log('handleSubmit')
  if (!this.canBeSubmitted()) {
    return;
  }

  axios.post('/auth/signup', {
    firstName: this.state.firstName,
    lastName: this.state.lastName,
    address: this.state.address,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip,
    //local:{
    username: this.state.username,
    password: this.state.password,
    password: this.state.passwordVal
    // }
  })
  .then(response =>{
    // const user = {username: this.state.username, password: this.state.password};
    console.log(response);
    window.location.href = "/Profile";
  })
  .catch(error =>{
    console.log(error);
  });

  // this.props._login(this.state.username, this.state.password)
  // this.setState({
  //   redirectTo: '/'
  // })
}

canBeSubmitted() {
  const errors = validate(this.state.username, this.state.password, this.state.passwordVal);
  const isDisabled = Object.keys(errors).some(x => errors[x]);
  return !isDisabled;
}

  
  render(){
    const errors = validate(this.state.username, this.state.password, this.state.passwordVal);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };
    // if (this.state.redirectTo) {
		// 	return <Redirect to={{ pathname: this.state.redirectTo }} />
		// } else {
      return(
        <div className="container">
          <Card>
            <h1>Sign up for a new account.</h1>
            <form>
              <div className="form-group">
                <label htmlFor="firstInput">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstInput"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastInput">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastInput"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">State</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="state"
                    value={this.state.state}
                    onChange={this.handleChange}
                  >
                    <option>Kansas</option>
                    <option>Missouri</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    name="zip"
                    value={this.state.zip}
                    onChange={this.handleChange}
                  />
                </div>
              </div> 
              <div className="form-group">
                <label htmlFor="emailInput">Email address</label>
                <input
                  onBlur={this.handleBlur('username')}
                  type="email"
                  className={shouldMarkError('username') ? "error form-control" : "form-control"}
                  id="emailInput"
                  aria-describedby="emailHelp"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              <div className="form-group">
                <label htmlFor="passwordInput1">Password</label>
                <input
                  onBlur={this.handleBlur('password')}
                  type="password"
                  className={shouldMarkError('password') ? "error form-control" : "form-control"}
                  id="passwordInput1"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="passwordInput2">Re-Enter Password</label>
                <input
                  onBlur={this.handleBlur('password')}
                  type="password"
                  className={shouldMarkError('password') ? "error form-control" : "form-control"}
                  id="passwordInput2"
                  name="passwordVal"
                  value={this.state.passwordVal}
                  onChange={this.handleChange}
                />
              </div>
              <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Sign Up</button>
            </form>
          </Card>
        </div>
        
      );
    }
  }
// }
export default SignUp;

