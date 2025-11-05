import { memo } from 'react'
import { motion } from 'motion/react'
import { Building2 } from 'lucide-react'
import Logo from '../assets/logo/site-logo.png';

const PageLoader = memo(() => {
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-center">
        <motion.div
          className="w-16 h-16  flex items-center justify-center text-white shadow-lg mb-6 mx-auto"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
        
        <img src={Logo} alt="Logo" />
        </motion.div>
        
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-900">Mckeywa Projects</h3>
          <div className="flex items-center justify-center space-x-1">
            <motion.div
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-orange-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          <p className="text-sm text-gray-600">Loading excellence...</p>
        </motion.div>
      </div>
    </motion.div>
  )
})

PageLoader.displayName = 'PageLoader'

export { PageLoader }