import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send } from "lucide-react";

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "27823169297"; // South Africa country code + number

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mb-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mckeywa Projects</h3>
                    <p className="text-xs opacity-90">Typically replies instantly</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 h-48 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hello! 👋 Welcome to Mckeywa Projects. How can we help you today?
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      Just now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        onClick={isOpen ? () => setIsOpen(false) : handleWhatsAppClick}
        onDoubleClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 10px 25px rgba(37, 211, 102, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 relative z-10" />

        {/* Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </motion.div>
      </motion.button>

      {/* Quick Message Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        💬 Quick Message
      </motion.button>
    </div>
  );
};

export default WhatsAppWidget;
