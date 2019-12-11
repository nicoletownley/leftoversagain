import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  // Function that will record what the user is typing in into our state
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  // Function that will communicate our backend and sign them up 
  onSubmit = (e) => {
    console.log('??')
    
    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        localStorage.setItem('id', user._id);
        this.props.history.push('/');
      })
      .catch(err => console.log('cant find'))


  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Login
          </Header>
          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input type="email" name="email" fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.onChange} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name="password"
                onChange={this.onChange}
              />
              

              <Button type="submit" color='teal' fluid size='large'>
                Login
          </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to="/signup">Sign-up here!</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }

}

export default Login;