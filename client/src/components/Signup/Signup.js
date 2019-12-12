import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  // Function that will record what the user is typing in into our state.
  // This only is for quick response from the backend. When the user puts in a password. It lets them know right away (sooner)
  // the pasword may be wrong. Remove if not necssary for authentication.
  onChange = (event) => {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value})
  }



  // Function that will communicate our backend and sign them up. 
  onSubmit = (e) => {
    if (this.state.password !== this.state.confirmPassword) {
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
        localStorage.setItem('id', user._id);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));


  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Signup
      </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input type="email" name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.onChange}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                name="confirmPassword"
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
    )
  }

}

export default Signup;