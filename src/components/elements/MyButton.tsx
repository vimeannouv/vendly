import { Button } from "@chakra-ui/react";
import type { ComponentProps, ReactNode } from "react";

interface MyButtonProps extends ComponentProps<typeof Button> {
  children?: ReactNode;
}

const MyButton = ({ children, ...rest }: MyButtonProps) => {
  return (
    <Button
      css={{
        WebkitTapHighlightColor: "transparent",
      }}
      colorPalette={"beige"}
      bgColor={"rgba(255, 255, 255)"}
      borderRadius={"27px"}
      padding={rest.padding || "30px"}
      variant={"solid"}
      color={"colorPalette.600"}
      fontWeight={"bold"}
      boxShadow={
        "0 2px 4px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.08), 0 16px 32px rgba(0,0,0,0.06)"
      }
      transition="all 0.13s ease-in-out"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default MyButton;
