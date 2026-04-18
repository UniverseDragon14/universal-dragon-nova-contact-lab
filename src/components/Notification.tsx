import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export type NotificationType = 'error' | 'success' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    error: <AlertCircle className="text-prism-1" size={20} />,
    success: <CheckCircle className="text-prism-2" size={20} />,
    info: <Info className="text-prism-3" size={20} />,
  };

  const borders = {
    error: 'border-prism-1/30',
    success: 'border-prism-2/30',
    info: 'border-prism-3/30',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] min-w-[320px] max-w-md p-4 bg-glass backdrop-blur-xl border ${borders[type]} flex items-center gap-4 shadow-2xl`}
          id="system-notification"
        >
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-grow">
            <p className="text-[0.75rem] font-mono text-text-main leading-tight uppercase tracking-wider">
              {type === 'error' ? 'Protocol Error' : 'System Update'}
            </p>
            <p className="text-[0.8rem] text-text-muted mt-1">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 text-text-muted hover:text-text-main transition-colors"
            id="close-notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
