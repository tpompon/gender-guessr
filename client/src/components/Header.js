import React from "react";
import { ReactComponent as Logo } from "../svg/logo.svg";

const Header = () => {
  return (
    <div className="header row space-between center-v">
      <div className="row center-v">
        <Logo width={50} height={50} />
        <h1 className="title ml-2">Gender Guessr!</h1>
      </div>
    </div>
  );
};

export default Header;
