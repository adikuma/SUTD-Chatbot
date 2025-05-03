import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Container,
  Chip,
  Fade,
  Link,
  Tooltip,
  CircularProgress
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { keyframes } from '@emotion/react'
import { styled } from '@mui/material/styles'

// Define interface for message sources/citations
interface Source {
  content: string
  metadata: {
    title?: string
    url?: string
    [key: string]: any
  }
}

// Define interface for chat messages
interface Message {
  sender: 'bot' | 'user'
  text: string
  sources?: Source[]
  timestamp: number
}

// Backend API endpoint
const SERVER_API = 'http://localhost:8000'

// Styled components for animation effects
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const MessageBubble = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: '85%',
  position: 'relative',
  animation: `${fadeIn} 0.3s ease-out forwards`,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
  }
}))

const UserBubble = styled(MessageBubble)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}))

const BotBubble = styled(MessageBubble)(({ theme }) => ({
  backgroundColor: 'rgba(30, 30, 30, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
}))

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    padding: theme.spacing(1, 2),
    '&:hover, &.Mui-focused': {
      backgroundColor: 'rgba(40, 40, 40, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    }
  }
}))

const GlassContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(18, 18, 18, 0.6)',
  backdropFilter: 'blur(16px)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  padding: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '90vh',
  maxWidth: 900,
  margin: '0 auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  background: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

// Typing animation
const blink = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`

const Dot = styled(Box)(({ theme, delay = 0 }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.text.secondary,
  marginRight: 4,
  animation: `${blink} 1.4s infinite`,
  animationDelay: `${delay}s`,
}))

// Main component
export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [useFineTuned, setUseFineTuned] = useState(true)
  const [showSources, setShowSources] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Load initial welcome message
  useEffect(() => {
    setMessages([
      { 
        sender: 'bot', 
        text: 'Hello! I\'m the SUTD chatbot assistant. I can answer questions about Singapore University of Technology and Design. How may I help you today?', 
        timestamp: Date.now(),
        sources: []
      }
    ])
    
    // Check if server is healthy
    fetch(`${SERVER_API}/health`)
      .then(res => res.json())
      .catch(err => {
        console.error('Error connecting to server:', err)
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: 'There seems to be an issue connecting to the server. Please check that the backend is running.',
            timestamp: Date.now(),
            sources: []
          }
        ])
      })
  }, [])

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  
  // Clear chat history
  const clearChat = () => {
    setMessages([
      { 
        sender: 'bot', 
        text: 'Chat history cleared. How may I help you?', 
        timestamp: Date.now(),
        sources: []
      }
    ])
  }

  // Toggle between base and fine-tuned model
  const toggleModel = () => {
    setUseFineTuned(!useFineTuned)
    setMessages(prev => [
      ...prev,
      {
        sender: 'bot',
        text: `Switched to ${!useFineTuned ? 'fine-tuned' : 'base'} model.`,
        timestamp: Date.now(),
        sources: []
      }
    ])
  }

  // Send message to backend
  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    
    setIsTyping(true)
    
    // Add user message
    const userMsg: Message = { 
      sender: 'user', 
      text, 
      timestamp: Date.now() 
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    
    try {
      // Call the appropriate API endpoint based on model selection
      const endpoint = useFineTuned ? '/rag/finetuned' : '/rag/base'
      const res = await fetch(`${SERVER_API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text })
      })
      
      const data = await res.json()
      
      // Create bot response with sources
      const botMsg: Message = { 
        sender: 'bot', 
        text: data.answer, 
        sources: data.sources || [],
        timestamp: Date.now() 
      }
      
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      console.error('Error:', err)
      
      // Error message
      const errorMsg: Message = {
        sender: 'bot',
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: Date.now(),
        sources: []
      }
      
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
      <GlassContainer elevation={0}>
        {/* Header */}
        <Header>
          <Box display="flex" alignItems="center">
            <Avatar 
              src="/robot.png" 
              alt="SUTD Bot"
              sx={{ 
                width: 36, 
                height: 36, 
                mr: 2,
                border: '2px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(0,0,0,0.2)'
              }} 
            />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                SUTD AI Assistant
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Using {useFineTuned ? 'fine-tuned' : 'base'} model
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Tooltip title="Toggle model">
              <Chip 
                label={useFineTuned ? "Using Fine-tuned Model" : "Using Base Model"}
                size="small"
                color="secondary"
                variant="outlined"
                onClick={toggleModel}
                sx={{ 
                  mr: 1,
                  backgroundColor: 'rgba(0,0,0,0.2)', 
                  borderColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.3)',
                  }
                }}
              />
            </Tooltip>
            
            <Tooltip title="Clear chat history">
              <IconButton size="small" onClick={clearChat} sx={{ color: 'text.secondary' }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Toggle sources">
              <IconButton size="small" onClick={() => setShowSources(!showSources)} sx={{ color: 'text.secondary' }}>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Header>
        
        {/* Messages */}
        <Box 
          flex={1} 
          p={3}
          overflow="auto"
          sx={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(50,50,50,0.15) 0%, rgba(0,0,0,0) 75%)'
          }}
        >
          {messages.map((msg, i) => (
            <Fade key={i} in={true} timeout={300}>
              <Box 
                mb={3}
                display="flex" 
                flexDirection="column"
                alignItems={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Box display="flex" alignItems="flex-start" width="100%" justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                  {msg.sender === 'bot' && (
                    <Avatar 
                      src="/robot.png" 
                      alt="bot" 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        mt: 0.5,
                        opacity: 0.9,
                        backgroundColor: 'rgba(0,0,0,0.2)'
                      }}
                    />
                  )}
                  
                  <Box maxWidth="80%">
                    {msg.sender === 'user' ? (
                      <UserBubble>
                        <Typography variant="body1">{msg.text}</Typography>
                      </UserBubble>
                    ) : (
                      <BotBubble>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                      </BotBubble>
                    )}
                    
                    {/* Sources section */}
                    {msg.sender === 'bot' && msg.sources && msg.sources.length > 0 && showSources && (
                      <Box mt={1} pl={1}>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                          Sources:
                        </Typography>
                        {msg.sources.map((source, sourceIndex) => (
                          <Box 
                            key={sourceIndex} 
                            component={Paper} 
                            mb={1}
                            p={1.5}
                            sx={{ 
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              backdropFilter: 'blur(5px)',
                              borderRadius: 1,
                              border: '1px solid rgba(255,255,255,0.05)'
                            }}
                          >
                            {source.metadata.title && (
                              <Typography variant="caption" fontWeight={500} sx={{ display: 'block', mb: 0.5 }}>
                                {source.metadata.title}
                              </Typography>
                            )}
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                              {source.content}
                            </Typography>
                            {source.metadata.url && (
                              <Link 
                                href={source.metadata.url}
                                target="_blank"
                                rel="noopener"
                                variant="caption"
                                sx={{ 
                                  display: 'block', 
                                  mt: 0.5,
                                  color: 'primary.main',
                                  textDecoration: 'none',
                                  '&:hover': {
                                    textDecoration: 'underline'
                                  }
                                }}
                              >
                                View source
                              </Link>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                  
                  {msg.sender === 'user' && (
                    <Avatar 
                      sx={{ 
                        ml: 1,
                        mt: 0.5,
                        width: 32, 
                        height: 32,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                      }}
                    >
                      U
                    </Avatar>
                  )}
                </Box>
                
                {/* Message timestamp */}
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    mt: 0.5,
                    opacity: 0.7,
                    px: 1,
                    fontSize: '0.7rem'
                  }}
                >
                  {formatTime(msg.timestamp)}
                </Typography>
              </Box>
            </Fade>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <Box display="flex" alignItems="flex-start" mb={3}>
              <Avatar 
                src="/robot.png" 
                alt="bot" 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  mr: 1,
                  mt: 0.5,
                  opacity: 0.8
                }}
              />
              <BotBubble sx={{ py: 1.5, px: 2, display: 'flex', alignItems: 'center' }}>
                <Dot delay={0} />
                <Dot delay={0.2} />
                <Dot delay={0.4} />
              </BotBubble>
            </Box>
          )}
          
          {/* This div is used to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Input Area */}
        <Box 
          p={2} 
          sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.05)',
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}
        >
          <Box display="flex" alignItems="center">
            <InputField
              fullWidth
              variant="standard"
              placeholder="Ask a question about SUTD..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              multiline
              maxRows={3}
              InputProps={{
                disableUnderline: true,
              }}
              disabled={isTyping}
            />
            
            <IconButton
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              sx={{
                ml: 1,
                width: 44,
                height: 44,
                backgroundColor: isTyping ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)'
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.3)'
                }
              }}
            >
              {isTyping ? (
                <CircularProgress size={20} color="inherit" sx={{ opacity: 0.5 }} />
              ) : (
                <SendIcon sx={{ fontSize: 20 }} />
              )}
            </IconButton>
          </Box>
          
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              display: 'block', 
              mt: 1, 
              textAlign: 'center',
              opacity: 0.6
            }}
          >
            Type a question about Singapore University of Technology and Design (SUTD)
          </Typography>
        </Box>
      </GlassContainer>
    </Container>
  )
}