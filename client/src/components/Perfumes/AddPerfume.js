import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Image,
} from 'semantic-ui-react'
import './Gallery.css'

class AddPerfume extends Component {
  state = {
      name: "",
      email: 0,
      oz: 0,
      description: "",
      points: 0,

  }

  handleChange = (e, { name, value }) => this.setState({[name]: value })
  onSubmit = (e) => {

    fetch('/api/item/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name, email: this.state.email, oz: this.state.oz, description: this.state.description, points: this.state.points})
    })
      .then(res => res.json())
      .then(item => {
        this.props.addPerfume(item);
        this.props.history.push("/gallery")
    
      })


  }

  render() {
    return (
      <div className="picimage">
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Field
            control={Input}
            label='Fragrance Name'
            name="name"
            onChange={this.handleChange}
            
          />
          <Form.Field
            control={Input}
            label='Email'
            name="email"
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Points'
            name="points"
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Ounces'
            name="oz"
            onChange={this.handleChange}
          />
       
            <Form.Field
            control={TextArea}
            label='Description'
            name="description"
            onChange={this.handleChange}
          />
          <Form.Field className="btn" control={Button}>Submit</Form.Field>
        </Form.Group>
    
         
         
        
      </Form>
    </div>
    )
  }
}

export default AddPerfume;