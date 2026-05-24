import { Text, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { system } from "../theme";
import MyButton from "../components/elements/MyButton";

const App = () => {
  return (
    <ChakraProvider value={system}>
      <Flex
        w={"100%"}
        h={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
        paddingTop={"50px"}>
        <Heading
          as={"h3"}
          fontSize={"4xl"}
          colorPalette={"beige"}
          color={"colorPalette.fg"}>
          What is this application used for?
        </Heading>
        <MyButton w={"300px"} fontSize={"lg"}>
          Customer Kiosk
        </MyButton>
        <MyButton w={"300px"} fontSize={"lg"}>
          Management
        </MyButton>
        <MyButton w={"300px"} fontSize={"lg"}>
          See Preorders
        </MyButton>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
