import { Button, VStack } from "@chakra-ui/react";
import "./App.css";
import { Text } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider";
import { useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(false)
  return (
    <Provider>
      <VStack>
        <Text>hello world</Text>
        <Button loading={isLoading} onClick={()=>{setLoading(true)}}>Hello world again, My name is vimean!</Button>
      </VStack>
    </Provider>
  );
}

export default App;
