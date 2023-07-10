import React ,{useEffect}from "react";
import { Input,useInput} from "@nextui-org/react";

const NameInput = ({valueCallback,label,statusCallback}) => {
    const { value, reset, bindings } = useInput("");

    
    const validateName = (value) => {
        return value.length>3;
    };
    
    useEffect(()=>{
        const isValid=validateName(value)
        statusCallback(isValid);
        valueCallback(value);
    },[value])

    const helper = React.useMemo(() => {
        if (!value)
          return {
            text: "",
            color: "",
          };
        const isValid = validateName(value);
        return {
          text: isValid ? `looks good ${value}` : "Enter a valid name",
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
    labelPlaceholder={label}
    
    />
    )
}

export default NameInput