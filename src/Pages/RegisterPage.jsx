import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormContainer } from "../Components/FormContainer/FormContainer";
import * as registerActions from "../redux/userRedux/userActions";

export default function RegisterPage(props) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");
  const userInfo = useSelector((state) => state?.user?.userInfo);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
  }, [userInfo, props.history, redirect]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password doesnot match");
    } else {
      dispatch(
        registerActions.register({
          firstName,
          lastName,
          username,
          email,
          password,
        })
      );
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      console.log("else runs ");
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
        <Form.Group controlId="first-name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="last-name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="last-name">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="confimr-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Password does not match
          </Form.Control.Feedback>
        </Form.Group>
        <button
          type="submit"
          variant="primary"
          className="btn btn-outline-secondary btn-lg my-2"
        >
          Register
        </button>
      </Form>
      <Row>
        <Col>
          Already have an account?&nbsp;
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
