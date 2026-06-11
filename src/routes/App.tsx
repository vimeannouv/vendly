import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { system } from "../theme";
import MyButton from "../components/elements/MyButton";
import { useNavigate } from "react-router";

const App = () => {
  const navigate = useNavigate()
  return (
    <ChakraProvider value={system}>
      <Flex
        w={"100%"}
        h={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"100px"}
        paddingTop={"50px"}
      >
        <Heading
          as={"h3"}
          fontSize={"4xl"}
          colorPalette={"beige"}
          color={"colorPalette.fg"}
          textAlign={"center"}
        >
          What is this device being used for
        </Heading>
        <Flex
          w="100dvw"
          h="60%"
          justifyContent={"center"}
          alignItems={"center"}
          gap={"30px"}
          flexDirection={"column"}
        >
          <MyButton
            w={"300px"}
            fontSize={"lg"}
            onClick={() => {
              console.log("Taking client to the menu")
              navigate("/menu")
            }}
          >
            Customer
          </MyButton>
          <MyButton w={"300px"} fontSize={"lg"}>
            Employee Work
          </MyButton>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
