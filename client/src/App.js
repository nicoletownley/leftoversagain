import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Perfume from './components/Perfumes/Perfume';
import Gallery from './components/Perfumes/Gallery';
import NotFound from './components/NotFound/NotFound';
import AddPerfume from './components/Perfumes/AddPerfume';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = { user: {} };

  componentDidMount() {

    fetch(`/api/user/whoami`)
      .then(res => res.json())
      .then(user => {
        this.setState({ user: user });
      });

  }

  render() {
    console.log('This is my user', this.state.user)
    return (

      <div>
        <Navbar user={this.state.user} />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Gallery} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={AddPerfume} />
          {/* <Route exact path="/cart" component={Cart}/>
          <Route exact path="/search" component={Search} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>


    );
  }
}

export default withRouter(App);
