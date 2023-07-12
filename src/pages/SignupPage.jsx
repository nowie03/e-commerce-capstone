import React, { useState, useEffect } from "react";
import {
  Input,
  Spacer,
  Text,
  Button,
  Link,
  useInput,
  Loading,
} from "@nextui-org/react";
//css
import "../css/signupPage.css";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ErrorModal from "../Components/ErrorModal";

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

  //modal handlers and states
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };

  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false);
  const [firstNameStatus, setFirstNameStatus] = useState(false);
  const [lastNameStatus, setLastNameStatus] = useState(false);
  const [userNameStatus, setUserNameStatus] = useState(false);

  const postData = async (user) => {
    const response = await axios.post(
      `http://localhost:5000/ApiGateway/signup`,
      user
    );
    console.log(response);
  };

  //mutations
  const mutation = useMutation({
    mutationFn: postData,
  });

  useEffect(() => {
    if(mutation.isError)
    setVisible(true);
  }, [mutation.isError]);
  return (
    <div className="container signup-page">
      <ErrorModal
        visible={visible}
        handler={handler}
        closeHandler={closeHandler}
        message={
          "Error occured when trying to sign up check the inputs and  try after some time"
        }
      />
      <div className="form p-5">
        <Text h5>{"Sign up"}</Text>
        <Spacer y="2.6" />
        <div className="row">
          <div className="col">
            <NameInput
              valueCallback={setFirstName}
              label={"first name"}
              statusCallback={setFirstNameStatus}
            />
          </div>
          <div className="col">
            <NameInput
              valueCallback={setLastName}
              label={"last name"}
              statusCallback={setLastNameStatus}
            />
          </div>
        </div>
        <Spacer y="2.6" />
        <NameInput
          valueCallback={setUsername}
          label={"user name"}
          statusCallback={setUserNameStatus}
        />
        <Spacer y="2.6" />
        <EmailInput valueCallback={setEmail} statusCallback={setEmailStatus} />
        <Spacer y="2.6" />
        <PasswordInput
          valueCallback={setPassword}
          label={"password"}
          statusCallback={setPasswordStatus}
        />
        <Spacer y="2.6" />
        <PasswordInput
          valueCallback={setConfirmPassword}
          label={"confirm password"}
          statusCallback={setConfirmPasswordStatus}
        />
        <Spacer y="2.6" />
        <div className="row">
          {mutation.isLoading ? (
            <div className="col">
              <Loading />
            </div>
          ) : (
            <Button
              color="success"
              auto
              disabled={
                !checkAllTrue(
                  emailStatus,
                  passwordStatus,
                  firstNameStatus,
                  lastNameStatus,
                  userNameStatus,
                  confirmPasswordStatus
                )
              }
              onPress={()=>{
                mutation.mutate({firstName:firstName,lastName:lastName,username:username,email:email,password:password,roleId:1,createdAt:new Date()})
            }}
            >
              Signup
            </Button>
          )}
          <Link color href="/login">
            {"already have an account?"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
