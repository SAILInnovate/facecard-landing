import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className={`${className} ${currentIndex < text.length ? 'typing-text' : ''}`}>
      {displayText}
    </span>
  );
};

export default TypingText;