import React, { useState, useEffect } from "react";
import { Spacer, Text, Button, Link, Loading ,Grid} from "@nextui-org/react";

//css
import "../css/LoginPage.css";
//components
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import { checkAllTrue } from "../Utils";

//react-query
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ErrorModal from "../Components/ErrorModal";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //modal handlers and states
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };

  //validation states
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  //login post function
  const postData = async (user) => {
    const response = await axios.post(
      `http://localhost:5000/ApiGateway/login`,
      user
    );

    if(response.status===200)
      localStorage.setItem('token', response.data.token);
  };

  //mutations
  const mutation = useMutation({
    mutationFn: postData,
  });

  useEffect(() => {
    if(mutation.isSuccess)
      navigate("/products");
  },[mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      setVisible(true);
    }
  }, [mutation.isError]);

  return (
    <div className=" container login-page">
      <ErrorModal
        visible={visible}
        handler={handler}
        closeHandler={closeHandler}
        message={
          "Error occured when trying to log in check the credentials and  try after some time"
        }
      />
      <div className="form">
        <Text h5>{"Login"}</Text>

        <Spacer y="2.6" />
        <EmailInput valueCallback={setEmail} statusCallback={setEmailStatus} />
        <Spacer y="2.6" />
        <PasswordInput
          valueCallback={setPassword}
          label="password"
          statusCallback={setPasswordStatus}
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
              disabled={!checkAllTrue(emailStatus, passwordStatus)}
              onPress={() => {
                mutation.mutate({ email: email, password: password });
              }}
            >
              Login
            </Button>
          )}
          <Link color href="/signup">
            {"create one...."}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
