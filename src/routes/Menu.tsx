import { system } from "../theme";
import {
  Box,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Image,
  Button,
  Presence,
  Skeleton,
} from "@chakra-ui/react";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";
import MenuItem from "../components/elements/MenuItem";
import PopupLayer from "../components/elements/PopupLayer";
import OrderReviewPopup from "../components/elements/OrderReviewPopup";
import OrderFinished from "../components/elements/OrderFinished";
import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import CancelOrConfirm from "../components/elements/CancelOrConfirm";
import { FaLeaf, FaTrash } from "react-icons/fa";
import { Spinner } from "@chakra-ui/react";
import type { Item, OrderedItem } from "../GlobalTypes";
import ErrorPopup from "../components/elements/ErrorPopup";
import { useRef } from "react";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
//import { useNavigate } from "react-router";

// image imports
import bg from "../assets/bg.png";
import na from "../assets/na.png";
import vendly from "../assets/vendly.png";
import { useNavigate } from "react-router";
import { MdCancelPresentation } from "react-icons/md";

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { none } from "@cloudinary/url-gen/qualifiers/FontAntialias";
import { AiFillCalculator } from "react-icons/ai";

const AnimatedGrid = animated(Grid);
const AnimatedBox = animated(Box);
const gridSpringValues = {
  from: { opacity: 0, transform: "scale(0.9)", top: "10%" },
  to: { opacity: 1, transform: "scale(1)", top: "0%" },
  config: { tension: 600, friction: 60 },
};

const Menu = () => {
  // use nav
  const navigate = useNavigate();

  // states
  const [categories, setCategories] = useState<string[]>([]);
  const [menu, setMenu] = useState<Record<string, Item[]>>({
    All: [{ name: "loading", price: 0, id: -1, imageUrl: na }],
  });
  const [isLoading, setIsLoading] = useState(true);

  // cancel or ocnfirm
  const [cancelOrConfirmHidden, setCancelOrConfirmHidden] = useState(true);

  // item add to order pop up stuff
  const [popupHidden, setPopupHidden] = useState(true);
  const [popupItem, setPopupItem] = useState<Item>({
    id: -1,
    name: "loading",
    price: 0,
    imageUrl: na,
  });

  // finished ordering
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // order review popup
  const [reviewOrder, setReviewOrder] = useState(false);

  const [order, setOrder] = useState<OrderedItem[]>([]);

  // editting an item in order already
  const [edittingItem, setEdittingItem] = useState<OrderedItem>({
    id: -1,
    name: "loading",
    price: 0,
    imageUrl: na,
    quantity: 0,
  });
  const [edittingItemHidden, setEdittingItemHidden] = useState(true);

  // error popup
  const [errorMsg, setErrorMsg] = useState("error test message");
  const [errorPopupHidden, setErrorPopupHidden] = useState(true);

  // get my menu collection from firestore data base
  async function fillOutMenu() {
    try {
      const snapshot = await getDocs(collection(db, "menu"));

      const menuDb = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // fill out categories
      const categoryDb = menuDb[0] as Record<string, any>;
      const itemsDb = menuDb[1] as Record<string, any>;
      const itemInfo = itemsDb.items;
      const categoryList = Object.keys(categoryDb).filter(
        (category) => category !== "id",
      );

      setCategories(["All", ...categoryList]);
      const temp: Record<string, any> = {};
      for (const category in categoryDb) {
        if (category === "id") continue;
        const itemsInCategory = [] as Record<string, any>;
        const unfilteredItemsInCategory = categoryDb[category];
        console.log(category + "////");
        console.log(unfilteredItemsInCategory);

        for (const i in unfilteredItemsInCategory) {
          const itemId = unfilteredItemsInCategory[i];
          const item = itemInfo[itemId];
          item.id = itemId;
          itemsInCategory.push(item);
        }
        temp[category] = itemsInCategory;
      }
      const allCatgeory = [] as Record<string, any>;
      for (const i in itemInfo) {
        console.log("......" + itemInfo[i].name);
        allCatgeory.push(itemInfo[i]);
      }
      temp["All"] = allCatgeory;
      console.log("Menu from firestore: ", temp);
      setMenu(temp);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  // refs
  const allCategoryRef = useRef<HTMLButtonElement | null>(null);

  // use effects //////////////

  // on initialisation

  useEffect(() => {
    fillOutMenu();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // aux funcs

  const getFoodList = (tabname: string): Item[] => {
    return menu[tabname] ?? [];
  };

  const fireCancelOrConfirm = () => {
    setCancelOrConfirmHidden(false);
  };

  const editItem = (item: OrderedItem) => {
    setEdittingItem(item);
    setEdittingItemHidden(false);
  };

  const onConfirmationOfOrderCancel = () => {
    navigate("/");
  };

  const selectItem = (item: Item) => {
    setPopupItem(item);
    setPopupHidden(false);
  };

  // springs
  //const navigate = useNavigate();
  const [highlightSpring, highlightSpringController] = useSpring(() => ({
    x: 0,
    y: 0,
    opacity: 0,
    config: { mass: 6.7, tension: 1000, friction: 75 },
  }));
  const [buttonDimensions, setButtonDimensions] = useState({ x: 0, y: 0 }); // this is for the highlight element

  const [gridSpring, gridSpringController] = useSpring(() => gridSpringValues);

  const playHighlightAnims = (target: HTMLElement) => {
    gridSpringController.start(gridSpringValues);

    const rect = target.getBoundingClientRect();

    setButtonDimensions({
      x: rect.width,
      y: rect.height,
    });

    highlightSpringController.start({
      x: rect.left,
      y: rect.top,
      opacity: 1,
    });
  };

  useEffect(() => {
    if (categories.length === 0) return;

    if (allCategoryRef.current) {
      playHighlightAnims(allCategoryRef.current);
    }
  }, [categories]);

  return (
    <ChakraProvider value={system}>
      {/* general error popup */}
      <ErrorPopup
        onClickOkay={() => {
          setErrorPopupHidden(true);
        }}
        hidden={errorPopupHidden}
      >
        {errorMsg}
      </ErrorPopup>

      {/* finished ordering */}
      <OrderFinished
        hidden={orderNumber ? false : true}
        onClickConfirm={() => {
          navigate("/");
        }}
      >
        {orderNumber}
      </OrderFinished>

      {/* order review */}
      <OrderReviewPopup
        itemsInOrder={order}
        hidden={!reviewOrder}
        onClickBack={() => {
          setReviewOrder(false);
          console.log("keep editting!");
        }}
        onClickCheckout={async (order) => {
          // fire err msg if there is  no items in order
          if (order.length <= 0) {
            setReviewOrder(false);
            setErrorMsg("You don't have any items!");
            setErrorPopupHidden(false);
            return;
          }
          setIsLoading(true);
          const orderNumber = `${new Date().getHours()}${Math.floor(100 + Math.random() * 900)}`; // order  number is comprised of the hour + random number from 100 to 999
          try {
            await updateDoc(doc(db, "orders", "orders"), {
              orders: arrayUnion({
                ...order,
                createdAt: new Date(),
                status: "pending",
                orderNumber: orderNumber,
              }),
            });
            setOrderNumber(orderNumber);
            setReviewOrder(false)
            setIsLoading(false);
            console.log("Success!");
          } catch (err) {
            console.error(err);
          }
        }}
      />

      {/* loading screen */}
      <Presence
        present={isLoading}
        animationName={{
          _closed: "fade-out",
        }}
        animationDuration={"600ms"}
        w="100dvw"
        h="100dvh"
        pos={"fixed"}
        zIndex={9999999}
        unmountOnExit
      >
        <Flex
          bgColor="rgba(0, 0, 0, 0.76)"
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner size={"xl"} color={"white"} />
        </Flex>
      </Presence>

      {/* item editting popup layer */}

      <PopupLayer
        heading={"Edit Item"}
        itemObj={edittingItem}
        hidden={edittingItemHidden}
        onClickConfirm={(_, quantity, itemObj) => {
          const updatedOrder = order.map((item) => {
            if (item.id !== itemObj.id) return item;

            return {
              ...item,
              quantity,
            };
          });

          setOrder(updatedOrder);
          setEdittingItemHidden(true);
        }}
        onClickCancel={() => {
          setEdittingItemHidden(true);
        }}
        initialQuantity={edittingItem.quantity}
      >
        {" "}
        {/* trash icon to remove editting items */}
        <Button
          position={"fixed"}
          hidden={edittingItemHidden}
          top={"-10px"}
          left={"-10px"}
          bgColor={"rgb(255, 79, 79)"}
          h={"40px"}
          w={"auto"}
          onClick={() => {
            setOrder(order.filter((item) => item.id !== edittingItem.id));
            setEdittingItemHidden(true);
          }}
        >
          <FaTrash color="rgb(255, 255, 255)" />
          <Text>Remove Item</Text>
        </Button>
      </PopupLayer>

      {/* pop up layer for when the user clicks confirm in the my order section */}
      <CancelOrConfirm
        message={"Are you sure you want to cancel your order?"}
        onClickConfirm={() => {
          onConfirmationOfOrderCancel();
        }}
        onClickCancel={() => {
          setCancelOrConfirmHidden(true);
        }}
        hidden={cancelOrConfirmHidden}
      ></CancelOrConfirm>

      {/* Add item pop up layer */}
      <PopupLayer
        heading="Add To Order"
        itemObj={popupItem}
        hidden={popupHidden}
        onClickCancel={() => setPopupHidden(true)}
        onClickConfirm={(_, quantity, itemObj) => {
          console.log(
            `Confirmed ${quantity} of ${itemObj.name} with ID ${itemObj.id}`,
          );
          let itemAlreadyInOrderList = false;
          const updatedOrder = order.map((item, _) => {
            if (item.id != itemObj.id) {
              return item;
            }
            var totalQuantity = item.quantity + quantity;
            if (totalQuantity >= 100) totalQuantity = 99;
            if (totalQuantity < 1) totalQuantity = 1;

            const newItem: OrderedItem = {
              ...item,
              quantity: totalQuantity,
            };
            itemAlreadyInOrderList = true;
            return newItem;
          });

          // add this item to the order list
          const orderedItem: OrderedItem = {
            id: itemObj.id,
            name: itemObj.name,
            price: itemObj.price,
            quantity: quantity,
            imageUrl: itemObj.imageUrl,
          };
          if (itemAlreadyInOrderList) {
            setOrder(updatedOrder);
          } else {
            setOrder([...order, orderedItem]);
          }
          setPopupHidden(true);
        }}
      />

      {/* HIGHLIGHT EFFECT */}
      <AnimatedBox
        style={highlightSpring}
        position={"absolute"}
        bgColor={"rgb(255, 255, 255)"}
        h={buttonDimensions.y}
        w={buttonDimensions.x}
        borderRadius={"10px"}
      ></AnimatedBox>

      <Flex
        bgImage={`url(${bg})`}
        flexDir={"row"}
        gap={"0px"}
        w={"100dvw"}
        h={"100dvh"}
        as={"section"}
        bgSize={"cover"}
      >
        {/* CATEGORY BAR */}
        <MyFlex
          overflowY={"auto"}
          overflowX={"hidden"}
          flex={0}
          flexDir={"column"}
          gap={"10px"}
          borderRadius={"0px"}
          alignItems={"center"}
          padding={"10px"}
          paddingLeft={"0px"}
          paddingRight={"0px"}
          minW={"160px"}
        >
          <Heading
            paddingBottom={"20px"}
            borderBottom={"2px solid rgb(203, 192, 166)"}
            w={"100%"}
            textAlign={"center"}
            color={"rgb(113, 87, 42)"}
          >
            Categories
          </Heading>
          {categories.map((category, i) => (
            <MyButton
              ref={category == "All" ? allCategoryRef : undefined}
              h={"40px"}
              w={"90%"}
              borderRadius={"10px"}
              onClick={(ev) => {
                if (selectedCategory === category) return;
                setSelectedCategory(category);
                playHighlightAnims(ev.currentTarget);
              }}
              bgColor={"transparent"}
              boxShadow={"0 7px 0 -2px rgba(0, 0, 0, 0.2)"}
              transition={".3 ease-out"}
              key={i}
              border={"2px solid rgb(203, 192, 166)"}
              _active={{
                transform: "scale(0.95)",
                boxShadow: "0 0 0 -2px rgba(0, 0, 0, 0.5)",
              }}
            >
              {categories[i]}
            </MyButton>
          ))}
        </MyFlex>

        {/* MENU AREA SIDE */}
        <Flex
          flex={3}
          padding={"20px"}
          as={"section"}
          flexDir={"column"}
          overflowY={"auto"}
          overflowX={"hidden"}
          gap={"50px"}
        >
          <MyFlex minH={"200px"} flex={0} bgColor={"none"}>
            <Image
              src={vendly}
              alt="Background"
              w={"100%"}
              h={"100%"}
              objectFit={"contain"}
            />
          </MyFlex>
          {/* Items under the category will be displayed here */}
          <AnimatedGrid
            style={gridSpring}
            flex={1}
            p="10px"
            gap="15px"
            templateColumns="repeat(auto-fill, minmax(180px, 1fr))"
            justifyContent={"center"}
            position={"relative"}
          >
            {getFoodList(selectedCategory).map((item: Item, i: number) => (
              <GridItem w={"100%"} key={i}>
                {
                  // does item a existing image id
                  item.imageUrl == na ? (
                    <Skeleton w="180px" h="270px" />
                  ) : (
                    // image with good image ids
                    <MenuItem
                      w="180px"
                      h="270px"
                      bg="white"
                      borderRadius="14px"
                      boxShadow={
                        "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.2);"
                      }
                      itemName={item.name}
                      itemPrice={item.price}
                      imageUrl={item.imageUrl}
                      onClick={() => {
                        selectItem(item);
                        console.log(
                          `Selected item: ${item.name}, Price: ${item.price}, ID: ${item.id}`,
                        );
                      }}
                    ></MenuItem>
                  )
                }
              </GridItem>
            ))}
          </AnimatedGrid>
        </Flex>
        {/* ORDER DISPLAY */}
        <Flex
          h={"100dvh"}
          w={"300px"}
          padding={"15px"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Text
            textAlign={"center"}
            fontSize={"2xl"}
            fontWeight={"bold"}
            color={"rgb(100, 68, 41)"}
          >
            My Order
          </Text>
          {/* this is the order display area */}
          <MyFlex
            w={"100%"}
            flex="1"
            flexDir={"column"}
            gap={"10px"}
            padding={"10px"}
            overflowY={"auto"}
            overflowX={"hidden"}
            borderRadius={"12px"}
          >
            {order.map((item, i) => (
              <Presence
                present={true}
                animationName={{ _open: "slide-from-right-full" }}
                animationDuration="300ms"
                w={"100%"}
                h={"120px"}
                unmountOnExit
                key={i}
              >
                <MyButton
                  w={"100%"}
                  h={"100%"}
                  flexDir={"column"}
                  gap={"10px"}
                  borderRadius="10px"
                  boxShadow={
                    "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.2);"
                  }
                  onClick={() => {
                    editItem(item);
                  }}
                >
                  <Flex
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"10px"}
                    justifyContent={"space-between"}
                    w={"100%"}
                    h={"100%"}
                  >
                    {/* image */}
                    <Flex flex={1} minH={0}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        w="90%"
                        h="90%"
                        objectFit="contain"
                      />
                    </Flex>
                    {/* item info + quantity */}
                    <Flex
                      flexShrink={0}
                      align="center"
                      direction="column"
                      gap={1}
                      fontWeight={"normal"}
                    >
                      <Text color={"rgba(1,1,1,1)"}>{item.name}</Text>
                      <Text color={"grey"}>
                        ${item.price.toFixed(2) + " each"}
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
                </MyButton>
              </Presence>
            ))}
          </MyFlex>
          <Flex flex=".1" gap={"10px"} flexDir={"row"}>
            {/* canc order butt */}
            <MyButton
              flex="1"
              h={"100%"}
              borderRadius={"10px"}
              bgColor={"#ffe5e5"}
              color={"rgb(216, 96, 96)"}
              fontSize={"md"}
              boxShadow={"none"}
              onClick={fireCancelOrConfirm}
            >
              <MdCancelPresentation />
              Cancel
            </MyButton>

            {/* conf butt */}
            <MyButton
              flex="1"
              h={"100%"}
              borderRadius={"10px"}
              bgColor={"#eaffe5"}
              color={"rgb(49, 122, 52)"}
              fontSize={"md"}
              boxShadow={"none"}
              onClick={() => {
                setReviewOrder(true);
              }}
            >
              <MdOutlineShoppingCartCheckout />
              Confirm
            </MyButton>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
