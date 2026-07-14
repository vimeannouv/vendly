import { system } from "../theme";
import {
  Box,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import MyFlex from "../components/elements/MyFlex";
import MyButton from "../components/elements/MyButton";
import MenuItem from "../components/elements/MenuItem";
import PopupLayer from "../components/elements/PopupLayer";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
import bg from "../assets/bg.png";
import { animated, useSpring } from "@react-spring/web";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AnimatedGrid = animated(Grid);
const AnimatedBox = animated(Box);
const gridSpringValues = {
  from: { opacity: 0, transform: "scale(0.9)", top: "10%" },
  to: { opacity: 1, transform: "scale(1)", top: "0%" },
  config: { tension: 600, friction: 60 },
};

interface Item {
  id: number;
  name: string;
  price: number;
}

const Menu = () => {
  // states
  const [categories, setCategories] = useState<string[]>([]);
  const [menu, setMenu] = useState<Record<string, Item[]>>({
    Burgers: [{ name: "loading", price: 0, id: -1 }],
  });
  const [popupHidden, setPopupHidden] = useState(true);
  const [popupItemName, setPopupItemName] = useState("");
  const [popupItemPrice, setPopupItemPrice] = useState(0);
  const [popupItemID, setPopupItemID] = useState(-1);
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
      setCategories(
        Object.keys(categoryDb).filter((category) => category !== "id"),
      );
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
      console.log("Menu from firestore: ", temp);
      setMenu(temp);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fillOutMenu();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  // aux funcs

  const getFoodList = (tabname: string): Item[] => {
    return menu[tabname] ?? [];
  };

  const selectItem = (name: string, price: number, id: number) => {
    setPopupItemName(name);
    setPopupItemPrice(price);
    setPopupItemID(id);
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

  const playAnimsOnClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    // grid animation
    gridSpringController.start(gridSpringValues);

    // highligher animation
    const target = ev.currentTarget;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const newX = rect.left;
    const newY = rect.top;
    setButtonDimensions({ x: rect.width, y: rect.height });
    highlightSpringController.start({
      x: newX,
      y: newY,
      opacity: 1,
    });
  };

  return (
    <ChakraProvider value={system}>
      {/* ITEM DESCRIPTION POPUP */}

      {/* Add item pop up layer */}
      <PopupLayer
        price={popupItemPrice}
        name={popupItemName}
        hidden={popupHidden}
        foodItemID={popupItemID}
        onClickCancel={() => setPopupHidden(true)}
        onClickConfirm={(_, quantity, itemName, id) => {
          console.log(`Confirmed ${quantity} of ${itemName} with ID ${id}`);
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
          flex={0}
          flexDir={"column"}
          gap={"0px"}
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
          >
            Categories
          </Heading>
          {categories.map((item, i) => (
            <MyButton
              h={"40px"}
              w={"100%"}
              borderRadius={"0px"}
              onClick={(ev) => {
                setSelectedCategory(item);
                playAnimsOnClick(ev);
              }}
              bgColor={"transparent"}
              boxShadow={"none"}
              transition={".1 ease-out"}
              key={i}
              borderBottom={"2px solid rgb(203, 192, 166)"}
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
        >
          <MyFlex minH={"200px"} flex={0} bgColor={"none"}></MyFlex>
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
                <MenuItem
                  w="180px"
                  h="250px"
                  bg="white"
                  borderRadius="14px"
                  boxShadow={
                    "inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.2);"
                  }
                  itemName={item.name}
                  itemPrice={item.price}
                  onClick={() => {
                    selectItem(item.name, item.price, item.id);
                    console.log(
                      `Selected item: ${item.name}, Price: ${item.price}, ID: ${item.id}`,
                    );
                  }}
                ></MenuItem>
              </GridItem>
            ))}
          </AnimatedGrid>
        </Flex>
        {/* CART AREA */}
        <Flex flex={1} h={"100dvh"} padding={"15px"}>
          <MyFlex w={"100%"} h={"100%"}></MyFlex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Menu;
