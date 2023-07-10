import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";


export default function ErrorModal({visible,handler,closeHandler,message}) {
  

  return (
    
      <Modal
        aria-labelledby="Error Occured..."
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title"  size={18}>
            oops! Something went  
            <Text b size={18}>
              {" "}wrong
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
        <p>{message}</p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    
  );
}
