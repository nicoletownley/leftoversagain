import React, { Component} from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  logoutuser = () => {
    fetch ('/api/user/logout').then(res => {
      localStorage.removeItem('id');
      this.props.setUser({});
      this.props.history.push('/');
      //window.location.href = '/login';

    })
  }

  render() {
    const { activeItem } = this.state
    console.log('what are my props', this.props);
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

          {Object.keys(this.props.user).length > 0 ?   
          <Menu.Item
            name="Add Perfume"
            as={Link}
            to="/add"
            active={activeItem === 'add'}
            onClick={this.handleItemClick}
          />      
          :
          null
          } 
          <Menu.Menu position='right'>  
            {/* <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item> */}
            {Object.keys(this.props.user).length > 0 ? 
            
            <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.logoutuser}/>
            :
            <>
            <Menu.Item
              name='login'
              as={Link}
              to="/login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='signup'
              as={Link}
              to="/signup"
              active={activeItem === 'signup'}
              onClick={this.handleItemClick}
            />
            </>
          }
            
          </Menu.Menu>
        </Menu>

        {/* <Segment>
          <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment> */}
      </div>
    )
  }
}
    
export default withRouter(Navbar);