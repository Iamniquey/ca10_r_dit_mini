import React, { useEffect, useState } from "react";
import logo from "../images/icon.png";
import avatar from "../images/avatar.png";
import searchIcon from "../images/searchIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "../features/Search/searchSlice";

const Header = () => {
  const [search, setSearchValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    //save search value to store
      dispatch(setSearch(search));
  }, [dispatch, search]);

  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="reddit half logo" />
        <div className="logo-words">R'dit Mini</div>
      </div>
      <div className="search">
        <img src={searchIcon} />
        <input
          id="search"
          name="search"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className="avatar">
        <img src={avatar} />
      </div>
    </div>
  );
};

export default Header;
