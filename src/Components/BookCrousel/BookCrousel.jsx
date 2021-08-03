import React, { useEffect } from "react";
import { Alert, Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/bookListReducer/bookListActions";
import { Loader } from "../Loader/Loader";

export const BookCrousel = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.bookList.latestBookLoading);
  const error = useSelector((state) => state.bookList.latestBookError);
  const latestBook = useSelector((state) => state.bookList.latestbook);
  useEffect(() => {
    dispatch(actions.getLatestBook());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert></Alert>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {latestBook.map((book) => (
        <Carousel.Item key={book.id}>
          <Link to={`/product/${book.id}`}>
            <Image src={book.image} alt={book.name} />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
