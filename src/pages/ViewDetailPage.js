import React, { useState } from "react";
import {
  Flex,
  VStack,
  Spacer,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
  IconButton,
  Button,
  Input,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

const ViewDetailPage = (props) => {
  const [componentToDelete, setComponentToDelete] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { header } = props.view;
  const view = props.view;

  const onChangeMetadataInput = (key, value) => {
    let temp = { ...view };
    let newValue = value === "" ? "View Title" : value;
    temp.metadata[key] = newValue;
    props.didUpdateView(temp);
  };

  const onChangeHeaderInput = (key, value) => {
    let temp = { ...view };
    temp.header[key] = value;
    props.didUpdateView(temp);
  };

  const onClickSaveButton = (e) => {
    e.preventDefault();
    props.didFinishEditingView(view);
  };

  const onClickEditComponent = (e, component) => {
    e.preventDefault();
    props.willEditComponent(component);
  };

  const willDeleteComponent = (e, componentId) => {
    e.preventDefault();
    setComponentToDelete(componentId);
    onOpen();
  };

  const onClickDeleteComponent = (componentId) => {
    let temp = { ...view };
    let index = temp.body.findIndex((comp) => comp.id === componentId);
    temp.body.splice(index, 1);
    props.didUpdateView(temp);
    onClose();
  };

  const onClickMoveUpComponent = (e, component) => {
    e.preventDefault();
    let temp = { ...view };
    let index = temp.body.findIndex((comp) => comp.id === component.id);

    if (index !== 0) {
      let indexAbove = index - 1;
      let componentAbove = temp.body[indexAbove];
      temp.body[indexAbove] = component;
      temp.body[index] = componentAbove;
      props.didUpdateView(temp);
    }
  };

  const onClickMoveDownComponent = (e, component) => {
    e.preventDefault();
    let temp = { ...view };
    let index = temp.body.findIndex((comp) => comp.id === component.id);

    if (index < temp.body.length - 1) {
      let indexBelow = index + 1;
      let componentBelow = temp.body[indexBelow];
      temp.body[indexBelow] = component;
      temp.body[index] = componentBelow;
      props.didUpdateView(temp);
    }
  };

  return (
    <>
      <Flex minWidth="max-content">
        <VStack p="48px" w="100%" alignItems="start">
          <Flex w="100%" pb="60px">
            <VStack alignItems="start">
              <Heading size="lg">{view.metadata?.name}</Heading>
              <Badge colorScheme="purple">{view?.metadata?.id ?? ""}</Badge>
            </VStack>
            <Spacer />
            <ButtonGroup>
              <Button colorScheme="purple" variant="outline">
                Add Component
              </Button>
              <Button>Cancel</Button>
              <Button
                colorScheme="purple"
                onClick={(e) => {
                  onClickSaveButton(e);
                }}
              >
                Save
              </Button>
            </ButtonGroup>
          </Flex>

          <TableContainer w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Header</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.keys(header ?? []).map((key) => (
                  <Tr key={key}>
                    <Td style={{ textTransform: "capitalize" }}>{key}</Td>
                    <Td>
                      <Input
                        value={view.header[key]}
                        onChange={(e) => {
                          onChangeHeaderInput(key, e.target.value);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer w="100%" pt="32px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>components</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {view.body?.map((component) => (
                  <Tr key={component.id}>
                    <Td w="100%">{component.type}</Td>
                    <Td>
                      <ButtonGroup variant="outline">
                        <IconButton
                          aria-label="edit"
                          icon={<EditIcon />}
                          onClick={(e) => {
                            onClickEditComponent(e, component);
                          }}
                        />
                        <IconButton
                          aria-label="up"
                          icon={<ArrowUpIcon />}
                          onClick={(e) => {
                            onClickMoveUpComponent(e, component);
                          }}
                        />
                        <IconButton
                          aria-label="down"
                          icon={<ArrowDownIcon />}
                          onClick={(e) => {
                            onClickMoveDownComponent(e, component);
                          }}
                        />
                        <IconButton
                          aria-label="down"
                          colorScheme="red"
                          icon={<DeleteIcon />}
                          onClick={(e) => {
                            willDeleteComponent(e, component.id);
                          }}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          <TableContainer w="100%" pt="32px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Metadata</Th>
                  <Th>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr key="name">
                  <Td>Name</Td>
                  <Td>
                    <Input
                      value={view.metadata?.name}
                      onChange={(e) => {
                        onChangeMetadataInput("name", e.target.value);
                      }}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Flex>

      <AlertDialog isOpen={isOpen} onClose={onClose} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Component
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={(e) => {
                  onClickDeleteComponent(componentToDelete);
                }}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ViewDetailPage;
