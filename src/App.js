// src/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from "axios"

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      credits:[],
      debits:[]
    }
  }

  componentDidMount = async () => {
    //axios call to get data from api
    let credits = await axios.get("https://moj-api.herokuapp.com/credits")
    let debits = await axios.get("https://moj-api.herokuapp.com/debits")
    let totalCredits = 0;
    let totalDebits = 0;

    //setting data to variable
    credits = credits.data
    debits = debits.data

    for(let i = 0; i < credits.length; i++) {
      totalCredits += credits[i].amount
    }

    for(let i = 0; i < debits.length; i++) {
      totalDebits += debits[i].amount
    }


    //Following account balance formula
    let accountBalance = totalCredits - totalDebits

    this.setState({
      credits,
      debits,
      accountBalance
    })
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  addCredit = () => {

  }

  addDebit = () => {

  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)  // Pass props to "LogIn" component
    // const CreditsComponent = () => {<Credits credits={this.state.credits} addCredit={this.state.addCredit}/>}
    // const DebitsComponent = () => {<Debits debits={this.state.debits} addCredit={this.state.addDebit}/>}

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={Credits}/>
          <Route exact path="/debits" render={Debits} />
        </div>
      </Router>
    );
  }
}

export default App;