import React, { useState } from "react";
import {
  Flex,
  VStack,
  Spacer,
  Heading,
  Text,
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
} from "@chakra-ui/react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

const ViewDetailPage = (props) => {
  const { header, body } = props.view;
  const [view, setView] = useState(props.view ?? {});

  const didFinishEditingView = () => {
    console.log(view);
  };

  const didFinishEditingComponent = (component) => {
    console.log(component);
  };

  const onChangeHeaderInput = (key, value) => {
    let temp = { ...view };
    temp.header[key] = value;
    setView(temp);
  };

  return (
    <Flex minWidth="max-content">
      <VStack p="48px" w="100%" alignItems="start">
        <Flex w="100%" pb="60px">
          <VStack alignItems="start">
            <Heading size="lg">View Detail</Heading>
            <Text fontSize="sm">{view?.metadata?.id ?? ""}</Text>
          </VStack>
          <Spacer />
          <Button colorScheme="purple" onClick={didFinishEditingView}>
            Salvar
          </Button>
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
              {body?.map((component) => (
                <Tr key={component.tag}>
                  <Td w="100%">{component.type}</Td>
                  <Td>
                    <ButtonGroup variant="outline">
                      <IconButton aria-label="edit" icon={<EditIcon />} />
                      <IconButton aria-label="up" icon={<ArrowUpIcon />} />
                      <IconButton aria-label="down" icon={<ArrowDownIcon />} />
                      <IconButton
                        aria-label="down"
                        colorScheme="red"
                        icon={<DeleteIcon />}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );
};

export default ViewDetailPage;
