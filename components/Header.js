import { Menu } from "semantic-ui-react";
import React from "react";

export default () =>{
    return(
        <Menu>
            <Menu.Item>kickstart</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>Campaigns</Menu.Item>
                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}