import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddView from "./components/AddView";
import DeleteItemView from "./components/DeleteItemView";
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
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const ViewListPage = () => {
  const [viewList, setViewList] = useState({});
  const [isLoading, setLoadingState] = useState(false);
  const [viewToDelete, setViewToDelete] = useState("");
  const navigate = useNavigate();
  const {
    isOpen: isOpenDeleteView,
    onOpen: onOpenDeleteView,
    onClose: onCloseDeleteView,
  } = useDisclosure();
  const {
    isOpen: isOpenAddView,
    onOpen: willAddView,
    onClose: onCloseAddView,
  } = useDisclosure();

  useEffect(() => {
    setLoadingState(true);

    function fetchViewList() {
      fetch("./viewList.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setViewList(jsonData);
          setLoadingState(false);
        });
    }

    fetchViewList();
  }, [setViewList]);

  const willEditView = (viewId) => {
    navigate(`/view?id=${viewId}`);
  };

  const willDeleteView = (viewId) => {
    setViewToDelete(viewId);
    onOpenDeleteView();
  };

  const didFinishDeleteView = (viewId) => {
    onCloseDeleteView();
    console.log(viewId);
  };

  const didFinishAddView = (viewName) => {
    onCloseAddView();
    console.log(viewName);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AddView
        isOpen={isOpenAddView}
        onClose={onCloseAddView}
        onClick={(viewName) => {
          didFinishAddView(viewName);
        }}
      />

      <DeleteItemView
        title="Delete View"
        isOpen={isOpenDeleteView}
        onClose={onCloseDeleteView}
        itemId={viewToDelete}
        onClick={(viewId) => {
          didFinishDeleteView(viewId);
        }}
      />

      <Flex minWidth="max-content">
        <VStack p="48px" w="100%" alignItems="start">
          <Flex w="100%" pb="60px">
            <VStack alignItems="start">
              <Heading size="lg">View List</Heading>
              <Badge colorScheme="purple">Badge</Badge>
            </VStack>
            <Spacer />
            <ButtonGroup>
              <Button
                colorScheme="purple"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  willAddView();
                }}
              >
                Add View
              </Button>
            </ButtonGroup>
          </Flex>
          {renderViewTable()}
        </VStack>
      </Flex>
    </>
  );

  function renderViewTable() {
    return (
      <TableContainer w="100%">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>View Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(viewList?.views ?? []).map((view) => (
              <Tr key={view.id}>
                <Td w="100%">{view.name}</Td>
                <Td>
                  <ButtonGroup variant="outline">
                    <IconButton
                      aria-label="edit"
                      icon={<EditIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        willEditView(view.id);
                      }}
                    />
                    <IconButton
                      aria-label="down"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        willDeleteView(view.id);
                      }}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
};

export default ViewListPage;
