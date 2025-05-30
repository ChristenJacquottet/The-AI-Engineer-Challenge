import { useState } from 'react'
import {
  Box,
  VStack,
  Input,
  Button,
  Text,
  Flex,
  useToast,
  Container,
} from '@chakra-ui/react'
import axios from 'axios'

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await axios.post('/api/chat', { message: input })
      const aiMessage = { role: 'assistant', content: response.data.response }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from AI',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.md">
      <VStack h="calc(100vh - 200px)" spacing={4}>
        <Box
          flex={1}
          w="100%"
          overflowY="auto"
          p={4}
          bg="white"
          rounded="lg"
          shadow="sm"
        >
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.role === 'user' ? 'flex-end' : 'flex-start'}
              mb={4}
            >
              <Box
                maxW="70%"
                bg={message.role === 'user' ? 'blue.500' : 'gray.100'}
                color={message.role === 'user' ? 'white' : 'black'}
                p={3}
                rounded="lg"
              >
                <Text>{message.content}</Text>
              </Box>
            </Flex>
          ))}
        </Box>

        <Flex w="100%" gap={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            colorScheme="blue"
            onClick={handleSend}
            isLoading={isLoading}
          >
            Send
          </Button>
        </Flex>
      </VStack>
    </Container>
  )
}

export default Chat 