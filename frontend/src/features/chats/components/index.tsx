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
  CircularProgress,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FaceRoundedIcon from '@mui/icons-material/FaceRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
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
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`

const MessageBubble = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  borderRadius: 8,
  maxWidth: '90%',
  position: 'relative',
  animation: `${fadeIn} 0.3s ease-out forwards`,
  transition: 'all 0.2s ease',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%',
    padding: theme.spacing(1.2, 1.6),
  }
}))

const UserBubble = styled(MessageBubble)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  border: '1px solid rgba(255, 90, 40, 0.8)',
  boxShadow: '0 2px 8px rgba(255, 120, 67, 0.2)',
}))

const BotBubble = styled(MessageBubble)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  border: '1px solid rgba(255, 120, 67, 0.15)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}))

const InputField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    border: '1px solid rgba(0, 0, 0, 0.12)',
    transition: 'all 0.2s ease',
    padding: theme.spacing(1.2, 2),
    '&:hover': {
      border: '1px solid rgba(255, 120, 67, 0.4)',
      boxShadow: '0 2px 8px rgba(255, 120, 67, 0.1)'
    },
    '&.Mui-focused': {
      border: '1px solid rgba(255, 120, 67, 0.6)',
      boxShadow: '0 2px 12px rgba(255, 120, 67, 0.15)'
    }
  }
}))

const ChatContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  border: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  padding: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '85vh',
  maxWidth: 800,
  width: '100%',
  margin: '0 auto',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: '92vh',
    borderRadius: 8,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.06)',
  }
}))

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  background: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5, 2),
  }
}))

const SourceContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 6,
  padding: theme.spacing(1.8),
  marginTop: theme.spacing(1.5),
  border: '1px solid rgba(255, 120, 67, 0.15)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5
  }
}))

const ModelChip = styled(Chip)(({ theme }) => ({
  borderRadius: 6,
  height: isMobile => isMobile ? '24px' : '28px',
  marginRight: 8,
  backgroundColor: 'rgba(255, 120, 67, 0.05)', 
  borderColor: 'rgba(255, 120, 67, 0.3)',
  border: '1px solid rgba(255, 120, 67, 0.3)',
  fontWeight: 600,
  fontSize: '0.7rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 120, 67, 0.1)',
    borderColor: 'rgba(255, 120, 67, 0.4)',
  }
}))

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: 'text.secondary',
  width: isMobile => isMobile ? 28 : 32,
  height: isMobile => isMobile ? 28 : 32,
  marginRight: 4,
  border: '1px solid transparent',
  '&:hover': {
    color: 'primary.main',
    backgroundColor: 'rgba(255, 120, 67, 0.1)',
    border: '1px solid rgba(255, 120, 67, 0.2)'
  }
}))

// Typing animation dots
const Dot = styled(Box)(({ theme, delay = 0 }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginRight: 5,
  animation: `${bounce} 1.4s ease infinite`,
  animationDelay: `${delay}s`,
  opacity: 0.7
}))

// Main component
export const Chatbot: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        text: 'Hi there! 👋 I\'m the SUTD Chatbot. I can answer questions about Singapore University of Technology and Design. How can I help you today?', 
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
            text: 'Oops! 😅 I seem to be having trouble connecting to my brain. Please check that the backend is running correctly.',
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
        text: 'Chat history cleared. ✨ What would you like to know about SUTD?', 
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
        text: `I've switched to the ${!useFineTuned ? 'fine-tuned' : 'base'} model. How can I help you?`,
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
        text: 'Sorry, I encountered an error processing your request. 😔 Please try again.',
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
    <Container 
      maxWidth="lg" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        py: isMobile ? 0 : 2, 
        px: { xs: 1, sm: 4 }
      }}
    >
      <ChatContainer elevation={0}>
        {/* Header */}
        <Header>
          <Box display="flex" alignItems="center">
            <Avatar 
              src="/robot.png" 
              alt="SUTD Bot"
              sx={{ 
                width: isMobile ? 34 : 38, 
                height: isMobile ? 34 : 38, 
                mr: 1.5,
                backgroundColor: 'rgba(255, 120, 67, 0.1)',
                border: '1px solid rgba(255, 120, 67, 0.2)',
                animation: `${float} 3s ease-in-out infinite`
              }} 
            />
            <Box>
              <Typography 
                variant="h6" 
                fontWeight={600} 
                sx={{ 
                  fontSize: isMobile ? '0.95rem' : '1.05rem', 
                  letterSpacing: '0.5px',
                  color: 'text.primary'
                }}
              >
                SUTD Chatbot
              </Typography>
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}
              >
                {useFineTuned ? 'Using fine-tuned model' : 'Using base model'}
              </Typography>
            </Box>
          </Box>
          
          <Box>
            <Tooltip title="Toggle model">
              <Chip 
                label={useFineTuned ? "Fine-tuned" : "Base"}
                size="small"
                color="primary"
                variant="outlined"
                onClick={toggleModel}
                sx={{ 
                  mr: 1,
                  backgroundColor: 'rgba(255, 120, 67, 0.05)', 
                  borderColor: 'rgba(255, 120, 67, 0.3)',
                  border: '1px solid rgba(255, 120, 67, 0.3)',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  height: isMobile ? '24px' : '28px',
                  borderRadius: 4,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 120, 67, 0.1)',
                    borderColor: 'rgba(255, 120, 67, 0.4)',
                  }
                }}
              />
            </Tooltip>
            
            <Tooltip title="Clear chat history">
              <IconButton 
                size="small" 
                onClick={clearChat} 
                sx={{ 
                  color: 'text.secondary',
                  width: isMobile ? 28 : 32,
                  height: isMobile ? 28 : 32,
                  mr: 0.5,
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: 1,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(255, 120, 67, 0.1)',
                    border: '1px solid rgba(255, 120, 67, 0.2)'
                  }
                }}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={showSources ? "Hide sources" : "Show sources"}>
              <IconButton 
                size="small" 
                onClick={() => setShowSources(!showSources)} 
                sx={{ 
                  color: showSources ? 'primary.main' : 'text.secondary',
                  width: isMobile ? 28 : 32,
                  height: isMobile ? 28 : 32,
                  border: '1px solid',
                  borderColor: showSources ? 'rgba(255, 120, 67, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                  borderRadius: 1,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(255, 120, 67, 0.1)',
                    border: '1px solid rgba(255, 120, 67, 0.2)'
                  }
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Header>
        
        {/* Messages */}
        <Box 
          flex={1} 
          p={isMobile ? 2 : 3}
          pr={isMobile ? 2 : 4}
          overflow="auto"
          sx={{ 
            backgroundColor: 'rgba(251, 251, 253, 0.8)',
            border: '1px solid rgba(0, 0, 0, 0.03)',
            borderTop: 'none',
            borderBottom: 'none'
          }}
        >
          {messages.map((msg, i) => (
            <Fade key={i} in={true} timeout={300}>
              <Box 
                mb={2.5}
                display="flex" 
                flexDirection="column"
                alignItems={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Box 
                  display="flex" 
                  alignItems="flex-start" 
                  width="100%" 
                  justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                >
                  {msg.sender === 'bot' && (
                    <Avatar 
                      src="/robot.png" 
                      alt="bot" 
                      sx={{ 
                        width: isMobile ? 30 : 34, 
                        height: isMobile ? 30 : 34, 
                        mr: 1.2,
                        mt: 0.5,
                        backgroundColor: 'rgba(255, 120, 67, 0.1)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        border: '1px solid rgba(255, 120, 67, 0.15)',
                        borderRadius: 2
                      }}
                    />
                  )}
                  
                  <Box maxWidth={isMobile ? '80%' : '75%'}>
                    {msg.sender === 'user' ? (
                      <UserBubble>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {msg.text}
                        </Typography>
                      </UserBubble>
                    ) : (
                      <BotBubble>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                          {msg.text}
                        </Typography>
                      </BotBubble>
                    )}
                    
                    {/* Sources section */}
                    {msg.sender === 'bot' && msg.sources && msg.sources.length > 0 && showSources && (
                      <Box 
                        mt={1.5} 
                        sx={{ 
                          pl: { xs: 0, sm: 0.5 },
                          p: 1.5,
                          border: '1px solid rgba(255, 120, 67, 0.15)',
                          borderRadius: 2,
                          backgroundColor: 'rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            mb: 1.5,
                          }}
                        >
                          <MenuBookRoundedIcon 
                            sx={{ 
                              fontSize: 16, 
                              color: 'primary.main',
                              mr: 0.8,
                              opacity: 0.9
                            }} 
                          />
                          <Typography 
                            variant="caption" 
                            color="text.primary" 
                            sx={{ 
                              fontWeight: 600,
                              letterSpacing: '0.3px'
                            }}
                          >
                            Sources ({msg.sources.length})
                          </Typography>
                        </Box>

                        <Divider sx={{ mb: 1.5, opacity: 0.6, border: '1px solid rgba(0, 0, 0, 0.06)' }} />
                        
                        {msg.sources.map((source, sourceIndex) => (
                          <SourceContainer key={sourceIndex} elevation={0}>
                            {source.metadata.title && (
                              <Typography 
                                variant="caption" 
                                fontWeight={600} 
                                sx={{ 
                                  display: 'block', 
                                  mb: 0.8,
                                  color: 'text.primary'
                                }}
                              >
                                {source.metadata.title}
                              </Typography>
                            )}
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              sx={{ 
                                display: 'block',
                                fontSize: '0.75rem',
                                lineHeight: 1.5
                              }}
                            >
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
                                  mt: 1,
                                  color: 'primary.main',
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  fontSize: '0.7rem',
                                  border: '1px solid rgba(255, 120, 67, 0.2)',
                                  borderRadius: 1,
                                  px: 1,
                                  py: 0.5,
                                  display: 'inline-block',
                                  '&:hover': {
                                    textDecoration: 'none',
                                    backgroundColor: 'rgba(255, 120, 67, 0.05)',
                                    borderColor: 'rgba(255, 120, 67, 0.3)'
                                  }
                                }}
                              >
                                View source →
                              </Link>
                            )}
                          </SourceContainer>
                        ))}
                      </Box>
                    )}
                  </Box>
                  
                  {msg.sender === 'user' && (
                    <Avatar 
                      sx={{ 
                        ml: 1.2,
                        mt: 0.5,
                        width: isMobile ? 30 : 34,
                        height: isMobile ? 30 : 34,
                        backgroundColor: 'rgba(255, 120, 67, 0.8)',
                        boxShadow: '0 2px 8px rgba(255, 120, 67, 0.2)',
                        border: '1px solid rgba(255, 90, 40, 0.6)',
                        borderRadius: 2
                      }}
                    >
                      <FaceRoundedIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
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
                    fontSize: '0.65rem'
                  }}
                >
                  {formatTime(msg.timestamp)}
                </Typography>
              </Box>
            </Fade>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <Box display="flex" alignItems="flex-start" mb={2.5}>
              <Avatar 
                src="/robot.png" 
                alt="bot" 
                sx={{ 
                  width: isMobile ? 30 : 34, 
                  height: isMobile ? 30 : 34, 
                  mr: 1.2,
                  mt: 0.5,
                  backgroundColor: 'rgba(255, 120, 67, 0.1)',
                  border: '1px solid rgba(255, 120, 67, 0.15)',
                  borderRadius: 2
                }}
              />
              <BotBubble sx={{ py: 1.2, px: 2, minWidth: 60, display: 'flex', alignItems: 'center' }}>
                <Dot delay={0} />
                <Dot delay={0.15} />
                <Dot delay={0.3} />
              </BotBubble>
            </Box>
          )}
          
          {/* This div is used to scroll to the bottom */}
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Input Area */}
        <Box 
          p={isMobile ? 2 : 3} 
          sx={{ 
            borderTop: `1px solid ${(theme) => theme.palette.divider}`,
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          }}
        >
          <Box display="flex" alignItems="center">
            <InputField
              fullWidth
              variant="standard"
              placeholder="Ask me something about SUTD..."
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
                width: isMobile ? 40 : 44,
                height: isMobile ? 40 : 44,
                backgroundColor: isTyping ? 'rgba(255, 120, 67, 0.1)' : 'primary.main',
                transition: 'all 0.2s ease',
                border: '1px solid',
                borderColor: isTyping ? 'rgba(255, 120, 67, 0.1)' : 'rgba(255, 90, 40, 0.8)',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: isTyping ? 'rgba(255, 120, 67, 0.1)' : '#FF6A30',
                  transform: 'translateY(-2px)',
                  borderColor: 'rgba(255, 90, 40, 0.9)'
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                },
                animation: input.trim() ? `${pulse} 2s infinite` : 'none',
                boxShadow: input.trim() ? '0 2px 10px rgba(255, 120, 67, 0.3)' : 'none'
              }}
            >
              {isTyping ? (
                <CircularProgress size={24} color="primary" sx={{ opacity: 0.6 }} />
              ) : (
                <SendIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
              )}
            </IconButton>
          </Box>
          
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              display: 'block', 
              mt: 1.5, 
              textAlign: 'center',
              fontSize: '0.7rem'
            }}
          >
            Ask any question about Singapore University of Technology and Design
          </Typography>
        </Box>
      </ChatContainer>
    </Container>
  )
}