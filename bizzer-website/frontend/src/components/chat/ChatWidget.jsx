import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  toggleChat,
  addMessage,
  sendMessage,
} from '../../store/slices/chatSlice'
import ChatMessage from './ChatMessage'
import LoadingSpinner from '../common/LoadingSpinner'

export default function ChatWidget() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, messages, isLoading, sessionId } = useSelector(
    (state) => state.chat
  )
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      dispatch(
        addMessage({
          id: Date.now(),
          role: 'assistant',
          content: t('chat.welcome'),
          timestamp: new Date().toISOString(),
        })
      )
    }
  }, [isOpen, messages.length, dispatch, t])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    }

    // Add user message
    dispatch(addMessage(userMessage))
    setInputValue('')

    // Send to API
    dispatch(sendMessage({ message: userMessage.content, sessionId }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Only show for authenticated users
  if (!isAuthenticated) return null

  return (
    <div className="chat-widget">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="chat-window"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-light-border dark:border-dark-border flex items-center justify-between">
              <h3 className="font-semibold">{t('chat.title')}</h3>
              <button
                onClick={() => dispatch(toggleChat())}
                className="p-1 hover:bg-light-bgSecondary dark:hover:bg-dark-bgTertiary rounded"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-light-bgSecondary dark:bg-dark-bgTertiary rounded-apple p-3">
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-light-border dark:border-dark-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="input flex-1"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="btn-primary px-4 disabled:opacity-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => dispatch(toggleChat())}
        className="chat-bubble"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 text-white dark:text-dark-bg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white dark:text-dark-bg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </motion.button>
    </div>
  )
}
