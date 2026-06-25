import { system } from "../theme";
import { Box, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";
import { useState } from "react";
import { useNavigate } from "react-router";

const Menu = () => {
  const tabs = ["Burgers", "Chicken", "Tacos"];
  const menu = {
    Burgers: ["Chicken", "Fish"],
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
      <Flex flexDir={"row"} gap={"0px"} w={"100dvw"} h={"100dvh"}>
        <Flex
          w={"20%"}
          h={"100%"}
          alignContent={"center"}
          padding={"0px"}
          paddingRight={"0px"}
        >
          <MyFlex
            w={"110px"}
            h={"100%"}
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
                backgroundColor={ (tabName == item)? "red" : "blue" }
                transition={".1 ease-out"}
              >
                {tabs[i]}
              </MyButton>
            ))}
          </MyFlex>
        </Flex>

        {/* MENU RIGHT SIDE */}
        <Flex
          w={"dvw"}
          h={"100dvh"}
          padding={"20px"}
          paddingLeft={"10px"}
          aspectRatio={1 / 1}
        >
          <MyFlex w={"100%"} h={"100%"}>
            <Grid
              w={"100%"}
              h={"100%"}
              padding={"10px"}
              autoFlow={"row"}
              gap={"3.5px"}
              gridTemplateColumns={"repeat(auto-fit, minmax(200px, 1fr))"}
              justifyItems={"center"}
            >
              {getFoodList(tabName).map((item: string, i: number) => (
                <GridItem w={"100%"}>
                  <MyButton
                    w={"200px"}
                    h={"300px"}
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
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
