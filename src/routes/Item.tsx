import { system } from '../theme'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import React from 'react'

const Item = () => {
  return (
    <ChakraProvider value={system}>
        <Heading>hello</Heading>
    </ChakraProvider>
  )
}

export default Item