import React from "react";
import logo from "../images/icon.png";
import avatar from "../images/avatar.png";
import searchIcon from "../images/searchIcon.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="reddit half logo" />
        <div className="logo-words">R'dit Mini</div>
      </div>
      <div className="search">
        <img src={searchIcon} />
        <input id="search" name="search" value="" placeholder="Search" />
      </div>
      <div className="avatar">
        <img src={avatar} />
      </div>
    </div>
  );
};

export default Header;
