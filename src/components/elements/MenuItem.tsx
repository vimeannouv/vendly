import { Button, Flex, Box, Text } from "@chakra-ui/react";
import type { ComponentProps } from "react";
import MyButton from "./MyButton";

interface MenuItemProps extends ComponentProps<typeof Button> {
  itemName: string;
  itemPrice: number;
  itemImage?: any;
}

const MenuItem = ({ itemName, itemPrice, ...rest }: MenuItemProps) => {
  return (
    <MyButton {...rest} padding={"10px"}>
      <Flex w={"100%"} h={"100%"} flexDir={"column"} gap={"10px"}>
        {/* IMAGE */}
        <Box flex={"2"} w={"100%"} bgColor={"#ffc8c8"} borderRadius={"30px"}></Box>

        {/* PRICE, NAME */}

        <Flex flex={"1"} w={"100%"} flexDir={"column"} gap={"10px"} justifyContent={"center"} alignItems={"center"}>
          {/* name */}
          <Text flex={"1.3"}>{itemName}</Text>

          {/* price */}
          <Text
            flex={"1"}
            borderRadius={"30px"}
            marginTop={"0px"}
            bgColor={"#fff5ee"}
            padding={"10px"}
            color={"rgb(216, 168, 96)"}
            w={"70%"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {`$${itemPrice}`}
          </Text>
        </Flex>
      </Flex>
    </MyButton>
  );
};

export default MenuItem;
