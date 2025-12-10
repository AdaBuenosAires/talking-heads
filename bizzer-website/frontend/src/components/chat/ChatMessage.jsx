import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Simple markdown parser for chat messages
function parseMarkdown(text) {
  if (!text) return ''

  // Bold: **text** or __text__
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  parsed = parsed.replace(/__(.*?)__/g, '<strong>$1</strong>')

  // Italic: *text* or _text_
  parsed = parsed.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  parsed = parsed.replace(/_([^_]+)_/g, '<em>$1</em>')

  // Code: `code`
  parsed = parsed.replace(
    /`([^`]+)`/g,
    '<code class="chat-code-inline">$1</code>'
  )

  // Links: [text](url)
  parsed = parsed.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>'
  )

  // Line breaks
  parsed = parsed.replace(/\n/g, '<br />')

  return parsed
}

// Avatar component
function MessageAvatar({ isUser }) {
  if (isUser) {
    return (
      <div className="chat-message-avatar chat-message-avatar-user">
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="chat-message-avatar chat-message-avatar-assistant">
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  const formattedContent = useMemo(
    () => parseMarkdown(message.content),
    [message.content]
  )

  const formattedTime = useMemo(() => {
    try {
      return new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }, [message.timestamp])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-assistant'}`}
    >
      {!isUser && <MessageAvatar isUser={false} />}

      <div className="chat-message-content-wrapper">
        <div
          className={`chat-message-bubble ${
            isUser ? 'chat-message-bubble-user' : 'chat-message-bubble-assistant'
          }`}
        >
          <div
            className="chat-message-text"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>

        <span
          className={`chat-message-time ${
            isUser ? 'chat-message-time-user' : 'chat-message-time-assistant'
          }`}
        >
          {formattedTime}
        </span>
      </div>

      {isUser && <MessageAvatar isUser={true} />}
    </motion.div>
  )
}
