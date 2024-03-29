import React, { Component} from 'react'
import { Input, Menu, Segment, Icon } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom';
import "./Navbar.css"

class Navbar extends Component {
  state = { activeItem: 'home' }

  //whichever page we are on is highlighted
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  logoutuser = () => {
    fetch ('/api/user/logout').then(res => {
      localStorage.removeItem('id'); // may not be necessary cause we have backend sessions
      this.props.setUser({});
      this.props.history.push('/');
    })
  }
  
  render() {
    const { activeItem } = this.state
    return (
      
      <div className= 'navbar'>
        <Menu pointing>
          <Menu.Item
            name="home"
            as={Link}
            to="/"
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />      
          <Menu.Item
            name="gallery"
            as={Link}
            to="/gallery"
            active={activeItem === 'gallery'}
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
            <>
            <Menu.Item
              name='points'
              active={activeItem === 'points'}>
              Points: <span> {this.props.user.points} </span>
            </Menu.Item>
            

            <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.logoutuser}/>
            <Menu.Item>
              <Link to="/cart">
                <Icon name="cart" />
                <span> {this.props.cart.length} </span>
              </Link>
            </Menu.Item>
            </>
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

      
      </div>
    )
  }
}
    
export default withRouter(Navbar);