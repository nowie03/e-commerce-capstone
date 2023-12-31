import React, { useEffect } from "react";
import { Input,useInput} from "@nextui-org/react";

const EmailInput = ({valueCallback,statusCallback}) => {
    const { value, reset, bindings } = useInput("");

    
    const validateEmail = (value) => {
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    };
    
    useEffect(()=>{
        const isValid = validateEmail(value);
        statusCallback(isValid);  
        valueCallback(value);
    },[value]);
   
    const helper = React.useMemo(() => {
        if (!value)
          return {
            text: "",
            color: "",
          };
        const isValid = validateEmail(value);
        return {
          text: isValid ? "Correct email" : "Enter a valid email",
          color: isValid ? "success" : "error",
        };
      }, [value]);


  return (
     <Input
    {...bindings}
    fullWidth
    clearable
    shadow={false}
    onClearClick={reset}
    status={helper.color}
    color={helper.color}
    helperColor={helper.color}
    helperText={helper.text}
    type="email"
    labelPlaceholder="Email"
    />
    )
}

export default EmailInput