import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import "./Signup.css"
class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    }
  }

  // Function that will record what the user is typing in into our state.
  // This only is for quick response from the backend. When the user puts in a password. It lets them know right away (sooner)
  // the pasword may be wrong. Remove if not necssary for authentication.
  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }



  // Function that will communicate our backend and sign them up. 
  onSubmit = (e) => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({error: 'Passwords must match!'})
      return;
    }

    fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    })
      .then(res => res.json())
      .then(user => {
        if (user ==='Email already exists!') {
          this.setState({error: 'E-mail already exists!'});
        } else {
          this.props.setUser(user);
          this.props.history.push("/gallery")
        }
      })
      .catch(err => console.log(err));


  }

  render() {
    return (
      <div className="picky">
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {this.state.error ? <div className="error"> {this.state.error}</div> : null}
          Signup
      </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input type="email" name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' required onChange={this.onChange}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                required
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                name="confirmPassword"
                required
                onChange={this.onChange}
              />

              <Button type="submit" color='teal' fluid size='large'>
                Sign-up
          </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    )
  }

}

export default Signup;