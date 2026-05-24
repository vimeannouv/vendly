import { Button } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface MyButtonProps extends ComponentProps<typeof Button> {
  children?: ReactNode;
}

const MyButton = ({ children, ...rest }: MyButtonProps) => {

  return (
    <Button
      colorPalette={"beige"}
      bgColor={"colorPalette.subtle"}
      border={"5px solid"}
      borderColor={"colorPalette.fg"}
      borderRadius={"27px"}
      padding={rest.padding || "30px"}
      variant={"solid"}
      color={"colorPalette.fg"}
      fontWeight={"bold"}
      boxShadow={"0px 10px 6px   rgba(128, 115, 102, 0.4)"}
      transition="all 0.13s ease-in-out"
      _hover={{
        bgColor: "colorPalette.200",
      }}
      {...rest}>
      {children}
    </Button>
  );
};

export default MyButton;
