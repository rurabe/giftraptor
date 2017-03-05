'use strict';
const React = require('react');
const { connect } = require('react-redux');
const { Link } = require('react-router');
const { Navbar,Nav,NavDropdown,MenuItem } = require('react-bootstrap');

const FriendsSearch = require('./friends_search');

const mapStateToProps = function(state,ownProps){
  return {
    user: state.user,
  }
}

class AppNavbar extends React.PureComponent {
  render(){
    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">GiftRaptor</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>

          <NavDropdown title={this.props.user.name} id="user-dropdown">
            <MenuItem onSelect={this.props.updateLocale}>English</MenuItem>
            <MenuItem onSelect={this.logout}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
        <Navbar.Form pullRight>
          <FriendsSearch />
        </Navbar.Form>
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