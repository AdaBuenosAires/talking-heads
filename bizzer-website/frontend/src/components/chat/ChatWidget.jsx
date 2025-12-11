import { useState, useRef, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  toggleChat,
  addMessage,
  sendMessage,
  clearMessages,
} from '../../store/slices/chatSlice'
import ChatMessage from './ChatMessage'

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-light-textTertiary dark:bg-dark-textTertiary rounded-full"
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-light-textTertiary dark:text-dark-textTertiary ml-2">
        Bizzer está escribiendo...
      </span>
    </div>
  )
}

// Connection status indicator
function ConnectionStatus({ status }) {
  const statusConfig = {
    connected: { color: 'bg-green-500', text: 'Conectado' },
    connecting: { color: 'bg-yellow-500', text: 'Conectando...' },
    error: { color: 'bg-red-500', text: 'Sin conexión' },
  }

  const config = statusConfig[status] || statusConfig.connected

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-2 h-2 rounded-full ${config.color}`}
        animate={status === 'connecting' ? { opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="text-xs text-light-textTertiary dark:text-dark-textTertiary">
        {config.text}
      </span>
    </div>
  )
}

export default function ChatWidget() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isOpen, messages, isLoading, sessionId, error } = useSelector(
    (state) => state.chat
  )
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const [inputValue, setInputValue] = useState('')
  const [connectionStatus, setConnectionStatus] = useState('connected')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = user?.first_name
        ? `${t('chat.welcomePersonalized', { name: user.first_name })} ${t('chat.welcome')}`
        : t('chat.welcome')

      dispatch(
        addMessage({
          id: Date.now(),
          role: 'assistant',
          content: welcomeMessage,
          timestamp: new Date().toISOString(),
        })
      )
    }
  }, [isOpen, messages.length, dispatch, t, user])

  // Update connection status based on error
  useEffect(() => {
    if (error) {
      setConnectionStatus('error')
      setTimeout(() => setConnectionStatus('connected'), 5000)
    }
  }, [error])

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    }

    dispatch(addMessage(userMessage))
    setInputValue('')
    setConnectionStatus('connecting')

    try {
      await dispatch(sendMessage({ message: userMessage.content, sessionId }))
      setConnectionStatus('connected')
    } catch {
      setConnectionStatus('error')
    }
  }, [inputValue, isLoading, dispatch, sessionId])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearChat = () => {
    dispatch(clearMessages())
  }

  // Show for everyone (authenticated or not) but with different messages
  const showWidget = true

  if (!showWidget) return null

  return (
    <div className="chat-widget-container">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="chat-window-modern"
          >
            {/* Header */}
            <div className="chat-header">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="chat-avatar">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t('chat.title')}</h3>
                  <ConnectionStatus status={connectionStatus} />
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Clear chat button */}
                {messages.length > 1 && (
                  <button
                    onClick={handleClearChat}
                    className="chat-header-btn"
                    title={t('chat.clear')}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
                {/* Minimize button */}
                <button
                  onClick={() => dispatch(toggleChat())}
                  className="chat-header-btn"
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="chat-messages">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (when empty or for suggestions) */}
            {messages.length <= 1 && !isLoading && (
              <div className="chat-quick-actions">
                <p className="text-xs text-light-textTertiary dark:text-dark-textTertiary mb-2">
                  {t('chat.suggestions')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    t('chat.suggestion1'),
                    t('chat.suggestion2'),
                    t('chat.suggestion3'),
                  ].map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputValue(suggestion)
                        inputRef.current?.focus()
                      }}
                      className="chat-suggestion-btn"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-container">
              {!isAuthenticated && (
                <div className="chat-auth-notice">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{t('chat.loginNotice')}</span>
                </div>
              )}
              <div className="chat-input-wrapper">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isAuthenticated
                      ? t('chat.placeholder')
                      : t('chat.placeholderGuest')
                  }
                  className="chat-input"
                  disabled={isLoading || !isAuthenticated}
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading || !isAuthenticated}
                  className="chat-send-btn"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </motion.div>
                  ) : (
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
                  )}
                </button>
              </div>
              <p className="chat-powered-by">
                Powered by <span className="font-medium">Bizzer AI</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => dispatch(toggleChat())}
        className="chat-fab"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
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
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6"
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
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Notification badge for unread */}
        {!isOpen && messages.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="chat-notification-badge"
          >
            <span className="text-xs">{messages.length}</span>
          </motion.div>
        )}
      </motion.button>
    </div>
  )
}
