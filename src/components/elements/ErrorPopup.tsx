import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  Presence,
  List,
  Heading,
} from "@chakra-ui/react";
import {
  useState,
  type ComponentProps,
  useEffect,
  type ReactNode,
} from "react";
import na from "../../assets/na.png";
import { IoIosWarning } from "react-icons/io";
import { FaThumbsUp } from "react-icons/fa6";

interface ErrorPopupProp extends ComponentProps<typeof Flex> {
  hidden: boolean;
  children?: ReactNode;
  onClickOkay: () => void;
}

const ErrorPopup = ({
  hidden,
  children,
  onClickOkay,
  ...rest
}: ErrorPopupProp) => {
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
        {...rest}
        zIndex={9999999999}
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
          zIndex={99999}
          position={"fixed"}
        >
          <Flex
            w={"80%"}
            justifyContent={"space-between"}
            h={"80%"}
            bgColor={"rgb(255, 221, 221)"}
            border={"3px solid"}
            borderColor={"rgb(255, 105, 105)"}
            position={"fixed"}
            zIndex={"2"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            borderRadius={"15px"}
            flexDir={"column"}
            alignItems={"center"}
            padding={"30px"}
            gap={"25px"}
          >
            {/* error message nad popup heading */}
            <Flex
              flexDir={"column"}
              textAlign={"center"}
              alignItems={"center"}
              gap={"40px"}
              w={"100%"}
              h={"100%"}
            >
              {/* heading */}
              <Flex
              gap={"30px"}
                w={"auto"}
                h={"auto"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDir={"row"}
              >
                <IoIosWarning size={"50px"} color={"rgb(200, 73, 73)"} />
                <Heading
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  color={"rgb(200, 73, 73)"}
                  w={"100%"}
                >
                  There's an error in the system!
                </Heading>
                <IoIosWarning size={"50px"} color={"rgb(200, 73, 73)"} />
              </Flex>
              {/* err msg display */}
              <Text fontSize={"xl"} color={"rgb(163, 61, 61)"} w={"100%"}>
                {children}
              </Text>
            </Flex>
            {/* okay button */}
            <Button
              h={"70px"}
              w={"300px"}
              bgColor={"rgb(255, 119, 119)"}
              color={"hsl(0, 100%, 100%)"}
              borderRadius={"10px"}
              onClick={() => {
                onClickOkay();
              }}
            >
                <FaThumbsUp/>
              <Text fontSize={"xl"}>Okay!</Text>
            </Button>
          </Flex>
        </Presence>
      </Flex>
    </Presence>
  );
};

export default ErrorPopup;
