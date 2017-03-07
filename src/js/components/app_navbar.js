'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');
const { Navbar,Nav,NavDropdown,MenuItem } = require('react-bootstrap');

const FriendsSearch = require('./friends_search');
const AvatarPhoto = require('./avatar_photo');

const mapStateToProps = function(state,ownProps){
  return {
    user: state.user,
  }
}

class AppNavbar extends React.PureComponent {
  render(){
    let name = (
      <span> 
        <div className="friend-name">
          <span>{this.props.user.name}</span>
        </div>
        <AvatarPhoto photo={this.props.user.picture} />
      </span>
    )

    return (
      <Navbar inverse fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">GiftRaptor</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            <NavDropdown title={name} id="user-dropdown">
              <MenuItem onSelect={this.logout}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
          <Navbar.Form pullRight>
            <FriendsSearch />
          </Navbar.Form>
          </Navbar.Collapse>
      </Navbar>
    );
  }

  logout(){
    const form = document.createElement('form');
    form.setAttribute('method','POST');
    form.setAttribute('action','/logout?_method=DELETE');
      document.body.appendChild(form);
    form.submit();
  }
}

module.exports = connect(mapStateToProps)(AppNavbar);