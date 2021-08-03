import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutSteps } from "../Components/CheckoutSteps";
import { FormContainer } from "../Components/FormContainer/FormContainer";
import * as paymentActions from "../redux/paymentRedux/paymentActions";

export default function PaymentPage(props) {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state?.shipping?.shippingInfo);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingInfo) props.history.push("/shipping");
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(paymentActions.addPaymentInfo(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit Card "
                id="paypal"
                name="Paypal"
                onChange={(e) => setPaymentMethod(e.target.name)}
              />
            </Col>
          </Form.Group>
          <button
            type="submit"
            variant="primary"
            className="btn btn-outline-secondary btn-lg my-2"
          >
            Submit&nbsp;&nbsp;
            <i className="fas fa-wallet" />
          </button>
        </Form>
      </FormContainer>
    </>
  );
}
