import { Box, Heading, Text, SimpleGrid, Icon, VStack } from '@chakra-ui/react'
import { FaRobot, FaComments, FaBrain } from 'react-icons/fa'

function Feature({ icon, title, description }) {
  return (
    <VStack p={6} bg="white" rounded="lg" shadow="sm" spacing={4} align="start">
      <Icon as={icon} w={8} h={8} color="blue.500" />
      <Heading size="md">{title}</Heading>
      <Text color="gray.600">{description}</Text>
    </VStack>
  )
}

function Home() {
  return (
    <Box>
      <VStack spacing={8} align="center" mb={12}>
        <Heading size="2xl" textAlign="center">
          Welcome to AI Engineer Challenge
        </Heading>
        <Text fontSize="xl" color="gray.600" textAlign="center" maxW="800px">
          Experience the power of AI-driven conversations and intelligent responses
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        <Feature
          icon={FaRobot}
          title="AI-Powered"
          description="Leverage cutting-edge AI technology for intelligent conversations"
        />
        <Feature
          icon={FaComments}
          title="Real-time Chat"
          description="Engage in natural conversations with instant responses"
        />
        <Feature
          icon={FaBrain}
          title="Smart Learning"
          description="Our AI continuously learns and improves from interactions"
        />
      </SimpleGrid>
    </Box>
  )
}

export default Home 