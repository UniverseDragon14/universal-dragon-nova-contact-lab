import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = "relative inline-block" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute z-[110] bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-black/80 backdrop-blur-md border border-white/10 text-[0.65rem] font-mono text-prism-2 uppercase tracking-wider whitespace-nowrap pointer-events-none shadow-xl"
          >
            <div className="relative">
              {content}
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 border-r border-b border-white/10 rotate-45 -mt-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
