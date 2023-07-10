import React, { useEffect } from "react";
import { Input,useInput} from "@nextui-org/react";
import { StepLabel } from "@mui/material";

const PasswordInput = ({valueCallback,label,statusCallback}) => {
    const { value, reset, bindings } = useInput("");
    
    
    const validatePassword = (value) => {
        return value.length>=4;
    };


    useEffect(()=>{
        const isValid=validatePassword(value)
        statusCallback(isValid);
        valueCallback(value);
    },[value])


    const helper = React.useMemo(() => {
        if (!value)
          return {
            text: "",
            color: "",
          };
        const isValid = validatePassword(value);
        return {
          text: isValid ? "Correct password" : "Enter a valid password",
          color: isValid ? "success" : "error",
        };
      }, [value]);
  return (
     <Input.Password
    {...bindings}
    fullWidth
    clearable
    shadow={false}
    onClearClick={reset}
    status={helper.color}
    color={helper.color}
    helperColor={helper.color}
    helperText={helper.text}
    labelPlaceholder={label}
    />
    )
}

export default PasswordInput