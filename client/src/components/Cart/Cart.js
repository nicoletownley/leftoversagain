import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom';
import "./Cart.css";

class Cart extends Component {

    constructor(props) {
        super(props);

    }

    render() {
      console.log (this.props.cart);
        return (
      
          <Grid celled>
            {this.props.error && <div> {this.props.error} </div> }
            {this.props.cart.map(perfume => (

              <Grid.Row>
                <Grid.Column width={4}>
                  <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
                </Grid.Column>
                <Grid.Column width={11}>
                  <p>{perfume.name}</p> 
                  <p>{perfume.description} </p>
                  <p>Points: {perfume.points} </p>
                  <p>Oz: {perfume.oz} </p>
                  <p>Email: {perfume.email} </p>
                </Grid.Column>
                <Grid.Column width={1}>
                  <Icon name="delete" onClick = {() => this.props.deleteFromCart(perfume._id)}/>
                </Grid.Column>
              </Grid.Row>
            ))}
            <Grid.Row>
              <Grid.Column width={16}>
                <Button onClick={this.props.checkOut}> Checkout </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
             
        )
    }
}


export default Cart;    