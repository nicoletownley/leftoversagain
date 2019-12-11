import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class AddPerfume extends Component {
  state = {
      name: "",
      qty: 0,
      oz: 0,
      description: "",
      points: 0,

  }

  handleChange = (e, { name, value }) => this.setState({[name]: value })
  onSubmit = (e) => {

    fetch('http://localhost:3001/api/item/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: this.state.name, qty: this.state.qty, oz: this.state.oz, description: this.state.description, points: this.state.points})
    })
      .then(res => res.json())
      .then(item => {
    this.props.history.push("/")
    
      })


  }

  render() {
    console.log(this.props);
    return (
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
            label='Quantity'
            name="qty"
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label='Points'
            name="points"
            onChange={this.handleChange}
          />
          ,<Form.Field
            control={Input}
            label='Ounces'
            name="oz"
            onChange={this.handleChange}
          />
          {/* <Form.Field
            control={Select}
            label='Gender'
            options={options} */}
            {/* onChange={this.handleChange} */}
            
            <Form.Field
            control={TextArea}
            label='Description'
            name="description"
            onChange={this.handleChange}
          />
        </Form.Group>
    
         
         
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default AddPerfume;