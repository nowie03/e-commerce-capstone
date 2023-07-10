import { React, useState, useEffect } from "react";
import { Input, Spacer, Text, Button, Link } from "@nextui-org/react";
//css
import "../css/LoginPage.css";

//svgs


const LoginPage = () => {
  //states

  return (
    <div className="container login-page">
      <div className="form ">
        <Text color="success" h5>{"Login"}</Text>
        <Spacer y="2.6" />
        <Input
            clearable
            bordered
            fullWidth
           
            size="lg"
            labelPlaceholder="Email"
            
            // contentLeft={<Mail fill="currentColor" />}
          />
        <Spacer y="2.6" />

          <Input.Password
            clearable
            bordered
            fullWidth
           
            size="lg"
            labelPlaceholder="Password"
            // contentLeft={<Password fill="currentColor" />}
          />
        <Spacer y="2.6" />
        <div className="row">
          <Button color="success" auto>
            Login
          </Button>
          <Link color href="/signup">
            {"signup"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
