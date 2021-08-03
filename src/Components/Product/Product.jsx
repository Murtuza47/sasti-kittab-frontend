import React from "react";
import { Card } from "react-bootstrap";
import { RatingBar } from "../Rating";
import { Link } from "react-router-dom";

export const Product = ({ product }) => {
  return (
    <Card style={{ width: "18rem", marginBottom: "1rem" }}>
      <Card.Img
        variant="top-bottom"
        src={product.image}
        height={250}
        className="p-2"
      />
      <Card.Body>
        <Card.Title as="h4">
          <Link to={`/product/${product.id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <figure>
          <blockquote class="blockquote">
            <p className="mb-0" style={{ fontSize: "1rem" }}>
              <small>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </small>
            </p>
          </blockquote>
          <figcaption className="blockquote-footer text-end">
            <cite title="Source Title">{product.user.username}</cite>
          </figcaption>
        </figure>
        <RatingBar value={product.num_reviews} />
        <Card.Text as="h4" className="pt-2">
          <strong>PKR {product.price}</strong>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Publish At: {product.created_at.substring(0, 10)}
        </small>
      </Card.Footer>
    </Card>
  );
};
