import React from "react";
import { Input,useInput} from "@nextui-org/react";

const EmailInput = ({valueCallback}) => {
    const { value, reset, bindings } = useInput("");

    valueCallback(value);

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
      };

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