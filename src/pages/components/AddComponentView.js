import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Select,
} from "@chakra-ui/react";

const AddComponentView = (props) => {
  const [canAdd, setCanAddState] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState({});

  const didSelectComponent = (e, type) => {
    e.preventDefault();
    let index = props.componentList.findIndex((comp) => comp.type === type);
    let component = props.componentList[index];
    let id = uuidv4();
    component.id = id;
    setSelectedComponent(component);
    setCanAddState(component === undefined ? false : true);
  };

  return (
    <AlertDialog isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Add Component
          </AlertDialogHeader>

          <AlertDialogBody>
            <Select
              placeholder="Select component type"
              onChange={(e) => {
                didSelectComponent(e, e.target.value);
              }}
            >
              {props.componentList?.map((component) => (
                <option key={component.type} value={component.type}>
                  {component.type}
                </option>
              ))}
            </Select>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button
              colorScheme="red"
              ml={3}
              isDisabled={canAdd === false}
              onClick={(e) => {
                e.preventDefault();
                props.onClick(selectedComponent);
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

export default AddComponentView;
