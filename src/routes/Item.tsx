import { system } from "../theme";
import { ChakraProvider, Heading, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";

const Item = () => {
  const location = useLocation();
  const { test } = location.state || {};
  return (
    <ChakraProvider value={system}>
      <Flex
        justifyContent={"center"}
        flexDir={"row"}
        padding={"20px"}
        h={"100dvh"}
        w={"100dvw"}
        gap={"20px"}
      >
        <MyFlex h={"100%"} w={"40%"} padding={"20px"}>
          {test}
        </MyFlex>
        <MyFlex h={"100%"} w={"100%"} padding={"20px"} bgColor={"none"} boxShadow={"none"}>
          {test}
          <MyButton>Henlo</MyButton>
        </MyFlex>
      </Flex>
    </ChakraProvider>
  );
};

export default Item;
