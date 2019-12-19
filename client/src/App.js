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
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = { user: {}, perfumes: [] };

  componentDidMount() {
    console.log(this.props);
    fetch(`/api/user/whoami`)
      .then(res => res.json())
      .then(user => {
        this.setState({ user: user });
      });

    fetch('/api/item')
      .then(res => res.json())
      .then(perfumes => {
        console.log(perfumes);
        this.setState({ perfumes: perfumes });
    })

  }
//get the user/login and addition and deletion of perfumes to update immediately
  setUser = user => {
    this.setState({ user: user });
  }
  setPerfumes = perfumes => {
    this.setState({ perfumes: perfumes });
  }
  addPerfume = perfume => {
    this.setState({ perfumes: [...this.state.perfumes, perfume], user: {...this.state.user, items: [...this.state.user.items, perfume._id]} });
  }

  render() {
    return (

      <div>
        <Navbar setUser={this.setUser} user={this.state.user} />
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/gallery" render={(props) => <Gallery setPerfumes={this.setPerfumes} perfumes={this.state.perfumes} user={this.state.user}/>} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" render={(props) => <AddPerfume {...this.props} addPerfume={this.addPerfume}/>} />
          {/* <Route exact path="/cart" component={Cart}/>
          <Route exact path="/search" component={Search} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>


    );
  }
}

export default withRouter(App);
