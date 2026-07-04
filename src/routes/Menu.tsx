import { system } from "../theme";
import { Box, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";
import { useState } from "react";
import { useNavigate } from "react-router";

const Menu = () => {
  const tabs = ["Burgers", "Chicken", "Tacos"];
  const menu = {
    Burgers: [
      "Chicken",
      "Fish",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    Chicken: ["Buffalo wings", "Hello"],
    Tacos: ["Mexico"],
  };
  const [tabName, setTabName] = useState("Burgers");

  const getFoodList = (tabname: string) => {
    return menu[tabname as keyof typeof menu];
  };

  const navigate = useNavigate();

  return (
    <ChakraProvider value={system}>
      <Flex
        flexDir={"row"}
        gap={"0px"}
        w={"100dvw"}
        h={"100dvh"}
        as={"section"}
      >
        {/* CATEGORY BAR */}
        <MyFlex
          flex={0}
          flexDir={"column"}
          gap={"15px"}
          borderRadius={"0px"}
          alignItems={"center"}
          padding={"10px"}
        >
          {tabs.map((item, i) => (
            <MyButton
              w={"85px"}
              h={"90px"}
              borderRadius={"28px"}
              onClick={() => {
                setTabName(item);
              }}
              backgroundColor={tabName == item ? "red" : "blue"}
              transition={".1 ease-out"}
            >
              {tabs[i]}
            </MyButton>
          ))}
        </MyFlex>

        {/* MENU AREA SIDE */}
        <Flex flex={3} padding={"20px"} bgColor={"red"} as={"section"}>
          <MyFlex flex={3} as={"div"}>
            {/* Items under the category will be displayed here */}
            <Grid
              flex={"1"}
              p="10px"
              gap="15px"
              templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
              overflowY={"auto"}
              overflowX={"hidden"}
            >
              {getFoodList(tabName).map((item: string, i: number) => (
                <GridItem w={"100%"} key={i}>
                  <MyButton
                    w="160px"
                    h="160px"
                    bg="white"
                    borderRadius="20px"
                    onClick={() => {
                      navigate("/items", { state: { test: item } });
                    }}
                  >
                    {item}
                  </MyButton>
                </GridItem>
              ))}
            </Grid>
          </MyFlex>
        </Flex>
        {/* CART AREA */}
        <Flex flex={1} h={"100dvh"} padding={"10px"}>
          <MyFlex w={"100%"} h={"100%"}>
            
          </MyFlex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
