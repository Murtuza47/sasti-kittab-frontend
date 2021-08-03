import React, { useEffect, useState } from "react";
import {
  Alert,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/productRedux/productActions";
import * as constants from "../redux/productRedux/productConstants";
import { Loader } from "../Components/Loader/Loader";
import { RatingStar } from "../Components/Rating";

export default function ProductPage(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [qty, setQty] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userInfo = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.book.loading);
  const product = useSelector((state) => state.book.product);
  const reviewLoading = useSelector((state) => state.book.reviewLoading);
  const reviewSuccess = useSelector((state) => state.book.reviewSuccess);
  const reviewError = useSelector((state) => state.book.error);

  const addToCartHandler = () => {
    props.history.push(`/cart/${id}?qty=${qty}`);
  };
  useEffect(() => {
    dispatch(actions.getProduct(id));
    return () => {
      dispatch({ type: constants.CREATE_PRODUCT_REVIEW_RESET });
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (reviewSuccess) {
      setComment("");
      setRating(0);
      setTimeout(() => {
        dispatch({ type: constants.CREATE_PRODUCT_REVIEW_RESET });
      }, 3000);
    }
  }, [dispatch, reviewSuccess]);

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(
      actions.createProductReview({
        rating,
        comment,
        name: `${userInfo.last_name}, ${userInfo.first_name}`,
        productId: id,
      })
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Link to="/" className="btn btn-outline-dark my-3">
        <i class="fas fa-arrow-left" />
        &nbsp;Go Back
      </Link>
      <Container>
        <Row>
          <Col md={4} style={{ textAlign: "center" }}>
            <Image src={product.image} width="100%" />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>Price : {product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Category: <h3>{product.category}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                Tag: <h3>{product.tag}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                Status: {product.in_stock > 0 ? "In Stock" : "Out of Stock "}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row style={{ alignItems: "center" }}>
                  <Col>Quantity:</Col>
                  <Col xs="auto" className="my-1">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setQty(Number(qty - 1))}
                        disabled={qty <= 0}
                      >
                        <i class="fas fa-window-minimize" />
                      </button>
                      &nbsp;&nbsp;
                      <Form.Control
                        type="input"
                        value={product.in_stock <= 0 ? 0 : qty}
                        readOnly
                        style={{ padding: "0 9px" }}
                      ></Form.Control>
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setQty(Number(qty + 1))}
                        disabled={
                          qty === product.in_stock || product.in_stock <= 0
                        }
                      >
                        <i class="fas fa-plus" />
                      </button>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: <strong>PKR </strong>
                {product.price}
              </ListGroup.Item>
            </ListGroup>
            <button
              type="button"
              class="btn btn-outline-secondary my-2"
              style={{ width: "100%" }}
              disabled={
                qty === product.in_stock || product.in_stock <= 0 || qty < 1
              }
              onClick={() => addToCartHandler()}
            >
              <strong>Add To Cart</strong> <i class="fas fa-cart-arrow-down" />
            </button>
            <button
              type="button"
              class="btn btn-outline-info"
              style={{ width: "100%" }}
            >
              <strong>Add to Wishlist</strong> <i class="fas fa-heart" />
            </button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={6}>
            <h4>Reviews</h4>
            {product?.reviews?.length === 0 && (
              <Alert variant="info">No Reviews</Alert>
            )}
            {product?.reviews?.map((review, index) => (
              <div>
                &nbsp;&nbsp;
                <p style={{ marginBottom: "0", marginTop: "2px" }}>
                  {review.comment}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <RatingStar value={review.rating} />
                  <small>{review.created_at.substring(0, 10)}</small>
                </div>
                <strong>By: {review.name}</strong>
                {!(index === product?.reviews.length - 1) && <hr />}
              </div>
            ))}
            <hr />
            <h4>Write a review</h4>
            {reviewLoading && <Loader />}
            {reviewError && <Alert variant="danger">{reviewError}</Alert>}
            {reviewSuccess && <Alert variant="success">Review submitted</Alert>}
            {userInfo ? (
              <Form onSubmit={submithandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <br />
                <Form.Group controlId="comment">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="5"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <button
                  disabled={reviewLoading}
                  type="submit"
                  variant="primary"
                  style={{ width: "40%" }}
                  className="btn btn-outline-secondary btn-lg my-2"
                >
                  Add a Review
                </button>
              </Form>
            ) : (
              <Alert variant="info">
                Please <Link to="/login">Login</Link> to write a review
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
