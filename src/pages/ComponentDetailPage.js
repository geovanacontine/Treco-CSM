import React, { useState } from "react";
import {
  Flex,
  VStack,
  Spacer,
  Heading,
  Text,
  Input,
  Badge,
  Button,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  HStack,
} from "@chakra-ui/react";

const ComponentDetailPage = (props) => {
  const { type, tag } = props.component;
  const [data, setData] = useState(props.component.data ?? {});

  const onChangeInput = (key, value) => {
    let temp = { ...data };
    temp[key] = value;
    setData(temp);
  };

  const onClickSaveButton = () => {
    let modifiedComponent = { ...props.component };
    modifiedComponent["data"] = data;
    props.didFinishEditingComponent(modifiedComponent);
  };

  return (
    <Flex minWidth="max-content">
      <VStack p="48px" w="100%" alignItems="start">
        <Flex w="100%" pb="60px">
          <VStack alignItems="start">
            <Heading size="lg">Component Detail</Heading>
            <Text fontSize="sm">{tag}</Text>
            <Badge colorScheme="purple">{type}</Badge>
          </VStack>
          <Spacer />
          <Button colorScheme="purple" onClick={onClickSaveButton}>
            Salvar
          </Button>
        </Flex>

        <TableContainer w="100%">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Property</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(data ?? []).map((key) => (
                <Tr key={key}>
                  <Td style={{ textTransform: "capitalize" }}>{key}</Td>
                  <Td>{renderInput(key)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );

  function isBoolean(value) {
    return typeof value == "boolean";
  }

  function isNumber(value) {
    return typeof value == "number";
  }

  function nullCheckbox(key, value, defaultValue) {
    return (
      <Checkbox
        colorScheme="purple"
        isChecked={value !== null}
        onChange={(e) => {
          onChangeInput(key, e.target.checked === false ? null : defaultValue);
        }}
      />
    );
  }

  function renderInput(key) {
    let originalValue = props.component.data[key];
    let currentValue = data[key];

    if (isBoolean(originalValue)) {
      return (
        <Switch
          id={key}
          colorScheme="purple"
          isChecked={currentValue}
          onChange={(e) => {
            onChangeInput(key, e.target.checked);
          }}
        />
      );
    } else if (isNumber(originalValue)) {
      return (
        <HStack>
          <NumberInput
            w='100%'
            value={currentValue ?? 0}
            isDisabled={currentValue === null}
            min={0}
            onChange={(e) => {
              onChangeInput(key, e === "" ? 0 : parseFloat(e));
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {nullCheckbox(key, currentValue, 0)}
        </HStack>
      );
    } else {
      return (
        <HStack>
          <Input
            value={currentValue ?? "Removed"}
            isDisabled={currentValue === null}
            onChange={(e) => {
              onChangeInput(key, e.target.value);
            }}
          />
          {nullCheckbox(key, currentValue, key)}
        </HStack>
      );
    }
  }
};

export default ComponentDetailPage;
