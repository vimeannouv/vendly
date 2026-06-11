import { system } from "../theme";
import { Box, ChakraProvider, Heading, Flex } from "@chakra-ui/react";
import React from "react";

const Menu = () => {
  return (
    <ChakraProvider value={system}>
      <Flex flexDir={"row"} gap={"0px"} w={"100dvw"} h={"100dvh"}>
        <Flex backgroundColor={"red"} w={"100%"}></Flex>
        <Flex backgroundColor={"blue"} w={"100%"}></Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
