import { Text, ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { system } from "../theme";

const App = () => {
  return (
    <ChakraProvider value={system}>
      <Flex
        w={"100%"}
        h={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"40px"}
        paddingTop={"50px"}>
        <Heading
          as={"h3"}
          fontSize={"4xl"}
          colorPalette={"beige"}
          color={"colorPalette.fg"}>
            What is this application used for?
        </Heading>
        <Text>Whats up</Text>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
