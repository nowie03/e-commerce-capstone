import React,{ useState, useEffect, useMemo } from "react";
import { Input, Spacer, Text, Button, Link ,useInput} from "@nextui-org/react";
//css
import "../css/LoginPage.css";
//components
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import { checkAllTrue } from "../Utils";

//svgs

const LoginPage = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    //validation states
    const [emailStatus,setEmailStatus]=useState(false);
    const [passwordStatus,setPasswordStatus]=useState(false);
    

    

  return (
    <div className="container login-page">
      <div className="form">
        <Text h5>{"Login"}</Text>
        
        <Spacer y="2.6" />
         <EmailInput valueCallback={setEmail} statusCallback={setEmailStatus}/>
        <Spacer y="2.6" />
        <PasswordInput valueCallback={setPassword} label="password" statusCallback={setPasswordStatus}/>
        <Spacer y="2.6" />
        <div className="row">
          <Button color="success" auto  disabled={!checkAllTrue(emailStatus,passwordStatus)}>
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
