import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Alert, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PayForm } from "../Components/Pay";
import * as actions from "../redux/orderRedux/orderActions";
import * as paymentConstants from "../redux/paymentRedux/paymentConstants";
import * as constants from "../redux/orderRedux/orderConstants";

export default function OrderPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const order = useSelector((state) => state.order.order);
  const loading = useSelector((state) => state.order.loading);
  const success = useSelector((state) => state.order.success);
  const error = useSelector((state) => state.order.error);

  const itemPrice = order?.order_items?.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0
  );
  const taxPrice = order?.tax_price;
  const shippingPrice = order?.shipping_price;
  const totalPrice = order?.total_price;
  const stripePromise = loadStripe(
    "pk_test_51JHxraEI8IAoldpjb6bN7FFbl0KippuY7FrbIbOMEaZ1qfIRyulGR2TGTmKPj2BMc7FasNxzIjtI4uYFe2XourTz00we2KNBPQ"
  );

  useEffect(() => {
    dispatch(actions.getOrder(id));
  }, []);

  const handleClose = () => {
    setShow(false);
    dispatch({ type: paymentConstants.CLEAR_PAYMENT_INFO });
  };

  return (
    <div>
      <Row>
        <Col md={8}>
          <h2>Shipping</h2>
          <p>
            <strong>Shipping: </strong>
            {order?.shipping_address?.address}, {order?.shipping_address?.city}{" "}
            {order?.shipping_address?.postal_code},{" "}
            {order?.shipping_address?.country}
          </p>
          <p>
            <strong>Name: </strong>
            {order?.user?.last_name}, {order?.user?.first_name}
          </p>
          <p>
            <strong>Email: </strong>
            <a
              style={{ textDecoration: "none" }}
              href={`mailto:${order?.user?.email}`}
            >
              {order?.user?.email}
            </a>
          </p>
          <Alert variant="warning">Order has not deliver</Alert>
          <hr />
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order?.payment_method}
            <Alert variant="warning">Payment has not done!</Alert>
          </p>
          <hr />
          <h2>Order Items</h2>
          <p>
            <div>
              {order?.order_items?.length > 0 ? (
                order?.order_items.map((item, index) => (
                  <>
                    <Row key={index}>
                      <Col md={1}>
                        <Image src={item.image} fluid />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.quantity} X PKR {item.price} ={" "}
                        {item.quantity * item.price}
                      </Col>
                    </Row>
                    <hr />
                  </>
                ))
              ) : (
                <Alert variant="dark">Your order is empty!</Alert>
              )}
            </div>
          </p>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Item: </Col>
                <Col>PKR {itemPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping: </Col>
                <Col>PKR {shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax: </Col>
                <Col>PKR {taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total: </Col>
              </Row>
              <Row>
                <Col style={{ fontSize: "xxx-large", textAlign: "center" }}>
                  PKR {totalPrice}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <button
            type="button"
            style={{ width: "100%" }}
            className="btn btn-outline-secondary btn-lg my-2"
            onClick={() => setShow(true)}
          >
            Payment
          </button>
        </Col>
      </Row>
      {show && (
        <Elements stripe={stripePromise}>
          <PayForm show={show} handleClose={handleClose} order_id={id} />
        </Elements>
      )}
    </div>
  );
}
