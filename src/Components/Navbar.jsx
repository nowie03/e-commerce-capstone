import React from "react";

import {
  Navbar,
  Link,
  Text,
  Avatar,
  Dropdown,
  Input,
  Image,
  Spacer,
} from "@nextui-org/react";
import { Layout } from "./Layout.jsx";
import { AcmeLogo } from "./AcmeLogo.jsx";
import CartImage from "../assets/bx-cart.png";
import CartModal from "./CartModal.jsx";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { getUserId } from "../Utils.js";
import { useNavigate } from "react-router-dom";



export default function App() {


  const navigate=useNavigate();

  const [visible, setVisible] = React.useState(false);

  const openHandler = () => {
    setVisible(true);
  };
  const closeHandler = () => {
    setVisible(false);
  };

  const signOutHandler=(key)=>{
    if(key.actionKey ==='logout'){
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  const collapseItems = ["Cart", "Log Out"];

  

 



  return (
    <Layout>
     {<CartModal
        visible={visible}
        handler={openHandler}
        closeHandler={closeHandler}
       
      />} 
      <Navbar isBordered variant="sticky"> 
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            SHOP
          </Text>
        </Navbar.Brand>

        <Navbar.Content>
          <Spacer x={"30.6"} />
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => signOutHandler({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>

              <Dropdown.Item key="logout" withDivider color="error" >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Content>
          <Image src={CartImage} onClick={openHandler}/>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </Layout>
  );
}
