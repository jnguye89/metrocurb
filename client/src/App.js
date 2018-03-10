import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios'

import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import ContactUs from "./pages/ContactUs";
import HowItWorks from "./pages/HowItWorks";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import LogOut from "./pages/LogOut";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import "./App.css";


class App extends Component {
constructor() {
  super()
  this.state = {
    loggedIn: false,
    user: null
  }
}
componentDidMount() {
  axios.get('/auth/user').then(response => {
    console.log(response.data)
    if (!!response.data.user) {
      console.log('THERE IS A USER')
      this.setState({
        loggedIn: true,
        user: response.data.user
      })
    } else {
      this.setState({
        loggedIn: false,
        user: null
      })
    }
  })
}

LogOutMethod = () => {
  console.log('logging out')
  axios.post('/auth/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
          this.setState({
              loggedIn: false,
              user: null
          })
      }
  })
}

render() {
  return(
  <Router>
      <div>
          <Wrapper>
            <Navbar loggedIn={this.state.loggedIn} logoutmethod={this.LogOutMethod}/>
            <Route exact path="/" render={() => <Home user={this.state.user} />} />
            <Route exact path="/HowItWorks" component={HowItWorks} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/Pricing" component={Pricing} />
            <Route exact path="/FAQ" component={Faq} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route
              exact
              path="/Profile"
              render={() =>
              <Profile
                user={this.state.user}
                logoutmethod={this.LogOutMethod}
              />}
            />
            <Route exact path="/LogOut" component={LogOut} />
            <Route exact path="/LogIn" component={LogIn} />
            <Route exact path="/forgot" component={Forgot} />
            <Route path="/reset" component={Reset} />
            <Route exact path="/Admin" component={Admin} />
          </Wrapper>
          <Footer />
      </div>
  </Router>
  )}
}

export default App;


