import { Box, Flex, Link, Heading } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

function Navbar() {
  return (
    <Box bg="white" px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <Heading size="md">AI Engineer Challenge</Heading>
        <Flex gap={8}>
          <Link as={RouterLink} to="/" color="gray.600" _hover={{ color: 'blue.500' }}>
            Home
          </Link>
          <Link as={RouterLink} to="/chat" color="gray.600" _hover={{ color: 'blue.500' }}>
            Chat
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 