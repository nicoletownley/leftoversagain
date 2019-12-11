import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Perfume from './components/Perfumes/Perfume';
import Gallery from './components/Perfumes/Gallery';
import NotFound from './components/NotFound/NotFound';
import AddPerfume from './components/Perfumes/AddPerfume';
import {BrowserRouter as Router, Switch, Route, Link,withRouter} from 'react-router-dom';
let path = require('path');

class App extends Component {

    state = {user: {}};

    componentDidMount() {
    const userId = localStorage.getItem('id')
    if(userId) {
      console.log(userId)
      fetch(`http://localhost:3001/api/user/${userId}`)
        .then(res => res.json())
        .then(user => {
          this.setState({ user: user });
      });
    }
    }

  render() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Gallery} /> 
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={AddPerfume} />
          {/* <Route exact path="/cart" component={Cart}/>
          <Route exact path="/search" component={Search} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>

    </div>
  );
        }
}

export default App;
