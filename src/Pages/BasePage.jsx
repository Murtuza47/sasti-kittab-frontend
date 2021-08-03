import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BookCrousel } from "../Components/BookCrousel";
import { Paginator } from "../Components/Paginator";
import { Product } from "../Components/Product";
import * as actions from "../redux/bookListReducer/bookListActions";

export const BasePage = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookList.bookList);
  const page = useSelector((state) => state.bookList.page);
  const pages = useSelector((state) => state.bookList.pages);
  const searchText = props.history.location.search;
  useEffect(() => {
    dispatch(actions.getBookList(searchText));
  }, [dispatch, searchText]);

  return (
    <>
      {!searchText && <BookCrousel />}
      <br />
      <Row>
        {books.map((book) => (
          <Col sm={12} md={6} lg={4} xl={3} className="productsListItem">
            <Product product={book} />
          </Col>
        ))}
      </Row>
      <Row>
        <Paginator page={page} pages={pages} keyword={searchText} />
      </Row>
    </>
  );
};
