import { system } from '../theme'
import { ChakraProvider, Heading } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router'

const Item = () => {
  const location = useLocation()
  const { test } = location.state || {}
  return (
    <ChakraProvider value={system}>
        <Heading>{test}</Heading>
    </ChakraProvider>
  )
}

export default Item