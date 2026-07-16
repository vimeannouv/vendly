import { Flex, Button, Text, Presence } from "@chakra-ui/react";
import type { ComponentProps } from "react";

interface CancelOrCOnfirmProp extends ComponentProps<typeof Flex> {
  message: string;
  hidden: boolean;
  onClickConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CancelOrConfirm = ({
  message,
  hidden,
  onClickConfirm,
  onClickCancel,
  ...rest
}: CancelOrCOnfirmProp) => {
  return (
    <Flex
      hidden={hidden}
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
          bgColor={"rgb(255, 255, 255)"}
          position={"fixed"}
          zIndex={"2"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          borderRadius={"40px"}
          flexDir={"column"}
          {...rest}
        >
          <Flex
            flex="3"
            justifyContent="center"
            alignItems="center"
            fontSize="2xl"
            padding="20px"
          >
            <Text>{message}</Text>
          </Flex>

          {/* yes and no button */}
          <Flex
            minH={"100px"}
            justifyContent="center"
            alignItems="center"
            flexDir="row"
            gap="20px"
            padding="20px"
          >
            <Button
              flex={1}
              borderRadius={"20px"}
              h={"100%"}
              bgColor={"#ffd9d9"}
              color={"rgb(170, 85, 85)"}
              fontSize={"2xl"}
              onClick={onClickCancel}
            >
              no
            </Button>
            <Button
              flex={1}
              borderRadius={"20px"}
              h={"100%"}
              bgColor={"#d9ffda"}
              color={"rgb(52, 117, 50)"}
              fontSize={"2xl"}
              onClick={onClickConfirm}
            >
              yes
            </Button>
          </Flex>
        </Flex>
      </Presence>
    </Flex>
  );
};

export default CancelOrConfirm;
