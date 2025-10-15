import { memo } from 'react'
import { useTheme } from './hooks/useTheme'
import { Button } from './ui/button'
import { Sun, Moon, Monitor } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export const ThemeToggle = memo(() => {
  const { theme, setTheme, actualTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />
      case 'dark':
        return <Moon className="w-4 h-4" />
      case 'system':
        return <Monitor className="w-4 h-4" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return 'Auto'
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 group"
      title={`Current theme: ${getLabel()} (Click to cycle)`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {getIcon()}
        </motion.div>
      </AnimatePresence>
      
      <span className="hidden sm:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
        {getLabel()}
      </span>

      {/* Theme indicator dot */}
      <motion.div
        className={`w-2 h-2 rounded-full ${
          actualTheme === 'dark' 
            ? 'bg-blue-500' 
            : 'bg-orange-500'
        }`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
        Switch to {theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light'} mode
      </div>
    </Button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'