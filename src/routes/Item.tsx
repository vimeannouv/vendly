import { system } from "../theme";
import { ChakraProvider, Flex } from "@chakra-ui/react";
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
        padding={"30px"}
        h={"100dvh"}
        w={"100dvw"}
        gap={"10px"}
      >
        {/* ITEM IMAGE */}
        <MyFlex h={"100%"} w={"35%"} padding={"20px"}>
          {test}
        </MyFlex>
        {/* INFO SECTION */}
        <MyFlex
          h={"100%"}
          w={"100%"}
          padding={"20px"}
          bgColor={"none"}
          boxShadow={"none"}
          as={"section"}
          flexDir={"column"}
          gap={"10px"}
        >
          {/* QUANTITY, DESC,... */}
          <MyFlex h={"90%"}>
            <Flex bgColor={"red"} w={"100%"} h={"50%"} as={"section"}>
              hllo
            </Flex>
          </MyFlex>

          {/*CONFIRM OR CANCEL*/}
          <MyFlex
            gap={"10px"}
            bgColor={"none"}
            boxShadow={"none"}
            justifyContent={"space-between"}
          >
            <MyButton w={"49%"} size={"lg"}>
              Confirm
            </MyButton>
            <MyButton w={"49%"} size={"lg"}>
              Cancel
            </MyButton>
          </MyFlex>
        </MyFlex>
      </Flex>
    </ChakraProvider>
  );
};

export default Item;
