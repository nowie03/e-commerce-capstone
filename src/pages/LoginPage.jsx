import React,{ useState, useEffect, useMemo } from "react";
import { Input, Spacer, Text, Button, Link ,useInput} from "@nextui-org/react";
//css
import "../css/LoginPage.css";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";

//svgs

const LoginPage = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

  return (
    <div className="container login-page">
      <div className="form ">
        <Text h5>{"Login"}</Text>
        
        <Spacer y="2.6" />
         <EmailInput valueCallback={setEmail}/>
        <Spacer y="2.6" />
        <PasswordInput valueCallback={setPassword}/>
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
