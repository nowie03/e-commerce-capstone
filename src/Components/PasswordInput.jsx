import React from "react";
import { Input,useInput} from "@nextui-org/react";

const PasswordInput = ({valueCallback}) => {
    const { value, reset, bindings } = useInput("");
    
    valueCallback(value);

    const validatePassword = (value) => {
        return true;
      };

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
    labelPlaceholder="password"
    />
    )
}

export default PasswordInput