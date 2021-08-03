import React from "react";
import { ProgressBar } from "react-bootstrap";

export const RatingBar = ({ value }) => {
  return (
    <ProgressBar
      max={5}
      min={0}
      now={value}
      animated
      label={`${value ? parseFloat(value).toFixed(1) : "NO"} Reviews`}
      style={{ color: "black" }}
    />
  );
};

export const RatingStar = ({ value }) => {
  return (
    <div>
      <span>
        <i
          style={{ color: "#f8e825" }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#f8e825" }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#f8e825" }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#f8e825" }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span>
        <i
          style={{ color: "#f8e825" }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      &nbsp;&nbsp;
      <strong>({parseFloat(value).toFixed(1)})</strong>
    </div>
  );
};
