import React, { useEffect, useState } from "react";
import { Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import * as actions from "../redux/orderRedux/orderActions";

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.user?.userInfo);
  const orders = useSelector((state) => state?.order.ordersList);
  const loading = useSelector((state) => state?.order.ordersloading);
  const error = useSelector((state) => state?.order.ordersError);

  const [firstName, setFirstName] = useState(userInfo.first_name);
  const [lastName, setLastName] = useState(userInfo.last_name);
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  useEffect(() => {
    dispatch(actions.getOrdersList());
  }, [dispatch]);

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/login");
    }
  }, [userInfo, props.history]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        <Form onSubmit={onSubmitHandler}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              type="submit"
              variant="primary"
              className="btn btn-outline-secondary btn-lg my-2"
            >
              Update Profile
            </button>
            <button
              type="button"
              variant="primary"
              className="btn btn-outline-secondary btn-lg my-2"
            >
              Change Password
            </button>
          </div>
        </Form>
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td>{order.id}</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>{order.total_price}</td>
                <td>
                  {order.is_paid ? (
                    order.paid_at.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order.id}`}>
                    <button type="button" className="btn btn-secondary">
                      Detail
                    </button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
