import { system } from "../theme";
import {
  Box,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import bg from "../assets/bg.png";
import { animated, useSpring } from "@react-spring/web";

const AnimatedGrid = animated(Grid);
const AnimatedBox = animated(Box);
const gridSpringValues = {
  from: { opacity: 0, transform: "scale(0.9)", top: "10%" },
  to: { opacity: 1, transform: "scale(1)", top: "0%" },
  config: { tension: 600, friction: 60 },
};

const Menu = () => {
  // test variables

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

  // helper funcs

  const getFoodList = (tabname: string) => {
    return menu[tabname as keyof typeof menu];
  };

  const navigate = useNavigate();

  const [highlightSpring, highlightSpringController] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: 0,
    config: { mass: 6.7, tension: 1000, friction: 75},
  }));

  const [gridSpring, gridSpringController] = useSpring(() => gridSpringValues);

  const playAnimsOnClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // grid animation
    gridSpringController.start(gridSpringValues);

    // highligher animation
    const target = ev.currentTarget
    if (!(target)) 
      return
    
    const rect = target.getBoundingClientRect();

    const newX = rect.left;
    const newY = rect.top;
    
    highlightSpringController.start({ x: newX, y: newY, opacity: 1, width: target.clientWidth, height: target.clientHeight });
  };

  return (
    <ChakraProvider value={system}>
      <AnimatedBox
      style={highlightSpring}
        position={"absolute"}
        bgColor={"rgb(255, 255, 255)"}
        h={"100px"}
        w={"100px"}
      ></AnimatedBox>

      <Flex
        bgImage={`url(${bg})`}
        flexDir={"row"}
        gap={"0px"}
        w={"100dvw"}
        h={"100dvh"}
        as={"section"}
        bgSize={"cover"}
      >
        {/* CATEGORY BAR */}
        <MyFlex
          flex={0}
          flexDir={"column"}
          gap={"0px"}
          borderRadius={"0px"}
          alignItems={"center"}
          padding={"10px"}
          minW={"150px"}
          paddingLeft={"0px"}
          paddingRight={"0px"}
        >
          <Heading
            paddingBottom={"20px"}
            borderBottom={"2px solid rgb(203, 192, 166)"}
            w={"100%"}
            textAlign={"center"}
          >
            Categories
          </Heading>
          {tabs.map((item, i) => (
            <MyButton
              w={"100%"}
              h={"40px"}
              borderRadius={"0px"}
              onClick={(ev) => {
                setTabName(item);
                playAnimsOnClick(ev);
              }}
              bgColor={"transparent"}
              boxShadow={"none"}
              transition={".1 ease-out"}
              key={i}
              borderBottom={"2px solid rgb(203, 192, 166)"}
            >
              {tabs[i]}
            </MyButton>
          ))}
        </MyFlex>

        {/* MENU AREA SIDE */}
        <Flex
          flex={3}
          padding={"20px"}
          as={"section"}
          flexDir={"column"}
          overflowY={"auto"}
          overflowX={"hidden"}
        >
          <MyFlex minH={"200px"} flex={0} bgColor={"none"}></MyFlex>
          {/* Items under the category will be displayed here */}
          <AnimatedGrid
            style={gridSpring}
            flex={1}
            p="10px"
            gap="15px"
            templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            justifyContent={"center"}
            position={"relative"}
          >
            {getFoodList(tabName).map((item: string, i: number) => (
              <GridItem w={"100%"} key={i}>
                <MyButton
                  w="160px"
                  h="160px"
                  bg="white"
                  borderRadius="14px"
                  boxShadow={
                    "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.2);"
                  }
                  onClick={() => {
                    navigate("/items", { state: { test: item } });
                  }}
                >
                  {item}
                </MyButton>
              </GridItem>
            ))}
          </AnimatedGrid>
        </Flex>
        {/* CART AREA */}
        <Flex flex={1} h={"100dvh"} padding={"15px"}>
          <MyFlex w={"100%"} h={"100%"}></MyFlex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
