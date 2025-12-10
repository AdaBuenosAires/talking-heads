import { motion } from 'framer-motion'

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-apple-lg px-4 py-3 ${
          isUser
            ? 'bg-light-accent dark:bg-dark-accent text-white dark:text-dark-bg'
            : 'bg-light-bgSecondary dark:bg-dark-bgTertiary'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isUser
              ? 'text-white/70 dark:text-dark-bg/70'
              : 'text-light-textTertiary dark:text-dark-textTertiary'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </motion.div>
  )
}
