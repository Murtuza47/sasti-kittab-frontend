import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormContainer } from "../Components/FormContainer/FormContainer";
import * as loginActions from "../redux/userRedux/userActions";

export default function LoginPage(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = useSelector((state) => state.user.userInfo);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginActions.login({ username, password }));
  };

  useEffect(() => {
    if (userInfo) props.history.push(redirect);
  }, [userInfo, props.history, redirect]);

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="username">
          <Form.Label>Email Username</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <button
          type="submit"
          variant="primary"
          className="btn btn-outline-secondary btn-lg my-2"
        >
          Submit
        </button>
      </Form>
      <Row>
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}
