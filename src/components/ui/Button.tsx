import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-olive-dark text-taupe-light px-4 py-2 rounded-lg font-medium ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-olive'
      }`}
    >
      {children}
    </motion.button>
  );
    }
