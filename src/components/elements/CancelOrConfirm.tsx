import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import { useState, type ComponentProps } from "react";
import na from "../../assets/na.png";

interface CancelOrCOnfirmProp extends ComponentProps<typeof Flex> {
  
}


const CancelOrConfirm = ({

  ...rest
}: CancelOrCOnfirmProp) => {
 
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
        w={"80%"}
        h={"80%"}
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
        
      </Flex>
    </Flex>
  );
};

export default CancelOrConfirm;
