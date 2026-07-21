import { Flex, Button, Text, Presence, Box } from "@chakra-ui/react";
import { size } from "@cloudinary/url-gen/qualifiers/textFit";
import type { ComponentProps, ReactNode } from "react";
import { FaCartShopping } from "react-icons/fa6";

interface OrderFinishedProp extends ComponentProps<typeof Flex> {
  hidden: boolean;
  onClickConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
}

const OrderFinished = ({
  hidden,
  onClickConfirm,
  children,
  ...rest
}: OrderFinishedProp) => {
  return (
    <Presence
      present={!hidden}
      animationName={{
        _open: "fade-in",
        _closed: "fade-out",
      }}
      animationDuration="moderate"
      w={"100%"}
      h={"100%"}
      unmountOnExit
      zIndex={99999}
      position={"fixed"}
    >
      <Flex
        w={"100%"}
        h={"100%"}
        bgColor={"rgba(0, 0, 0, 0.3)"}
        position={"fixed"}
        zIndex={"999"}
        {...rest}
      >
        <Presence
          present={!hidden}
          animationStyle={{
            _open: "scale-fade-in",
            _closed: "scale-fade-out",
          }}
          animationDuration="moderate"
          w={"100%"}
          h={"100%"}
          unmountOnExit
        >
          <Flex
            w={"80%"}
            h={"80%"}
            bgColor={"white"}
            position={"fixed"}
            zIndex={"2"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            borderRadius={"15px"}
            flexDir={"column"}
            alignItems={"center"}
            {...rest}
          >
            <Flex
              flex="3"
              justifyContent="center"
              alignItems="center"
              fontSize="2xl"
              padding="20px"
              flexDir={"column"}
              gap={"30px"}
            >
     
                <FaCartShopping size={"100px"}/>
         
              <Text>This is your order number</Text>
              <Text fontSize={"5xl"} fontWeight={"bold"}>
                {"#" + children}
              </Text>
            </Flex>

            {/*okay button*/}
            <Flex
              minH={"100px"}
              justifyContent="center"
              alignItems="center"
              gap="20px"
              padding="20px"
              w={"80%"}
              h={"60px"}
              flexDir={"row"}
            >
              <Button
                flex={1}
                borderRadius={"15px"}
                h={"100%"}
                bgColor={"gray"}
                color={"white"}
                fontSize={"2xl"}
                onClick={onClickConfirm}
              >
                Got It!
              </Button>
            </Flex>
          </Flex>
        </Presence>
      </Flex>
    </Presence>
  );
};

export default OrderFinished;
