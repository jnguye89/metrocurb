import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Card from "./../components/Card";
import axios from "axios";

class Forgot extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
            redirectTo: null,

		}
	}

handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleSubmit = event => {
  event.preventDefault()

  axios.post('/mail/forgot', {
    username: this.state.username,
  })
  .then(response => {
    console.log(response);
    window.location.href = "/";
  })
  .catch(error => {
    console.log(error);
  });
}
  
  render(){
    if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
      return(
        <div className="container">
          <Card>
            <h1>Forgot Password.</h1>
          <form>
            <div className="form-group">
              <label htmlFor="emailInput">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="username"
							  value={this.state.username}
							  onChange={this.handleChange}
              />
            </div>
            <button onClick={this.handleSubmit} className="btn btn-primary">Reset Password</button>
          </form>
          </Card>
        </div>
      );
    }
  }
}
export default Forgot;

