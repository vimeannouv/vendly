import { Flex } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface FlexProp extends ComponentProps<typeof Flex> {
  children?: ReactNode;
}

const MyBox = ({ children, ...rest }: FlexProp) => {
  const color = "bgColor" in rest;
  return (
    <Flex
      boxShadow={"0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.05);"}
      bgColor={!color ? "rgba(255, 255, 255, 0.6)" : rest.bgColor}
      borderRadius={"3xl"}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default MyBox;
