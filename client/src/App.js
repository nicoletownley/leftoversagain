import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Perfume from './components/Perfumes/Perfume';
import Gallery from './components/Perfumes/Gallery';
import AddPerfume from './components/Perfumes/AddPerfume';
import Cart from './components/Cart/Cart';
import Landing from './components/Landing';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  state = { user: {}, perfumes: [], cart: [] };
// lifecycle - this function runs right when we hit our homepage
  componentDidMount() {

    // Grab user's information from our database session
    fetch(`/api/user/whoami`)
      .then(res => res.json())
      .then(user => {
        this.setState({ user: user });
      });

    // Grab perfumes from database
    fetch('/api/item')
      .then(res => res.json())
      .then(perfumes => {
        this.setState({ perfumes: perfumes });
      })

    // Populate cart with items from our local storage
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      this.setState({ cart: cart });
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
    this.setState({ perfumes: [...this.state.perfumes, perfume], user: { ...this.state.user, items: [...this.state.user.items, perfume._id] } });
  }
// automatically adds to cart and removes it from our gallery
  addToCart = perfume => {
    const perfumes = this.state.perfumes;
    const perfumeIndex = perfumes.findIndex(storePerfume => storePerfume._id === perfume._id );
    perfumes.splice(perfumeIndex, 1);
    this.setState({ cart: [...this.state.cart, perfume], perfumes: perfumes }, () => {
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
    });


  }
  deleteFromCart = id => {
    const deleteCart = this.state.cart.filter(perfume => perfume._id !== id)
    this.setState({ cart: deleteCart }, () => {
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
      this.setState({ error: "Not enough points. Please adjust cart." });
      return;
    }
    // Get snapshot of cart before it gets deleted
    const cart = this.state.cart;

    fetch('/api/item/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart: this.state.cart, sum: totalCartPoints })
    })
      .then(res => {

        //loops through each and removes from gallery
        const perfumes = this.state.perfumes;
        cart.forEach(cartPerfume => {
          const perfumeIndex = perfumes.findIndex(perfume => perfume._id === cartPerfume._id);
          perfumes.splice(perfumeIndex, 1);
        })

        // clear the cart and make sure the user's points are updated
        this.setState({
          cart: [],
          user: { ...this.state.user, points: this.state.user.points - totalCartPoints },
          perfumes: perfumes
        }, () => {
          localStorage.setItem('cart', JSON.stringify([]));
          this.props.history.push("/gallery");
        })

      })



  }

  render() {
    return (

      <div>
        <Navbar setUser={this.setUser} user={this.state.user} cart={this.state.cart} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" render={(props) => <Signup setUser={this.setUser} />} />
          <Route exact path="/gallery" render={(props) => <Gallery addToCart={this.addToCart} setPerfumes={this.setPerfumes} perfumes={this.state.perfumes} user={this.state.user} />} />
          <Route exact path="/login" render={(props) => <Login setUser={this.setUser} />} />
          <Route exact path="/add" render={(props) => <AddPerfume {...this.props} addPerfume={this.addPerfume} />} />
          <Route exact path="/cart" render={(props) => <Cart {...this.props} checkOut={this.checkOut} cart={this.state.cart} error={this.state.error} deleteFromCart={this.deleteFromCart} />} />
        </Switch>
      </div>


    );
  }
}

export default withRouter(App);
