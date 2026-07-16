import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { system } from "../theme";
import MyButton from "../components/elements/MyButton";
import { useNavigate } from "react-router";


const App = () => {
  
  const navigate = useNavigate();
  return (
    <ChakraProvider value={system}>
      <Flex
        w={"100%"}
        h={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"100px"}
        paddingTop={"50px"}
      >
        <Heading
        flex={"1"}
          fontSize={"4xl"}
          colorPalette={"beige"}
          color={"colorPalette.fg"}
          textAlign={"center"}
        >
          Welcome to Vendly Kiosk!
        </Heading>
        <Flex
          w="100dvw"
          flex={"1"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"30px"}
          flexDirection={"column"}
        >
          <MyButton
            w={"500px"}
            h={"100%"}
            fontSize={"lg"}
            onClick={() => {
              console.log("Taking client to the menu");
              navigate("/menu");
            }}
          >
            I am Ready To Order!
          </MyButton>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
