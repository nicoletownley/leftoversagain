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
import Cart from './components/Cart/Cart';
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { set } from 'mongoose';

class App extends Component {

  state = { user: {}, perfumes: [], cart: [] };

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

    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({cart: cart});
    }

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

  addToCart = perfume => {
    this.setState({ cart: [...this.state.cart, perfume]}, () => {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    });

   
  }
  deleteFromCart = id => {
    const deleteCart = this.state.cart.filter(perfume => perfume._id !== id)
    this.setState({ cart: deleteCart}, () => {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    });
  }
  checkOut = () => {
    /* 
    To checkout we need to
    1. Make sure they have enough points, if they dont display an error
    2. Go into our backend:
        a. Update their points 
        b. Delete those items
        c. Add points to the owner's account
    3. Clear the cart 
    */

    //total number of points for cart items
    const totalCartPoints = this.state.cart.reduce((total, perfume) => {
      return total + perfume.points;
    }, 0);

    if (this.state.user.points < totalCartPoints) {
      this.setState({error: "Not enough points. Please adjust cart."});
      return;
    }

    fetch('/api/item/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cart: this.state.cart, sum: totalCartPoints})
    })
    .then(res => {
    
      // 1.clear the cart
      this.setState ({
        cart: []
      })
      // 2.make sure the user's points are updated'
      this.setState ({
        user: {...this.state.user, points: this.state.user.points - totalCartPoints }
      })
      // 3.update points to seller 

      // 3.redirect to gallery page
      this.props.history.push("/gallery");


          })



  }

  render() {
    return (

      <div>
        <Navbar setUser={this.setUser} user={this.state.user} cart={this.state.cart}/>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/gallery" render={(props) => <Gallery addToCart={this.addToCart} setPerfumes={this.setPerfumes} perfumes={this.state.perfumes} user={this.state.user}/>} />
          <Route exact path="/login" render={(props)=> <Login setUser={this.setUser}/>}/>
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/add" render={(props) => <AddPerfume {...this.props} addPerfume={this.addPerfume}/>} />
          <Route exact path="/cart" render={(props) => <Cart {...this.props} checkOut={this.checkOut} cart={this.state.cart} error={this.state.error} deleteFromCart={this.deleteFromCart}/>}/>
          {/* <Route exact path="/search" component={Search} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>


    );
  }
}

export default withRouter(App);
