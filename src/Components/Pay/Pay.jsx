import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/paymentRedux/paymentActions";
import { Loader } from "../Loader/Loader";
import Success from "../Success/Success";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fce883",
      color: "#212529",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",

      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#C8C6C6",
      },
    },
    invalid: {
      iconColor: "#dc3545",
      color: "#dc3545",
    },
  },
};

export const PayForm = ({ show, handleClose, order_id }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [initialLoader, setInitialLoader] = useState(true);
  const loading = useSelector((state) => state.payment.paymentInfo.loading);
  const data = useSelector((state) => state.payment.paymentInfo.data);
  const error = useSelector((state) => state.payment.paymentInfo.error);
  const success = useSelector((state) => state.payment.paymentInfo.success);

  useEffect(() => {
    setTimeout(() => setInitialLoader(false), 2000);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const { token } = await stripe.createToken(cardElement);
    console.log(token);
    dispatch(actions.paymentIntent({ token, order_id }));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {initialLoader ? (
          <Loader />
        ) : loading ? (
          <Loader />
        ) : success ? (
          <Success />
        ) : (
          <Form>
            <Form.Group controlId="name">
              <Form.Control
                required
                type="input"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="email">
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="phone">
              <Form.Control
                required
                type="number"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <div
              style={{
                borderRadius: "255px 25px 225px 25px/25px 225px 25px 255px",
                border: "2px solid #333",
                height: "40px",
                padding: "9px",
              }}
            >
              <CardElement options={CARD_OPTIONS} />
            </div>
            {error && (
              <>
                <br />
                <Alert variant="danger">{error}</Alert>
              </>
            )}
            <br />
            <button
              type="button"
              style={{ width: "48%" }}
              className="btn btn-outline-danger btn-lg my-2"
              onClick={() => handleClose()}
            >
              <i class="fas fa-times" />
              &nbsp;&nbsp;Cancel
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              type="submit"
              style={{ width: "48%" }}
              className="btn btn-outline-secondary btn-lg my-2"
              disabled={!stripe}
              onClick={handleSubmit}
            >
              <i className="fas fa-money-bill-wave" />
              &nbsp;&nbsp;Pay
            </button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};
