import { Flex, Box, Text, Button, Image } from "@chakra-ui/react";
import { useState, type ComponentProps, useEffect } from "react";
import na from "../../assets/na.png";

interface PopupLayerProp extends ComponentProps<typeof Flex> {
  hidden: boolean;
  itemObj: Item;
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClickConfirm: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number,
    item: Item,
  ) => void;
  heading?: string;
  initialQuantity?: number;
}

interface Item {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const PopupLayer = ({
  hidden,
  itemObj,
  heading,
  onClickCancel,
  onClickConfirm,
  initialQuantity,
  ...rest
}: PopupLayerProp) => {
  console.log(initialQuantity);
  const [quantity, setQuantity] = useState(
    initialQuantity ? initialQuantity : 1,
  );

  if (!itemObj.imageUrl) itemObj.imageUrl = na;
  // aux func
  const addQuantity = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity < 1) return;
    if (newQuantity >= 100) return;
    setQuantity(quantity + amount);
  };

  const buttonClicked = () => {
    setQuantity(1);
  };

  useEffect(() => {
    if (!hidden) {
      setQuantity(initialQuantity ?? 1);
    }
  }, [hidden, initialQuantity]);

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
        {/* IMAGE DISPLAY */}
        <Box flex={1} h={"100%"}>
          <Image
            src={itemObj.imageUrl}
            alt={itemObj.name}
            w={"100%"}
            h={"100%"}
            objectFit={"contain"}
          />
        </Box>
        {/* ITEM NAME, PRICE, QUANTITY */}
        <Flex
          flex={1}
          h={"100%"}
          flexDir={"column"}
          alignItems={"center"}
          padding={"30px"}
          fontSize={"3xl"}
          gap={"30px"}
          justifyContent={"space-between"}
          overflowY={"auto"}
          overflowX={"hidden"}
        >
          <Flex
            flex="1"
            justifyContent="center"
            alignItems="center"
            fontSize="4xl"
            fontWeight={"bold"}
          >
            <Text>{heading ? heading : ""}</Text>
          </Flex>
          <Flex flexDir={"column"} alignItems={"center"} gap={"20px"}>
            {/* name */}
            <Text flex={1}>{itemObj.name}</Text>
            {/* price */}
            <Text
              borderRadius={"30px"}
              marginTop={"0px"}
              bgColor={"#fff5ee"}
              padding={"10px"}
              color={"rgb(216, 168, 96)"}
              w={"100%"}
              h={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"2xl"}
            >
              {`$${itemObj.price.toFixed(2)}`}
            </Text>
          </Flex>
          {/* quantity */}

          <Flex
            flexDir={"column"}
            textAlign={"center"}
            justifyContent={"center"}
            flex={1}
            gap={"20px"}
          >
            <Text fontSize={"2xl"}>Quantity:</Text>
            <Flex
              justifyContent={"space-between"}
              flexDir={"row"}
              alignItems={"center"}
              gap={"20px"}
            >
              {/* minus quantity */}
              <Button
                borderRadius={"100%"}
                w={"60px"}
                h={"60px"}
                bgColor={"#fff0e5"}
                color={"rgb(216, 168, 96)"}
                fontSize={"40px"}
                onClick={() => {
                  addQuantity(-1);
                }}
              >
                -
              </Button>
              {/* display quantitit */}
              <Text color={"rgb(181, 133, 62)"}>{quantity}</Text>
              {/* + quanitty */}
              <Button
                borderRadius={"100%"}
                w={"60px"}
                h={"60px"}
                bgColor={"#fff0e5"}
                color={"rgb(216, 168, 96)"}
                fontSize={"40px"}
                onClick={() => {
                  addQuantity(1);
                }}
              >
                +
              </Button>
            </Flex>
          </Flex>

          {/* confirmation or cancel button */}
          <Flex
            flex={1}
            flexDir={"row"}
            padding={"20px"}
            w={"100%"}
            gap={"20px"}
            alignItems={"end"}
          >
            {/* cancel */}
            <Button
              flex={1}
              borderRadius={"20px"}
              h={"60px"}
              bgColor={"#ffe5e5"}
              color={"rgb(216, 96, 96)"}
              fontSize={"2xl"}
              onClick={(ev) => {
                onClickCancel(ev);
                buttonClicked();
              }}
            >
              Cancel
            </Button>
            {/* confirm */}
            <Button
              flex={1}
              borderRadius={"20px"}
              h={"60px"}
              bgColor={"#d9ffda"}
              color={"rgb(52, 117, 50)"}
              fontSize={"2xl"}
              onClick={(e) => {
                onClickConfirm && onClickConfirm(e, quantity, itemObj);
                buttonClicked();
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex></Flex>
    </Flex>
  );
};

export default PopupLayer;
