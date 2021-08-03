import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as cartActions from "../redux/cartReducer/cartActions";

export default function CartComponent(props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { id } = useParams();
  const qty = props.location.search ? props.location.search.split("=")[1] : "";

  const removeFromCartHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  const chekoutHandler = () => {
    props.history.push("/login?redirect=shipping");
  };

  useEffect(() => {
    if (id) {
      dispatch(cartActions.addToCart(id, Number(qty)));
    }
  }, [dispatch, qty, id]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} fluid />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    <strong>PKR {item.price}</strong>
                  </Col>
                  <Col md={3}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          dispatch(
                            cartActions.addToCart(item.id, Number(item.qty - 1))
                          )
                        }
                        disabled={item.qty === 1}
                      >
                        <i class="fas fa-window-minimize" />
                      </button>
                      &nbsp;&nbsp;
                      <Form.Control
                        type="input"
                        value={item.qty}
                        readOnly
                        style={{ padding: "0 9px" }}
                      ></Form.Control>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() =>
                          dispatch(
                            cartActions.addToCart(item.id, Number(item.qty + 1))
                          )
                        }
                        disabled={item.qty === item.in_stock}
                      >
                        <i class="fas fa-plus" />
                      </button>
                    </div>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <i class="fas fa-trash-alt"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div>
            <Alert variant="warning">
              Your cart is empty <Link to="/">Go Back</Link>
            </Alert>
          </div>
        )}
      </Col>
      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h2>
              SUBTOTAL {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              items
            </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>
              PKR{" "}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </h3>
          </ListGroup.Item>
        </ListGroup>
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg my-2"
          style={{ width: "100%" }}
          disabled={cartItems.length === 0}
          onClick={() => chekoutHandler()}
        >
          <strong>Proceed to Checkout</strong>
        </button>
      </Col>
    </Row>
  );
}
