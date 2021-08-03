import React from "react";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import * as loginActions from "../../redux/userRedux/userActions";
import { SearchBar } from "../SearchBar";
import SaastiKittabLogo from "../../assets/images/logo.png";

export const Header = (props) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const logoutHandler = () => {
    dispatch(loginActions.logout());
  };

  return (
    <header style={{ marginBottom: "80px" }}>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect fixed="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={SaastiKittabLogo} height={50} />
              &nbsp; SastiKitab
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ flexGrow: 0 }}>
            <SearchBar {...props} />
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  &nbsp; Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={`${userInfo.last_name}, ${userInfo.first_name} `}
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i class="far fa-user" />
                      &nbsp; Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/whishlist">
                    <NavDropdown.Item>
                      <i class="far fa-heart" />
                      &nbsp; Wishlist
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i class="fas fa-sign-out-alt" />
                    &nbsp; Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    &nbsp; Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
