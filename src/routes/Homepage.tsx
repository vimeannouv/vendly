import { ChakraProvider, defaultSystem, Text } from '@chakra-ui/react'
const Homepage = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Text>Hello!!!!</Text> 
      <Text>helo</Text> 
    </ChakraProvider>
  )
}

export default Homepage