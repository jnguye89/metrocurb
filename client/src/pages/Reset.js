import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import Card from "./../components/Card";
import axios from "axios";


function validate(password, passwordVal){
    return {
      password: password.length === 0 || password !== passwordVal
    };
  // true means invalid, so our conditions got reversed
}

class Reset extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
            password: '',
            touched: {
                password: false,
            },
            redirectTo: "null",
            canReset: false,
            user: null
		    }
	}

    // componentWillMount() {
    //     axios.get('/reset/:token', function(req, res) {
    //         User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    //           if (user) {
    //             this.setState({
    //                 canReset: true,
    //                 user: req.user
    //             })
    //           }
    
    //         });
    //       });
    // }

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

    username: this.state.username,
    password: this.state.password,
    password: this.state.passwordVal
   })
  .then(response =>{
    // const user = {username: this.state.username, password: this.state.password};
    console.log(response);
    window.location.href = "/Profile";
  })
  .catch(error =>{
    console.log(error);
  });

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

      return(
        <div className="container">
          <Card>
            <h1>Reset your password.</h1>
          <form>
            <div className="form-group">
              <label htmlFor="passwordInput1">New Password</label>
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
              <label htmlFor="passwordInput2">Re-Enter New Password</label>
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
export default Reset;

