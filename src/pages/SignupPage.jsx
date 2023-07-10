import React, { useState } from "react";
import { Input, Spacer, Text, Button, Link, useInput } from "@nextui-org/react";
//css
import "../css/signupPage.css";
//components
import NameInput from "../Components/NameInput";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import { checkAllTrue } from "../Utils";

const SignupPage = () => {
  //     "firstName": "string",
  //   "lastName": "string",
  //   "username": "string",
  //   "email": "string",
  //   "password": "string",
  //   "roleId": 0,
  //   "createdAt": "2023-07-10T07:27:33.940Z"

  //check if all input fields are valid if yes create user else disable the button

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus ,setPasswordStatus]=useState(false);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false);
  const [firstNameStatus,setFirstNameStatus]=useState(false);
  const [lastNameStatus,setLastNameStatus]=useState(false);
  const [userNameStatus,setUserNameStatus]=useState(false);



  return (
    <div className="container signup-page">
      <div className="form p-5">
        <Text h5>{"Sigup"}</Text>
        <Spacer y="2.6" />
        <div className="row">
            <div className="col">
        <NameInput valueCallback={setFirstName} label={"first name"} statusCallback={setFirstNameStatus}/>
        </div>
        
        <div className="col">
        <NameInput valueCallback={setLastName} label={"last name"} statusCallback={setLastNameStatus}/>
        </div>
        </div>
        <Spacer y="2.6" />
        <NameInput valueCallback={setUsername} label={"user name"} statusCallback={setUserNameStatus}/>
        <Spacer y="2.6" />
        <EmailInput valueCallback={setEmail} statusCallback={setEmailStatus} />
        <Spacer y="2.6" />
        <PasswordInput valueCallback={setPassword} label={"password"} statusCallback={setPasswordStatus}/>
        <Spacer y="2.6" />
        <PasswordInput valueCallback={setConfirmPassword} label={"confirm password"} statusCallback={setConfirmPasswordStatus}/>
        <Spacer y="2.6" />
        <div className="row">
            <div className="col">
            <Button color="success" auto disabled={!checkAllTrue(emailStatus,passwordStatus,firstNameStatus,lastNameStatus,userNameStatus,confirmPasswordStatus)}>
            Signup
          </Button>
            </div>
            <div className="col">
            <Link color href="/login">
            {"login"}
          </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
