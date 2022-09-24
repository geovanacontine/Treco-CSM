import React, { useState } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
} from "@chakra-ui/react";

const AddView = (props) => {
  const [name, setName] = useState("");

  return (
    <AlertDialog isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Add View
          </AlertDialogHeader>

          <AlertDialogBody>
            <Input
              placeholder="New view name"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                props.onClose();
                setName("");
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              isDisabled={name === ""}
              onClick={(e) => {
                e.preventDefault();
                props.onClick(name);
                setName("");
              }}
            >
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AddView;
