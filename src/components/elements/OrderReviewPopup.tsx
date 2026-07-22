import {
  Flex,
  Box,
  Text,
  Button,
  Image,
  Presence,
} from "@chakra-ui/react";
import {
  useState,
  type ComponentProps,
  useEffect,
  type ReactNode,
} from "react";
import type { OrderedItem } from "../../GlobalTypes";
import { TbArrowBack } from "react-icons/tb";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

interface OrderReviewPopup extends ComponentProps<typeof Flex> {
  hidden: boolean;
  itemsInOrder: OrderedItem[];
  children?: ReactNode;
  onClickBack: () => void;
  onClickCheckout: (order: OrderedItem[]) => void;
}

const OrderReviewPopup = ({
  hidden,
  children,
  itemsInOrder,
  onClickBack,
  onClickCheckout,
  ...rest
}: OrderReviewPopup) => {
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    setTotalAmount(0);
    itemsInOrder.forEach((item, _) => {
      setTotalAmount(totalAmount + item.price * item.quantity);
    });
  }, [itemsInOrder]);
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
            w={"70%"}
            h={"90%"}
            bgColor={"rgb(255, 255, 255)"}
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
            {/* did we get your order right text */}
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Did we get your order right?
            </Text>
            {/* list of order */}
            <Flex
              flex={1}
              border={"1px solid"}
              width={"100%"}
              borderColor={"rgba(196, 196, 196, 0.67)"}
              overflowX={"hidden"}
              overflowY={"auto"}
              justifyContent={"center"}
              borderRadius={"20px"}
            >
              {/* individual orders in the list */}
              <Flex flexDir={"column"} w={"100%"} flex={"1"} gap={"20px"} padding={"20px"}>
                {itemsInOrder.map((item, _) => (
                  <Flex
                    flexDir={"row"}
                    justifyContent={"space-between"}
                    w={"100%"}
                    h={"100px"}
                    align={"center"}
                  >
                    {/* image, name and price container for formatting */}
                    <Flex flexDir={"row"} gap={"22px"}>
                      {/* item image */}
                      <Box
                        w={"100px"}
                        h={"100px"}
                        bgColor={"rgb(255, 247, 230)"}
                        padding={"10px"}
                        borderRadius={"20px"}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          w={"100%"}
                          h={"100%"}
                          fontSize={"2xl"}
                        />
                      </Box>
                      {/* name and price */}
                      <Flex flexDir={"column"} justifyContent={"center"}>
                        <Text fontSize={"xl"}>{item.name}</Text>
                        <Text color={"grey"}>
                          {"$" + item.price.toString() + " each"}
                        </Text>
                        <Box
                          bgColor={"grey"}
                          maxW={"70px"}
                          paddingLeft={"10px"}
                          paddingRight={"10px"}
                          borderRadius={"20px"}
                        >
                          <Text textAlign={"center"} color={"white"}>
                            {"x" + item.quantity}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    {/* total cost */}
                    <Text fontSize={"lg"}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            {/* total amout display */}
            <Flex w={"100%"} justifyContent={"space-between"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Total Due
              </Text>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {"$" + totalAmount.toFixed(2)}
              </Text>
            </Flex>
            {/* confirm or back button */}
            <Flex
              w={"80%"}
              h={"60px"}
              flexDir={"row"}
              gap={"20px"}
              justifyContent={"center"}
            >
              {/* back button */}
              <Button
                flex={1}
                h={"100%"}
                bgColor={"rgb(255, 185, 185)"}
                color={"rgb(140, 66, 66)"}
                borderRadius={"10px"}
                onClick={() => {
                  onClickBack();
                }}
              >
                <TbArrowBack />
                <Text fontSize={"xl"}>Keep editting</Text>
              </Button>
              {/* confirm button */}
              <Button
                flex={1}
                h={"100%"}
                bgColor={"rgb(201, 255, 185)"}
                color={"rgb(57, 108, 43)"}
                borderRadius={"10px"}
                onClick={() => {
                  onClickCheckout(itemsInOrder);
                }}
              >
                <MdOutlineShoppingCartCheckout />
                <Text fontSize={"xl"}>Checkout</Text>
              </Button>
            </Flex>
          </Flex>
        </Presence>
      </Flex>
    </Presence>
  );
};

export default OrderReviewPopup;
