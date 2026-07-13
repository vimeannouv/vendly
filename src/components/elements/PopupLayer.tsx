import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { useState, type ComponentProps, type ReactNode } from "react";

interface PopupLayerProp extends ComponentProps<typeof Flex> {
  children?: ReactNode;
}

const PopupLayer = ({ ...rest }: PopupLayerProp) => {
  const [quantity, setQuantity] = useState(0);
  
  function addQuantity(amount: number) {
    const newQuantity = quantity + amount;
    if (newQuantity < 0) return;
    if (newQuantity >= 100) return;
    setQuantity(quantity + amount);
  }

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      bgColor={"rgba(0, 0, 0, 0.3)"}
      position={"fixed"}
      zIndex={"999"}
      {...rest}
    >
      <Flex
        w={"70%"}
        h={"70%"}
        bgColor={"rgb(255, 255, 255)"}
        position={"fixed"}
        zIndex={"2"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
        borderRadius={"40px"}
        flexDir={"row"}
        {...rest}
      >
        {/* IMAGE DISPLAY */}
        <Box flex={1} h={"100%"}></Box>
        {/* ITEM NAME, PRICE, QUANTITY */}

        <Flex
          flex={1}
          h={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          padding={"30px"}
          fontSize={"3xl"}
          gap={"6px"}
          justifyContent={"space-between"}
        >
          <Flex flexDir={"column"} alignItems={"center"} gap={"20px"}>
            {/* name */}
            <Text flex={1}>Test Burger</Text>
            {/* price */}
            <Text
              borderRadius={"30px"}
              marginTop={"0px"}
              bgColor={"#fff5ee"}
              padding={"10px"}
              color={"rgb(216, 168, 96)"}
              w={"100%"}
              h={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"2xl"}
              
            >
              {`$100.99`}
            </Text>
          </Flex>
          {/* quantity */}

          <Flex
            flexDir={"column"}
            textAlign={"center"}
            justifyContent={"center"}
            flex={1}
            gap={"20px"}
          >
            <Text>Quantity:</Text>
            <Flex
              justifyContent={"space-between"}
              flexDir={"row"}
              alignItems={"center"}
              gap={"20px"}
            >
              {/* minus quantity */}
              <Button
                borderRadius={"100%"}
                w={"60px"}
                h={"60px"}
                bgColor={"#fff0e5"}
                color={"rgb(216, 168, 96)"}
                fontSize={"40px"}
                onClick={() => {
                  addQuantity(-1);
                }}
              >
                -
              </Button>
              {/* display quantitit */}
              <Text color={"rgb(181, 133, 62)"}>{quantity}</Text>
              {/* + quanitty */}
              <Button
                borderRadius={"100%"}
                w={"60px"}
                h={"60px"}
                bgColor={"#fff0e5"}
                color={"rgb(216, 168, 96)"}
                fontSize={"40px"}
                onClick={() => {
                  addQuantity(1);
                }}
              >
                +
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PopupLayer;
