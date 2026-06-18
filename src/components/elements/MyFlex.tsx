import { Flex } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";
import React from "react";

interface FlexProp extends ComponentProps<typeof Flex> {
  children?: ReactNode
  
}

const MyBox = ({children, ...rest}: FlexProp) => {
  const color = "bgColor" in rest
  return <Flex boxShadow={"0px 10px 6px   rgba(128, 115, 102, 0.4)"} bgColor={!color? "rgba(255, 255, 255, 0.6)" : rest.bgColor} borderRadius={"3xl"} {...rest}>
    {children}
  </Flex>;
};

export default MyBox;
