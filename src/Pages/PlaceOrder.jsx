import React, { useEffect } from "react";
import { Alert, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import * as actions from "../redux/orderRedux/orderActions";
import * as constants from "../redux/orderRedux/orderConstants";

export default function PlaceOrder(props) {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
  const paymentInfo = useSelector((state) => state.payment.paymentInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const order = useSelector((state) => state.order.order);
  const loading = useSelector((state) => state.order.loading);
  const success = useSelector((state) => state.order.success);
  const error = useSelector((state) => state.order.error);

  const itemPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxPrice = (0.013 * itemPrice).toFixed(2);
  const shippingPrice = itemPrice > 100 ? 50 : 100;
  const totalPrice = (
    Number(itemPrice) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2);

  if (!paymentInfo.method) props.history.push("/payment");

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order.id}`);
      dispatch({
        type: constants.ORDER_RESET,
      });
    }
  }, [success, props, order.id]);

  const placeOrderHandler = () => {
    dispatch(
      actions.createOrder({
        orderItems: cartItems,
        address: shippingInfo.address,
        city: shippingInfo.city,
        country: shippingInfo.country,
        paymentMethod: paymentInfo.method,
        itemsPrice: itemPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        postalCode: shippingInfo.postalCode,
      })
    );
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <h2>Shipping</h2>
          <p>
            <strong>Shipping: </strong>
            {shippingInfo.address}, {shippingInfo.city}{" "}
            {shippingInfo.postalCode}, {shippingInfo.country}
          </p>
          <hr />
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {paymentInfo.method}
          </p>
          <hr />
          <h2>Order Items</h2>
          <p>
            {cartItems.length === 0 ? (
              <Alert variant="dark">Your cart is empty!</Alert>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <>
                    <Row key={index}>
                      <Col md={1}>
                        <Image src={item.image} fluid />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} X PKR {item.price} = {item.qty * item.price}
                      </Col>
                    </Row>
                    <hr />
                  </>
                ))}
              </div>
            )}
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
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col style={{ fontSize: "xxx-large", textAlign: "center" }}>
                  PKR {totalPrice}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          {error && (
            <>
              <br />
              <Alert variant="danger">{error}</Alert>
            </>
          )}

          <button
            type="button"
            style={{ width: "100%" }}
            className="btn btn-outline-secondary btn-lg my-2"
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </Col>
      </Row>
    </div>
  );
}
