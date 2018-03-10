import React, { Component } from "react";
import Card from "./../components/Card";
import axios from "axios";


function validate(name, email, phone){

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    const emailTest = false;
    return {
      email: emailTest,
      name: name.length === 0,
      phone: !(/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/.test(phone))
    };
  } else {
    const emailTest = true;
    return {
      email: emailTest,
      name: name.length === 0,
      phone: !(/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/.test(phone))
    };
  }
  // true means invalid, so our conditions got reversed
}

class ContactUs extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
      email: '',
      phone: '',
      comment: '',
      touched: {
        name: false,
        email: false,
        phone: false
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
  
    axios.post('/mail/contact', {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      comment: this.state.comment
    })
    .then(response =>{
      // const user = {username: this.state.username, password: this.state.password};
      console.log(response);
      window.location.href = "/";
    })
    .catch(error =>{
      console.log(error);
    });

  }
  
  canBeSubmitted() {
    const errors = validate(this.state.name, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }


  render(){
    const errors = validate(this.state.name, this.state.email, this.state.phone);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };
    return(
      <div className="container">
        <Card>
            <h4>Contact Me:</h4>
            <form>
            <div className="form-group">
              <label htmlFor="nameInput">Name</label>
              <input
                onBlur={this.handleBlur('name')}
                type="text"
                required autoComplete="name"
                className={shouldMarkError('name') ? "error form-control" : "form-control"}
                id="nameInput"
                name="name"
							  value={this.state.name}
							  onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
              onBlur={this.handleBlur('email')}
                type="email"
                required autoComplete="email"
                className={shouldMarkError('email') ? "error form-control" : "form-control"}
                id="emailInput"
                name="email"
							  value={this.state.email}
							  onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput">Phone</label>
              <input
                onBlur={this.handleBlur('phone')}
                type="tel"
                required autoComplete="tel"
                className={shouldMarkError('phone') ? "error form-control" : "form-control"}
                id="phoneInput"
                name="phone"
							  value={this.state.phone}
							  onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="commentInput">Comments</label>
              <textarea
                onBlur={this.handleBlur('comment')}
                className={shouldMarkError('comment') ? "error form-control" : "form-control"}
                id="commentInput"
                rows="5"
                name="comment"
							  value={this.state.comment}
							  onChange={this.handleChange}
              />
            </div>
            <button disabled={isDisabled} onClick={this.handleSubmit} className="btn btn-primary">Sign Up</button>
            </form>
        </Card>
      </div>
    )
  }
}
export default ContactUs;
