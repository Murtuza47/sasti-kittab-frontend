import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import { FormContainer } from "../Components/FormContainer/FormContainer";
import * as shippingActions from "../redux/shippingRedux/shippingActions";

export default function ShippingPage(props) {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state?.shipping?.shippingInfo);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [firstName, setFirstName] = useState(userInfo.first_name || "");
  const [lastName, setLastName] = useState(userInfo.last_name || "");
  const [address, setAddress] = useState(shippingInfo.address || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [validated, setValidated] = useState(false);

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  //   useEffect(() => {
  //     if (userInfo) props.history.push(redirect);
  //   }, [userInfo, props.history, redirect]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      shippingActions.addShippingInfo({ address, city, country, postalCode })
    );
    props.history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />

      <FormContainer>
        <h1>Shipping</h1>
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
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="input"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="postalcode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Password does not match
            </Form.Control.Feedback>
          </Form.Group>
          <button
            type="button"
            onClick={() => props.history.push("/cart")}
            className="btn btn-outline-secondary btn-lg my-2"
          >
            <i className="fas fa-arrow-left" />
            &nbsp;&nbsp;Back
          </button>
          &nbsp;&nbsp;
          <button
            type="submit"
            variant="primary"
            className="btn btn-outline-secondary btn-lg my-2"
          >
            Continue&nbsp;&nbsp;
            <i className="fas fa-wallet" />
          </button>
        </Form>
      </FormContainer>
    </>
  );
}
