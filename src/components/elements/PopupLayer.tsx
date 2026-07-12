import { Flex } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface PopupLayerProp extends ComponentProps<typeof Flex> {
  children?: ReactNode;
}

const PopupLayer = ({ children }: PopupLayerProp) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      zIndex={5}
      w={"100%"}
      h={"100%"}
      bgColor={"red"}
    ></Flex>
  );
};

export default PopupLayer;
