import React, { Component} from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name="home"
            as={Link}
            to="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />       
          <Menu.Item
            name="Add Perfume"
            as={Link}
            to="/add"
            active={activeItem === 'add'}
            onClick={this.handleItemClick}
          />       
          <Menu.Menu position='right'>  
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
              name='signup'
              as={Link}
              to="/signup"
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='login'
              as={Link}
              to="/login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

        {/* <Segment>
          <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment> */}
      </div>
    )
  }
}
    
export default Navbar;