import { Flex, Box } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface PopupLayerProp extends ComponentProps<typeof Flex> {
  children?: ReactNode;
}

const PopupLayer = ({ ...rest }: PopupLayerProp) => {
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
        <Box flex={1} h={"100%"} bgColor={"red"}>

        </Box>
        {/* ITEM NAME, PRICE, QUANTITY */}
        <Flex flex={1} h={"100%"} bgColor={"blue"}>

        </Flex>

      </Flex>
    </Flex>

  );
};

export default PopupLayer;
