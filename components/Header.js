import { Menu } from "semantic-ui-react";
import React from "react";
import { Link } from "../routes";

const header = () => {
  return (
    <Menu>
      <Link route="/">
        <a className="item">kickstart</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
export default header;
