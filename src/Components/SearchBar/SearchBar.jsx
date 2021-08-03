import React, { useState } from "react";
import { useHistory } from "react-router";

export const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchText) {
      history.push(`/?keyword=${searchText}&page=1`);
    } else {
      history.push(history.location.pathname);
    }
  };

  return (
    <>
      <div className="searchBar">
        <i class="fas fa-search" style={{ paddingTop: "2px" }} />
        &nbsp;&nbsp;
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="searchBarInput"
        />
      </div>
      &nbsp;&nbsp;
      <button
        type="submit"
        variant="primary"
        className="btn btn-primary btn-sm my-2"
        onClick={(e) => submitHandler(e)}
      >
        Search
      </button>
    </>
  );
};
