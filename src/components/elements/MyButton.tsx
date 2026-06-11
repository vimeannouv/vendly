import { Button } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface MyButtonProps extends ComponentProps<typeof Button> {
  children?: ReactNode;
}

const MyButton = ({ children, ...rest }: MyButtonProps) => {

  return (
    <Button
      colorPalette={"beige"}
      bgColor={"rgba(255, 255, 255)"}
      borderRadius={"27px"}
      padding={rest.padding || "30px"}
      variant={"solid"}
      color={"colorPalette.600"}
      fontWeight={"bold"}
      boxShadow={"0px 10px 6px   rgba(128, 115, 102, 0.4)"}
      transition="all 0.13s ease-in-out"
      _hover={{
        bgColor: "rgba(219, 219, 219, 0.4)",
      }}
      {...rest}>
      {children}
    </Button>
  );
};

export default MyButton;
