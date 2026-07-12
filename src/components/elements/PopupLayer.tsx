import { Flex } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface PopupLayerProp extends ComponentProps<typeof Flex> {
  children?: ReactNode;
}

const PopupLayer = ({ }: PopupLayerProp) => {
  return (
    <Flex
      w={"40%"}
      h={"50%"}
      bgColor={"blue"}
      position={"absolute"}
      zIndex={"2"}
      top={"50%"}
      bottom={"50%"}
      transform={"translate(-50%, -50%)"}
    ></Flex>
  );
};

export default PopupLayer;
